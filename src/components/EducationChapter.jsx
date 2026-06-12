import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { education, technicalSkills, advancedCoursework } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ACCENT = '#b87c45';

const CATEGORY_COLORS = [
  { bg: '#b87c4518', border: '#b87c4535', text: '#b87c45' },
  { bg: '#5a7e7018', border: '#5a7e7035', text: '#5a7e70' },
  { bg: '#7370a018', border: '#7370a035', text: '#7370a0' },
  { bg: '#6a849a18', border: '#6a849a35', text: '#6a849a' },
];

export default function EducationChapter() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });
  const [activeTab, setActiveTab] = useState('stack');

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
              Technical skills, tools, and coursework from engineering research and software development.
            </p>
          </motion.div>

          {/* Degree card */}
          <motion.div
            variants={fadeUp}
            style={{
              background: 'linear-gradient(155deg, #fdf9f2 0%, #f5f0e0 100%)',
              border: '1px solid #e5e5e5',
              borderLeft: `3px solid ${ACCENT}`,
              borderRadius: '16px',
              padding: '28px 32px',
              marginBottom: '40px',
            }}
          >
            <p style={{ fontSize: '11px', fontWeight: 700, color: ACCENT, letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '8px', opacity: 0.75 }}>
              Degree
            </p>
            <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#0a0a0a', marginBottom: '4px' }}>
              {education.school}
            </h3>
            <p style={{ fontSize: '14px', color: '#6a6a6a', marginBottom: '16px' }}>
              {education.degree} · {education.major}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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

          {/* Tabs */}
          <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
            <div
              style={{
                display: 'inline-flex',
                background: 'rgba(0,0,0,0.04)',
                borderRadius: '10px',
                padding: '4px',
                gap: '2px',
              }}
            >
              {[
                { id: 'stack', label: 'Technical Stack' },
                { id: 'courses', label: 'Coursework' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '7px',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    background: activeTab === tab.id ? '#fdf9f2' : 'transparent',
                    color: activeTab === tab.id ? '#0a0a0a' : '#6a6a6a',
                    boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab content */}
          {activeTab === 'stack' && (
            <motion.div
              key="stack"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}
            >
              {technicalSkills.map((group, i) => {
                const color = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
                return (
                  <div
                    key={group.category}
                    style={{
                      background: 'linear-gradient(155deg, #fdf9f2 0%, #f5f0e0 100%)',
                      border: '1px solid #e5e5e5',
                      borderTop: `3px solid ${color.text}`,
                      borderRadius: '14px',
                      padding: '22px 24px',
                    }}
                  >
                    <p style={{ fontSize: '11px', fontWeight: 700, color: color.text, letterSpacing: '1.3px', textTransform: 'uppercase', marginBottom: '14px', opacity: 0.85 }}>
                      {group.category}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            padding: '5px 12px',
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
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '8px' }}
            >
              {advancedCoursework.map((course, i) => (
                <div
                  key={course.code}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: 'linear-gradient(155deg, #fdf9f2 0%, #f5f0e0 100%)',
                    border: '1px solid #e5e5e5',
                    borderRadius: '12px',
                    padding: '14px 18px',
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: 700,
                      background: `${ACCENT}15`,
                      color: ACCENT,
                      border: `1px solid ${ACCENT}30`,
                      letterSpacing: '0.3px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {course.code}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#3a3a3a', lineHeight: 1.3 }}>
                    {course.name}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
}
