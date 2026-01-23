import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { about, education } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

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
          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      };

  return (
    <section id="about" className="py-24 px-6 lg:px-8 bg-white">
      <div ref={sectionRef} className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
          >
            About
          </motion.h2>

          <motion.div variants={containerVariants} className="space-y-6">
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {about.paragraph}
            </motion.p>

            <motion.div
              variants={itemVariants}
              whileHover={reducedMotion ? {} : { scale: 1.01, y: -2 }}
              transition={{ duration: 0.3 }}
              className="group bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                Education
              </h3>
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">
                  {education.school}
                </p>
                <p className="text-gray-600">
                  {education.degree} in {education.major}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-2">
                  <span className="font-medium text-purple-600">
                    GPA: {education.gpa}
                  </span>
                  <span>•</span>
                  <span>Expected {education.graduationDate}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
