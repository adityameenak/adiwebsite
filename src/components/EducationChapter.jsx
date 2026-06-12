import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { education } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ACCENT = '#b87c45';

const FOCUS_AREAS = [
  'Fluid Mechanics',
  'Thermodynamics',
  'Heat & Mass Transfer',
  'Chemical Reaction Engineering',
  'Transport Phenomena',
  'Process Dynamics & Control',
  'Materials Science',
  'Electrochemistry & Battery Systems',
  'Semiconductor Processes & Microelectronics',
  'Engineering Mathematics',
];

export default function EducationChapter() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });

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
      id="education"
      style={{
        background: '#faf5e8',
        borderTop: '1px solid #e5e5e5',
        paddingTop: '96px',
        paddingBottom: '96px',
      }}
    >
      <div className="container-wide">
        <motion.div variants={container} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>

          {/* Section header */}
          <motion.div variants={fadeUp} style={{ marginBottom: '52px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#9a9a9a', textTransform: 'uppercase', marginBottom: '12px' }}>
              Academic Background
            </p>
            <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 500, letterSpacing: '-2px', color: '#0a0a0a', marginBottom: '12px' }}>
              Education
            </h2>
            <p style={{ fontSize: '16px', color: '#6a6a6a', maxWidth: '44ch', lineHeight: 1.55 }}>
              Chemical engineering with a focus on batteries, semiconductor processes, and advanced materials.
            </p>
          </motion.div>

          {/* Two-column layout: degree card + focus areas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

            {/* Degree card */}
            <motion.div
              variants={fadeUp}
              style={{
                background: 'linear-gradient(155deg, #fdf9f2 0%, #f5f0e0 100%)',
                border: '1px solid #e5e5e5',
                borderLeft: `3px solid ${ACCENT}`,
                borderRadius: '16px',
                padding: '28px 32px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <p style={{ fontSize: '11px', fontWeight: 700, color: ACCENT, letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.75 }}>
                Degree
              </p>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0a0a0a', marginBottom: '6px', lineHeight: 1.25 }}>
                {education.school}
              </h3>
              <p style={{ fontSize: '14px', color: '#6a6a6a', marginBottom: '20px', lineHeight: 1.5 }}>
                {education.degree}<br />{education.major}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
                {[
                  { label: 'Graduating', value: education.graduationDate },
                  { label: 'Location', value: education.location },
                ].map(({ label, value }) => (
                  <span
                    key={label}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: 'rgba(0,0,0,0.04)',
                      color: '#6a6a6a',
                      border: '1px solid #d6d0c4',
                    }}
                  >
                    {label}: {value}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Focus areas */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-2"
              style={{
                background: 'linear-gradient(155deg, #fdf9f2 0%, #f5f0e0 100%)',
                border: '1px solid #e5e5e5',
                borderTop: `3px solid ${ACCENT}`,
                borderRadius: '16px',
                padding: '28px 32px',
              }}
            >
              <p style={{ fontSize: '11px', fontWeight: 700, color: ACCENT, letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '18px', opacity: 0.75 }}>
                Coursework Focus
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {FOCUS_AREAS.map((area) => (
                  <span
                    key={area}
                    style={{
                      padding: '7px 15px',
                      borderRadius: '9999px',
                      fontSize: '13px',
                      fontWeight: 500,
                      background: `${ACCENT}12`,
                      color: '#3a3a3a',
                      border: `1px solid ${ACCENT}25`,
                    }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
