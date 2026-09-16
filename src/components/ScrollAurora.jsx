import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// ─── Palette (mirrors tailwind.config.js / HeroBackground) ────────────────────
const ACCENT_RGB = '139, 92, 246';    // accent purple #8b5cf6
const LAVENDER_RGB = '167, 139, 250'; // soft lavender

// ─── Scroll path ──────────────────────────────────────────────────────────────
// Page scroll progress (0 → 1) mapped to where each glow sits in the viewport.
const STOPS = [0, 0.25, 0.5, 0.75, 1];

const GLOWS = [
  {
    key: 'purple',
    rgb: ACCENT_RGB,
    opacity: 0.34,
    blur: 80,
    box: { top: '-10vh', left: '-10vw', width: '90vw', height: '65vh' },
    x: ['40vw', '-15vw', '10vw', '30vw', '5vw'],
    y: ['0vh', '20vh', '40vh', '10vh', '35vh'],
    rotate: [-18, 8, -12, 14, -6],
    scale: [1, 1.15, 0.95, 1.1, 1],
    drift: { x: 60, y: 40, duration: 11 },
  },
  {
    key: 'lavender',
    rgb: LAVENDER_RGB,
    opacity: 0.26,
    blur: 90,
    box: { top: '40vh', left: '-20vw', width: '80vw', height: '55vh' },
    x: ['0vw', '45vw', '20vw', '-5vw', '25vw'],
    y: ['10vh', '-15vh', '5vh', '-20vh', '-5vh'],
    rotate: [-22, -6, 12, -16, 4],
    scale: [0.95, 1.05, 1.15, 0.95, 1.05],
    drift: { x: 40, y: 50, duration: 13 },
  },
];

// Glow fades in once the hero (which has its own aurora) scrolls away,
// and eases out near the footer.
const FADE_IN_PX = [250, 750];
const FADE_OUT_PROGRESS = [0.9, 1];
const FADE_OUT_TO = 0.35;

const SCROLL_SPRING = { stiffness: 70, damping: 22, mass: 0.6 };
const MOBILE_QUERY = '(max-width: 767px)';
const MOBILE_BLUR_FACTOR = 0.7;
const MOBILE_WIDTH = '170vw';        // phones are narrow; keep the glow wider than the cards

function useIsMobile() {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return matches;
}

const loop = (duration) => ({ duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' });

function Glow({ glow, progress, animate, isMobile }) {
  const staticPose = !animate;
  const x = useTransform(progress, STOPS, glow.x);
  const y = useTransform(progress, STOPS, glow.y);
  const rotate = useTransform(progress, STOPS, glow.rotate);
  const scale = useTransform(progress, STOPS, glow.scale);
  const drift = glow.drift;

  return (
    <motion.div
      style={{
        position: 'absolute',
        ...glow.box,
        ...(isMobile ? { width: MOBILE_WIDTH, left: '-35vw' } : null),
        x: staticPose ? glow.x[1] : x,
        y: staticPose ? glow.y[1] : y,
        rotate: staticPose ? glow.rotate[1] : rotate,
        scale: staticPose ? 1 : scale,
        willChange: animate ? 'transform' : 'auto',
      }}
    >
      <motion.div
        {...(animate
          ? {
              initial: { x: -drift.x, y: drift.y },
              animate: { x: drift.x, y: -drift.y },
              transition: { x: loop(drift.duration), y: loop(drift.duration * 0.8) },
            }
          : { initial: false })}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          opacity: glow.opacity,
          background: `radial-gradient(ellipse 50% 50% at 50% 50%, rgb(${glow.rgb}) 0%, rgba(${glow.rgb}, 0.7) 45%, rgba(${glow.rgb}, 0) 100%)`,
          filter: `blur(${Math.round(glow.blur * (isMobile ? MOBILE_BLUR_FACTOR : 1))}px)`,
          willChange: animate ? 'transform' : 'auto',
        }}
      />
    </motion.div>
  );
}

/**
 * Fixed purple aurora that travels behind the page as you scroll.
 * Sections must have translucent backgrounds for it to show through
 * (App sets --section-canvas / --section-soft).
 */
export default function ScrollAurora() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const animate = !reducedMotion;

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);

  const fadeIn = useTransform(scrollY, FADE_IN_PX, [0, 1]);
  const fadeOut = useTransform(scrollYProgress, FADE_OUT_PROGRESS, [1, FADE_OUT_TO]);
  const opacity = useTransform([fadeIn, fadeOut], ([a, b]) => a * b);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity,
      }}
    >
      {GLOWS.map((glow) => (
        <Glow key={glow.key} glow={glow} progress={progress} animate={animate} isMobile={isMobile} />
      ))}
    </motion.div>
  );
}
