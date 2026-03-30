import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { about, education } from '../data/content';
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
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        >
          {/* Left column – Main content */}
          <div className="lg:col-span-7">
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

          {/* Right column – Education & Awards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Education Card */}
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl p-6 lg:p-8 overflow-hidden group
                       bg-white border border-neutral-200
                       hover:border-accent/30 hover:shadow-soft transition-all duration-300"
            >
              {/* Accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-accent/60 via-accent to-accent/60" />

              <h3 className="text-lg font-heading font-semibold text-neutral-900 mb-4">Education</h3>

              <div className="space-y-3">
                <div>
                  <p className="text-xl font-semibold text-neutral-900">{education.school}</p>
                  <p className="text-neutral-500 mt-0.5">
                    {education.degree} in {education.major}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {education.graduationDate}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
              <StatCard value="2+" label="Years Research" />
              <StatCard value="Semis" label="Focus" />
              <StatCard value="2028" label="Class" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px section-divider" />
    </section>
  );
}

/**
 * StatCard – light stat display
 */
function StatCard({ value, label }) {
  return (
    <div
      className="rounded-xl p-5 text-center bg-white border border-neutral-200
                 hover:border-accent/30 hover:shadow-sm transition-all duration-200"
    >
      <p className="text-2xl lg:text-3xl font-heading font-bold text-accent mb-1">{value}</p>
      <p className="text-sm text-neutral-400">{label}</p>
    </div>
  );
}
