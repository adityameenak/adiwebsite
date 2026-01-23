import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { writing } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi';

export default function Writing() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

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

  return (
    <section id="writing" className="py-24 px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-blue-100/30 to-transparent blur-3xl pointer-events-none" />

      <div ref={sectionRef} className="max-w-6xl mx-auto relative">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Writing
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-4">
            {writing.description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
              {writing.platform}
            </span>
            <span className="text-gray-500">{writing.readers} monthly readers</span>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {writing.articles.map((article, index) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={reducedMotion ? {} : { y: -6 }}
                transition={{ duration: 0.3 }}
                className="group block bg-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                    {article.tag}
                  </span>
                  <FiArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                <span className="text-sm text-gray-400">{article.date}</span>
              </motion.a>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-10 text-center">
            <motion.a
              href={writing.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reducedMotion ? {} : { x: 4 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-purple-600 font-medium hover:text-purple-700 transition-colors group"
            >
              View all writing
              <FiExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
