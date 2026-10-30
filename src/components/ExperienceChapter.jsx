import { Suspense, lazy, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionLabel from './effects/SectionLabel';
import RoleIcon from './experience/RoleIcon';
import StatRow from './StatRow';
// Keep the diagrams and walkthroughs out of the home-page bundle.
const Diagram = lazy(() => import('./experience/diagrams'));
const ExperienceWalkthrough = lazy(() => import('./walkthrough/ExperienceWalkthrough'));

/**
 * Experience as short case studies rather than resume bullets.
 * - variant "full" (the /experience page): story + Problem → Approach → Result
 *   cards, each with a schematic diagram and a "What is …?" explainer.
 * - variant "compact" (home page): one card per role with its key numbers and
 *   a "Watch how it works" walkthrough. The detail lives on /experience.
 * Research roles (kind: "research") are one project, so instead of separate
 * cases they tell a single story: the project → how it was approached → what
 * was discovered.
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

          {compact ? (
            <>
              <div className="xp-cards">
                {experience.map((job) => (
                  <motion.div key={job.id} variants={fadeUp}><RoleCard job={job} /></motion.div>
                ))}
              </div>
              <motion.p variants={fadeUp} className="xp-more">
                <Link to="/experience">Read the full case studies <span aria-hidden="true">→</span></Link>
              </motion.p>
            </>
          ) : (
            <div className="xp-roles">
              {experience.map((job) => (
                <motion.article key={job.id} variants={fadeUp} className="xp-role">
                  <RoleHeader job={job} />
                  {job.kind === 'research' ? <ResearchStory story={job.story} /> : <CaseGrid cases={job.cases} />}
                </motion.article>
              ))}
            </div>
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

/** Home-page summary of one role. */
function RoleCard({ job }) {
  const [open, setOpen] = useState(false);
  const [, dates] = job.period.split(' • ');
  return (
    <article className="xp-card">
      <div className="xp-card__body">
        <p className="xp-card__org">{job.org}</p>
        <h3 className="xp-card__role">{job.role}</h3>
        <p className="xp-card__when">{dates} · {job.place}</p>
        <p className="xp-card__blurb">{job.blurb}</p>
        <StatRow stats={job.stats} />
      </div>
      <button type="button" className="wt-poster" aria-haspopup="dialog" aria-label={`Watch how it works: ${job.role}`} onClick={() => setOpen(true)}>
        <span className="wt-poster__art" aria-hidden="true">
          <Suspense fallback={<span className="dg-placeholder" />}>
            <Diagram id={job.poster} label="" />
          </Suspense>
        </span>
        <span className="wt-poster__cta">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4l14 8-14 8z" /></svg>
          Watch how it works
        </span>
      </button>
      {open && (
        <Suspense fallback={null}>
          <ExperienceWalkthrough walkthrough={job.walkthrough} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </article>
  );
}

function CaseGrid({ cases }) {
  return (
    <div className="xp-grid">
      {cases.map((c) => (
        <article key={c.title} className="case">
          <CaseDetail c={c} />
        </article>
      ))}
    </div>
  );
}

function CaseFigure({ diagram, caption, label }) {
  return (
    <figure className="case__figure">
      <Suspense fallback={<div className="dg-placeholder" />}>
        <Diagram id={diagram} label={`Diagram: ${label}. ${caption || ''}`} />
      </Suspense>
      {caption && <figcaption className="case__caption">{caption}</figcaption>}
    </figure>
  );
}

function Explainer({ explainer }) {
  if (!explainer) return null;
  return (
    <details className="case__explainer">
      <summary>{explainer.title}</summary>
      <p>{explainer.text}</p>
    </details>
  );
}

function Links({ links }) {
  if (!links?.length) return null;
  return (
    <div className="case__foot">
      {links.map((l) => (
        <a key={l.href} href={l.href} className="case__link" target="_blank" rel="noopener noreferrer">
          {l.label} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

/** The project → How I approached it → What I discovered. */
function ResearchStory({ story }) {
  const { project, approach, findings } = story;
  return (
    <div className="rs">
      <section className="rs-block">
        <p className="rs-label">The project</p>
        <div className="rs-split">
          <div>
            <p className="rs-text">{project.text}</p>
            <Explainer explainer={project.explainer} />
          </div>
          <CaseFigure diagram={project.diagram} caption={project.caption} label="The project" />
        </div>
      </section>

      <section className="rs-block">
        <p className="rs-label">How I approached it</p>
        <ol className="rs-steps">
          {approach.map((step, i) => (
            <li key={step.title} className={`rs-step${step.diagram ? ' has-figure' : ''}`}>
              <span className="rs-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="rs-step__body">
                <h4 className="rs-step__title">{step.title}</h4>
                <p className="rs-text">{step.text}</p>
                <Links links={step.links} />
              </div>
              {step.diagram && <CaseFigure diagram={step.diagram} caption={step.caption} label={step.title} />}
            </li>
          ))}
        </ol>
      </section>

      <section className="rs-block">
        <p className="rs-label">What I discovered</p>
        <ul className="rs-findings">
          {findings.map((f) => <li key={f.slice(0, 32)}>{f}</li>)}
        </ul>
      </section>
    </div>
  );
}

/** Diagram + plain-English caption + explainer + Problem → Approach → Result. */
function CaseDetail({ c, layout = 'card' }) {
  return (
    <div className={`case-detail case-detail--${layout}`}>
      <CaseFigure diagram={c.diagram} caption={c.caption} label={c.title} />

      <div className="case__body">
        {layout === 'card' && (
          <>
            <span className="case__tag">{c.tag}</span>
            <h4 className="case__title">{c.title}</h4>
          </>
        )}
        <dl className="case__steps">
          {c.problem && (<><dt>Problem</dt><dd>{c.problem}</dd></>)}
          <dt>Approach</dt><dd>{c.approach}</dd>
          <dt className="is-result">Result</dt><dd className="case__result">{c.result}</dd>
        </dl>

        <Explainer explainer={c.explainer} />

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
    </div>
  );
}
