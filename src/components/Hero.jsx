import { motion } from 'framer-motion';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Hero() {
  const reducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      };

  const buttonVariants = reducedMotion
    ? {}
    : {
        hover: { scale: 1.05 },
        tap: { scale: 0.98 },
      };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight"
          >
            Hi, I'm <span className="text-purple-600">{personalInfo.name}</span>.
          </motion.h1>

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
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <motion.a
              href="#projects"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/30"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#resume"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 transition-colors"
            >
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
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
      </div>
    </section>
  );
}
