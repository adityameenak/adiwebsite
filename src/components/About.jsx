import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { about, technicalSkills } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionLabel from './effects/SectionLabel';

export default function About() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.1, delayChildren: 0.05 } },
  };
  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section ref={sectionRef} id="about" className="sec sec--soft">
      <div className="container-wide">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14"
        >
          {/* Left — story */}
          <div className="lg:col-span-7">
            <SectionLabel>About</SectionLabel>
            <motion.h2 variants={fadeUp} className="sec-title" style={{ marginBottom: '18px', maxWidth: '20ch' }}>
              {about.headline}
            </motion.h2>
            {about.paragraphs.map((text) => (
              <motion.p
                key={text.slice(0, 24)}
                variants={fadeUp}
                style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--body)', maxWidth: '62ch', marginBottom: '14px' }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Right — currently + toolkit */}
          <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col gap-4">
            <div className="panel">
              <p className="eyebrow eyebrow--accent" style={{ marginBottom: '10px' }}>Currently</p>
              <ul className="now-list">
                {about.currently.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="panel">
              <p className="eyebrow eyebrow--accent" style={{ marginBottom: '12px' }}>Toolkit</p>
              <dl>
                {technicalSkills.map((group) => (
                  <div key={group.category} className="kit-row">
                    <dt>{group.category}</dt>
                    <dd>{group.skills.join(' · ')}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
