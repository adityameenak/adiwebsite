import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { about, education, awards } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * About - Editorial about section
 *
 * Features:
 * - Clean two-column layout
 * - Education card with accent border
 * - Awards/highlights list
 * - Scroll-triggered reveal
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
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:6rem_6rem]" />

      <div className="container-wide relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        >
          {/* Left column - Main content */}
          <div className="lg:col-span-7">
            {/* Section label */}
            <motion.p
              variants={itemVariants}
              className="text-sm font-medium text-accent tracking-wide uppercase mb-4"
            >
              About Me
            </motion.p>

            {/* Headline */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-8"
            >
              Engineering solutions for the future of technology.
            </motion.h2>

            {/* Bio paragraph */}
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
                    className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full
                             text-sm font-medium border border-neutral-200"
                  >
                    {area}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Right column - Education & Awards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Education Card */}
            <motion.div
              variants={itemVariants}
              className="relative bg-neutral-50 rounded-2xl p-6 lg:p-8
                       border border-neutral-200 overflow-hidden group
                       hover:border-accent/30 transition-colors duration-300"
            >
              {/* Accent border top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

              <h3 className="text-lg font-heading font-bold text-neutral-900 mb-4">
                Education
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-xl font-semibold text-neutral-900">
                    {education.school}
                  </p>
                  <p className="text-neutral-600">
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

            {/* Awards Card */}
            <motion.div
              variants={itemVariants}
              className="bg-neutral-50 rounded-2xl p-6 lg:p-8 border border-neutral-200
                       hover:border-accent/30 transition-colors duration-300"
            >
              <h3 className="text-lg font-heading font-bold text-neutral-900 mb-4">
                Highlights
              </h3>

              <ul className="space-y-4">
                {awards.map((award) => (
                  <li key={award.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{award.title}</p>
                      <p className="text-sm text-neutral-500">
                        {award.description} · {award.date}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              <StatCard value="2+" label="Years Research" />
              <StatCard value="$10K" label="Fellowship" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * StatCard - Small stat display card
 */
function StatCard({ value, label }) {
  return (
    <div
      className="bg-neutral-900 text-white rounded-xl p-5 text-center
                 hover:bg-neutral-800 transition-colors duration-200"
    >
      <p className="text-2xl lg:text-3xl font-heading font-bold text-accent mb-1">
        {value}
      </p>
      <p className="text-sm text-neutral-400">{label}</p>
    </div>
  );
}
