import { Suspense, lazy, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
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
 * - variant "compact" (home page): story + one clickable row per case that
 *   expands in place to show the same diagram and details.
 * Research roles (kind: "research") are one project, so instead of separate
 * cases they tell a single story: the project → how it was approached → what
 * was discovered. On the home page that story sits behind one dropdown.
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
            {compact && <p className="sec-sub">Click any project to see what it was and how it worked.</p>}
          </motion.div>

          <div className="xp-roles">
            {experience.map((job) => (
              <motion.article key={job.id} variants={fadeUp} className="xp-role">
                <RoleHeader job={job} />
                {job.kind === 'research' ? (
                  compact ? <ResearchToggle story={job.story} reducedMotion={reducedMotion} /> : <ResearchStory story={job.story} />
                ) : compact ? (
                  <CaseRows cases={job.cases} reducedMotion={reducedMotion} />
                ) : (
                  <CaseGrid cases={job.cases} />
                )}
              </motion.article>
            ))}
          </div>

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

function CaseRows({ cases, reducedMotion }) {
  const [openTitle, setOpenTitle] = useState(null);
  const baseId = useId();

  return (
    <ul className="xp-rows">
      {cases.map((c, i) => {
        const open = openTitle === c.title;
        const panelId = `${baseId}-case-${i}`;
        return (
          <li key={c.title} className={`xp-row${open ? ' is-open' : ''}`}>
            <button
              type="button"
              className="xp-row__btn"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenTitle(open ? null : c.title)}
            >
              <span className="case__tag">{c.tag}</span>
              <span className="xp-row__title">{c.title}</span>
              <span className="xp-row__result">{c.result}</span>
              <span className="xp-row__chev" aria-hidden="true">{open ? '−' : '+'}</span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  className="xp-row__panel"
                  initial={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0.1 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="xp-row__inner">
                    <CaseDetail c={c} layout="wide" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
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

/** One expandable "See the research" panel for a research role (home page). */
function ResearchToggle({ story, reducedMotion }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div className={`xp-rows xp-research${open ? ' is-open' : ''}`}>
      <div className={`xp-row${open ? ' is-open' : ''}`}>
        <button type="button" className="xp-row__btn xp-row__btn--research" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
          <span className="case__tag">Research</span>
          <span className="xp-row__title">{open ? 'Hide the research' : 'See the research: the project, my approach and what I found'}</span>
          <span />
          <span className="xp-row__chev" aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              className="xp-row__panel"
              initial={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={reducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: reducedMotion ? 0.1 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="xp-row__inner"><ResearchStory story={story} /></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
