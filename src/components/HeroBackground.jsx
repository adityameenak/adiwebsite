import { useEffect, useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// ─── Palette (mirrors tailwind.config.js tokens) ──────────────────────────────
const CANVAS_RGB = '255, 250, 240';   // canvas #fffaf0
const INK_RGB = '10, 10, 10';         // ink #0a0a0a
const ACCENT_RGB = '139, 92, 246';    // accent purple #8b5cf6
const LAVENDER_RGB = '167, 139, 250'; // muted lavender between accent and brand.lavender
const WARM_RGB = '232, 185, 74';      // brand.ochre #e8b94a

// ─── Orbs ─────────────────────────────────────────────────────────────────────
// size/blur in px (desktop), move = half-range in px, duration in seconds.
// Each axis loops on its own duration so the path never repeats sharply.
const ORBS = [
  {
    key: 'purple',
    rgb: ACCENT_RGB,
    opacity: 0.3,
    size: 750,
    blur: 100,
    position: { top: '-20%', right: '-10%' },
    move: { x: 60, y: 45 },          // ~120px sweep
    scale: [0.94, 1.1],
    rotate: [-10, 10],
    duration: { x: 16, y: 13, scale: 19, rotate: 22 },
  },
  {
    key: 'lavender',
    rgb: LAVENDER_RGB,
    opacity: 0.2,
    size: 600,
    blur: 90,
    position: { top: '34%', left: '28%' },
    move: { x: 42, y: 30 },          // ~84px sweep
    scale: [0.92, 1.08],
    rotate: [8, -8],
    duration: { x: 20, y: 15, scale: 17, rotate: 21 },
  },
  {
    key: 'warm',
    rgb: WARM_RGB,
    opacity: 0.18,
    size: 520,
    blur: 80,
    position: { bottom: '-12%', left: '-8%' },
    move: { x: 34, y: 24 },          // ~68px sweep
    scale: [0.96, 1.06],
    rotate: [-6, 6],
    duration: { x: 18, y: 14, scale: 21, rotate: 12 },
  },
];

// ─── Grid, noise, framing ─────────────────────────────────────────────────────
const GRID_DOT_OPACITY = 0.13;
const GRID_LINE_OPACITY = 0.05;       // reticle lines every GRID_MAJOR cells
const GRID_CELL = 24;
const GRID_MAJOR = 5;
const GRID_DRIFT = 7;                 // half-range px → ~14px over a loop
const GRID_DURATION = 22;

const NOISE_OPACITY = 0.022;

// Lightens the area behind the headline (left side) without touching the text.
const CALM_LEFT_DESKTOP = 0.4;
const CALM_LEFT_MOBILE = 0.2;

// ─── Interaction / responsive ─────────────────────────────────────────────────
const PARALLAX_FIELD = 20;            // px, orbs
const PARALLAX_GRID = 8;              // px, grid (slower layer → depth)
const MOBILE_SIZE_FACTOR = 0.7;
const MOBILE_MOVE_FACTOR = 0.5;

const PARALLAX_QUERY = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';
const MOBILE_QUERY = '(max-width: 767px)';

const FADE_MASK = 'linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)';
const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, [query]);
  return matches;
}

const loop = (duration) => ({ duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' });

function Orb({ orb, animate, sizeFactor, moveFactor }) {
  const size = Math.round(orb.size * sizeFactor);
  const dx = orb.move.x * moveFactor;
  const dy = orb.move.y * moveFactor;
  const d = orb.duration;

  const motionProps = animate
    ? {
        initial: { x: -dx, y: dy, scale: orb.scale[0], rotate: orb.rotate[0] },
        animate: { x: dx, y: -dy, scale: orb.scale[1], rotate: orb.rotate[1] },
        transition: { x: loop(d.x), y: loop(d.y), scale: loop(d.scale), rotate: loop(d.rotate) },
      }
    : { initial: false };

  return (
    <motion.div
      {...motionProps}
      style={{
        position: 'absolute',
        ...orb.position,
        width: size,
        height: Math.round(size * 0.82),   // slightly elliptical so rotation reads
        borderRadius: '50%',
        opacity: orb.opacity,
        // Solid core so the blurred peak lands close to `opacity`.
        background: `radial-gradient(closest-side, rgb(${orb.rgb}) 0%, rgb(${orb.rgb}) 40%, rgba(${orb.rgb}, 0.5) 72%, rgba(${orb.rgb}, 0) 100%)`,
        filter: `blur(${Math.round(orb.blur * sizeFactor)}px)`,
        willChange: animate ? 'transform' : 'auto',
      }}
    />
  );
}

/**
 * Animated gradient-mesh backdrop for the hero.
 * pointerX / pointerY: spring-smoothed MotionValues in [-1, 1] from the hero.
 */
export default function HeroBackground({ pointerX, pointerY }) {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const parallax = useMediaQuery(PARALLAX_QUERY) && !reducedMotion;
  const animate = !reducedMotion;

  const sizeFactor = isMobile ? MOBILE_SIZE_FACTOR : 1;
  const moveFactor = isMobile ? MOBILE_MOVE_FACTOR : 1;

  const fieldX = useTransform(pointerX, [-1, 1], [-PARALLAX_FIELD, PARALLAX_FIELD]);
  const fieldY = useTransform(pointerY, [-1, 1], [-PARALLAX_FIELD, PARALLAX_FIELD]);
  const gridX = useTransform(pointerX, [-1, 1], [-PARALLAX_GRID, PARALLAX_GRID]);
  const gridY = useTransform(pointerY, [-1, 1], [-PARALLAX_GRID, PARALLAX_GRID]);

  const layer = { position: 'absolute', inset: 0 };
  const major = GRID_CELL * GRID_MAJOR;
  const gridDrift = GRID_DRIFT * moveFactor;
  const calmLeft = isMobile ? CALM_LEFT_MOBILE : CALM_LEFT_DESKTOP;

  return (
    <div
      aria-hidden="true"
      style={{
        ...layer,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        maskImage: FADE_MASK,
        WebkitMaskImage: FADE_MASK,
      }}
    >
      {/* Gradient orbs — parallax wrapper + independent looping paths */}
      <motion.div
        style={{
          ...layer,
          x: parallax ? fieldX : 0,
          y: parallax ? fieldY : 0,
          willChange: parallax ? 'transform' : 'auto',
        }}
      >
        {ORBS.map((orb) => (
          <Orb key={orb.key} orb={orb} animate={animate} sizeFactor={sizeFactor} moveFactor={moveFactor} />
        ))}
      </motion.div>

      {/* Calm zone behind the headline */}
      <div
        style={{
          ...layer,
          background: `linear-gradient(90deg, rgba(${CANVAS_RGB}, ${calmLeft}) 0%, rgba(${CANVAS_RGB}, ${calmLeft * 0.5}) 25%, rgba(${CANVAS_RGB}, 0) 45%)`,
        }}
      />

      {/* Technical grid — moves less than the orbs for depth */}
      <motion.div
        style={{
          ...layer,
          x: parallax ? gridX : 0,
          y: parallax ? gridY : 0,
          willChange: parallax ? 'transform' : 'auto',
        }}
      >
        <motion.div
          {...(animate
            ? {
                initial: { x: -gridDrift, y: gridDrift * 0.6 },
                animate: { x: gridDrift, y: -gridDrift * 0.6 },
                transition: { x: loop(GRID_DURATION), y: loop(GRID_DURATION * 0.75) },
              }
            : { initial: false })}
          style={{
            position: 'absolute',
            inset: -major,
            backgroundImage: [
              `radial-gradient(circle at center, rgba(${INK_RGB}, ${GRID_DOT_OPACITY}) 1px, transparent 1.5px)`,
              `linear-gradient(to right, rgba(${INK_RGB}, ${GRID_LINE_OPACITY}) 1px, transparent 1px)`,
              `linear-gradient(to bottom, rgba(${INK_RGB}, ${GRID_LINE_OPACITY}) 1px, transparent 1px)`,
            ].join(', '),
            backgroundSize: `${GRID_CELL}px ${GRID_CELL}px, ${major}px ${major}px, ${major}px ${major}px`,
            backgroundPosition: `0 0, ${GRID_CELL / 2}px ${GRID_CELL / 2}px, ${GRID_CELL / 2}px ${GRID_CELL / 2}px`,
            willChange: animate ? 'transform' : 'auto',
          }}
        />
      </motion.div>

      {/* Static grain */}
      <div style={{ ...layer, backgroundImage: NOISE_SVG, opacity: NOISE_OPACITY }} />

      {/* Edge vignette blending into the cream canvas */}
      <div
        style={{
          ...layer,
          background: `radial-gradient(ellipse 90% 95% at 62% 38%, rgba(${CANVAS_RGB}, 0) 70%, rgba(${CANVAS_RGB}, 0.6) 100%)`,
        }}
      />
    </div>
  );
}
