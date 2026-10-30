import { useEffect, useRef, useState } from 'react';

/**
 * Reusable "Watch how it works" player: a modal that steps through a project.
 * - steps: [{ label, text, duration }] with duration in seconds.
 * - children: render prop that draws the scene for ({ step, progress }), where
 *   progress runs 0 → 1 through the current step.
 * With prefers-reduced-motion nothing autoplays: each step shows its end state
 * and the chips move between steps.
 */
export default function WalkthroughDialog({ title, subtitle, steps, note, onClose, children }) {
  const dialogRef = useRef(null);
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [pos, setPos] = useState({ step: 0, progress: reduced ? 1 : 0 });
  const [playing, setPlaying] = useState(!reduced);
  const posRef = useRef(pos);
  posRef.current = pos;

  useEffect(() => {
    const dialog = dialogRef.current;
    // No dialog.close() on cleanup: it fires the close event, which would shut
    // the player under StrictMode's double mount. Unmounting removes it anyway.
    if (!dialog.open) dialog.showModal();
    window.__lenis?.stop();
    return () => window.__lenis?.start();
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    let frame;
    let last = performance.now();
    const tick = (now) => {
      // Clamp so a backgrounded tab doesn't skip a whole step when it returns.
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const { step, progress } = posRef.current;
      const next = progress + dt / steps[step].duration;
      if (next < 1) {
        setPos({ step, progress: next });
      } else if (step < steps.length - 1) {
        setPos({ step: step + 1, progress: 0 });
      } else {
        setPos({ step, progress: 1 });
        setPlaying(false);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, steps]);

  const goTo = (step) => {
    setPos({ step, progress: reduced ? 1 : 0 });
    if (!reduced) setPlaying(true);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' && pos.step < steps.length - 1) goTo(pos.step + 1);
    if (e.key === 'ArrowLeft' && pos.step > 0) goTo(pos.step - 1);
  };

  const finished = pos.step === steps.length - 1 && pos.progress >= 1;

  return (
    <dialog
      ref={dialogRef}
      className="wt"
      aria-labelledby="wt-title"
      data-lenis-prevent
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => { if (e.target === dialogRef.current) onClose(); }}
    >
      <div className="wt__inner">
        <header className="wt__head">
          <div>
            <h3 id="wt-title" className="wt__title">{title}</h3>
            <p className="wt__subtitle">{subtitle}</p>
          </div>
          <button type="button" className="wt__icon-btn" aria-label="Close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="wt__bar">
          <ol className="wt__steps">
            {steps.map((s, i) => (
              <li key={s.label}>
                <button
                  type="button"
                  className={`wt__chip${i === pos.step ? ' is-active' : ''}${i < pos.step ? ' is-done' : ''}`}
                  aria-current={i === pos.step ? 'step' : undefined}
                  onClick={() => goTo(i)}
                >
                  <span aria-hidden="true">{i + 1}</span> {s.label}
                </button>
              </li>
            ))}
          </ol>
          {!reduced && (
            <button
              type="button"
              className="wt__control"
              onClick={() => (finished ? goTo(0) : setPlaying(!playing))}
            >
              {finished ? 'Replay' : playing ? 'Pause' : 'Play'}
            </button>
          )}
        </div>

        <div className="wt__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${(pos.step + pos.progress) / steps.length})` }} />
        </div>

        <p className="wt__text" aria-live={playing ? 'off' : 'polite'}>{steps[pos.step].text}</p>

        <div className="wt__scene">{children(pos)}</div>

        {note && <p className="wt__note">{note}</p>}
      </div>
    </dialog>
  );
}
