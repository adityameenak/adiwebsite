import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { experience } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * ExperienceChapter - Editorial experience section
 *
 * Features:
 * - Sticky left column with progress indicator
 * - Scroll-linked card opacity
 * - Clean timeline design
 * - Mobile-responsive stacked layout
 */
export default function ExperienceChapter() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="container-wide">
        {/* Desktop: Sticky two-column layout */}
        <div className="hidden lg:block">
          <StickyExperience
            items={experience}
            reducedMotion={reducedMotion}
            isInView={isInView}
          />
        </div>

        {/* Mobile: Standard stacked layout */}
        <div className="lg:hidden">
          <MobileExperience
            items={experience}
            reducedMotion={reducedMotion}
            isInView={isInView}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Desktop sticky layout with progress indicator
 */
function StickyExperience({ items, reducedMotion, isInView }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-12 gap-8 lg:gap-16"
      style={{ minHeight: `${items.length * 50}vh` }}
    >
      {/* Sticky left column */}
      <div className="col-span-4">
        <div className="sticky top-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reducedMotion ? 0.2 : 0.6 }}
          >
            {/* Section label */}
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">
              Career Journey
            </p>

            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-4">
              Experience
            </h2>

            <p className="text-lg text-neutral-600 mb-10">
              Research and industry experience in materials, semiconductors, and sustainable energy.
            </p>

            {/* Progress indicator */}
            {!reducedMotion && (
              <div className="relative pl-8">
                {/* Background track */}
                <div className="absolute left-0 top-0 w-0.5 h-full bg-neutral-200 rounded-full" />

                {/* Active progress */}
                <motion.div
                  className="absolute left-0 top-0 w-0.5 bg-accent rounded-full origin-top"
                  style={{ scaleY: progress, height: '100%' }}
                />

                {/* Company markers */}
                <div className="space-y-5">
                  {items.map((item, index) => (
                    <ProgressMarker
                      key={item.id}
                      item={item}
                      index={index}
                      total={items.length}
                      scrollProgress={scrollYProgress}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scrolling right column */}
      <div className="col-span-8 space-y-12 pt-4">
        {items.map((job, index) => (
          <ExperienceCard
            key={job.id}
            job={job}
            index={index}
            total={items.length}
            scrollProgress={scrollYProgress}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Progress marker for sticky sidebar
 */
function ProgressMarker({ item, index, total, scrollProgress }) {
  const isActive = useTransform(
    scrollProgress,
    [index / total, (index + 1) / total],
    [0, 1]
  );

  const opacity = useTransform(isActive, (value) => (value > 0.1 && value < 0.9 ? 1 : 0.4));
  const scale = useTransform(isActive, (value) => (value > 0.1 && value < 0.9 ? 1.3 : 1));

  return (
    <motion.div className="flex items-center gap-3" style={{ opacity }}>
      <motion.div
        className="w-2.5 h-2.5 rounded-full bg-accent -ml-8"
        style={{ scale }}
      />
      <span className="text-sm font-medium text-neutral-600 truncate">
        {item.company}
      </span>
    </motion.div>
  );
}

/**
 * Individual experience card with scroll-linked opacity
 */
function ExperienceCard({ job, index, total, scrollProgress, reducedMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Scroll-linked opacity (desktop sticky effect)
  const cardOpacity = useTransform(
    scrollProgress,
    [
      Math.max(0, (index - 0.5) / total),
      index / total,
      (index + 0.8) / total,
      Math.min(1, (index + 1.3) / total),
    ],
    [0.4, 1, 1, 0.4]
  );

  const smoothOpacity = useSpring(cardOpacity, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ opacity: reducedMotion ? 1 : smoothOpacity }}
      className="group"
    >
      <div
        className="bg-neutral-50 rounded-2xl p-8 lg:p-10 border border-neutral-100
                   hover:border-accent/20 transition-all duration-300
                   hover:shadow-lg hover:shadow-accent/5"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
          <div>
            <h3
              className="text-2xl lg:text-3xl font-heading font-bold text-neutral-900 mb-2
                         group-hover:text-accent transition-colors duration-200"
            >
              {job.role}
            </h3>
            <p className="text-lg text-accent font-medium">{job.company}</p>
          </div>
          <span className="text-sm text-neutral-500 mt-2 md:mt-0 font-medium bg-white px-3 py-1 rounded-full border border-neutral-200">
            {job.period}
          </span>
        </div>

        {/* Description bullets */}
        <ul className="space-y-3 mb-6">
          {job.description.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 mr-3 flex-shrink-0" />
              <span className="text-neutral-600 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white text-neutral-600 rounded-full text-sm
                       border border-neutral-200 group-hover:border-accent/30
                       group-hover:text-accent transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Mobile stacked layout
 */
function MobileExperience({ items, reducedMotion, isInView }) {
  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reducedMotion ? 0.2 : 0.6 }}
        className="mb-10"
      >
        <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">
          Career Journey
        </p>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-neutral-900 mb-4">
          Experience
        </h2>
        <p className="text-neutral-600">
          Research and industry experience in materials, semiconductors, and sustainable energy.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-neutral-200" />

        <div className="space-y-8">
          {items.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-10"
            >
              {/* Timeline dot */}
              <div className="absolute left-1.5 top-2 w-3 h-3 rounded-full bg-accent border-4 border-white" />

              <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
                <div className="mb-4">
                  <h3 className="text-xl font-heading font-bold text-neutral-900 mb-1">
                    {job.role}
                  </h3>
                  <p className="text-accent font-medium">{job.company}</p>
                  <span className="text-sm text-neutral-500 mt-1 block">
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {job.description.slice(0, 2).map((item, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 mr-2 flex-shrink-0" />
                      <span className="text-neutral-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {job.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white text-neutral-600 rounded-full text-xs border border-neutral-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
