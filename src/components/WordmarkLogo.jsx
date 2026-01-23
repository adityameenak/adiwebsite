import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useScrollTo } from '../hooks/useLenis';

/**
 * WordmarkLogo - Fixed top-left editorial wordmark
 *
 * Features:
 * - Bodoni Moda serif font (editorial vibe)
 * - Fixed position, high z-index
 * - Uppercase, increased tracking
 * - Subtle hover animation
 * - Click scrolls to top
 */
export default function WordmarkLogo() {
  const reducedMotion = useReducedMotion();
  const { scrollTo } = useScrollTo();

  const handleClick = (e) => {
    e.preventDefault();
    scrollTo('#home', { offset: 0, duration: 1.5 });
  };

  return (
    <motion.a
      href="#home"
      onClick={handleClick}
      className="fixed top-6 left-6 sm:top-8 sm:left-8 lg:top-10 lg:left-12 z-wordmark"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: reducedMotion ? 0.3 : 0.8,
        delay: reducedMotion ? 0 : 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.span
        className="font-display font-medium text-lg sm:text-xl lg:text-2xl
                   uppercase tracking-widest text-neutral-900
                   hover:text-accent transition-colors duration-300
                   select-none cursor-pointer"
        whileHover={reducedMotion ? {} : { letterSpacing: '0.2em' }}
        transition={{ duration: 0.3 }}
      >
        Adi M
      </motion.span>

      {/* Subtle underline on hover */}
      <motion.div
        className="h-px bg-accent origin-left mt-1"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </motion.a>
  );
}
