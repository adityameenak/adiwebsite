import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { technicalSkills } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

const CATEGORY_COLORS = [
  { text: '#b87c45', bg: '#b87c4514', border: '#b87c4530' },
  { text: '#5a7e70', bg: '#5a7e7014', border: '#5a7e7030' },
  { text: '#7370a0', bg: '#7370a014', border: '#7370a030' },
];

export default function TechStackSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.1, delayChildren: 0.05 } },
  };

  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#fffaf0',
        borderTop: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5',
        paddingTop: '72px',
        paddingBottom: '72px',
      }}
    >
      <div className="container-wide">
        <motion.div variants={container} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>

          {/* Header row */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}
          >
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#9a9a9a', textTransform: 'uppercase', marginBottom: '8px' }}>
                Technical Stack
              </p>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 500, letterSpacing: '-1.5px', color: '#0a0a0a' }}>
                Skills & Tools
              </h2>
            </div>
            <button
              onClick={() => navigate('/education')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#6a6a6a',
                background: 'none',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              View coursework
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          {/* Skill category columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {technicalSkills.map((group, i) => {
              const color = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
              return (
                <motion.div
                  key={group.category}
                  variants={fadeUp}
                  style={{
                    background: 'linear-gradient(155deg, #fdf9f2 0%, #f5f0e0 100%)',
                    border: '1px solid #e5e5e5',
                    borderTop: `3px solid ${color.text}`,
                    borderRadius: '14px',
                    padding: '20px 22px',
                  }}
                >
                  <p style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: color.text,
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    marginBottom: '14px',
                    opacity: 0.85,
                  }}>
                    {group.category}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          padding: '4px 11px',
                          borderRadius: '9999px',
                          fontSize: '12px',
                          fontWeight: 600,
                          background: color.bg,
                          color: color.text,
                          border: `1px solid ${color.border}`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
