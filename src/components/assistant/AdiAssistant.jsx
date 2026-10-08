import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AdiMark from './AdiMark';
import { useAdiChat } from './useAdiChat';
import './assistant.css';

const loadPanel = () => import('./ChatPanel');
const ChatPanel = lazy(loadPanel);

/**
 * Floating "Ask adi.ai" launcher. The chat panel (and its code) only loads the
 * first time someone opens it, so the portfolio's initial load is unaffected.
 */
export default function AdiAssistant() {
  const [open, setOpen] = useState(false);
  // Lives here (not in the panel) so a reply keeps streaming if the panel is closed.
  const chat = useAdiChat();
  const launcherRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    // Return focus to the launcher once it re-renders.
    requestAnimationFrame(() => launcherRef.current?.focus({ preventScroll: true }));
  }, []);

  // Warm the panel chunk when the browser is idle.
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 2500));
    const handle = idle(() => loadPanel());
    return () => (window.cancelIdleCallback || clearTimeout)(handle);
  }, []);

  return (
    <>
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          className="adi-launcher"
          onClick={() => setOpen(true)}
          onPointerEnter={loadPanel}
          onFocus={loadPanel}
          aria-haspopup="dialog"
          aria-label="Ask adi.ai, Adi's AI assistant"
        >
          <AdiMark size={20} className="adi-launcher__mark" />
          <span>Ask adi.ai</span>
          <span className="adi-launcher__spark" aria-hidden="true">✦</span>
        </button>
      )}

      <Suspense fallback={null}>
        <AnimatePresence>{open && <ChatPanel key="adi-panel" chat={chat} onClose={close} />}</AnimatePresence>
      </Suspense>
    </>
  );
}
