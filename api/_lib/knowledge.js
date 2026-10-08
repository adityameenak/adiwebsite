import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

// Bundled into the function via vercel.json → functions.includeFiles.
const KNOWLEDGE_DIR = path.join(process.cwd(), 'knowledge');

let cache = null;

// Placeholders and editor notes live in HTML comments and must never reach the model.
// A heading left with nothing under it (e.g. "## Analog Devices" whose body is
// only a TODO) is dropped too, so an empty section can't imply a fact.
function stripComments(markdown) {
  const lines = markdown.replace(/<!--[\s\S]*?-->/g, '').split('\n');
  const level = (line) => (line.match(/^(#{1,6})\s/) || [])[1]?.length || 0;

  const kept = lines.filter((line, i) => {
    const own = level(line);
    if (!own) return true;
    // Keep the heading if any text appears before the next heading of the same or higher rank.
    for (let j = i + 1; j < lines.length; j += 1) {
      const next = level(lines[j]);
      if (next && next <= own) return false;
      if (!next && lines[j].trim()) return true;
    }
    return false;
  });
  return kept.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * Loads every knowledge/*.md file (except README) plus the link catalog.
 * Today this returns the whole knowledge base; to add RAG later, swap this for
 * a retriever that takes the visitor's question and returns relevant chunks.
 */
export function loadKnowledge() {
  if (cache && process.env.NODE_ENV === 'production') return cache;

  const files = readdirSync(KNOWLEDGE_DIR)
    .filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md')
    .sort();

  const text = files
    .map((f) => stripComments(readFileSync(path.join(KNOWLEDGE_DIR, f), 'utf8')))
    .filter(Boolean)
    .join('\n\n---\n\n');

  const { actions } = JSON.parse(readFileSync(path.join(KNOWLEDGE_DIR, 'links.json'), 'utf8'));

  cache = { text, actions };
  return cache;
}
