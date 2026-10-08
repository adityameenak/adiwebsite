import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HEADER_OFFSET = -80;   // sticky header height + breathing room

function scrollToElement(el) {
  const lenis = window.__lenis;
  if (lenis) {
    // A Lenis instance created by a just-mounted page hasn't measured the
    // document yet and would clamp the scroll to 0, so re-measure first.
    lenis.resize?.();
    lenis.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.1 });
  }
  else {
    const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
    window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
}

// Waits for a section to mount after a route change (pages fade in).
function whenElement(id, cb, timeoutMs = 2000) {
  const start = performance.now();
  const tick = () => {
    const el = document.getElementById(id);
    if (el) return cb(el);
    if (performance.now() - start < timeoutMs) requestAnimationFrame(tick);
  };
  tick();
}

/**
 * Opens a catalog action: external links/files in a new tab, mailto in place,
 * and site sections by smooth-scrolling (same page) or navigating then scrolling.
 */
export function useSiteNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(({ href, route, section }) => {
    if (href) {
      if (href.startsWith('mailto:')) window.location.href = href;
      else window.open(href, '_blank', 'noopener,noreferrer');
      return { navigated: false };
    }

    const onPage = section && document.getElementById(section);
    if (onPage) {
      scrollToElement(onPage);
      return { navigated: true };
    }

    const target = route || '/';
    if (location.pathname !== target) navigate(target);
    if (section) {
      // Let the new page's Lenis instance initialise before scrolling.
      setTimeout(() => whenElement(section, scrollToElement), 60);
    } else {
      window.scrollTo(0, 0);
    }
    return { navigated: true };
  }, [navigate, location.pathname]);
}
