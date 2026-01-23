import { motion } from 'framer-motion';
import { about, education } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp, fadeInUpReduced, staggerContainer } from '../utils/animations';

export default function About() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? fadeInUpReduced : fadeInUp;

  return (
    <section id="about" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={variants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
          >
            About
          </motion.h2>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p
              variants={variants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {about.paragraph}
            </motion.p>

            <motion.div
              variants={variants}
              whileHover={reducedMotion ? {} : { scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
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
