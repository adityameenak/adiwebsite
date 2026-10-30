import { Suspense, lazy, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionLabel from './effects/SectionLabel';
import StatRow from './StatRow';

// Walkthroughs load on first open, so their data stays out of the home-page bundle.
const WALKTHROUGHS = {
  battery: lazy(() => import('./walkthrough/BatteryWalkthrough')),
  researchFinder: lazy(() => import('./walkthrough/ResearchFinderWalkthrough')),
};

export default function ProjectsChapter() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.08, delayChildren: 0.05 } },
  };

  const itemVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
      };

  const leads = projects.filter((p) => p.lead);
  const rest = projects.filter((p) => !p.lead);

  return (
    <section ref={sectionRef} id="projects" className="sec">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0.2 : 0.5 }}
          className="sec-head"
        >
          <SectionLabel>Featured Work</SectionLabel>
          <h2 className="sec-title">Projects</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-4"
        >
          {leads.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <LeadProjectCard project={project} />
            </motion.div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const CARD_LINK_ARROW = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

function TagRow({ tags, limit }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '16px' }}>
      {tags.slice(0, limit).map((tag) => (
        <span key={tag} className="mono-chip">{tag}</span>
      ))}
    </div>
  );
}

const projectAnchor = (title) => `project-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

const isExternal = (href) => href.startsWith('http') || href.endsWith('.pdf');

function WalkthroughPoster({ id, title, image }) {
  const [open, setOpen] = useState(false);
  const Player = WALKTHROUGHS[id];

  return (
    <>
      <button type="button" className="wt-poster" aria-haspopup="dialog" aria-label={`Watch how it works: ${title}`} onClick={() => setOpen(true)}>
        <span className="wt-poster__art"><img src={image.src} alt={image.alt} loading="lazy" /></span>
        <span className="wt-poster__cta">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4l14 8-14 8z" /></svg>
          Watch how it works
        </span>
      </button>
      {open && (
        <Suspense fallback={null}>
          <Player onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  );
}

// Full-width card: accent top rule, status dot, stacked actions.
function LeadProjectCard({ project }) {
  return (
    <article id={projectAnchor(project.title)} className="project-card project-card--lead" style={{ scrollMarginTop: '80px' }}>
      <div style={{ minWidth: 0 }}>
        <p className="project-card__label">
          <span className="status-dot" aria-hidden="true" />
          {project.type}
        </p>
        <h3 className="project-card__title" style={{ fontSize: '21px' }}>{project.title}</h3>
        <p className="project-card__body" style={{ maxWidth: '68ch' }}>{project.shortDescription}</p>
        <StatRow stats={project.stats} />
        <TagRow tags={project.tags} limit={5} />
      </div>

      <div className="project-card__side">
        <WalkthroughPoster id={project.walkthrough} title={project.title} image={project.image} />
        <div className="project-actions">
          {project.paperImage && <img className="project-card__paper" src={project.paperImage.src} alt={project.paperImage.alt} loading="lazy" />}
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={link.primary ? 'is-primary' : undefined}
              {...(isExternal(link.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label} {CARD_LINK_ARROW}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  const href = project.demoUrl || project.githubUrl;
  const Tag = href ? 'a' : 'article';
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Tag {...linkProps} id={projectAnchor(project.title)} className="project-card" style={{ scrollMarginTop: '80px' }}>
      <img className="project-card__media" src={project.image.src} alt={project.image.alt} loading="lazy" />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span className="project-card__meta">{project.type || project.category}</span>
        {project.status && <span className="project-card__meta">{project.status}</span>}
      </div>

      <h3 className="project-card__title">
        {project.title}
        {href && <span className="project-card__arrow">{CARD_LINK_ARROW}</span>}
      </h3>

      <p className="project-card__body" style={{ flex: 1 }}>{project.shortDescription}</p>

      <TagRow tags={project.tags} limit={3} />
    </Tag>
  );
}
