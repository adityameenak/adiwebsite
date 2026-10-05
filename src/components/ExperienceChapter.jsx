import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionLabel from './effects/SectionLabel';

export default function ExperienceChapter() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.08, delayChildren: 0.05 } },
  };
  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section ref={sectionRef} id="experience" className="sec sec--soft">
      <div className="container-wide">
        <motion.div variants={container} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="sec-head">
            <SectionLabel>Career</SectionLabel>
            <h2 className="sec-title">Experience</h2>
          </motion.div>

          <div>
            {experience.map((job) => {
              const [place, dates] = job.period.split(' • ');
              return (
                <motion.article key={job.id} variants={fadeUp} className="role">
                  <div>
                    <h3 className="role__title">{job.role}</h3>
                    <p className="role__org">{job.company}</p>
                    <p className="role__date">{dates}<br />{place}</p>
                  </div>
                  <ul>
                    {job.description.map((item) => <li key={item.slice(0, 32)}>{item}</li>)}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
