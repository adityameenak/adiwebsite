import { Suspense, lazy, useState } from 'react';
import { Link } from 'react-router-dom';
import { experience } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import StatRow from './StatRow';
import RoleIcon from './experience/RoleIcon';
// Keep the diagrams and walkthroughs out of the home-page bundle.
const Diagram = lazy(() => import('./experience/diagrams'));
const ExperienceWalkthrough = lazy(() => import('./walkthrough/ExperienceWalkthrough'));
const SamsungWalkthrough = lazy(() => import('./walkthrough/SamsungWalkthrough'));

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
export default function ExperienceChapter({ variant = 'full', titleAs: Title = 'h2' }) {
  const ref = useReveal({ threshold: 0.04 });
  const compact = variant === 'compact';

  if (compact) {
    return (
      <section ref={ref} id="experience" className="section">
        <div className="frame">
          <header className="section-head" data-reveal>
            <h2 className="section-title">Experience</h2>
            <p className="section-desc">Fab, lab and research work, each with a short walkthrough of how it works.</p>
            <Link to="/experience" className="section-link">Full case studies <span aria-hidden="true">→</span></Link>
          </header>
          <div className="xp-cards">
            {experience.map((job, i) => (
              <div key={job.id} data-reveal style={{ '--i': i + 1 }}><RoleCard job={job} /></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="experience" className="section section--page">
      <div className="frame">
        <header className="section-head" data-reveal>
          <Title className="section-title">Experience</Title>
          <p className="section-desc">Case studies from the fab and the lab: the problem, the approach and the result.</p>
        </header>
        <div className="xp-roles">
          {experience.map((job, i) => (
            <article key={job.id} data-reveal style={{ '--i': Math.min(i, 2) + 1 }} className="xp-role">
              <RoleHeader job={job} />
              {job.kind === 'research' && job.story ? <ResearchStory story={job.story} poster={job.researchPoster} /> : job.cases ? <CaseGrid cases={job.cases} /> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** "Austin, TX • May 2026 – Aug 2026" → place and dates; a bare value ("Incoming") is the dates. */
function splitPeriod(period = '') {
  const parts = period.split(' \u2022 ');
  return parts.length > 1 ? { place: parts[0], dates: parts[1] } : { place: '', dates: parts[0] };
}
const joinMeta = (...parts) => parts.filter(Boolean).join(' · ');

function IncomingBadge({ job }) {
  return job.status === 'incoming' ? <span className="badge">Incoming</span> : null;
}

function RoleHeader({ job }) {
  const { place, dates } = splitPeriod(job.period);
  return (
    <header className="xp-head">
      <span className="xp-head__icon"><RoleIcon name={job.icon} /></span>
      <div className="xp-head__body">
        <h3 className="xp-head__role">{job.role} <IncomingBadge job={job} /></h3>
        <p className="xp-head__meta">
          <span>{job.company}</span>
          {joinMeta(dates, place) && <span className="xp-head__dates">{joinMeta(dates, place)}</span>}
        </p>
        {job.summary && <p className="xp-head__story">{job.summary}</p>}
      </div>
    </header>
  );
}

const PLAY_ICON = (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4l14 8-14 8z" /></svg>
);

/** A case's "how it works" control and the player it opens. */
function CaseWatch({ c, className, children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} aria-haspopup="dialog" aria-label={`Watch how it works: ${c.title}`} onClick={() => setOpen(true)}>
        {children}
      </button>
      {open && (
        <Suspense fallback={null}>
          <SamsungWalkthrough id={c.walkthrough} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  );
}

/** Home-page summary of one role: its cases each get a walkthrough, otherwise the role does. */
function RoleCard({ job }) {
  const [open, setOpen] = useState(false);
  const { dates } = splitPeriod(job.period);
  const hasCases = Boolean(job.cases);
  const brief = !hasCases && !job.poster;
  return (
    <article className={`xp-card${hasCases ? ' xp-card--cases' : ''}${brief ? ' xp-card--brief' : ''}`}>
      <div className="xp-card__body">
        <p className="xp-card__org">{job.org} <IncomingBadge job={job} /></p>
        <h3 className="xp-card__role">{job.role}</h3>
        {joinMeta(dates, job.place) && <p className="xp-card__when">{joinMeta(dates, job.place)}</p>}
        {job.blurb && <p className="xp-card__blurb">{job.blurb}</p>}
        {job.stats && <StatRow stats={job.stats} />}
      </div>
      {hasCases ? (
        <ul className="xp-tiles">
          {job.cases.map((c) => (
            <li key={c.title}>
              <CaseWatch c={c} className="xp-tile">
                <span className="xp-tile__title">{c.title}</span>
                <span className="xp-tile__result">{c.result}</span>
                <span className="xp-tile__cta">{PLAY_ICON} How it works</span>
              </CaseWatch>
            </li>
          ))}
        </ul>
      ) : job.poster ? (
        <button type="button" className="wt-poster" aria-haspopup="dialog" aria-label={`Watch how it works: ${job.role}`} onClick={() => setOpen(true)}>
          <span className="wt-poster__art" aria-hidden="true">
            <Suspense fallback={<span className="dg-placeholder" />}>
              <Diagram id={job.poster} label="" />
            </Suspense>
          </span>
          <span className="wt-poster__cta">{PLAY_ICON} Watch how it works</span>
        </button>
      ) : (
        <span className="xp-card__mark" aria-hidden="true"><RoleIcon name={job.icon} size={40} /></span>
      )}
      {open && job.walkthrough && (
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
function ResearchStory({ story, poster }) {
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

      {poster && (
        <section className="rs-block rs-block--poster">
          <div className="rs-poster__head">
            <p className="rs-label">Research poster</p>
            <a href={poster.pdf} target="_blank" rel="noopener noreferrer">Open PDF ↗</a>
          </div>
          <a className="rs-poster" href={poster.pdf} target="_blank" rel="noopener noreferrer" aria-label={`Open poster PDF: ${poster.title}`}>
            <img src={poster.src} alt={poster.alt} width="2000" height="1500" loading="lazy" decoding="async" />
          </a>
        </section>
      )}
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

        {c.walkthrough && <CaseWatch c={c} className="xp-tile__cta xp-tile__cta--inline">{PLAY_ICON} Watch how it works</CaseWatch>}

        {(c.tools?.length || c.links?.length) && (
          <div className="case__foot">
            {c.tools?.map((tool) => <span key={tool} className="chip">{tool}</span>)}
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
