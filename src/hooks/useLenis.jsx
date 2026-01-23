import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';

/**
 * Lenis Smooth Scroll Context & Provider
 *
 * Provides smooth scrolling via Lenis library with:
 * - Automatic RAF loop management
 * - Reduced motion support
 * - Scroll-to utilities
 * - Framer Motion scroll sync
 */

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const reducedMotion = useReducedMotion();
  const rafRef = useRef(null);

  useEffect(() => {
    // Skip smooth scroll if user prefers reduced motion
    if (reducedMotion) {
      return;
    }

    // Initialize Lenis
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisInstance);

    // Animation frame loop
    function raf(time) {
      lenisInstance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisInstance.destroy();
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

/**
 * Hook to access Lenis instance
 * @returns {Lenis | null} Lenis instance or null if not initialized
 */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Hook for scroll-to functionality
 * @returns {{ scrollTo: Function }} Scroll utilities
 */
export function useScrollTo() {
  const lenis = useLenis();

  const scrollTo = (target, options = {}) => {
    const defaultOptions = {
      offset: 0,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      immediate: false,
      lock: false,
      ...options,
    };

    if (lenis) {
      lenis.scrollTo(target, defaultOptions);
    } else {
      // Fallback for native scroll
      const element = typeof target === 'string'
        ? document.querySelector(target)
        : target;

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    }
  };

  return { scrollTo };
}

/**
 * Hook to stop/start Lenis (useful for modals)
 * @returns {{ stop: Function, start: Function }}
 */
export function useLenisControl() {
  const lenis = useLenis();

  return {
    stop: () => lenis?.stop(),
    start: () => lenis?.start(),
  };
}

export default LenisProvider;
