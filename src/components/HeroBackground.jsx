import { useEffect, useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// ─── Palette (mirrors tailwind.config.js tokens) ──────────────────────────────
const INK_RGB = '10, 10, 10';         // ink #0a0a0a
const ACCENT_RGB = '139, 92, 246';    // accent purple #8b5cf6
const LAVENDER_RGB = '167, 139, 250'; // soft lavender
const WARM_RGB = '232, 185, 74';      // brand.ochre #e8b94a

// ─── Aurora bands ─────────────────────────────────────────────────────────────
// Wide, diagonal (lower-left → upper-right) bands. `spots` are the brighter
// patches inside each band [x%, y%, width%, height%] — they make the band
// irregular and make its movement easy to see.
// move = half-range in px; durations are seconds per direction (mirrored loop).
const BANDS = [
  {
    key: 'purple',
    rgb: ACCENT_RGB,
    opacity: 0.32,
    blur: 60,
    box: { top: '4%', left: '-25%', width: '150%', height: '58%' },
    angle: -16,
    spots: [[72, 42, 38, 70], [30, 58, 34, 55], [52, 50, 60, 40]],
    move: { x: 90, y: 0 },            // 180px horizontal sweep
    scale: [0.9, 1.12],
    rotate: 4,                        // ± deg around `angle` → 8° swing
    duration: { x: 9, y: 9, scale: 11, rotate: 13 },
  },
  {
    key: 'lavender',
    rgb: LAVENDER_RGB,
    opacity: 0.24,
    blur: 65,
    box: { top: '28%', left: '-20%', width: '140%', height: '52%' },
    angle: -22,
    spots: [[40, 50, 40, 70], [78, 40, 30, 60]],
    move: { x: 0, y: 50 },            // 100px vertical sweep
    scale: [0.92, 1.1],
    rotate: 3,
    duration: { x: 10, y: 10, scale: 12, rotate: 14 },
  },
  {
    key: 'warm',
    rgb: WARM_RGB,
    opacity: 0.2,
    blur: 70,
    box: { top: '52%', left: '-30%', width: '130%', height: '50%' },
    angle: -12,
    spots: [[30, 50, 45, 75], [65, 45, 30, 55]],
    move: { x: 50, y: 25 },
    scale: [0.9, 1.08],
    rotate: 3,
    duration: { x: 12, y: 8, scale: 14, rotate: 10 },
  },
];

// ─── Grid & noise ─────────────────────────────────────────────────────────────
const GRID_OPACITY = 0.12;
const GRID_SPACING = 36;              // px
const GRID_TRAVEL = 20;               // px total travel per half-loop
const GRID_LOOP = 14;                 // s for a full there-and-back loop
const NOISE_OPACITY = 0.02;

// ─── Interaction / responsive ─────────────────────────────────────────────────
const PARALLAX_BANDS = 20;            // px
const PARALLAX_GRID = 6;              // px
const MOBILE_MOVE_FACTOR = 0.6;

const PARALLAX_QUERY = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';
const MOBILE_QUERY = '(max-width: 767px)';

const FADE_MASK = 'linear-gradient(to bottom, #000 0%, #000 82%, transparent 100%)';
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

function Band({ band, animate, moveFactor }) {
  const dx = band.move.x * moveFactor;
  const dy = band.move.y * moveFactor;
  const d = band.duration;

  const spots = band.spots
    .map(([x, y, w, h]) => `radial-gradient(ellipse ${w}% ${h}% at ${x}% ${y}%, rgb(${band.rgb}) 0%, rgba(${band.rgb}, 0.75) 40%, rgba(${band.rgb}, 0) 100%)`)
    .join(', ');

  const motionProps = animate
    ? {
        initial: { x: -dx, y: -dy, scale: band.scale[0], rotate: band.angle - band.rotate },
        animate: { x: dx, y: dy, scale: band.scale[1], rotate: band.angle + band.rotate },
        transition: { x: loop(d.x), y: loop(d.y), scale: loop(d.scale), rotate: loop(d.rotate) },
      }
    : { initial: false, animate: { x: 0, y: 0, scale: 1, rotate: band.angle }, transition: { duration: 0 } };

  return (
    <motion.div
      {...motionProps}
      style={{
        position: 'absolute',
        ...band.box,
        opacity: band.opacity,
        backgroundImage: spots,
        filter: `blur(${band.blur}px)`,
        willChange: animate ? 'transform' : 'auto',
      }}
    />
  );
}

/**
 * Animated aurora backdrop for the hero.
 * Stacking inside: bands → grid → grain. Hero content sits above at z-index 10.
 * pointerX / pointerY: spring-smoothed MotionValues in [-1, 1] from the hero.
 */
export default function HeroBackground({ pointerX, pointerY }) {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const parallax = useMediaQuery(PARALLAX_QUERY) && !reducedMotion;
  const animate = !reducedMotion;
  const moveFactor = isMobile ? MOBILE_MOVE_FACTOR : 1;

  const bandsX = useTransform(pointerX, [-1, 1], [-PARALLAX_BANDS, PARALLAX_BANDS]);
  const bandsY = useTransform(pointerY, [-1, 1], [-PARALLAX_BANDS, PARALLAX_BANDS]);
  const gridX = useTransform(pointerX, [-1, 1], [-PARALLAX_GRID, PARALLAX_GRID]);
  const gridY = useTransform(pointerY, [-1, 1], [-PARALLAX_GRID, PARALLAX_GRID]);

  const layer = { position: 'absolute', inset: 0 };
  const gridHalf = (GRID_TRAVEL / 2) * moveFactor;

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
      {/* Aurora bands */}
      <motion.div
        style={{
          ...layer,
          x: parallax ? bandsX : 0,
          y: parallax ? bandsY : 0,
          willChange: parallax ? 'transform' : 'auto',
        }}
      >
        {BANDS.map((band) => (
          <Band key={band.key} band={band} animate={animate} moveFactor={moveFactor} />
        ))}
      </motion.div>

      {/* Technical grid */}
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
                initial: { x: -gridHalf, y: -gridHalf * 0.5 },
                animate: { x: gridHalf, y: gridHalf * 0.5 },
                transition: { x: loop(GRID_LOOP / 2), y: loop(GRID_LOOP / 2) },
              }
            : { initial: false, animate: { x: 0, y: 0 }, transition: { duration: 0 } })}
          style={{
            position: 'absolute',
            inset: -GRID_SPACING,
            opacity: GRID_OPACITY,
            backgroundImage: `linear-gradient(to right, rgb(${INK_RGB}) 1px, transparent 1px), linear-gradient(to bottom, rgb(${INK_RGB}) 1px, transparent 1px)`,
            backgroundSize: `${GRID_SPACING}px ${GRID_SPACING}px`,
            willChange: animate ? 'transform' : 'auto',
          }}
        />
      </motion.div>

      {/* Grain */}
      <div style={{ ...layer, backgroundImage: NOISE_SVG, opacity: NOISE_OPACITY }} />
    </div>
  );
}
