import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Reveal - Scroll-triggered reveal component
 * Fades in with optional y-translate and subtle blur effect
 *
 * @param {React.ReactNode} children - Content to reveal
 * @param {number} delay - Animation delay in seconds
 * @param {number} duration - Animation duration in seconds
 * @param {string} direction - 'up' | 'down' | 'left' | 'right' | 'none'
 * @param {number} distance - Distance to translate in pixels
 * @param {boolean} blur - Whether to include blur-to-sharp effect
 * @param {string} className - Additional CSS classes
 * @param {boolean} once - Whether to only animate once
 * @param {number} threshold - Viewport threshold (0-1)
 * @param {string} as - HTML element to render as
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 30,
  blur = false,
  className = '',
  once = true,
  threshold = 0.2,
  as = 'div',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const reducedMotion = useReducedMotion();

  const getDirectionOffset = () => {
    if (reducedMotion) return { x: 0, y: 0 };
    switch (direction) {
      case 'up': return { x: 0, y: distance };
      case 'down': return { x: 0, y: -distance };
      case 'left': return { x: distance, y: 0 };
      case 'right': return { x: -distance, y: 0 };
      default: return { x: 0, y: 0 };
    }
  };

  const offset = getDirectionOffset();

  const variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      filter: blur && !reducedMotion ? 'blur(8px)' : 'blur(0px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: reducedMotion ? 0.3 : duration,
        delay: reducedMotion ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * RevealGroup - Container for staggered reveals
 * Children Reveal components will animate in sequence
 */
export function RevealGroup({
  children,
  staggerDelay = 0.1,
  className = '',
  as = 'div',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const reducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * RevealItem - Child component for RevealGroup
 * Inherits animation from parent RevealGroup
 */
export function RevealItem({
  children,
  direction = 'up',
  distance = 24,
  blur = false,
  className = '',
  as = 'div',
}) {
  const reducedMotion = useReducedMotion();

  const getDirectionOffset = () => {
    if (reducedMotion) return { x: 0, y: 0 };
    switch (direction) {
      case 'up': return { x: 0, y: distance };
      case 'down': return { x: 0, y: -distance };
      case 'left': return { x: distance, y: 0 };
      case 'right': return { x: -distance, y: 0 };
      default: return { x: 0, y: 0 };
    }
  };

  const offset = getDirectionOffset();

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      filter: blur && !reducedMotion ? 'blur(6px)' : 'blur(0px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: reducedMotion ? 0.2 : 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent variants={itemVariants} className={className}>
      {children}
    </MotionComponent>
  );
}
