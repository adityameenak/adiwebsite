import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * TechGrid - Subtle animated grid pattern for tech aesthetic
 * Creates a semiconductor/circuit board inspired background
 */
export function TechGrid({
  className = '',
  opacity = 0.03,
  animated = true,
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Animated scan line effect */}
      {animated && !reducedMotion && (
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
          initial={{ top: '-10%' }}
          animate={{ top: '110%' }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </div>
  );
}

/**
 * GlowOrb - Soft gradient glow accent
 * Creates a subtle, animated glow effect
 */
export function GlowOrb({
  color = 'purple',
  size = 400,
  intensity = 0.15,
  className = '',
  animated = true,
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });

  const colorMap = {
    purple: 'from-purple-500/20 via-purple-400/10 to-transparent',
    blue: 'from-blue-500/20 via-blue-400/10 to-transparent',
    cyan: 'from-cyan-500/20 via-cyan-400/10 to-transparent',
    pink: 'from-pink-500/20 via-pink-400/10 to-transparent',
  };

  const gradientClass = colorMap[color] || colorMap.purple;

  return (
    <motion.div
      ref={ref}
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        y: animated && !reducedMotion ? smoothY : 0,
      }}
    >
      <div
        className={`w-full h-full rounded-full bg-gradient-radial ${gradientClass} blur-3xl`}
        style={{ opacity: intensity }}
      />
    </motion.div>
  );
}

/**
 * CircuitLines - Decorative circuit-like lines
 */
export function CircuitLines({ className = '' }) {
  const reducedMotion = useReducedMotion();

  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      viewBox="0 0 200 200"
      fill="none"
    >
      <motion.path
        d="M0 100 H80 V50 H120 V100 H200"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0 : 2, ease: 'easeOut' }}
      />
      <motion.circle
        cx="80"
        cy="100"
        r="3"
        fill="currentColor"
        fillOpacity="0.2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: reducedMotion ? 0 : 0.5 }}
      />
      <motion.circle
        cx="120"
        cy="50"
        r="3"
        fill="currentColor"
        fillOpacity="0.2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: reducedMotion ? 0 : 1 }}
      />
    </svg>
  );
}
