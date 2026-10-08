import { ACTIONS } from './config';

const ACTIONS_RE = /\[\[\s*actions\s*:([^\]]*)\]\]/i;
const FOLLOWUPS_RE = /\[\[\s*followups\s*:([^\]]*)\]\]/i;
const ERROR_RE = /\[\[\s*error\s*\]\]/i;

/**
 * Splits a raw streamed reply into display text plus metadata.
 * While streaming, anything from a dangling "[[" onward is hidden so metadata
 * never flashes on screen.
 */
export function parseReply(raw = '') {
  const actionsMatch = raw.match(ACTIONS_RE);
  const followupsMatch = raw.match(FOLLOWUPS_RE);
  const failed = ERROR_RE.test(raw);

  let text = raw.replace(/\[\[[\s\S]*?\]\]/g, '');
  const open = text.lastIndexOf('[[');
  if (open !== -1) text = text.slice(0, open);
  // Hide a trailing single "[" that may be the start of a marker mid-stream.
  text = text.replace(/\[$/, '').trimEnd();

  const actions = actionsMatch
    ? [...new Set(actionsMatch[1].split(',').map((s) => s.trim().toLowerCase()))]
        .filter((id) => ACTIONS.has(id))
        .slice(0, 3)
        .map((id) => ACTIONS.get(id))
    : [];

  const followups = followupsMatch
    ? followupsMatch[1]
        .split('|')
        .map((s) => s.trim())
        .filter((s) => s.length > 3 && s.length <= 90)
        .slice(0, 2)
    : [];

  return { text, actions, followups, failed };
}

/** Text to send back to the API as conversation history. */
export function historyText(raw = '') {
  return raw.replace(/\[\[[\s\S]*?\]\]/g, '').trim();
}
