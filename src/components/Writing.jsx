import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { writing } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi';

/**
 * Writing - Editorial writing/articles section — light card treatment.
 */
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
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      };

  return (
    <section
      id="writing"
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px section-divider" />

      <div ref={sectionRef} className="container-wide relative">
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={containerVariants}>
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <motion.p
                variants={itemVariants}
                className="text-sm font-medium text-accent tracking-wide uppercase mb-4"
              >
                Thoughts & Insights
              </motion.p>

              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4"
              >
                Writing
              </motion.h2>

              <motion.p variants={itemVariants} className="text-lg text-neutral-500 max-w-xl">
                {writing.description}
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <span className="px-4 py-2 bg-accent-subtle text-accent rounded-full font-medium text-sm border border-accent/20">
                {writing.platform}
              </span>
              <span className="text-neutral-400 text-sm">{writing.readers} monthly readers</span>
            </motion.div>
          </div>

          {/* Articles grid */}
          <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
            {writing.articles.map((article) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={reducedMotion ? {} : { y: -5 }}
                transition={{ duration: 0.3 }}
                className="group block rounded-2xl p-6 lg:p-8
                         bg-white border border-neutral-200
                         hover:border-accent/30 hover:shadow-soft-lg
                         transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-accent-subtle text-accent rounded-full text-xs font-medium border border-accent/20">
                    {article.tag}
                  </span>
                  <FiArrowUpRight
                    className="w-4 h-4 text-neutral-300 group-hover:text-accent
                             group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                             transition-all duration-200"
                  />
                </div>

                <h3 className="text-lg font-heading font-bold text-neutral-900 mb-3 group-hover:text-accent transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-neutral-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>

                <span className="text-xs text-neutral-400 font-medium">{article.date}</span>
              </motion.a>
            ))}
          </div>

          {/* View all link */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <motion.a
              href={writing.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reducedMotion ? {} : { x: 4 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-accent font-medium
                       hover:text-accent-dark transition-colors group"
            >
              View all writing
              <FiExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px section-divider" />
    </section>
  );
}
