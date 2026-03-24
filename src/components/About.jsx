import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { about, education, awards } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * About - Editorial about section
 * Dark glass card treatment to sit on the animated canvas background.
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
      {/* Subtle section separator gradient at top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-8"
            >
              Engineering solutions for the future of technology.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-neutral-300 leading-relaxed mb-8"
            >
              {about.paragraph}
            </motion.p>

            {/* Key focus areas */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {['Semiconductors', 'Materials Science', 'Sustainable Energy', 'Process Optimization'].map(
                (area) => (
                  <span
                    key={area}
                    className="px-4 py-2 bg-white/8 text-neutral-300 rounded-full
                             text-sm font-medium border border-white/10
                             hover:border-accent/40 hover:text-white transition-colors duration-200"
                  >
                    {area}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Right column – Education & Awards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Education Card */}
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl p-6 lg:p-8 overflow-hidden group
                       border border-white/10 backdrop-blur-sm
                       hover:border-accent/30 transition-colors duration-300"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {/* Accent border top */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

              <h3 className="text-lg font-heading font-bold text-white mb-4">Education</h3>

              <div className="space-y-3">
                <div>
                  <p className="text-xl font-semibold text-white">{education.school}</p>
                  <p className="text-neutral-400">
                    {education.degree} in {education.major}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    GPA: {education.gpa}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {education.graduationDate}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Awards / Highlights Card */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl p-6 lg:p-8 border border-white/10 backdrop-blur-sm
                       hover:border-accent/30 transition-colors duration-300"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <h3 className="text-lg font-heading font-bold text-white mb-4">Highlights</h3>

              <ul className="space-y-4">
                {awards.map((award) => (
                  <li key={award.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5 border border-accent/20">
                      <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">{award.title}</p>
                      <p className="text-sm text-neutral-500">
                        {award.description} · {award.date}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
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

      {/* Subtle section separator gradient at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

/**
 * StatCard – dark glass stat display
 */
function StatCard({ value, label }) {
  return (
    <div
      className="rounded-xl p-5 text-center border border-white/10 backdrop-blur-sm
                 hover:border-accent/30 transition-colors duration-200"
      style={{ background: 'rgba(255,255,255,0.06)' }}
    >
      <p className="text-2xl lg:text-3xl font-heading font-bold text-accent mb-1">{value}</p>
      <p className="text-sm text-neutral-500">{label}</p>
    </div>
  );
}
