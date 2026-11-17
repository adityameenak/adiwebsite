import { useCallback, useEffect, useRef, useState } from 'react';

const FIRST = 'Aditya';
const LAST = 'Meenakshisundaram';
const META = 'Chemical Engineering · Texas A&M';
const SEEN_KEY = 'introSeen';

const CHAR_MS = 52;      // base typing speed
const START_MS = 280;    // pause before the first letter
const HOLD_MS = 900;     // time on the finished name (meta line + bar fill)
const EXIT_MS = 760;     // panel lift
const SKIP_EXIT_MS = 420;

function shouldPlay() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (sessionStorage.getItem(SEEN_KEY)) return false;
  } catch { /* storage unavailable: play once for this page load */ }
  return true;
}

/**
 * Opening title card: the name types itself in, a maroon bar fills under it,
 * then the card lifts away to reveal the page. Plays once per browser session,
 * never with reduced motion, and any click, tap, key or scroll skips it.
 */
export default function IntroOverlay() {
  const [active, setActive] = useState(shouldPlay);
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState('typing'); // typing → hold → exit
  const [fast, setFast] = useState(false);
  const timers = useRef([]);
  const total = FIRST.length + LAST.length;

  const later = (fn, ms) => { timers.current.push(setTimeout(fn, ms)); };

  const finish = useCallback(() => {
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* ignore */ }
    setActive(false);
  }, []);

  const exiting = useRef(false);
  const exit = useCallback((skipped) => {
    if (exiting.current) return;
    exiting.current = true;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setFast(skipped);
    setPhase('exit');
    later(finish, skipped ? SKIP_EXIT_MS : EXIT_MS);
  }, [finish]);

  // Typing timeline, with a little human unevenness between keystrokes.
  useEffect(() => {
    if (!active) return undefined;
    let t = START_MS;
    for (let i = 1; i <= total; i += 1) {
      const pause = i === FIRST.length + 1 ? 180 : 0; // breath between first and last name
      t += CHAR_MS + pause + Math.round((Math.sin(i * 12.9898) * 0.5 + 0.5) * 34 - 12);
      later(() => setTyped(i), t);
    }
    later(() => setPhase('hold'), t + 120);
    later(() => exit(false), t + 120 + HOLD_MS);
    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Any intent to get on with the page skips the intro.
  useEffect(() => {
    if (!active) return undefined;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const skip = () => exit(true);
    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);
    window.addEventListener('wheel', skip, { passive: true });
    window.addEventListener('touchmove', skip, { passive: true });
    return () => {
      root.style.overflow = prevOverflow;
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchmove', skip);
    };
  }, [active, exit]);

  if (!active) return null;

  const first = FIRST.slice(0, Math.min(typed, FIRST.length));
  const last = LAST.slice(0, Math.max(0, typed - FIRST.length));
  const onLast = typed > FIRST.length;
  const done = typed >= total;

  return (
    <div
      className={`intro-card is-${phase}${fast ? ' is-fast' : ''}`}
      style={{ '--exit-ms': `${fast ? SKIP_EXIT_MS : EXIT_MS}ms` }}
    >
      <div className="intro-card__inner frame">
        <p className="intro-card__name" aria-hidden="true">
          <span className="intro-card__line">
            {first}
            {!onLast && <span className={`intro-card__caret${done ? ' is-idle' : ''}`} />}
          </span>
          <span className="intro-card__line">
            {last}
            {onLast && <span className={`intro-card__caret${done ? ' is-idle' : ''}`} />}
            {!onLast && ' '}
          </span>
        </p>
        <p className="intro-card__meta" aria-hidden="true">{META}</p>
        <span className="intro-card__bar" aria-hidden="true"><span /></span>
      </div>

      <button type="button" className="intro-card__skip" onClick={() => exit(true)}>
        Skip intro <span aria-hidden="true">· click anywhere</span>
      </button>
    </div>
  );
}
