import { Fragment } from 'react';
import { sanitizeHref } from './config';

/**
 * Minimal, safe Markdown renderer for assistant replies.
 * Supports paragraphs, bullet/numbered lists, **bold**, *italic*, `code`,
 * fenced code and [links](url). Builds React elements directly (no HTML
 * injection) and only renders links that pass the allowlist.
 */
export default function Markdown({ text, onLink }) {
  return <>{parseBlocks(text).map((block, i) => renderBlock(block, i, onLink))}</>;
}

function parseBlocks(src) {
  const lines = src.replace(/\r\n?/g, '\n').split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*```/.test(line)) {
      const code = [];
      i += 1;
      while (i < lines.length && !/^\s*```/.test(lines[i])) code.push(lines[i++]);
      i += 1;
      blocks.push({ type: 'code', text: code.join('\n') });
      continue;
    }

    if (/^\s*([-*•])\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*([-*•])\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*•]\s+/, ''));
      blocks.push({ type: 'ul', items });
      continue;
    }

    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+[.)]\s+/, ''));
      blocks.push({ type: 'ol', items });
      continue;
    }

    if (!line.trim()) { i += 1; continue; }

    const para = [];
    while (i < lines.length && lines[i].trim() && !/^\s*([-*•]\s+|\d+[.)]\s+|```)/.test(lines[i])) {
      para.push(lines[i++].replace(/^#{1,6}\s+/, ''));
    }
    if (!para.length) para.push(lines[i++].replace(/^#{1,6}\s+/, ''));
    blocks.push({ type: 'p', text: para.join('\n') });
  }
  return blocks;
}

function renderBlock(block, key, onLink) {
  switch (block.type) {
    case 'code':
      return <pre key={key} className="adi-md-pre"><code>{block.text}</code></pre>;
    case 'ul':
      return <ul key={key}>{block.items.map((it, j) => <li key={j}>{renderInline(it, onLink)}</li>)}</ul>;
    case 'ol':
      return <ol key={key}>{block.items.map((it, j) => <li key={j}>{renderInline(it, onLink)}</li>)}</ol>;
    default:
      return <p key={key}>{renderInline(block.text, onLink)}</p>;
  }
}

// Source only — each call builds its own RegExp, since renderInline recurses and a
// shared /g regex would have its lastIndex reset by the nested call (infinite loop).
const INLINE_SRC = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)\s]+\))|(\*[^*\s][^*]*\*)|(_[^_\s][^_]*_)/.source;

function renderInline(text, onLink) {
  const out = [];
  let last = 0;
  let match;
  const re = new RegExp(INLINE_SRC, 'g');

  while ((match = re.exec(text))) {
    if (match.index > last) out.push(withBreaks(text.slice(last, match.index), out.length));
    const token = match[0];
    const key = out.length;

    if (token.startsWith('`')) {
      out.push(<code key={key} className="adi-md-code">{token.slice(1, -1)}</code>);
    } else if (token.startsWith('**')) {
      out.push(<strong key={key}>{renderInline(token.slice(2, -2), onLink)}</strong>);
    } else if (token.startsWith('[')) {
      const [, label, url] = token.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      const href = sanitizeHref(url);
      out.push(href ? <MdLink key={key} href={href} onLink={onLink}>{label}</MdLink> : <Fragment key={key}>{label}</Fragment>);
    } else {
      out.push(<em key={key}>{token.slice(1, -1)}</em>);
    }
    last = match.index + token.length;
  }
  if (last < text.length) out.push(withBreaks(text.slice(last), out.length));
  return out;
}

function withBreaks(str, key) {
  const parts = str.split('\n');
  return (
    <Fragment key={key}>
      {parts.map((p, i) => (
        <Fragment key={i}>{i > 0 && <br />}{p}</Fragment>
      ))}
    </Fragment>
  );
}

function MdLink({ href, onLink, children }) {
  const external = /^https?:/.test(href) || href.endsWith('.pdf');
  if (external || href.startsWith('mailto:')) {
    return (
      <a href={href} className="adi-md-link" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    );
  }
  // Same-site route: let the panel handle navigation + smooth scroll.
  return (
    <a
      href={href}
      className="adi-md-link"
      onClick={(e) => {
        e.preventDefault();
        const [route, hash] = href.split('#');
        // Page routes mirror home-page section ids (/projects → #projects), so on
        // the home page this scrolls instead of switching pages.
        onLink?.({ route: route || '/', section: hash || route.slice(1) || undefined });
      }}
    >
      {children}
    </a>
  );
}
