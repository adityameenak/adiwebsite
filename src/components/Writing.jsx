import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { writing } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi';

/**
 * Writing - Editorial writing/articles section
 * Dark glass card treatment on the animated canvas background.
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
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Subtle bottom-left accent */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(124,58,237,0.05) 0%, transparent 70%)',
        }}
      />

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
                className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
              >
                Writing
              </motion.h2>

              <motion.p variants={itemVariants} className="text-lg text-neutral-400 max-w-xl">
                {writing.description}
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <span className="px-4 py-2 bg-accent/15 text-accent rounded-full font-medium text-sm border border-accent/20">
                {writing.platform}
              </span>
              <span className="text-neutral-500">{writing.readers} monthly readers</span>
            </motion.div>
          </div>

          {/* Articles grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {writing.articles.map((article) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={reducedMotion ? {} : { y: -6 }}
                transition={{ duration: 0.3 }}
                className="group block rounded-2xl p-6 lg:p-8
                         border border-white/10 backdrop-blur-sm
                         hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5
                         transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-accent/15 text-accent rounded-full text-xs font-medium border border-accent/20">
                    {article.tag}
                  </span>
                  <FiArrowUpRight
                    className="w-5 h-5 text-neutral-600 group-hover:text-accent
                             group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                             transition-all duration-200"
                  />
                </div>

                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>

                <p className="text-neutral-400 text-sm leading-relaxed mb-4">{article.excerpt}</p>

                <span className="text-sm text-neutral-600">{article.date}</span>
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
                       hover:text-accent-light transition-colors group"
            >
              View all writing
              <FiExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
