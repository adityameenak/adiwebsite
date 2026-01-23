import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * ScrollProgress - Top progress bar showing page scroll position
 * Thin, minimal design that tracks scroll progress
 */
export function ScrollProgress({
  color = 'bg-purple-600',
  height = 'h-0.5',
  className = '',
}) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Don't render if reduced motion is preferred
  if (reducedMotion) return null;

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 ${height} ${color} origin-left z-[100] ${className}`}
      style={{ scaleX }}
    />
  );
}

/**
 * SectionProgress - Progress indicator for a specific section
 * Shows how far through a section the user has scrolled
 */
export function SectionProgress({
  sectionRef,
  color = 'bg-purple-600',
  orientation = 'vertical',
  className = '',
}) {
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  if (reducedMotion) return null;

  const isVertical = orientation === 'vertical';

  return (
    <motion.div
      className={`${color} ${isVertical ? 'w-0.5 origin-top' : 'h-0.5 origin-left'} ${className}`}
      style={isVertical ? { scaleY: scaleProgress } : { scaleX: scaleProgress }}
    />
  );
}
