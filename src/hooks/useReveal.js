import { useEffect, useRef } from 'react';

/**
 * Adds `is-in` to the element once it scrolls into view. Children marked
 * `data-reveal` (with an optional `--i` stagger index) rise in via CSS.
 * One observer per section, no per-frame work, and nothing is hidden unless
 * the script has run (the `js-reveal` class is set in main.jsx).
 */
export function useReveal({ threshold = 0.12 } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-in');
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('is-in');
        io.disconnect();
      }
    }, { threshold, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

export default useReveal;
