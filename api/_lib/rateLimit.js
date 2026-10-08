/**
 * Best-effort in-memory sliding-window rate limiter.
 *
 * Serverless instances don't share memory, so this limits bursts per warm
 * instance rather than globally. It stops casual abuse cheaply; for a hard
 * global cap, add Vercel Firewall rate limiting or a shared store (Upstash Redis).
 */
const WINDOWS = [
  { ms: 60_000, max: 10 },        // 10 messages per minute
  { ms: 60 * 60_000, max: 60 },   // 60 messages per hour
];
const LONGEST = Math.max(...WINDOWS.map((w) => w.ms));
const hits = new Map();           // key -> timestamps (ms)

export function checkRateLimit(key, now = Date.now()) {
  const recent = (hits.get(key) || []).filter((t) => now - t < LONGEST);

  for (const { ms, max } of WINDOWS) {
    const inWindow = recent.filter((t) => now - t < ms);
    if (inWindow.length >= max) {
      const retryAfter = Math.ceil((inWindow[0] + ms - now) / 1000);
      hits.set(key, recent);
      return { ok: false, retryAfter };
    }
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on long-lived instances.
  if (hits.size > 5000) {
    for (const [k, ts] of hits) {
      if (!ts.length || now - ts[ts.length - 1] > LONGEST) hits.delete(k);
    }
  }
  return { ok: true };
}
