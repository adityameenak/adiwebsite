import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { FiDownload, FiExternalLink } from 'react-icons/fi';

export default function Resume() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.12,
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
        hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      };

  const buttonVariants = reducedMotion
    ? {}
    : {
        hover: { scale: 1.02, y: -2 },
        tap: { scale: 0.98 },
      };

  return (
    <section id="resume" className="py-24 px-6 lg:px-8 bg-gray-50">
      <div ref={sectionRef} className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Resume
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-500 mb-8"
          >
            Download my resume or view it in a new tab.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="/resume.pdf"
              download="Aditya_Meenakshisundaram_Resume.pdf"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-md shadow-purple-600/20"
            >
              <FiDownload className="w-5 h-5" />
              Download Resume
            </motion.a>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg font-medium border border-gray-200 hover:border-purple-400 hover:text-purple-600 transition-colors"
            >
              <FiExternalLink className="w-5 h-5" />
              View in New Tab
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
