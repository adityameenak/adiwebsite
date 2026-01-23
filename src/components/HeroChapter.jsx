import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useScrollTo } from '../hooks/useLenis';
import MagneticButton from './MagneticButton';
import { staggerContainer, staggerItemBlur } from '../utils/motion-variants';

/**
 * HeroChapter - Editorial hero section
 *
 * Features:
 * - Big, bold typography (Bodoni Moda display)
 * - Minimal, confident layout
 * - Scroll-linked opacity fade
 * - Magnetic CTA buttons
 * - Semiconductor/circuit decorative elements
 */
export default function HeroChapter() {
  const reducedMotion = useReducedMotion();
  const { scrollTo } = useScrollTo();
  const sectionRef = useRef(null);

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    scrollTo('#projects', { offset: -80, duration: 1.2 });
  };

  const handleScrollToExperience = (e) => {
    e.preventDefault();
    scrollTo('#experience', { offset: -80, duration: 1.2 });
  };

  // Stagger variants for text reveal
  const containerVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : staggerContainer;

  const itemVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : staggerItemBlur;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Gradient orbs (subtle, not distracting) */}
      {!reducedMotion && (
        <>
          <motion.div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full
                       bg-gradient-radial from-accent/5 to-transparent blur-3xl"
            style={{ y: smoothY, opacity }}
          />
          <motion.div
            className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full
                       bg-gradient-radial from-neutral-200/50 to-transparent blur-3xl"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]), opacity }}
          />
        </>
      )}

      {/* Main content */}
      <motion.div
        className="container-wide relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-32"
        style={{ opacity: reducedMotion ? 1 : opacity }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl"
        >
          {/* Overline */}
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium text-neutral-500 tracking-wide uppercase mb-6"
          >
            Chemical Engineering · Semiconductors · Research
          </motion.p>

          {/* Main headline - Editorial style */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl
                       font-medium tracking-tight leading-[0.95] text-neutral-900 mb-8"
          >
            <span className="block">Aditya</span>
            <span className="block text-accent">Meenakshisundaram</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl text-neutral-600 font-light
                       max-w-3xl leading-relaxed mb-12"
          >
            {personalInfo.title}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <MagneticButton
              as="a"
              href="#projects"
              onClick={handleScrollToProjects}
              magnetStrength={0.2}
              className="btn-primary text-base px-8 py-4"
            >
              View Projects
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#experience"
              onClick={handleScrollToExperience}
              magnetStrength={0.2}
              className="btn-secondary text-base px-8 py-4"
            >
              See Experience
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="mt-20 lg:mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12
                     border-t border-neutral-200 pt-8"
        >
          <StatItem label="Research" value="2+ Years" />
          <StatItem label="Fellowship" value="$10K Samsung" />
          <StatItem label="Focus" value="Semiconductors" />
          <StatItem label="Class of" value="2028" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-neutral-400 uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-neutral-400 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * StatItem - Small stat display
 */
function StatItem({ label, value }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reducedMotion ? 0.2 : 0.5 }}
      className="flex flex-col"
    >
      <span className="text-2xl lg:text-3xl font-heading font-bold text-neutral-900">
        {value}
      </span>
      <span className="text-sm text-neutral-500 mt-1">{label}</span>
    </motion.div>
  );
}
