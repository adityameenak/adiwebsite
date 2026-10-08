import { loadKnowledge } from './knowledge.js';
import { buildSystemPrompt } from './prompt.js';
import { checkRateLimit } from './rateLimit.js';

// ── Limits (keep in sync with src/components/assistant/config.js) ──────────
const MAX_BODY_BYTES = 24_000;
const MAX_MESSAGES_IN = 40;        // reject anything longer outright
const HISTORY_SENT = 10;           // only the last N turns go to the model
const MAX_USER_CHARS = 1000;
const MAX_ASSISTANT_CHARS = 4000;
const MAX_OUTPUT_TOKENS = 700;
const UPSTREAM_TIMEOUT_MS = 45_000;

const DEFAULT_MODEL = 'gpt-6-luna';
const openaiUrl = () => `${(process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')}/chat/completions`;

const DEFAULT_ORIGINS = [
  'https://adityam.page',
  'https://www.adityam.page',
  'http://localhost:5173',
  'http://localhost:4173',
];

function allowedOrigins() {
  const fromEnv = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  // Vercel sets these per deployment, so preview URLs work without config.
  const vercel = [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL]
    .filter(Boolean)
    .map((host) => `https://${host}`);
  return new Set([...DEFAULT_ORIGINS, ...fromEnv, ...vercel]);
}

function sendJson(res, status, payload, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  res.end(JSON.stringify(payload));
}

function clientKey(req) {
  const fwd = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim()
    || req.headers['x-real-ip']
    || req.socket?.remoteAddress
    || 'unknown';
  return String(ip);
}

async function readBody(req) {
  // Vercel's Node runtime parses JSON lazily into req.body; plain Node (Vite dev) doesn't.
  if (req.body !== undefined && req.body !== null && typeof req.body !== 'string') return req.body;
  let raw = typeof req.body === 'string' ? req.body : '';
  if (!raw) {
    for await (const chunk of req) {
      raw += chunk;
      if (raw.length > MAX_BODY_BYTES) throw Object.assign(new Error('too large'), { status: 413 });
    }
  }
  if (raw.length > MAX_BODY_BYTES) throw Object.assign(new Error('too large'), { status: 413 });
  return JSON.parse(raw);
}

// Strip our own metadata markers so a client can't smuggle fake ones back in.
const cleanText = (s) => s.replace(/\[\[[\s\S]*?\]\]/g, '').replaceAll('\u0000', '').trim();

function validateMessages(body) {
  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES_IN) {
    return { error: 'Invalid conversation.' };
  }
  const out = [];
  for (const m of messages) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') {
      return { error: 'Invalid message.' };
    }
    const limit = m.role === 'user' ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS;
    if (m.role === 'user' && m.content.length > MAX_USER_CHARS) {
      return { error: `Messages are limited to ${MAX_USER_CHARS} characters.` };
    }
    const content = cleanText(m.content).slice(0, limit);
    if (content) out.push({ role: m.role, content });
  }
  if (!out.length || out[out.length - 1].role !== 'user') return { error: 'The last message must be from the visitor.' };
  return { messages: out.slice(-HISTORY_SENT) };
}

/**
 * POST /api/chat
 * Body: { messages: [{ role: 'user' | 'assistant', content: string }] }
 * Response: streamed text/plain — the assistant's reply, ending with optional
 * [[actions: …]] / [[followups: …]] lines that the client parses and hides.
 */
export default async function chatHandler(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { Allow: 'POST, OPTIONS' });
    return res.end();
  }
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed.' }, { Allow: 'POST, OPTIONS' });

  const origin = req.headers.origin;
  if (origin && !allowedOrigins().has(origin)) return sendJson(res, 403, { error: 'Forbidden.' });

  const ctype = String(req.headers['content-type'] || '');
  if (!ctype.includes('application/json')) return sendJson(res, 415, { error: 'Expected JSON.' });

  const limit = checkRateLimit(clientKey(req));
  if (!limit.ok) {
    return sendJson(res, 429, { error: 'You’re sending messages quickly. Please wait a moment and try again.' }, { 'Retry-After': String(limit.retryAfter) });
  }

  let body;
  try {
    body = await readBody(req);
  } catch (err) {
    return sendJson(res, err.status || 400, { error: err.status === 413 ? 'Message too long.' : 'Invalid request body.' });
  }

  const { messages, error } = validateMessages(body);
  if (error) return sendJson(res, 400, { error });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('[adi.ai] OPENAI_API_KEY is not set');
    return sendJson(res, 503, { error: 'adi.ai isn’t configured yet. Please try again later.' });
  }

  let systemPrompt;
  try {
    systemPrompt = buildSystemPrompt(loadKnowledge());
  } catch (err) {
    console.error('[adi.ai] failed to load knowledge', err);
    return sendJson(res, 500, { error: 'Something went wrong. Please try again.' });
  }

  const controller = new AbortController();
  let timedOut = false;
  const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, UPSTREAM_TIMEOUT_MS);
  res.on('close', () => controller.abort());   // visitor closed the panel / hit stop

  const payload = {
    model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    stream: true,
    max_completion_tokens: MAX_OUTPUT_TOKENS,
  };
  // Reasoning adds cost and latency this use case doesn't need. Set
  // OPENAI_REASONING_EFFORT="" to omit the field for models that don't support it.
  const effort = process.env.OPENAI_REASONING_EFFORT ?? 'none';
  if (effort) payload.reasoning_effort = effort;

  let upstream;
  try {
    upstream = await fetch(openaiUrl(), {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    if (controller.signal.aborted && !timedOut) return res.end();   // visitor left
    console.error('[adi.ai] upstream request failed', err?.name || err);
    return sendJson(res, 502, { error: 'adi.ai couldn’t reach its model. Please try again.' });
  }

  if (!upstream.ok || !upstream.body) {
    clearTimeout(timeout);
    const detail = await upstream.text().catch(() => '');
    console.error('[adi.ai] upstream error', upstream.status, detail.slice(0, 500));
    const status = upstream.status === 429 ? 503 : 502;
    return sendJson(res, status, { error: 'adi.ai is unavailable right now. Please try again in a bit.' });
  }

  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Accel-Buffering': 'no',
    'X-Content-Type-Options': 'nosniff',
  });

  // Relay OpenAI's SSE stream as plain text deltas.
  const decoder = new TextDecoder();
  let buffer = '';
  try {
    for await (const chunk of upstream.body) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const data = trimmed.slice(5).trim();
        if (data === '[DONE]') continue;
        try {
          const delta = JSON.parse(data).choices?.[0]?.delta?.content;
          if (delta) res.write(delta);
        } catch {
          /* ignore keep-alives / partial frames */
        }
      }
    }
  } catch (err) {
    if (timedOut || !controller.signal.aborted) {
      console.error('[adi.ai] stream interrupted', timedOut ? 'timeout' : err?.name || err);
      res.write('\n\n[[error]]');
    }
  } finally {
    clearTimeout(timeout);
    res.end();
  }
}
