/**
 * DESIGN SYSTEM TOKENS
 * Premium Editorial Portfolio - "Semiconductor Sleek"
 *
 * Philosophy: Disciplined spacing, bold typography, strategic restraint.
 * Accent purple used sparingly as signature color.
 */

// ============================================
// TYPOGRAPHY
// ============================================

export const fonts = {
  // Display/Logo: Bodoni Moda (editorial serif)
  display: '"Bodoni Moda", "Playfair Display", Georgia, serif',
  // Headlines: DM Sans (modern geometric sans)
  heading: '"DM Sans", "Inter", system-ui, sans-serif',
  // Body: Inter (clean, readable)
  body: '"Inter", system-ui, -apple-system, sans-serif',
  // Mono: For tags/code
  mono: '"JetBrains Mono", "SF Mono", Consolas, monospace',
};

// Type Scale (1.25 Major Third)
// Base: 16px
export const typeScale = {
  xs: '0.75rem',      // 12px - tags, captions
  sm: '0.875rem',     // 14px - small body, metadata
  base: '1rem',       // 16px - body text
  lg: '1.125rem',     // 18px - lead text
  xl: '1.25rem',      // 20px - card titles
  '2xl': '1.5rem',    // 24px - section subtitles
  '3xl': '2rem',      // 32px - section headers
  '4xl': '2.5rem',    // 40px - hero subtitle
  '5xl': '3rem',      // 48px - hero headline (mobile)
  '6xl': '3.75rem',   // 60px - hero headline (tablet)
  '7xl': '4.5rem',    // 72px - hero headline (desktop)
  '8xl': '6rem',      // 96px - hero headline (large)
  '9xl': '8rem',      // 128px - wordmark display
};

// Line Heights
export const lineHeights = {
  none: '1',
  tight: '1.1',       // Headlines
  snug: '1.25',       // Subheads
  normal: '1.5',      // Body small
  relaxed: '1.625',   // Body large
  loose: '1.75',      // Long-form reading
};

// Letter Spacing
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.15em',   // Wordmark, all-caps
  ultra: '0.25em',    // Section labels
};

// Font Weights
export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 900,
};

// ============================================
// COLORS
// ============================================

export const colors = {
  // Backgrounds
  bg: {
    primary: '#FFFFFF',
    secondary: '#FAFAFA',
    tertiary: '#F5F5F5',
    dark: '#0A0A0A',
    darkSecondary: '#141414',
  },

  // Text
  text: {
    primary: '#0A0A0A',
    secondary: '#525252',
    tertiary: '#737373',
    muted: '#A3A3A3',
    inverse: '#FAFAFA',
  },

  // Accent (Purple - use sparingly)
  accent: {
    DEFAULT: '#7C3AED',   // Primary purple
    light: '#A78BFA',     // Hover/subtle
    dark: '#5B21B6',      // Active/pressed
    muted: '#DDD6FE',     // Backgrounds
    subtle: '#F5F3FF',    // Very subtle backgrounds
  },

  // Borders
  border: {
    light: '#E5E5E5',
    medium: '#D4D4D4',
    dark: '#404040',
    accent: '#7C3AED',
  },

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

// ============================================
// SPACING
// ============================================

// 4px base unit spacing scale
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',    // 2px
  1: '0.25rem',       // 4px
  1.5: '0.375rem',    // 6px
  2: '0.5rem',        // 8px
  2.5: '0.625rem',    // 10px
  3: '0.75rem',       // 12px
  4: '1rem',          // 16px
  5: '1.25rem',       // 20px
  6: '1.5rem',        // 24px
  8: '2rem',          // 32px
  10: '2.5rem',       // 40px
  12: '3rem',         // 48px
  16: '4rem',         // 64px
  20: '5rem',         // 80px
  24: '6rem',         // 96px
  32: '8rem',         // 128px
  40: '10rem',        // 160px
  48: '12rem',        // 192px
  64: '16rem',        // 256px
};

// Section padding (vertical)
export const sectionPadding = {
  sm: '3rem',         // 48px
  md: '5rem',         // 80px
  lg: '8rem',         // 128px
  xl: '10rem',        // 160px
};

// Container max-widths
export const containers = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
  '3xl': '1600px',
};

// ============================================
// LAYOUT
// ============================================

export const layout = {
  // Grid
  gridCols: {
    mobile: 4,
    tablet: 8,
    desktop: 12,
  },
  gridGap: {
    mobile: '1rem',
    tablet: '1.5rem',
    desktop: '2rem',
  },

  // Margins
  containerPadding: {
    mobile: '1.5rem',   // 24px
    tablet: '3rem',     // 48px
    desktop: '4rem',    // 64px
  },
};

// ============================================
// RADII & BORDERS
// ============================================

export const radii = {
  none: '0',
  sm: '0.25rem',      // 4px - tags, small elements
  md: '0.5rem',       // 8px - buttons, inputs
  lg: '0.75rem',      // 12px - cards
  xl: '1rem',         // 16px - large cards
  '2xl': '1.5rem',    // 24px - panels
  full: '9999px',     // Pills
};

export const borders = {
  thin: '1px solid',
  medium: '2px solid',
  thick: '3px solid',
};

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  // Accent glow
  glow: '0 0 40px -10px rgb(124 58 237 / 0.3)',
  glowLg: '0 0 60px -15px rgb(124 58 237 / 0.4)',
};

// ============================================
// MOTION / ANIMATION
// ============================================

// Easing curves (match Framer Motion)
export const easing = {
  // Default smooth
  smooth: [0.25, 0.46, 0.45, 0.94],
  // Snappy for micro-interactions
  snappy: [0.4, 0, 0.2, 1],
  // Bounce for playful elements
  bounce: [0.68, -0.55, 0.265, 1.55],
  // Slow start, fast end
  easeOut: [0, 0, 0.2, 1],
  // Fast start, slow end
  easeIn: [0.4, 0, 1, 1],
  // Linear for looping animations
  linear: [0, 0, 1, 1],
};

// Duration tokens
export const durations = {
  instant: 0,
  fast: 0.15,         // Micro-interactions, hovers
  normal: 0.3,        // Standard transitions
  slow: 0.5,          // Emphasis transitions
  slower: 0.7,        // Section reveals
  slowest: 1,         // Hero animations
};

// Stagger delays
export const stagger = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
};

// Spring configs for Framer Motion
export const springs = {
  // Snappy response
  snappy: { stiffness: 400, damping: 30 },
  // Smooth, natural
  smooth: { stiffness: 100, damping: 20 },
  // Bouncy
  bouncy: { stiffness: 300, damping: 10 },
  // Slow, elegant
  elegant: { stiffness: 50, damping: 20 },
};

// ============================================
// Z-INDEX SCALE
// ============================================

export const zIndex = {
  behind: -1,
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  tooltip: 600,
  wordmark: 1000,
  progressRail: 999,
};

// ============================================
// BREAKPOINTS
// ============================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============================================
// ACCENT COLOR USAGE RULES
// ============================================

/**
 * PURPLE ACCENT USAGE GUIDELINES:
 *
 * ✅ DO USE FOR:
 * - Primary CTA buttons (filled)
 * - Active/current state indicators
 * - Progress bars & rails
 * - Wordmark hover state
 * - Links on hover
 * - Tag accents (border or small dot)
 * - Focus rings
 * - Small decorative elements (lines, dots)
 *
 * ❌ DON'T USE FOR:
 * - Large background areas
 * - All headings
 * - Body text
 * - Multiple elements competing for attention
 * - Borders on all cards
 *
 * RULE OF THUMB:
 * If more than ~5-10% of visible screen is purple,
 * it's probably too much.
 */

export default {
  fonts,
  typeScale,
  lineHeights,
  letterSpacing,
  fontWeights,
  colors,
  spacing,
  sectionPadding,
  containers,
  layout,
  radii,
  borders,
  shadows,
  easing,
  durations,
  stagger,
  springs,
  zIndex,
  breakpoints,
};
