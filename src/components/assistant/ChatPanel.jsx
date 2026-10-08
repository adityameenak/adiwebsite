import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp, FiEdit, FiSquare, FiX, FiArrowUpRight, FiRefreshCw } from 'react-icons/fi';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import AdiMark from './AdiMark';
import Markdown from './Markdown';
import { GREETING, MAX_INPUT_CHARS, SUGGESTIONS } from './config';
import { parseReply } from './parseReply';
import { useSiteNavigation } from './useSiteNavigation';

const MOBILE_QUERY = '(max-width: 639px)';
const isMobileViewport = () => window.matchMedia(MOBILE_QUERY).matches;

export default function ChatPanel({ chat, onClose }) {
  const { messages, pending, send, stop, reset, retry } = chat;
  const reducedMotion = useReducedMotion();
  const goTo = useSiteNavigation();

  const [draft, setDraft] = useState('');
  const [mobile] = useState(isMobileViewport);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const stickToBottom = useRef(true);

  // ── Open/close side effects ────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    if (!mobile) inputRef.current?.focus({ preventScroll: true });

    // Full-screen on phones: freeze the page behind the panel.
    let restore = null;
    if (mobile) {
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      window.__lenis?.stop();
      restore = () => { document.documentElement.style.overflow = prev; window.__lenis?.start(); };
    }
    return () => { document.removeEventListener('keydown', onKey); restore?.(); };
  }, [mobile, onClose]);

  // ── Auto-scroll while the visitor is at (or near) the bottom ──────────────
  const onScroll = () => {
    const el = scrollRef.current;
    if (el) stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el && stickToBottom.current) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // ── Input ─────────────────────────────────────────────────────────────────
  const autosize = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
    el.style.overflowY = el.scrollHeight > 140 ? 'auto' : 'hidden';
  };
  useLayoutEffect(autosize, [draft]);

  const submit = useCallback((text) => {
    const value = (text ?? draft).trim();
    if (!value || pending) return;
    stickToBottom.current = true;
    send(value);
    if (text === undefined) setDraft('');
  }, [draft, pending, send]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  };

  const openAction = useCallback((action) => {
    const { navigated } = goTo(action);
    if (navigated && isMobileViewport()) onClose();
  }, [goTo, onClose]);

  const newConversation = () => {
    reset();
    setDraft('');
    inputRef.current?.focus({ preventScroll: true });
  };

  // ── Motion ────────────────────────────────────────────────────────────────
  const panelMotion = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : {
        initial: { opacity: 0, y: mobile ? 24 : 16, scale: mobile ? 1 : 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: mobile ? 24 : 12, scale: mobile ? 1 : 0.98 },
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      };

  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');
  const remaining = MAX_INPUT_CHARS - draft.length;

  return (
    <motion.div
      className="adi-panel"
      role="dialog"
      aria-modal={mobile ? 'true' : undefined}
      aria-labelledby="adi-panel-title"
      style={{ transformOrigin: 'bottom right' }}
      {...panelMotion}
    >
      <header className="adi-panel__header">
        <AdiMark size={30} />
        <div className="adi-panel__titles">
          <h2 id="adi-panel-title" className="adi-panel__title">adi.ai</h2>
          <p className="adi-panel__subtitle">Your guide to everything Adi</p>
        </div>
        <button type="button" className="adi-icon-btn" onClick={newConversation} title="New conversation" aria-label="Start a new conversation" disabled={!messages.length}>
          <FiEdit size={16} />
        </button>
        <button type="button" className="adi-icon-btn" onClick={onClose} title="Close (Esc)" aria-label="Close adi.ai">
          <FiX size={18} />
        </button>
      </header>

      <div
        ref={scrollRef}
        className="adi-panel__body"
        onScroll={onScroll}
        data-lenis-prevent
        aria-live="polite"
        aria-busy={pending}
      >
        <AssistantRow reducedMotion={reducedMotion} animate={false}>
          <div className="adi-md"><Markdown text={GREETING} /></div>
          {!messages.length && (
            <div className="adi-suggestions" role="group" aria-label="Suggested questions">
              {SUGGESTIONS.map((q) => (
                <button key={q} type="button" className="adi-suggestion" onClick={() => submit(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}
        </AssistantRow>

        {messages.map((m) =>
          m.role === 'user' ? (
            <MessageMotion key={m.id} reducedMotion={reducedMotion} className="adi-row adi-row--user">
              <div className="adi-bubble">{m.content}</div>
            </MessageMotion>
          ) : (
            <AssistantMessage
              key={m.id}
              message={m}
              isLast={m === lastAssistant}
              pending={pending}
              reducedMotion={reducedMotion}
              onAction={openAction}
              onFollowUp={submit}
              onRetry={() => retry(m.id)}
            />
          ),
        )}
      </div>

      <form
        className="adi-panel__composer"
        onSubmit={(e) => { e.preventDefault(); submit(); }}
      >
        <label htmlFor="adi-input" className="sr-only">Ask adi.ai a question</label>
        <textarea
          id="adi-input"
          ref={inputRef}
          className="adi-input"
          rows={1}
          value={draft}
          maxLength={MAX_INPUT_CHARS}
          placeholder="Ask anything about Adi…"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          data-lenis-prevent
          enterKeyHint="send"
        />
        {pending ? (
          <button type="button" className="adi-send" onClick={stop} aria-label="Stop generating" title="Stop">
            <FiSquare size={14} />
          </button>
        ) : (
          <button type="submit" className="adi-send" disabled={!draft.trim()} aria-label="Send message" title="Send (Enter)">
            <FiArrowUp size={17} />
          </button>
        )}
      </form>
      <p className="adi-panel__footnote">
        {remaining < 150 ? `${remaining} characters left` : 'Answers come from Adi’s portfolio. adi.ai can make mistakes.'}
      </p>
    </motion.div>
  );
}

function MessageMotion({ reducedMotion, children, className }) {
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0.1 : 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AssistantRow({ children, reducedMotion, animate = true }) {
  const content = (
    <>
      <AdiMark size={22} className="adi-row__avatar" />
      <div className="adi-row__content">{children}</div>
    </>
  );
  return animate
    ? <MessageMotion reducedMotion={reducedMotion} className="adi-row adi-row--bot">{content}</MessageMotion>
    : <div className="adi-row adi-row--bot">{content}</div>;
}

function AssistantMessage({ message, isLast, pending, reducedMotion, onAction, onFollowUp, onRetry }) {
  const { text, actions, followups } = parseReply(message.content);
  const streaming = message.status === 'streaming';

  return (
    <AssistantRow reducedMotion={reducedMotion}>
      {text ? (
        <div className={`adi-md${streaming ? ' is-streaming' : ''}`}>
          <Markdown text={text} onLink={onAction} />
        </div>
      ) : streaming ? (
        <TypingDots />
      ) : null}

      {message.status === 'error' && (
        <div className="adi-error" role="alert">
          <span>{message.error || 'Something went wrong.'}</span>
          <button type="button" className="adi-error__retry" onClick={onRetry}>
            <FiRefreshCw size={12} /> Try again
          </button>
        </div>
      )}

      {!streaming && actions.length > 0 && (
        <div className="adi-actions">
          {actions.map((a) => (
            <button key={a.id} type="button" className="adi-action" onClick={() => onAction(a)}>
              {a.label}
              {a.href && <FiArrowUpRight size={12} aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}

      {isLast && !pending && message.status === 'done' && followups.length > 0 && (
        <div className="adi-followups" role="group" aria-label="Suggested follow-up questions">
          {followups.map((q) => (
            <button key={q} type="button" className="adi-followup" onClick={() => onFollowUp(q)}>
              {q}
            </button>
          ))}
        </div>
      )}
    </AssistantRow>
  );
}

function TypingDots() {
  return (
    <div className="adi-typing" role="status" aria-label="adi.ai is typing">
      <span /><span /><span />
    </div>
  );
}
