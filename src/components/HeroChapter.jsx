import { useRef, useCallback, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { FiArrowRight } from 'react-icons/fi';

// ─── Typewriter hook ───────────────────────────────────────────────────────────
// Types text character-by-character with an optional start delay.
// Respects prefers-reduced-motion (shows full text immediately).
function useTypewriter(text, { speed = 62, delay = 420 } = {}) {
  const [displayed, setDisplayed] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text);
      setCursorVisible(false);
      return;
    }

    setDisplayed('');
    setCursorVisible(true);
    let idx = 0;
    let intervalId;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        idx += 1;
        setDisplayed(text.slice(0, idx));
        if (idx >= text.length) {
          clearInterval(intervalId);
          // Blink cursor briefly then hide
          setTimeout(() => setCursorVisible(false), 900);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay, reducedMotion]);

  return { displayed, cursorVisible };
}

// ─── Render typed text with styled name segment ────────────────────────────────
// "Hi, I'm " = 8 chars, then "Adi." in maroon on a new visual line.
function TypedHeadline({ displayed, cursorVisible }) {
  const PREFIX = "Hi, I'm ";

  if (displayed.length <= PREFIX.length) {
    return (
      <>
        {displayed}
        {cursorVisible && <Cursor />}
      </>
    );
  }

  const namePart = displayed.slice(PREFIX.length);
  return (
    <>
      Hi, I&rsquo;m
      <br />
      <em className="not-italic" style={{ color: '#500000' }}>
        {namePart}
      </em>
      {cursorVisible && <Cursor />}
    </>
  );
}

function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      style={{
        display: 'inline-block',
        width: '3px',
        height: '0.82em',
        background: '#500000',
        marginLeft: '4px',
        verticalAlign: 'middle',
        borderRadius: '1px',
      }}
      aria-hidden="true"
    />
  );
}

// ─── Atmospheric glow layers ───────────────────────────────────────────────────
// Neutral warm glows + subtle maroon accent. No pink/amber.
function AmbientGlows() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* Soft neutral halo behind portrait */}
      <div
        style={{
          position: 'absolute',
          top: '-8%',
          right: '-8%',
          width: '68%',
          height: '90%',
          background:
            'radial-gradient(ellipse 65% 68% at 48% 36%, rgba(215,205,198,0.32) 0%, rgba(205,195,188,0.12) 42%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Subtle maroon accent glow — ties to theme */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          right: '16%',
          width: '36%',
          height: '52%',
          background:
            'radial-gradient(ellipse at 50% 36%, rgba(80,0,0,0.07) 0%, transparent 65%)',
          filter: 'blur(44px)',
        }}
      />
      {/* Bottom-left counterbalance */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '4%',
          width: '26%',
          height: '30%',
          background:
            'radial-gradient(ellipse at center, rgba(80,0,0,0.04) 0%, transparent 70%)',
          filter: 'blur(52px)',
        }}
      />
    </div>
  );
}

// ─── Film grain ────────────────────────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2, opacity: 0.030 }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="heroGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.68"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroGrain)" />
      </svg>
    </div>
  );
}

// ─── Ghost typographic backdrop ────────────────────────────────────────────────
function GhostName() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 3 }}
      aria-hidden="true"
    >
      <span
        style={{
          position: 'absolute',
          bottom: '-6%',
          right: '-1%',
          fontFamily: '"Bodoni Moda", "Playfair Display", Georgia, serif',
          fontStyle: 'italic',
          fontWeight: 700,
          fontSize: 'clamp(170px, 24vw, 360px)',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(110,90,80,0.08)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        Adi.
      </span>
    </div>
  );
}

// ─── Portrait focal point — real photo ────────────────────────────────────────
// Uses /linkedinpfp.png from public/.
// Replace src with any portrait photo — the masking + float will carry over.
function PortraitFocal({ motionX, motionY, reducedMotion }) {
  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0.72 } : { opacity: 0, scale: 1.04 }}
      animate={{ opacity: 0.72, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '58%',
        maxWidth: '720px',
        zIndex: 4,
        pointerEvents: 'none',
        userSelect: 'none',
        x: reducedMotion ? 0 : motionX,
        y: reducedMotion ? 0 : motionY,
      }}
      aria-hidden="true"
      className="hidden sm:block"
    >
      {/* Idle float */}
      <motion.div
        animate={reducedMotion ? {} : { y: [0, -9, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatType: 'mirror',
        }}
        style={{
          width: '100%',
          height: '100%',
          maskImage:
            'radial-gradient(ellipse 76% 86% at 56% 38%, black 12%, rgba(0,0,0,0.86) 32%, rgba(0,0,0,0.38) 54%, transparent 74%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 76% 86% at 56% 38%, black 12%, rgba(0,0,0,0.86) 32%, rgba(0,0,0,0.38) 54%, transparent 74%)',
        }}
      >
        <img
          src="/linkedinpfp.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 12%',
            filter: 'blur(0.3px) brightness(0.97) saturate(0.90)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function HeroChapter() {
  const reducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.05 });

  // Typewriter: "Hi, I'm Adi."
  const { displayed, cursorVisible } = useTypewriter("Hi, I'm Adi.", {
    speed: 62,
    delay: 440,
  });

  // Mouse parallax — portrait moves WITH mouse, text moves AGAINST (creates depth)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 52, damping: 22 });
  const smoothY = useSpring(rawY, { stiffness: 52, damping: 22 });
  const portraitX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const portraitY = useTransform(smoothY, [-1, 1], [-12, 12]);
  const textX = useTransform(smoothX, [-1, 1], [5, -5]);
  const textY = useTransform(smoothY, [-1, 1], [3, -3]);

  const handleMouseMove = useCallback(
    (e) => {
      if (reducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    },
    [rawX, rawY, reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.09, delayChildren: 0.15 },
    },
  };

  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
      };

  const fadeIn = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1.0, ease: 'easeOut' } },
      };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: 'calc(100vh - 76px)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background layers */}
      <AmbientGlows />
      <GrainOverlay />
      <GhostName />

      {/* Text protection — left-to-transparent gradient over portrait bleed zone */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none hidden sm:block"
        style={{
          width: '56%',
          zIndex: 5,
          background:
            'linear-gradient(to right, rgba(254,252,249,1) 0%, rgba(254,252,249,0.97) 40%, rgba(254,252,249,0.60) 68%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Portrait — real photo as background focal point */}
      <PortraitFocal motionX={portraitX} motionY={portraitY} reducedMotion={reducedMotion} />

      {/* Floating status badge */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute top-12 right-7 sm:right-10 lg:right-14 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full"
        style={{
          zIndex: 15,
          background: 'rgba(255,255,255,0.76)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(140,120,110,0.14)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
        <span className="text-[11px] font-medium text-neutral-600 tracking-wide">
          Open to opportunities
        </span>
      </motion.div>

      {/* Frosted identity card — bottom right */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute bottom-20 right-7 sm:right-10 lg:right-14 hidden lg:block"
        style={{ zIndex: 15 }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.70)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(140,120,110,0.13)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
            minWidth: '188px',
          }}
        >
          <dl className="px-4 py-4 space-y-2.5 text-[12px]">
            {[
              { label: 'School', value: 'Texas A&M' },
              { label: 'Major', value: 'Chemical Engineering' },
              { label: 'Focus', value: 'Semiconductors' },
              { label: 'Class', value: '2028' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-baseline justify-between gap-6">
                <dt className="text-neutral-400 flex-shrink-0">{label}</dt>
                <dd className="font-semibold text-right text-neutral-800">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative px-7 sm:px-10 lg:px-14 pt-12 pb-0"
        style={{ zIndex: 10 }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Discipline strip */}
          <motion.div
            variants={fadeIn}
            className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-14 lg:mb-20"
          >
            {['Chemical Engineering', 'Semiconductors', 'Materials Science', 'Texas\u00A0A&M'].map(
              (tag, i, arr) => (
                <span key={tag} className="flex items-center gap-3">
                  <span className="text-[11px] font-semibold text-neutral-400 tracking-widest uppercase">
                    {tag}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-neutral-300 text-xs" aria-hidden>
                      ·
                    </span>
                  )}
                </span>
              )
            )}
          </motion.div>

          {/* Name + content — counter-parallax to portrait */}
          <motion.div
            style={reducedMotion ? {} : { x: textX, y: textY }}
            className="max-w-[54%] sm:max-w-[50%] lg:max-w-[46%]"
          >
            {/* Editorial eyebrow */}
            <motion.div variants={fadeIn} className="flex items-center gap-3 mb-7">
              <span className="block w-10 h-px bg-neutral-300" />
              <span className="text-[10.5px] font-semibold tracking-widest uppercase text-neutral-400">
                Portfolio
              </span>
            </motion.div>

            {/* Name — display serif with typewriter */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-medium tracking-tight leading-[0.88] text-neutral-900 mb-8"
              style={{ fontSize: 'clamp(64px, 8.6vw, 132px)', minHeight: '2.2em' }}
            >
              <TypedHeadline displayed={displayed} cursorVisible={cursorVisible} />
            </motion.h1>

            {/* Tight description */}
            <motion.p
              variants={fadeUp}
              className="text-[16px] lg:text-[17px] text-neutral-500 font-light leading-relaxed max-w-[34ch] mb-3"
            >
              Chemical Engineering student focused on semiconductors and advanced materials.
            </motion.p>

            {/* Location/class tagline */}
            <motion.p variants={fadeUp} className="text-[12.5px] text-neutral-400 tracking-wide mb-11">
              {personalInfo.tagline}
            </motion.p>

            {/* Single primary CTA */}
            <motion.div variants={fadeUp}>
              <button
                onClick={() => navigate('/projects')}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-[14px] font-semibold text-white transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: '#500000',
                  boxShadow: '0 2px 12px rgba(80,0,0,0.22)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#3A0000'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#500000'; }}
              >
                View Projects
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </motion.div>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-3 divide-x divide-neutral-200 border-t border-neutral-200 mt-20 lg:mt-24 xl:mt-28 pt-7 pb-12 lg:pb-16"
          >
            {[
              { value: '2+', label: 'Years Research' },
              { value: 'Semis', label: 'Focus Area' },
              { value: '2028', label: 'Class Of' },
            ].map(({ value, label }, i) => (
              <div
                key={label}
                className={i === 0 ? 'pr-6 sm:pr-10' : i === 1 ? 'px-6 sm:px-10' : 'pl-6 sm:pl-10'}
              >
                <p className="text-[22px] lg:text-[26px] font-bold text-neutral-900 leading-tight tracking-tight">
                  {value}
                </p>
                <p className="text-[10.5px] text-neutral-400 mt-1 tracking-widest uppercase">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
