import { motion } from 'framer-motion';
import { experience } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import {
  fadeInUp,
  fadeInUpReduced,
  staggerContainer,
} from '../utils/animations';

export default function Experience() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? fadeInUpReduced : fadeInUp;

  return (
    <section id="experience" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={variants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-12"
          >
            Experience
          </motion.h2>

          <motion.div variants={staggerContainer} className="space-y-8">
            {experience.map((job) => (
              <motion.div
                key={job.id}
                variants={variants}
                whileHover={reducedMotion ? {} : { scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-purple-200 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {job.role}
                    </h3>
                    <p className="text-lg text-purple-600 font-medium">
                      {job.company}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 mt-2 md:mt-0">
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {job.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">•</span>
                      <span className="text-gray-600 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
