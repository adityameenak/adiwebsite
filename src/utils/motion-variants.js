/**
 * MOTION VARIANTS
 * Centralized Framer Motion animation variants for consistent choreography.
 *
 * Usage:
 * import { fadeUp, staggerContainer } from '@/utils/motion-variants';
 * <motion.div variants={fadeUp} initial="hidden" animate="visible" />
 */

// ============================================
// EASING CURVES
// ============================================

export const easing = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  snappy: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
};

// ============================================
// FADE VARIANTS
// ============================================

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easing.smooth },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing.smooth },
  },
};

export const fadeUpBlur = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: easing.smooth },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing.smooth },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easing.smooth },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easing.smooth },
  },
};

// ============================================
// SCALE VARIANTS
// ============================================

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easing.smooth },
  },
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing.smooth },
  },
};

// ============================================
// STAGGER CONTAINERS
// ============================================

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ============================================
// STAGGER ITEMS
// ============================================

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing.smooth },
  },
};

export const staggerItemBlur = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: easing.smooth },
  },
};

// ============================================
// LETTER/WORD ANIMATION
// ============================================

export const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: easing.smooth,
    },
  }),
};

export const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: easing.smooth,
    },
  }),
};

// ============================================
// CLIP PATH REVEALS
// ============================================

export const clipRevealLeft = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.8, ease: easing.smooth },
  },
};

export const clipRevealRight = {
  hidden: { clipPath: 'inset(0 0 0 100%)' },
  visible: {
    clipPath: 'inset(0 0 0 0%)',
    transition: { duration: 0.8, ease: easing.smooth },
  },
};

export const clipRevealUp = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.8, ease: easing.smooth },
  },
};

export const clipRevealDown = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.8, ease: easing.smooth },
  },
};

export const clipRevealCenter = {
  hidden: { clipPath: 'inset(50% 50% 50% 50%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.6, ease: easing.smooth },
  },
};

// ============================================
// HOVER VARIANTS
// ============================================

export const hoverLift = {
  scale: 1.02,
  y: -4,
  transition: { duration: 0.3, ease: easing.snappy },
};

export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3, ease: easing.snappy },
};

export const tapScale = {
  scale: 0.98,
  transition: { duration: 0.1 },
};

// ============================================
// IMAGE PARALLAX
// ============================================

export const imageParallax = {
  initial: { scale: 1.2, y: 0 },
  whileInView: {
    scale: 1,
    y: 0,
    transition: { duration: 1.2, ease: easing.smooth },
  },
};

// ============================================
// SECTION REVEALS
// ============================================

export const sectionReveal = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easing.smooth,
    },
  },
};

export const sectionRevealBlur = {
  hidden: { opacity: 0, y: 60, filter: 'blur(20px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: easing.smooth,
    },
  },
};

// ============================================
// CARD VARIANTS
// ============================================

export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: easing.snappy },
  },
  hover: {
    scale: 1.02,
    y: -8,
    transition: { duration: 0.3, ease: easing.snappy },
  },
};

export const cardImageHover = {
  rest: {
    scale: 1,
    transition: { duration: 0.4, ease: easing.smooth },
  },
  hover: {
    scale: 1.08,
    transition: { duration: 0.4, ease: easing.smooth },
  },
};

// ============================================
// MAGNETIC BUTTON SPRING
// ============================================

export const magneticSpring = {
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};

// ============================================
// PROGRESS/RAIL ANIMATIONS
// ============================================

export const progressFill = {
  hidden: { scaleY: 0, originY: 0 },
  visible: (progress) => ({
    scaleY: progress,
    transition: { duration: 0.3, ease: easing.snappy },
  }),
};

export const progressDot = {
  inactive: {
    scale: 1,
    backgroundColor: '#D4D4D4',
    transition: { duration: 0.2 },
  },
  active: {
    scale: 1.4,
    backgroundColor: '#7C3AED',
    transition: { duration: 0.3, ease: easing.bounce },
  },
};

// ============================================
// FILTER PILL ANIMATIONS
// ============================================

export const filterPillVariants = {
  inactive: {
    backgroundColor: '#F5F5F5',
    color: '#525252',
    scale: 1,
    transition: { duration: 0.2 },
  },
  active: {
    backgroundColor: '#7C3AED',
    color: '#FFFFFF',
    scale: 1.05,
    transition: { duration: 0.2, ease: easing.snappy },
  },
};

// ============================================
// GRID LAYOUT ANIMATIONS
// ============================================

export const gridLayout = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const gridItem = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: easing.smooth },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

// ============================================
// REDUCED MOTION VARIANTS
// ============================================

/**
 * Helper to create reduced motion safe variants
 * @param {object} variants - Motion variants
 * @param {boolean} reducedMotion - User preference
 * @returns {object} Safe variants
 */
export function getReducedMotionVariants(variants, reducedMotion) {
  if (!reducedMotion) return variants;

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };
}

/**
 * Create variants with reduced motion fallback
 */
export function createSafeVariants(normalVariants, reducedMotion) {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    };
  }
  return normalVariants;
}

export default {
  easing,
  fadeIn,
  fadeUp,
  fadeUpBlur,
  fadeDown,
  fadeLeft,
  fadeRight,
  scaleIn,
  scaleUp,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  staggerItem,
  staggerItemBlur,
  letterAnimation,
  wordAnimation,
  clipRevealLeft,
  clipRevealRight,
  clipRevealUp,
  clipRevealDown,
  clipRevealCenter,
  hoverLift,
  hoverScale,
  tapScale,
  imageParallax,
  sectionReveal,
  sectionRevealBlur,
  cardHover,
  cardImageHover,
  magneticSpring,
  progressFill,
  progressDot,
  filterPillVariants,
  gridLayout,
  gridItem,
  getReducedMotionVariants,
  createSafeVariants,
};
