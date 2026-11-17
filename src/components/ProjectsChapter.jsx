import { Suspense, lazy, useState } from 'react';
import { projects } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import StatRow from './StatRow';

// Walkthroughs load on first open, so their data stays out of the home-page bundle.
const WALKTHROUGHS = {
  battery: lazy(() => import('./walkthrough/BatteryWalkthrough')),
  researchFinder: lazy(() => import('./walkthrough/ResearchFinderWalkthrough')),
};

const PLAY = (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4l14 8-14 8z" /></svg>
);
const OUT = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

const projectAnchor = (title) => `project-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
const isExternal = (href) => href.startsWith('http') || href.endsWith('.pdf');

export default function ProjectsChapter({ titleAs: Title = 'h2' }) {
  const ref = useReveal({ threshold: 0.04 });
  const isPage = Title === 'h1';
  const leads = projects.filter((p) => p.lead);
  const rest = projects.filter((p) => !p.lead);

  return (
    <section ref={ref} id="projects" className={`section${isPage ? ' section--page' : ''}`}>
      <div className="frame">
        <header className="section-head" data-reveal>
          <Title className="section-title">Projects</Title>
          <p className="section-desc">Research, tools and writing. The first two come with a walkthrough.</p>
        </header>

        <div className="features">
          {leads.map((project, i) => (
            <div key={project.id} data-reveal style={{ '--i': i + 1 }}>
              <FeatureProject project={project} />
            </div>
          ))}
        </div>

        <ul className="shelf">
          {rest.map((project, i) => (
            <li key={project.id} data-reveal style={{ '--i': i + 1 }}>
              <ShelfProject project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeatureProject({ project }) {
  const [open, setOpen] = useState(false);
  const Player = WALKTHROUGHS[project.walkthrough];

  return (
    <article id={projectAnchor(project.title)} className="feature" style={{ scrollMarginTop: '88px' }}>
      <button type="button" className="feature__media" aria-haspopup="dialog" aria-label={`Watch how it works: ${project.title}`} onClick={() => setOpen(true)}>
        <img src={project.image.src} alt={project.image.alt} loading="lazy" decoding="async" />
        <span className="feature__play">{PLAY} Watch how it works</span>
      </button>

      <div className="feature__body">
        <p className="meta">{project.type}</p>
        <h3 className="feature__title">{project.title}</h3>
        <p className="feature__text">{project.shortDescription}</p>
        {project.stats && <StatRow stats={project.stats} />}
        <div className="tags">
          {project.tags.slice(0, 5).map((tag) => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <div className="feature__links">
          {project.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={link.primary ? 'btn btn--solid btn--sm' : 'btn btn--line btn--sm'}
              {...(isExternal(link.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label} {OUT}
            </a>
          ))}
        </div>
      </div>

      {open && Player && (
        <Suspense fallback={null}>
          <Player onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </article>
  );
}

function ShelfProject({ project }) {
  const href = project.demoUrl || project.githubUrl;
  const Tag = href ? 'a' : 'article';
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Tag {...linkProps} id={projectAnchor(project.title)} className="shelf__item" style={{ scrollMarginTop: '88px' }}>
      <span className="shelf__media">
        <img src={project.image.src} alt={project.image.alt} loading="lazy" decoding="async" />
      </span>
      <p className="meta">{project.type || project.category}{project.status ? ` · ${project.status}` : ''}</p>
      <h3 className="shelf__title">
        {project.title}
        {href && <span className="shelf__arrow" aria-hidden="true">{OUT}</span>}
      </h3>
      <p className="shelf__text">{project.shortDescription}</p>
    </Tag>
  );
}
