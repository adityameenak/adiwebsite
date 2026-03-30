import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { about } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * About - Editorial about section — light card treatment.
 */
export default function About() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden"
    >
      {/* Section separator */}
      <div className="absolute top-0 inset-x-0 h-px section-divider" />

      <div className="container-wide relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Main content — full width */}
          <div className="lg:col-span-12 lg:max-w-3xl">
            <motion.p
              variants={itemVariants}
              className="text-sm font-medium text-accent tracking-wide uppercase mb-4"
            >
              About Me
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-8"
            >
              Engineering solutions for the future of technology.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-neutral-600 leading-relaxed mb-8"
            >
              {about.paragraph}
            </motion.p>

            {/* Key focus areas */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {['Semiconductors', 'Materials Science', 'Sustainable Energy', 'Process Optimization'].map(
                (area) => (
                  <span
                    key={area}
                    className="px-4 py-2 bg-white text-neutral-700 rounded-full
                             text-sm font-medium border border-neutral-200
                             hover:border-accent/50 hover:text-accent transition-colors duration-200
                             shadow-sm"
                  >
                    {area}
                  </span>
                )
              )}
            </motion.div>
          </div>

        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px section-divider" />
    </section>
  );
}

