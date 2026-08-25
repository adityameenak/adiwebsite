import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { awards } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Muted, warm-palette accents — distinct but not loud
const ACCENTS = ['#b87c45', '#5a7e70', '#7370a0', '#6a849a'];

export default function AwardsChapter() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.08, delayChildren: 0.04 } },
  };

  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section
      ref={sectionRef}
      id="awards"
      style={{
        background: '#fffaf0',
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
              Recognition
            </p>
            <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 500, letterSpacing: '-2px', color: '#0a0a0a', marginBottom: '12px' }}>
              Awards
            </h2>
            <p style={{ fontSize: '16px', color: '#6a6a6a', maxWidth: '44ch', lineHeight: 1.55 }}>
              Fellowships and honors recognizing research and engineering achievement.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {awards.map((award, index) => {
              const accent = ACCENTS[index % ACCENTS.length];
              return (
                <motion.div
                  key={award.id}
                  variants={fadeUp}
                  whileHover={reducedMotion ? {} : { y: -2 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: 'linear-gradient(155deg, #fdf9f2 0%, #f5f0e0 100%)',
                    border: '1px solid #e5e5e5',
                    borderLeft: `3px solid ${accent}`,
                    borderRadius: '16px',
                    padding: '24px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <p style={{ fontSize: '11px', fontWeight: 700, color: accent, letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '10px', opacity: 0.75 }}>
                    Fellowship &amp; Honors
                  </p>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#0a0a0a', lineHeight: 1.3 }}>
                    {award.name}
                    {award.org && (
                      <span style={{ fontSize: '13px', fontWeight: 500, color: '#6a6a6a' }}> ({award.org})</span>
                    )}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
