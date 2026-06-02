import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function ExperienceChapter() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.07, delayChildren: 0.05 } },
  };

  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        background: '#faf5e8',
        borderTop: '1px solid #e5e5e5',
        paddingTop: '96px',
        paddingBottom: '96px',
      }}
    >
      <div className="container-wide">
        <motion.div variants={container} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          {/* Header */}
          <motion.div variants={fadeUp} style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#9a9a9a', textTransform: 'uppercase', marginBottom: '12px' }}>
              Career Journey
            </p>
            <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 500, letterSpacing: '-2px', color: '#0a0a0a', marginBottom: '12px' }}>
              Experience
            </h2>
            <p style={{ fontSize: '16px', color: '#6a6a6a', maxWidth: '44ch', lineHeight: 1.55 }}>
              Research and industry experience in materials, semiconductors, and sustainable energy.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-4">
            {experience.map((job) => (
              <motion.div key={job.id} variants={fadeUp}>
                <ExperienceCard job={job} reducedMotion={reducedMotion} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceCard({ job, reducedMotion }) {
  return (
    <motion.article
      whileHover={reducedMotion ? {} : { y: -2 }}
      transition={{ duration: 0.2 }}
      style={{
        background: '#f5f0e0',
        border: '1px solid #e5e5e5',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.3, marginBottom: '4px' }}>
            {job.role}
          </h3>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#6a6a6a' }}>
            {job.company}
          </p>
        </div>
        <span
          style={{
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 600,
            background: '#ebe6d6',
            color: '#6a6a6a',
            border: '1px solid #d6d0c4',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          {job.period}
        </span>
      </div>

      {/* Bullets */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', flex: 1 }}>
        {job.description.map((item, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontSize: '13px',
              color: '#3a3a3a',
              lineHeight: 1.55,
              marginBottom: i < job.description.length - 1 ? '8px' : 0,
            }}
          >
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#9a9a9a', marginTop: '6px', flexShrink: 0 }} />
            {item}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
        {job.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: '3px 10px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 500,
              background: '#ebe6d6',
              color: '#6a6a6a',
              border: '1px solid #d6d0c4',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
