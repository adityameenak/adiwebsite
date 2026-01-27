import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import MagneticButton from './MagneticButton';

/**
 * Typewriter Hook - Types out text character by character
 */
function useTypewriter(text, { delay = 0, speed = 70 } = {}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion, show full text instantly
    if (reducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      setShowCursor(false);
      return;
    }

    setDisplayedText('');
    setIsComplete(false);
    setShowCursor(true);

    let currentIndex = 0;
    let intervalId;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsComplete(true);
          setTimeout(() => setShowCursor(false), 800);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay, speed, reducedMotion]);

  return { displayedText, isComplete, showCursor };
}

/**
 * HeroChapter - Hero section with typewriter effect
 */
export default function HeroChapter() {
  const reducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Typewriter for "Hi, I'm Adi"
  const heroText = "Hi, I'm Adi.";
  const { displayedText, isComplete, showCursor } = useTypewriter(heroText, {
    delay: 300,
    speed: 70,
  });

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });

  const handleNavigateToProjects = (e) => {
    e.preventDefault();
    navigate('/projects');
  };

  const handleNavigateToExperience = (e) => {
    e.preventDefault();
    navigate('/experience');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.12,
        delayChildren: reducedMotion ? 0.1 : 1.2,
      },
    },
  };

  const itemVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
      };

  // Render typed text with "Adi" highlighted
  const renderTypedText = () => {
    const nameIndex = displayedText.indexOf('Adi');
    if (nameIndex === -1) {
      return <>{displayedText}</>;
    }
    const beforeName = displayedText.slice(0, nameIndex);
    const name = displayedText.slice(nameIndex, nameIndex + 3);
    const afterName = displayedText.slice(nameIndex + 3);

    return (
      <>
        {beforeName}
        <span className="text-accent">{name}</span>
        {afterName}
      </>
    );
  };

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

          {/* Main headline with typewriter */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-neutral-900 tracking-tight mb-8 min-h-[1.2em]">
            {renderTypedText()}
            {showCursor && (
              <span className="inline-block w-[3px] h-[0.85em] bg-accent ml-1 animate-pulse align-middle" />
            )}
          </h1>

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
              href="/projects"
              onClick={handleNavigateToProjects}
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
              href="/experience"
              onClick={handleNavigateToExperience}
              magnetStrength={0.2}
              className="btn-secondary text-base px-8 py-4"
            >
              See Experience
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Stats row - 3 items, no Fellowship */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="mt-20 lg:mt-32 grid grid-cols-3 gap-8 lg:gap-12 max-w-3xl
                     border-t border-neutral-200 pt-8"
        >
          <StatItem label="Research" value="2+ Years" />
          <StatItem label="Focus" value="Semiconductors" />
          <StatItem label="Class of" value="2028" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isComplete ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
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
      className="flex flex-col text-center"
    >
      <span className="text-2xl lg:text-3xl font-bold text-neutral-900">
        {value}
      </span>
      <span className="text-sm text-neutral-500 mt-1">{label}</span>
    </motion.div>
  );
}
