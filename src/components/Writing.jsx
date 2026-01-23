import { motion } from 'framer-motion';
import { writing } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import {
  fadeInUp,
  fadeInUpReduced,
  staggerContainer,
  cardHoverSubtle,
  cardHoverReduced,
} from '../utils/animations';
import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi';

export default function Writing() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? fadeInUpReduced : fadeInUp;
  const cardVariants = reducedMotion ? cardHoverReduced : cardHoverSubtle;

  return (
    <section id="writing" className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={variants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Writing
          </motion.h2>

          <motion.p variants={variants} className="text-lg text-gray-600 mb-4">
            {writing.description}
          </motion.p>

          <motion.div variants={variants} className="flex items-center gap-4 mb-12">
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
              {writing.platform}
            </span>
            <span className="text-gray-500">{writing.readers} monthly readers</span>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {writing.articles.map((article) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={variants}
                initial="rest"
                whileHover="hover"
                className="block bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer group"
              >
                <motion.div variants={cardVariants}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                      {article.tag}
                    </span>
                    <FiArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  <span className="text-sm text-gray-400">{article.date}</span>
                </motion.div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={variants} className="mt-10 text-center">
            <a
              href={writing.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-purple-600 font-medium hover:text-purple-700 transition-colors group"
            >
              View all writing
              <FiExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
