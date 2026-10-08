import { useCallback, useEffect, useRef, useState } from 'react';
import { API_URL, HISTORY_SENT, MAX_INPUT_CHARS, STORAGE_KEY } from './config';
import { historyText } from './parseReply';

let nextId = Date.now();
const uid = () => (nextId += 1).toString(36);

function loadSaved() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(saved)) return [];
    // A reply cut off by a reload is kept as-is rather than left "streaming".
    return saved
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .map((m) => (m.status === 'streaming' ? { ...m, status: m.content ? 'done' : 'error', error: m.content ? undefined : 'Interrupted.' } : m));
  } catch {
    return [];
  }
}

const FRIENDLY = {
  400: 'That message couldn’t be sent. Try rephrasing it.',
  413: 'That message is too long.',
  429: 'You’re sending messages quickly. Give it a moment and try again.',
  503: 'adi.ai is unavailable right now. Please try again in a bit.',
};

/**
 * Conversation state for adi.ai: sends the history to /api/chat, streams the
 * reply into the last message, and persists the thread for the browser session.
 */
export function useAdiChat() {
  const [messages, setMessages] = useState(loadSaved);
  const [pending, setPending] = useState(false);
  const abortRef = useRef(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch { /* storage unavailable */ }
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const patch = (id, update) =>
    setMessages((list) => list.map((m) => (m.id === id ? { ...m, ...(typeof update === 'function' ? update(m) : update) } : m)));

  const send = useCallback(async (input, base = messagesRef.current) => {
    const content = String(input || '').trim().slice(0, MAX_INPUT_CHARS);
    if (!content || abortRef.current) return;

    const userMsg = { id: uid(), role: 'user', content, status: 'done' };
    const botId = uid();

    const history = [...base, userMsg]
      .filter((m) => m.status === 'done' && m.content)
      .map((m) => ({ role: m.role, content: m.role === 'assistant' ? historyText(m.content) : m.content }))
      .slice(-HISTORY_SENT);
    const next = [...base, userMsg, { id: botId, role: 'assistant', content: '', status: 'streaming' }];
    messagesRef.current = next;
    setMessages(next);

    const controller = new AbortController();
    abortRef.current = controller;
    setPending(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        let message = FRIENDLY[res.status];
        if (!message) {
          try { message = (await res.json()).error; } catch { /* non-JSON error */ }
        }
        throw new Error(message || 'Something went wrong. Please try again.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (chunk) patch(botId, (m) => ({ content: m.content + chunk }));
      }
      patch(botId, (m) =>
        /\[\[\s*error\s*\]\]/i.test(m.content) || !m.content.trim()
          ? { status: 'error', error: 'The reply was cut off. Please try again.' }
          : { status: 'done' });
    } catch (err) {
      if (controller.signal.aborted) {
        patch(botId, (m) => (m.content.trim() ? { status: 'done', stopped: true } : { status: 'error', error: 'Stopped.' }));
      } else {
        const offline = err instanceof TypeError;
        patch(botId, { status: 'error', error: offline ? 'Couldn’t reach adi.ai. Check your connection and try again.' : err.message });
      }
    } finally {
      abortRef.current = null;
      setPending(false);
    }
  }, []);

  const stop = useCallback(() => abortRef.current?.abort(), []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    messagesRef.current = [];
    setMessages([]);
  }, []);

  /** Re-sends the visitor message that produced a failed reply. */
  const retry = useCallback((assistantId) => {
    const list = messagesRef.current;
    const idx = list.findIndex((m) => m.id === assistantId);
    const prev = idx > 0 ? list[idx - 1] : null;
    if (!prev || prev.role !== 'user') return;
    send(prev.content, list.slice(0, idx - 1));
  }, [send]);

  return { messages, pending, send, stop, reset, retry };
}
