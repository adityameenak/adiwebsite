import { Suspense, lazy, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionLabel from './effects/SectionLabel';
import RoleIcon from './experience/RoleIcon';
// Diagrams only appear on /experience, so keep them out of the home-page bundle.
const Diagram = lazy(() => import('./experience/diagrams'));

/**
 * Experience as short case studies rather than resume bullets.
 * - variant "full" (the /experience page): story + Problem → Approach → Result
 *   cards, each with a schematic diagram and a "What is …?" explainer.
 * - variant "compact" (home page): story + one line per case, linking to the full page.
 */
export default function ExperienceChapter({ variant = 'full' }) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const compact = variant === 'compact';

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

          <div className="xp-roles">
            {experience.map((job) => (
              <motion.article key={job.id} variants={fadeUp} className="xp-role">
                <RoleHeader job={job} />
                {compact ? <CaseRows cases={job.cases} /> : <CaseGrid cases={job.cases} />}
              </motion.article>
            ))}
          </div>

          {compact && (
            <motion.div variants={fadeUp}>
              {/* The router keeps the scroll position, so start the new page at the top. */}
              <Link to="/experience" className="xp-more" onClick={() => window.scrollTo(0, 0)}>
                Read the case studies <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function RoleHeader({ job }) {
  const [place, dates] = job.period.split(' • ');
  return (
    <header className="xp-head">
      <span className="xp-head__icon"><RoleIcon name={job.icon} /></span>
      <div className="xp-head__body">
        <p className="xp-head__meta">
          <span>{job.company}</span>
          <span className="xp-head__dates">{dates} · {place}</span>
        </p>
        <h3 className="xp-head__role">{job.role}</h3>
        <p className="xp-head__story">{job.summary}</p>
      </div>
    </header>
  );
}

function CaseRows({ cases }) {
  return (
    <ul className="xp-rows">
      {cases.map((c) => (
        <li key={c.title} className="xp-row">
          <span className="case__tag">{c.tag}</span>
          <span className="xp-row__title">{c.title}</span>
          <span className="xp-row__result">{c.result}</span>
        </li>
      ))}
    </ul>
  );
}

function CaseGrid({ cases }) {
  return (
    <div className="xp-grid">
      {cases.map((c) => (
        <article key={c.title} className="case">
          <div className="case__figure">
            <Suspense fallback={<div className="dg-placeholder" />}>
              <Diagram id={c.diagram} label={`Diagram: ${c.title}`} />
            </Suspense>
          </div>
          {c.explainer && (
            <details className="case__explainer">
              <summary>{c.explainer.title}</summary>
              <p>{c.explainer.text}</p>
            </details>
          )}

          <div className="case__body">
            <span className="case__tag">{c.tag}</span>
            <h4 className="case__title">{c.title}</h4>
            <dl className="case__steps">
              {c.problem && (<><dt>Problem</dt><dd>{c.problem}</dd></>)}
              <dt>Approach</dt><dd>{c.approach}</dd>
              <dt className="is-result">Result</dt><dd className="case__result">{c.result}</dd>
            </dl>

            {(c.tools?.length || c.links?.length) && (
              <div className="case__foot">
                {c.tools?.map((tool) => <span key={tool} className="mono-chip">{tool}</span>)}
                {c.links?.map((l) => (
                  <a key={l.href} href={l.href} className="case__link" target="_blank" rel="noopener noreferrer">
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
