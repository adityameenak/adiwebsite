import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const HOVER_SELECTOR = 'a, button, [role="button"], [role="tab"], .hover-target';

/**
 * Global ambient effects, mounted once at the router root:
 *  - 2px reading-progress bar along the top edge
 *  - soft maroon glow that follows the pointer
 *  - dot + ring cursor that swells over interactive elements (fine pointers only)
 *
 * Everything is driven by CSS variables / direct style writes inside a single
 * rAF loop, so React never re-renders on mouse move or scroll.
 */
export default function SiteEffects() {
  const reducedMotion = useReducedMotion();
  const progressRef = useRef(null);
  const glowRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const root = document.documentElement;
    if (finePointer) root.classList.add('has-custom-cursor');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight * 0.3 };
    const ring = { ...mouse };
    let visible = false;
    let frame = 0;

    const setProgress = () => {
      const max = root.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${pct})`;
    };

    const tick = () => {
      // Ring trails the dot slightly; reduced motion snaps it.
      const ease = reducedMotion ? 1 : 0.2;
      ring.x += (mouse.x - ring.x) * ease;
      ring.y += (mouse.y - ring.y) * ease;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (glowRef.current) {
        glowRef.current.style.setProperty('--mx', `${e.clientX}px`);
        glowRef.current.style.setProperty('--my', `${e.clientY}px`);
      }
      if (!visible) {
        visible = true;
        ring.x = mouse.x;
        ring.y = mouse.y;
        root.classList.add('cursor-visible');
      }
      root.classList.toggle('cursor-hovering', !!e.target.closest?.(HOVER_SELECTOR));
    };
    const onLeave = () => {
      visible = false;
      root.classList.remove('cursor-visible');
    };
    const onDown = () => root.classList.add('cursor-down');
    const onUp = () => root.classList.remove('cursor-down');

    setProgress();
    window.addEventListener('scroll', setProgress, { passive: true });
    window.addEventListener('resize', setProgress);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    if (finePointer) frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', setProgress);
      window.removeEventListener('resize', setProgress);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      root.classList.remove('has-custom-cursor', 'cursor-visible', 'cursor-hovering', 'cursor-down');
    };
  }, [reducedMotion]);

  return (
    <>
      <div ref={progressRef} className="fx-progress" aria-hidden="true" />
      <div ref={glowRef} className="fx-glow" aria-hidden="true" />
      <div ref={ringRef} className="fx-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="fx-cursor-dot" aria-hidden="true" />
    </>
  );
}
