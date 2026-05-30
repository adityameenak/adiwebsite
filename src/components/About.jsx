import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { about } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function About() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.12, delayChildren: 0.05 } },
  };
  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

  const FOCUS_AREAS = [
    'Semiconductors',
    'Materials Science',
    'Sustainable Energy',
    'Process Optimization',
    'AI Engineering Tools',
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        background: '#faf5e8',
        borderTop: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      <div className="container-wide">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        >
          {/* Left — label + headline */}
          <div className="lg:col-span-4">
            <motion.p
              variants={fadeUp}
              style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#9a9a9a', textTransform: 'uppercase', marginBottom: '16px' }}
            >
              About
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 'clamp(32px, 3.5vw, 40px)',
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: '-1px',
                color: '#0a0a0a',
                marginBottom: '20px',
              }}
            >
              Engineering solutions for the future of technology.
            </motion.h2>

            {/* Focus area pills */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
              {FOCUS_AREAS.map((area) => (
                <span
                  key={area}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    background: '#f5f0e0',
                    border: '1px solid #e5e5e5',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#3a3a3a',
                  }}
                >
                  {area}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — body text */}
          <motion.div variants={fadeUp} className="lg:col-span-8 flex items-start">
            <p
              style={{
                fontSize: '17px',
                fontWeight: 400,
                lineHeight: 1.7,
                color: '#3a3a3a',
                maxWidth: '60ch',
              }}
            >
              {about.paragraph}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
