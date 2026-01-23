import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Parallax - Scroll-linked parallax effect
 * Elements move at different speeds relative to scroll
 *
 * @param {React.ReactNode} children - Content to apply parallax to
 * @param {number} speed - Parallax speed multiplier (-1 to 1, negative = opposite direction)
 * @param {string} direction - 'vertical' | 'horizontal'
 * @param {number} offset - Base offset range in pixels
 * @param {string} className - Additional CSS classes
 */
export function Parallax({
  children,
  speed = 0.5,
  direction = 'vertical',
  offset = 50,
  className = '',
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate transform range based on speed and offset
  const range = offset * speed;
  const rawTransform = useTransform(scrollYProgress, [0, 1], [range, -range]);

  // Smooth the transform with a spring
  const smoothTransform = useSpring(rawTransform, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Disable parallax if reduced motion is preferred
  const transform = reducedMotion ? 0 : smoothTransform;

  const style = direction === 'vertical'
    ? { y: transform }
    : { x: transform };

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * ParallaxLayer - Absolute positioned parallax layer for backgrounds/accents
 */
export function ParallaxLayer({
  children,
  speed = 0.3,
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40 * speed, -40 * speed]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 25 });

  return (
    <motion.div
      ref={ref}
      style={{
        y: reducedMotion ? 0 : smoothY,
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollScale - Scale element based on scroll position
 */
export function ScrollScale({
  children,
  scaleRange = [0.95, 1],
  className = '',
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ scale: reducedMotion ? 1 : smoothScale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollOpacity - Fade element based on scroll position
 */
export function ScrollOpacity({
  children,
  opacityRange = [0, 1],
  className = '',
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [opacityRange[0], opacityRange[1], opacityRange[1]]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
