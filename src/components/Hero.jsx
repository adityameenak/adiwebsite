import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { TechGrid, GlowOrb } from './motion';

function useTypewriter(text, { delay = 0, speed = 80 } = {}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const reducedMotion = useReducedMotion();
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
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

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalRef.current);
          setIsComplete(true);
          setTimeout(() => setShowCursor(false), 800);
        }
      }, speed);
    }, delay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, delay, speed, reducedMotion]);

  return { displayedText, isComplete, showCursor };
}

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const heroRef = useRef(null);
  const heroText = `Hi, I'm ${personalInfo.name}.`;
  const { displayedText, isComplete, showCursor } = useTypewriter(heroText, {
    delay: 300,
    speed: 70,
  });

  // Scroll-linked parallax for accents
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const smoothY1 = useSpring(y1, { stiffness: 50, damping: 20 });
  const smoothY2 = useSpring(y2, { stiffness: 50, damping: 20 });

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
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      };

  const buttonVariants = reducedMotion
    ? {}
    : {
        hover: { scale: 1.03, y: -2 },
        tap: { scale: 0.98 },
      };

  const renderTypedText = () => {
    const nameStart = displayedText.indexOf(personalInfo.name);
    if (nameStart === -1) {
      return <>{displayedText}</>;
    }
    const nameEnd = nameStart + personalInfo.name.length;
    const beforeName = displayedText.slice(0, nameStart);
    const name = displayedText.slice(nameStart, nameEnd);
    const afterName = displayedText.slice(nameEnd);

    return (
      <>
        {beforeName}
        <span className="text-purple-600">{name}</span>
        {afterName}
      </>
    );
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-gray-50" />

      {/* Tech grid pattern */}
      <TechGrid className="text-gray-400" opacity={0.03} />

      {/* Parallax glow orbs */}
      {!reducedMotion && (
        <>
          <motion.div
            className="absolute -top-20 -right-20 pointer-events-none"
            style={{ y: smoothY1, opacity }}
          >
            <GlowOrb color="purple" size={500} intensity={0.12} animated={false} />
          </motion.div>
          <motion.div
            className="absolute -bottom-40 -left-20 pointer-events-none"
            style={{ y: smoothY2, opacity }}
          >
            <GlowOrb color="blue" size={400} intensity={0.08} animated={false} />
          </motion.div>
        </>
      )}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
          style={{ opacity: reducedMotion ? 1 : opacity }}
        >
          {/* Typewriter headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight min-h-[1.2em]">
            {renderTypedText()}
            {showCursor && (
              <span className="inline-block w-[3px] h-[0.85em] bg-purple-600 ml-1 animate-pulse align-middle" />
            )}
          </h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {personalInfo.title}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-500 font-medium"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <motion.a
              href="#projects"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/25"
            >
              View Projects
            </motion.a>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-3 bg-white/80 backdrop-blur-sm text-gray-900 rounded-lg font-medium border border-gray-200 hover:border-purple-500 hover:text-purple-600 transition-colors"
            >
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
