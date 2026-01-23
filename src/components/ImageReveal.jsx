import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * ImageReveal - Hover-triggered image reveal with clip-path animation
 *
 * Features:
 * - Smooth clip-path reveal from edge
 * - Optional parallax movement
 * - Respects reduced motion
 * - Lightweight (no WebGL)
 */
export default function ImageReveal({
  src,
  alt = '',
  className = '',
  revealDirection = 'left', // 'left' | 'right' | 'top' | 'bottom' | 'center'
  aspectRatio = '4/3',
}) {
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  // Clip path values for different directions
  const clipPaths = {
    left: {
      hidden: 'inset(0 100% 0 0)',
      visible: 'inset(0 0% 0 0)',
    },
    right: {
      hidden: 'inset(0 0 0 100%)',
      visible: 'inset(0 0 0 0%)',
    },
    top: {
      hidden: 'inset(0 0 100% 0)',
      visible: 'inset(0 0 0% 0)',
    },
    bottom: {
      hidden: 'inset(100% 0 0 0)',
      visible: 'inset(0% 0 0 0)',
    },
    center: {
      hidden: 'inset(50% 50% 50% 50%)',
      visible: 'inset(0% 0% 0% 0%)',
    },
  };

  const currentClipPath = clipPaths[revealDirection] || clipPaths.left;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Placeholder/background */}
      <div className="absolute inset-0 bg-neutral-100" />

      {/* Image with clip-path reveal */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: currentClipPath.hidden }}
        animate={{
          clipPath: isHovered ? currentClipPath.visible : currentClipPath.hidden,
        }}
        transition={{
          duration: reducedMotion ? 0 : 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{
            scale: isHovered && !reducedMotion ? 1 : 1.1,
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
}

/**
 * ImageRevealOnScroll - Reveals image when entering viewport
 */
export function ImageRevealOnScroll({
  src,
  alt = '',
  className = '',
  revealDirection = 'bottom',
  aspectRatio = '4/3',
  delay = 0,
}) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  const clipPaths = {
    left: {
      hidden: 'inset(0 100% 0 0)',
      visible: 'inset(0 0% 0 0)',
    },
    right: {
      hidden: 'inset(0 0 0 100%)',
      visible: 'inset(0 0 0 0%)',
    },
    top: {
      hidden: 'inset(0 0 100% 0)',
      visible: 'inset(0 0 0% 0)',
    },
    bottom: {
      hidden: 'inset(100% 0 0 0)',
      visible: 'inset(0% 0 0 0)',
    },
  };

  const currentClipPath = clipPaths[revealDirection] || clipPaths.bottom;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <div className="absolute inset-0 bg-neutral-100" />

      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: currentClipPath.hidden }}
        whileInView={{ clipPath: currentClipPath.visible }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: reducedMotion ? 0.3 : 0.8,
          delay: reducedMotion ? 0 : delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: reducedMotion ? 0.3 : 1.2,
            delay: reducedMotion ? 0 : delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </motion.div>
    </div>
  );
}

/**
 * HoverImagePreview - Shows image preview on hover (for project cards)
 */
export function HoverImagePreview({
  src,
  alt = '',
  isHovered = false,
  className = '',
}) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isHovered && src && (
        <motion.div
          className={`absolute inset-0 overflow-hidden ${className}`}
          initial={{
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
          }}
          animate={{
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
          }}
          exit={{
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
          }}
          transition={{
            duration: reducedMotion ? 0.15 : 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <motion.img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-neutral-900/20 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
