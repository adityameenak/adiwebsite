import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Muted, warm-palette accents — distinct but not loud
const ACCENTS = ['#b87c45', '#5a7e70', '#7370a0', '#6a849a', '#9a6a52', '#5e7a68'];

export default function ExperienceChapter() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.09, delayChildren: 0.05 } },
  };

  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

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
          <motion.div variants={fadeUp} style={{ marginBottom: '56px' }}>
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

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {experience.map((job, index) => (
              <motion.div key={job.id} variants={fadeUp}>
                <ExperienceCard job={job} index={index} reducedMotion={reducedMotion} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceCard({ job, index, reducedMotion }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      whileHover={reducedMotion ? {} : { y: -2 }}
      transition={{ duration: 0.2 }}
      style={{
        background: 'linear-gradient(155deg, #fdf9f2 0%, #f5f0e0 100%)',
        border: '1px solid #e5e5e5',
        borderLeft: `3px solid ${accent}`,
        borderRadius: '16px',
        padding: '28px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost index number — decorative background element */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-12px',
          right: '24px',
          fontSize: '88px',
          fontWeight: 700,
          color: accent,
          opacity: 0.07,
          letterSpacing: '-4px',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {num}
      </span>

      {/* Two-column layout: meta | bullets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

        {/* Left column — identity */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: accent,
              letterSpacing: '1.4px',
              textTransform: 'uppercase',
              marginBottom: '10px',
              opacity: 0.75,
            }}
          >
            {num}
          </span>

          <h3
            style={{
              fontSize: '17px',
              fontWeight: 600,
              color: '#0a0a0a',
              lineHeight: 1.25,
              marginBottom: '5px',
            }}
          >
            {job.role}
          </h3>

          <p
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: accent,
              marginBottom: '12px',
              opacity: 0.85,
            }}
          >
            {job.company}
          </p>

          <span
            style={{
              padding: '4px 11px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 600,
              background: 'rgba(0,0,0,0.04)',
              color: '#6a6a6a',
              border: '1px solid #d6d0c4',
              display: 'inline-block',
              alignSelf: 'flex-start',
              marginBottom: '20px',
              whiteSpace: 'nowrap',
            }}
          >
            {job.period}
          </span>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: 'auto' }}>
            {job.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '3px 9px',
                  borderRadius: '9999px',
                  fontSize: '10px',
                  fontWeight: 600,
                  background: `${accent}15`,
                  color: accent,
                  border: `1px solid ${accent}30`,
                  letterSpacing: '0.2px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right column — description */}
        <div className="lg:col-span-2" style={{ display: 'flex', alignItems: 'flex-start' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
            {job.description.map((item, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  fontSize: '14px',
                  color: '#3a3a3a',
                  lineHeight: 1.65,
                  marginBottom: i < job.description.length - 1 ? '10px' : 0,
                }}
              >
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: accent,
                    marginTop: '8px',
                    flexShrink: 0,
                    opacity: 0.55,
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}
