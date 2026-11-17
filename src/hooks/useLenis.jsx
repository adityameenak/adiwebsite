/**
 * Scrolling is native. The site used Lenis smooth scrolling, which eased every
 * wheel tick over 1.2s and made the page feel slow, so it was removed. These
 * exports stay so existing pages keep compiling; scrollTo uses the browser's
 * own smooth scrolling (instant with reduced motion).
 */

export function LenisProvider({ children }) {
  return children;
}

export function useLenis() {
  return null;
}

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useScrollTo() {
  const scrollTo = (target, { offset = 0 } = {}) => {
    const behavior = reduce() ? 'auto' : 'smooth';
    if (typeof target === 'number') {
      window.scrollTo({ top: target + offset, behavior });
      return;
    }
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior });
  };
  return { scrollTo };
}

export function useLenisControl() {
  return { stop: () => {}, start: () => {} };
}

export default LenisProvider;
