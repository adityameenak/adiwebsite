import { useEffect, useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// ─── Tuning knobs ─────────────────────────────────────────────────────────────
// Colors mirror tailwind.config.js tokens (ink #0a0a0a, brand.ochre #e8b94a)
// plus the restrained violet accent.
const INK_RGB = '10, 10, 10';
const ACCENT_RGB = '139, 92, 246';   // #8b5cf6
const WARM_RGB = '232, 185, 74';     // brand.ochre

const GRID_DOT_OPACITY = 0.09;       // die-grid dots
const GRID_LINE_OPACITY = 0.035;     // faint reticle lines every GRID_MAJOR cells
const GRID_CELL = 24;                // px between dots
const GRID_MAJOR = 5;                // dots per reticle line

const ACCENT_GLOW_OPACITY = 0.2;     // purple glow near the portrait
const WARM_GLOW_OPACITY = 0.09;      // warm glow, lower-left

const DRIFT_DURATION = 18;           // seconds per ambient sweep (x); y uses 0.8x
const DRIFT_DISTANCE = 22;           // px the glows wander

const PARALLAX_GLOW = 12;            // max px the accent glow follows the cursor
const PARALLAX_WARM = 8;             // max px (opposite direction) for the warm glow
const PARALLAX_GRID = 4;             // max px for the grid

// Fade everything out before the hero's bottom edge.
const FADE_MASK = 'linear-gradient(to bottom, #000 0%, #000 55%, transparent 94%)';

// Cursor tracking only on large screens with a precise, hovering pointer.
const PARALLAX_QUERY = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';

function useParallaxAllowed() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(PARALLAX_QUERY);
    const update = () => setAllowed(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return allowed;
}

function drift(reducedMotion, scale = 1, phase = 1) {
  if (reducedMotion) return { animate: { x: 0, y: 0 }, transition: { duration: 0 } };
  const d = DRIFT_DISTANCE * scale;
  const loop = { repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' };
  return {
    initial: { x: -d * phase, y: d * 0.6 * phase },
    animate: { x: d * phase, y: -d * 0.6 * phase },
    transition: {
      x: { ...loop, duration: DRIFT_DURATION },
      y: { ...loop, duration: DRIFT_DURATION * 0.8 },
    },
  };
}

/**
 * Decorative hero backdrop: faint die-grid, violet glow behind the portrait,
 * a weaker warm glow lower-left. Slow ambient drift + light cursor parallax.
 *
 * pointerX / pointerY: smoothed MotionValues in [-1, 1] from the hero.
 */
export default function HeroBackground({ pointerX, pointerY }) {
  const reducedMotion = useReducedMotion();
  const parallax = useParallaxAllowed() && !reducedMotion;

  const glowX = useTransform(pointerX, [-1, 1], [-PARALLAX_GLOW, PARALLAX_GLOW]);
  const glowY = useTransform(pointerY, [-1, 1], [-PARALLAX_GLOW, PARALLAX_GLOW]);
  const warmX = useTransform(pointerX, [-1, 1], [PARALLAX_WARM, -PARALLAX_WARM]);
  const warmY = useTransform(pointerY, [-1, 1], [PARALLAX_WARM, -PARALLAX_WARM]);
  const gridX = useTransform(pointerX, [-1, 1], [-PARALLAX_GRID, PARALLAX_GRID]);
  const gridY = useTransform(pointerY, [-1, 1], [-PARALLAX_GRID, PARALLAX_GRID]);

  const major = GRID_CELL * GRID_MAJOR;
  const gridStyle = {
    position: 'absolute',
    inset: `-${GRID_CELL}px`,
    backgroundImage: [
      `radial-gradient(circle at center, rgba(${INK_RGB}, ${GRID_DOT_OPACITY}) 1px, transparent 1.5px)`,
      `linear-gradient(to right, rgba(${INK_RGB}, ${GRID_LINE_OPACITY}) 1px, transparent 1px)`,
      `linear-gradient(to bottom, rgba(${INK_RGB}, ${GRID_LINE_OPACITY}) 1px, transparent 1px)`,
    ].join(', '),
    backgroundSize: `${GRID_CELL}px ${GRID_CELL}px, ${major}px ${major}px, ${major}px ${major}px`,
    backgroundPosition: `0 0, ${GRID_CELL / 2}px ${GRID_CELL / 2}px, ${GRID_CELL / 2}px ${GRID_CELL / 2}px`,
    x: parallax ? gridX : 0,
    y: parallax ? gridY : 0,
  };

  const glow = (rgb, opacity) => ({
    width: '100%',
    height: '100%',
    borderRadius: '9999px',
    background: `radial-gradient(closest-side, rgba(${rgb}, ${opacity}), rgba(${rgb}, ${opacity * 0.35}) 55%, transparent 100%)`,
    willChange: reducedMotion ? 'auto' : 'transform',
  });

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        maskImage: FADE_MASK,
        WebkitMaskImage: FADE_MASK,
      }}
    >
      <motion.div style={gridStyle} />

      {/* Violet glow — right side, behind the portrait */}
      <motion.div
        style={{
          position: 'absolute',
          top: '8%',
          right: '-8%',
          width: 'min(880px, 95vw)',
          aspectRatio: '1 / 1',
          x: parallax ? glowX : 0,
          y: parallax ? glowY : 0,
        }}
      >
        <motion.div style={glow(ACCENT_RGB, ACCENT_GLOW_OPACITY)} {...drift(reducedMotion, 1, 1)} />
      </motion.div>

      {/* Warm glow — lower-left, much weaker */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-18%',
          left: '-10%',
          width: 'min(620px, 80vw)',
          aspectRatio: '1 / 1',
          x: parallax ? warmX : 0,
          y: parallax ? warmY : 0,
        }}
      >
        <motion.div style={glow(WARM_RGB, WARM_GLOW_OPACITY)} {...drift(reducedMotion, 0.8, -1)} />
      </motion.div>
    </div>
  );
}
