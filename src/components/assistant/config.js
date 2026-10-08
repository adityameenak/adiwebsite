import catalog from '../../../knowledge/links.json';

export const API_URL = '/api/chat';
export const STORAGE_KEY = 'adi-ai:conversation:v1';

// Keep in sync with api/_lib/chatHandler.js
export const MAX_INPUT_CHARS = 1000;
export const HISTORY_SENT = 10;

export const GREETING = `Hey! I'm adi.ai 👋

I'm Adi's personal AI assistant. I can tell you about his experience, research, projects, technical skills, and what he's currently working on.

What would you like to know?`;

export const SUGGESTIONS = [
  'What did Adi work on at Samsung?',
  'Tell me about his research.',
  'What projects has he built?',
  'What are his technical skills?',
];

export const ACTIONS = new Map(catalog.actions.map((a) => [a.id, a]));

// Pages that exist in the router (src/main.jsx).
const SITE_ROUTES = ['/', '/experience', '/projects', '/education', '/contact'];

// Every URL the assistant is allowed to render as a link.
export const ALLOWED_HREFS = new Set([
  ...SITE_ROUTES,
  ...catalog.actions.flatMap((a) => [a.href, a.route].filter(Boolean)),
]);

const SITE_ORIGINS = ['https://adityam.page', 'https://www.adityam.page'];

/** Returns a safe, normalized href, or null if the link isn't on the allowlist. */
export function sanitizeHref(raw) {
  if (typeof raw !== 'string') return null;
  let href = raw.trim();
  for (const origin of SITE_ORIGINS) {
    if (href.startsWith(origin)) href = href.slice(origin.length) || '/';
  }
  if (ALLOWED_HREFS.has(href)) return href;

  // Same-site route with a section hash, e.g. /projects#project-solariq
  const [path, hash] = href.split('#');
  const normPath = path.length > 1 ? path.replace(/\/$/, '') : path || '/';
  if (SITE_ROUTES.includes(normPath) && (!hash || /^[a-z0-9-]+$/.test(hash))) return hash ? `${normPath}#${hash}` : normPath;

  // Tolerate a missing/extra trailing slash on catalog URLs.
  const alt = href.endsWith('/') ? href.slice(0, -1) : `${href}/`;
  return ALLOWED_HREFS.has(alt) ? alt : null;
}
