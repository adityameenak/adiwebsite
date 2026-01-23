import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp, fadeInUpReduced, staggerContainer } from '../utils/animations';

export default function Resume() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? fadeInUpReduced : fadeInUp;

  const buttonVariants = reducedMotion
    ? {}
    : {
        hover: { scale: 1.02 },
        tap: { scale: 0.98 },
      };

  return (
    <section id="resume" className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
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
            Resume
          </motion.h2>

          <motion.div
            variants={variants}
            className="bg-white rounded-2xl p-8 border border-gray-100"
          >
            <div className="aspect-[8.5/11] bg-gray-100 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-500">PDF Viewer Placeholder</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/resume.pdf"
                download
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors text-center"
              >
                Download Resume
              </motion.a>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex-1 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium border-2 border-gray-200 hover:border-purple-600 hover:text-purple-600 transition-colors text-center"
              >
                View Full Screen
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
