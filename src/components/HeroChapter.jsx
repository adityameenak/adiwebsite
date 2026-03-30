import { useRef, useCallback } from 'react';
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

// ─── Atmospheric warm glow layers ─────────────────────────────────────────────
function AmbientGlows() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* Primary portrait halo — large warm amber, behind face */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '72%',
          height: '95%',
          background:
            'radial-gradient(ellipse 68% 70% at 46% 36%, rgba(208,162,108,0.46) 0%, rgba(228,188,148,0.22) 38%, transparent 68%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Inner tighter glow — face center warmth */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '12%',
          width: '42%',
          height: '56%',
          background:
            'radial-gradient(ellipse at 50% 38%, rgba(248,208,168,0.24) 0%, transparent 62%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Shoulder bloom — lower warm fill */}
      <div
        style={{
          position: 'absolute',
          bottom: '0%',
          right: '5%',
          width: '50%',
          height: '40%',
          background:
            'radial-gradient(ellipse at 50% 80%, rgba(190,145,95,0.16) 0%, transparent 65%)',
          filter: 'blur(48px)',
        }}
      />
      {/* Cool accent — bottom-left counterbalance */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '2%',
          width: '30%',
          height: '32%',
          background:
            'radial-gradient(ellipse at center, rgba(29,111,164,0.07) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
    </div>
  );
}

// ─── Film grain overlay ────────────────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2, opacity: 0.034 }}
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
          WebkitTextStroke: '1.5px rgba(145,105,80,0.095)',
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

// ─── Portrait focal point ──────────────────────────────────────────────────────
// Large SVG face blended into the shell via radial gradient mask.
// To use a real photo: replace the <svg> with an <img src="..." className="w-full h-full object-cover" />
function PortraitFocal({ motionX, motionY, reducedMotion }) {
  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0.82 } : { opacity: 0, scale: 1.06 }}
      animate={{ opacity: 0.82, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '62%',
        maxWidth: '760px',
        zIndex: 4,
        pointerEvents: 'none',
        userSelect: 'none',
        x: reducedMotion ? 0 : motionX,
        y: reducedMotion ? 0 : motionY,
      }}
      aria-hidden="true"
      className="hidden sm:block"
    >
      {/* Idle float wrapper */}
      <motion.div
        animate={reducedMotion ? {} : { y: [0, -11, 0] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatType: 'mirror',
        }}
        style={{
          width: '100%',
          height: '100%',
          maskImage:
            'radial-gradient(ellipse 78% 88% at 56% 40%, black 14%, rgba(0,0,0,0.88) 34%, rgba(0,0,0,0.42) 56%, transparent 76%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 78% 88% at 56% 40%, black 14%, rgba(0,0,0,0.88) 34%, rgba(0,0,0,0.42) 56%, transparent 76%)',
        }}
      >
        <svg
          viewBox="0 0 420 640"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', filter: 'blur(0.3px)' }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="pvFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="3%" stopColor="white" stopOpacity="1" />
              <stop offset="88%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="pvMask">
              <rect width="420" height="640" fill="url(#pvFade)" />
            </mask>
            <radialGradient id="pHair" cx="50%" cy="28%" r="62%">
              <stop offset="0%" stopColor="#2C1A10" />
              <stop offset="100%" stopColor="#180C06" />
            </radialGradient>
            <radialGradient id="pFace" cx="50%" cy="44%" r="56%">
              <stop offset="0%" stopColor="#C49282" />
              <stop offset="55%" stopColor="#AA7C66" />
              <stop offset="100%" stopColor="#926858" />
            </radialGradient>
            <radialGradient id="pNeck" cx="50%" cy="38%" r="58%">
              <stop offset="0%" stopColor="#B48878" />
              <stop offset="100%" stopColor="#9A6A60" />
            </radialGradient>
            <radialGradient id="pBody" cx="50%" cy="22%" r="68%">
              <stop offset="0%" stopColor="#7A5A4A" />
              <stop offset="100%" stopColor="#5E3E30" />
            </radialGradient>
            <radialGradient id="pHighlight" cx="40%" cy="34%" r="32%">
              <stop offset="0%" stopColor="rgba(255,232,206,0.30)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <g mask="url(#pvMask)">
            {/* BODY */}
            <ellipse cx="210" cy="615" rx="255" ry="102" fill="url(#pBody)" />
            <path
              d="M 15 640 C 28 568 76 528 122 514 L 150 529 L 210 506 L 270 529 L 298 514 C 344 528 392 568 405 640 Z"
              fill="#5E3E30"
              opacity="0.88"
            />
            <path
              d="M 178 510 C 188 524 202 530 210 532 C 218 530 232 524 242 510"
              stroke="#4A2E22"
              strokeWidth="2.5"
              fill="none"
              opacity="0.55"
            />
            {/* NECK */}
            <path
              d="M 186 424 C 181 452 179 470 177 488 C 187 498 210 502 210 502 C 210 502 233 498 243 488 C 241 470 239 452 234 424 Z"
              fill="url(#pNeck)"
            />
            {/* FACE */}
            <path
              d="M 210 138 C 266 138 318 166 324 220 C 330 270 328 312 320 348 C 310 386 283 416 210 422 C 137 416 110 386 100 348 C 92 312 90 270 96 220 C 102 166 154 138 210 138 Z"
              fill="url(#pFace)"
            />
            <path
              d="M 210 138 C 266 138 318 166 324 220 C 330 270 328 312 320 348 C 310 386 283 416 210 422 C 137 416 110 386 100 348 C 92 312 90 270 96 220 C 102 166 154 138 210 138 Z"
              fill="url(#pHighlight)"
            />
            {/* Jaw */}
            <ellipse cx="210" cy="402" rx="55" ry="23" fill="#926858" opacity="0.48" />
            {/* Cheekbones */}
            <ellipse cx="146" cy="306" rx="36" ry="26" fill="#C4927C" opacity="0.32" />
            <ellipse cx="274" cy="306" rx="36" ry="26" fill="#C4927C" opacity="0.32" />
            {/* EARS */}
            <path d="M 93 270 C 78 258 72 276 74 294 C 76 312 88 320 98 314" fill="#A47A6A" stroke="#926858" strokeWidth="1" />
            <path d="M 327 270 C 342 258 348 276 346 294 C 344 312 332 320 322 314" fill="#A47A6A" stroke="#926858" strokeWidth="1" />
            {/* HAIR crown */}
            <ellipse cx="210" cy="98" rx="134" ry="78" fill="url(#pHair)" />
            <path
              d="M 210 138 C 154 138 108 154 96 190 C 86 178 82 154 88 136 C 102 96 150 66 210 62 C 270 66 318 96 332 136 C 338 154 334 178 324 190 C 312 154 266 138 210 138 Z"
              fill="url(#pHair)"
            />
            <path d="M 94 212 C 76 250 70 290 74 334 C 80 316 86 296 90 270 C 92 250 93 230 94 212 Z" fill="#1C0A04" />
            <path d="M 326 212 C 344 250 350 290 346 334 C 340 316 334 296 330 270 C 328 250 327 230 326 212 Z" fill="#1C0A04" />
            <path d="M 88 200 C 84 170 88 142 96 130 C 90 148 88 174 88 200 Z" fill="#1E0E08" />
            <path d="M 332 200 C 336 170 332 142 324 130 C 330 148 332 174 332 200 Z" fill="#1E0E08" />
            {/* EYEBROWS */}
            <path d="M 140 210 C 152 202 168 200 181 205" stroke="#200E06" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M 239 205 C 252 200 268 202 280 210" stroke="#200E06" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            {/* LEFT EYE */}
            <path d="M 140 230 C 150 219 170 218 181 230 C 170 240 150 240 140 230 Z" fill="#4C3228" />
            <circle cx="161" cy="228" r="8.5" fill="#180E08" />
            <circle cx="164" cy="225" r="2.8" fill="white" opacity="0.56" />
            <path d="M 140 230 C 152 221 170 220 181 230" stroke="#180E08" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* RIGHT EYE */}
            <path d="M 239 230 C 250 218 270 219 280 230 C 270 240 250 240 239 230 Z" fill="#4C3228" />
            <circle cx="260" cy="228" r="8.5" fill="#180E08" />
            <circle cx="263" cy="225" r="2.8" fill="white" opacity="0.56" />
            <path d="M 239 230 C 251 220 270 220 280 230" stroke="#180E08" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* NOSE */}
            <path d="M 210 250 C 207 270 201 288 197 298 C 204 305 210 308 210 308 C 210 308 216 305 223 298 C 219 288 213 270 210 250 Z" fill="#926858" opacity="0.58" />
            <path d="M 194 300 C 189 304 188 308 190 312 C 193 315 197 313 199 309" fill="#7E6050" opacity="0.48" />
            <path d="M 226 300 C 231 304 232 308 230 312 C 227 315 223 313 221 309" fill="#7E6050" opacity="0.48" />
            <path d="M 207 250 C 205 260 204 270 205 280" stroke="#8A6050" strokeWidth="1.2" fill="none" opacity="0.3" />
            {/* MOUTH */}
            <path d="M 177 346 C 184 340 195 337 203 339 C 207 335 213 335 217 339 C 225 337 236 340 243 346 C 236 354 226 358 218 356 C 215 360 210 362 210 362 C 210 362 205 360 202 356 C 194 358 184 354 177 346 Z" fill="#A47272" />
            <path d="M 177 346 C 185 360 197 366 210 367 C 223 366 235 360 243 346" stroke="#906260" strokeWidth="0.8" fill="none" />
            <path d="M 180 348 C 195 354 210 356 240 348" stroke="#905E5E" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.65" />
            <path d="M 193 340 C 200 336 206 335 210 337 C 214 335 220 336 227 340" stroke="#A07878" strokeWidth="0.9" fill="none" opacity="0.6" />
            {/* PHILTRUM */}
            <path d="M 205 318 L 203 340 M 215 318 L 217 340" stroke="#926858" strokeWidth="0.8" fill="none" opacity="0.32" />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ─── Main hero component ───────────────────────────────────────────────────────
export default function HeroChapter() {
  const reducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.05 });

  // Mouse parallax — portrait moves WITH mouse (foreground feel)
  // text moves AGAINST mouse (background feel) → creates depth
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 52, damping: 22 });
  const smoothY = useSpring(rawY, { stiffness: 52, damping: 22 });
  const portraitX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const portraitY = useTransform(smoothY, [-1, 1], [-13, 13]);
  const textX = useTransform(smoothX, [-1, 1], [6, -6]);
  const textY = useTransform(smoothY, [-1, 1], [4, -4]);

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
      transition: { staggerChildren: 0.09, delayChildren: 0.18 },
    },
  };

  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
      };

  const fadeIn = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1.1, ease: 'easeOut' } },
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
      {/* Decorative background layers */}
      <AmbientGlows />
      <GrainOverlay />
      <GhostName />

      {/* Text protection — left gradient keeps text readable where portrait bleeds in */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none hidden sm:block"
        style={{
          width: '58%',
          zIndex: 5,
          background:
            'linear-gradient(to right, rgba(254,252,249,1) 0%, rgba(254,252,249,0.97) 42%, rgba(254,252,249,0.62) 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Portrait — large face focal point */}
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
          border: '1px solid rgba(172,132,112,0.14)',
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
            border: '1px solid rgba(172,132,112,0.13)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
            minWidth: '188px',
          }}
        >
          <dl className="px-4 py-4 space-y-2.5 text-[12px]">
            {[
              { label: 'School', value: 'Texas A&M' },
              { label: 'Major', value: 'Chem. Eng.' },
              { label: 'Focus', value: 'Semiconductors' },
              { label: 'Class', value: '2028' },
              { label: 'Fellow', value: 'Samsung', accent: true },
            ].map(({ label, value, accent }) => (
              <div key={label} className="flex items-baseline justify-between gap-6">
                <dt className="text-neutral-400 flex-shrink-0">{label}</dt>
                <dd className={`font-semibold text-right ${accent ? 'text-accent' : 'text-neutral-800'}`}>
                  {value}
                </dd>
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

          {/* Name + text block — counter-parallax to portrait for depth */}
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

            {/* Name — display serif */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-medium tracking-tight leading-[0.88] text-neutral-900 mb-8"
              style={{ fontSize: 'clamp(66px, 8.8vw, 136px)' }}
            >
              Hi, I'm
              <br />
              <em className="not-italic text-accent">Adi.</em>
            </motion.h1>

            {/* Role */}
            <motion.p
              variants={fadeUp}
              className="text-[16px] lg:text-[17px] text-neutral-500 font-light leading-relaxed max-w-[36ch] mb-3"
            >
              {personalInfo.title}
            </motion.p>

            {/* Tagline */}
            <motion.p variants={fadeUp} className="text-[12.5px] text-neutral-400 tracking-wide mb-11">
              {personalInfo.tagline}
            </motion.p>

            {/* CTAs — minimal, editorial */}
            <motion.div variants={fadeUp} className="flex items-center gap-8 sm:gap-10">
              <button
                onClick={() => navigate('/projects')}
                className="group flex items-center gap-2 text-[14px] font-semibold text-neutral-900 hover:text-accent transition-colors duration-200"
              >
                View Projects
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-medium text-neutral-400 hover:text-neutral-700 transition-colors duration-200 border-b border-neutral-300 hover:border-neutral-600 pb-px"
              >
                Resume
              </a>
              <button
                onClick={() => navigate('/experience')}
                className="hidden sm:inline text-[13px] font-medium text-neutral-400 hover:text-neutral-700 transition-colors duration-200 border-b border-neutral-300 hover:border-neutral-600 pb-px"
              >
                Experience
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
