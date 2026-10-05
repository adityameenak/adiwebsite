import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { education, awards } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionLabel from './effects/SectionLabel';

const COURSEWORK = [
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
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.08, delayChildren: 0.04 } },
  };
  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section ref={sectionRef} id="education" className="sec">
      <div className="container-wide">
        <motion.div variants={container} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="sec-head">
            <SectionLabel>Education &amp; Honors</SectionLabel>
            <h2 className="sec-title">Education</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Degree + coursework */}
            <motion.div variants={fadeUp} className="panel lg:col-span-7" style={{ borderLeft: '3px solid var(--accent)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                {education.school}
              </h3>
              <p style={{ fontSize: '14.5px', color: 'var(--muted)', marginTop: '4px' }}>
                {education.degree} · {education.major}
              </p>

              <dl className="edu-facts">
                <div><dt>GPA</dt><dd>{education.gpa}</dd></div>
                <div><dt>Graduating</dt><dd>{education.graduationDate}</dd></div>
                <div><dt>Location</dt><dd>{education.location}</dd></div>
              </dl>

              <p className="eyebrow" style={{ margin: '22px 0 10px' }}>Coursework</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {COURSEWORK.map((course) => (
                  <span key={course} className="mono-chip">{course}</span>
                ))}
              </div>
            </motion.div>

            {/* Honors & awards */}
            <motion.div variants={fadeUp} id="awards" className="panel lg:col-span-5" style={{ scrollMarginTop: '80px' }}>
              <p className="eyebrow eyebrow--accent" style={{ marginBottom: '14px' }}>Honors &amp; Awards</p>
              <div>
                {awards.map((award) => (
                  <div key={award.id} className="honor">
                    <span className="honor__name">{award.name}</span>
                    {award.org && <span className="honor__meta">{award.org}</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
