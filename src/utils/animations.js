// Reusable Framer Motion animation variants
// All animations respect prefers-reduced-motion via useReducedMotion hook

export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

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

export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export const cardHoverSubtle = {
  rest: {
    y: 0,
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
  },
  hover: {
    y: -4,
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
};

// Reduced motion variants - only opacity, no transforms
export const fadeInUpReduced = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

export const cardHoverReduced = {
  rest: {},
  hover: {
    transition: {
      duration: 0.2,
    },
  },
};

// Nav link animation
export const navLinkHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
};
