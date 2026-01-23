import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * ProgressRail - Elegant side progress indicator
 *
 * Features:
 * - Uses IntersectionObserver to detect active section
 * - Minimal dots with active state highlight
 * - Fixed position on right side
 * - Smooth transitions between sections
 * - Hidden on mobile
 */

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];

export default function ProgressRail() {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const observerRef = useRef(null);

  useEffect(() => {
    // Show rail after initial scroll
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Create intersection observer for section detection
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Center of viewport
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.4 }}
          className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-progress
                     hidden lg:flex flex-col items-center gap-4"
          role="navigation"
          aria-label="Page sections"
        >
          {/* Background track */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-neutral-200" />

          {/* Progress fill */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-px bg-accent origin-top"
            style={{
              height: `${(SECTIONS.findIndex((s) => s.id === activeSection) + 1) * (100 / SECTIONS.length)}%`,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Section dots */}
          {SECTIONS.map(({ id, label }) => {
            const isActive = activeSection === id;

            return (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className="relative group flex items-center focus:outline-none"
                aria-label={`Go to ${label}`}
                aria-current={isActive ? 'true' : undefined}
              >
                {/* Dot */}
                <motion.div
                  className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-accent border-accent scale-125'
                      : 'bg-white border-neutral-300 group-hover:border-accent'
                  }`}
                  whileHover={reducedMotion ? {} : { scale: 1.3 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Label tooltip */}
                <motion.span
                  className="absolute right-6 px-2 py-1 text-xs font-medium
                             bg-neutral-900 text-white rounded whitespace-nowrap
                             opacity-0 group-hover:opacity-100 pointer-events-none"
                  initial={{ opacity: 0, x: 5 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {label}
                </motion.span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

/**
 * Minimal top progress bar (alternative)
 */
export function TopProgressBar() {
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(Math.min(scrolled, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-neutral-100 z-50">
      <motion.div
        className="h-full bg-accent origin-left"
        style={{ width: `${progress}%` }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.1 }}
      />
    </div>
  );
}
