import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * ExperienceChapter — compact 2-column grid layout.
 *
 * Replaces the old sticky-scroll + progress-indicator layout that required
 * 200vh+ of scrolling to get through 4 cards. This version presents all
 * roles in a scannable grid: full information, minimal vertical sprawl.
 */
export default function ExperienceChapter() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reducedMotion ? 0 : 0.08, delayChildren: 0.1 },
    },
  };

  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px section-divider" />

      <div className="container-wide">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-10 lg:mb-12">
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">
              Career Journey
            </p>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-3">
              Experience
            </h2>
            <p className="text-neutral-500 max-w-xl">
              Research and industry experience in materials, semiconductors, and sustainable energy.
            </p>
          </motion.div>

          {/* 2-column grid on desktop, 1-column on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {experience.map((job) => (
              <motion.div key={job.id} variants={fadeUp}>
                <ExperienceCard job={job} reducedMotion={reducedMotion} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px section-divider" />
    </section>
  );
}

function ExperienceCard({ job, reducedMotion }) {
  return (
    <motion.article
      whileHover={reducedMotion ? {} : { y: -3 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group h-full"
    >
      <div className="h-full rounded-2xl p-6 lg:p-7 bg-white border border-neutral-200
                      hover:border-accent/30 hover:shadow-soft transition-all duration-300 flex flex-col">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <h3 className="text-[15px] lg:text-[16px] font-semibold text-neutral-900 leading-snug mb-1
                           group-hover:text-accent transition-colors duration-200">
              {job.role}
            </h3>
            <p className="text-[13px] font-medium text-accent">{job.company}</p>
          </div>
          <span className="text-[11px] text-neutral-400 font-medium px-2.5 py-1 rounded-full
                           border border-neutral-200 bg-neutral-50 whitespace-nowrap flex-shrink-0 mt-0.5">
            {job.period}
          </span>
        </div>

        {/* Key bullets — show all, concise */}
        <ul className="space-y-2 mb-5 flex-grow">
          {job.description.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] text-neutral-600 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[5px] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md
                         bg-neutral-100 text-neutral-500 border border-neutral-200
                         group-hover:bg-accent-subtle group-hover:text-accent group-hover:border-accent/20
                         transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
