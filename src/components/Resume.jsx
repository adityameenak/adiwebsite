import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import MagneticButton from './MagneticButton';
import { FiDownload, FiExternalLink } from 'react-icons/fi';

/**
 * Resume - Clean resume download section
 *
 * Features:
 * - Minimal design with clear CTAs
 * - Magnetic button effects
 * - Download and view options
 */
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
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      };

  return (
    <section
      id="resume"
      className="py-16 sm:py-20 bg-white border-t border-neutral-100"
    >
      <div ref={sectionRef} className="container-narrow">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <motion.p
              variants={itemVariants}
              className="text-sm font-medium text-accent tracking-wide uppercase mb-2"
            >
              Resume
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 mb-2"
            >
              Want the full picture?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-neutral-500"
            >
              Download my resume or view it in a new tab.
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3"
          >
            <MagneticButton
              as="a"
              href="/resume.pdf"
              download="Aditya_Meenakshisundaram_Resume.pdf"
              magnetStrength={0.15}
              className="btn-primary inline-flex items-center gap-2"
            >
              <FiDownload className="w-5 h-5" />
              Download Resume
            </MagneticButton>

            <MagneticButton
              as="a"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              magnetStrength={0.15}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <FiExternalLink className="w-5 h-5" />
              View in New Tab
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
