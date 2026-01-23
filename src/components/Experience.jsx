import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { experience } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Experience() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);

  return (
    <section id="experience" className="py-24 px-6 lg:px-8 bg-white relative">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        {/* Desktop: Sticky two-column layout */}
        <div className="hidden lg:block">
          <StickyExperience items={experience} reducedMotion={reducedMotion} />
        </div>

        {/* Mobile: Standard stacked layout */}
        <div className="lg:hidden">
          <MobileExperience items={experience} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}

function StickyExperience({ items, reducedMotion }) {
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
      className="grid grid-cols-5 gap-12"
      style={{ minHeight: `${items.length * 60}vh` }}
    >
      {/* Sticky left column */}
      <div className="col-span-2">
        <div className="sticky top-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Experience
            </h2>
            <p className="text-gray-500 text-lg mb-10">
              Research and industry experience in materials, semiconductors, and sustainable energy.
            </p>

            {/* Progress indicator */}
            {!reducedMotion && (
              <div className="relative pl-6">
                {/* Background track */}
                <div className="absolute left-0 top-0 w-0.5 h-full bg-gray-100 rounded-full" />
                {/* Active progress */}
                <motion.div
                  className="absolute left-0 top-0 w-0.5 bg-purple-600 rounded-full origin-top"
                  style={{ scaleY: progress, height: '100%' }}
                />

                {/* Item markers */}
                <div className="space-y-6">
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
      <div className="col-span-3 space-y-16 pt-4">
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

function ProgressMarker({ item, index, total, scrollProgress }) {
  const isActive = useTransform(
    scrollProgress,
    [index / total, (index + 1) / total],
    [0, 1]
  );

  const opacity = useTransform(isActive, (value) => (value > 0.1 && value < 0.9 ? 1 : 0.4));
  const scale = useTransform(isActive, (value) => (value > 0.1 && value < 0.9 ? 1.2 : 1));

  return (
    <motion.div
      className="flex items-center gap-3"
      style={{ opacity }}
    >
      <motion.div
        className="w-2 h-2 rounded-full bg-purple-600 -ml-6"
        style={{ scale }}
      />
      <span className="text-sm font-medium text-gray-600 truncate">
        {item.company}
      </span>
    </motion.div>
  );
}

function ExperienceCard({ job, index, total, scrollProgress, reducedMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Calculate opacity based on scroll position (for desktop sticky effect)
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
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
              {job.role}
            </h3>
            <p className="text-lg text-purple-600 font-medium">
              {job.company}
            </p>
          </div>
          <span className="text-sm text-gray-500 mt-2 md:mt-0 font-medium">
            {job.period}
          </span>
        </div>

        <ul className="space-y-3 mb-6">
          {job.description.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-purple-600 mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
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
              className="px-3 py-1 bg-white text-gray-600 rounded-full text-sm border border-gray-200 group-hover:border-purple-200 group-hover:text-purple-600 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MobileExperience({ items, reducedMotion }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Experience
        </h2>
        <p className="text-gray-500 text-lg">
          Research and industry experience in materials, semiconductors, and sustainable energy.
        </p>
      </motion.div>

      <div className="space-y-6">
        {items.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex flex-col mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {job.role}
                </h3>
                <p className="text-purple-600 font-medium">
                  {job.company}
                </p>
                <span className="text-sm text-gray-500 mt-1">
                  {job.period}
                </span>
              </div>

              <ul className="space-y-2 mb-4">
                {job.description.map((item, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-purple-600 mr-2 mt-1.5 w-1 h-1 rounded-full bg-purple-600 flex-shrink-0" />
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
                    className="px-2.5 py-0.5 bg-white text-gray-600 rounded-full text-xs border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
