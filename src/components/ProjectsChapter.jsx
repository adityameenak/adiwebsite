import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { projects, projectCategories } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionLabel from './effects/SectionLabel';
import FilterPills from './FilterPills';

export default function ProjectsChapter() {
  const [activeFilter, setActiveFilter] = useState('all');
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const filtersWithCount = useMemo(() => {
    return projectCategories.map((cat) => ({
      ...cat,
      count: cat.id === 'all' ? projects.length : projects.filter((p) => p.category === cat.id).length,
    }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.08, delayChildren: 0.05 } },
  };

  const itemVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
        exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
      };

  return (
    <section ref={sectionRef} id="projects" style={{ paddingTop: '96px', paddingBottom: '96px', background: 'var(--section-canvas, #fffaf0)' }}>
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0.2 : 0.55 }}
          style={{ marginBottom: '48px' }}
        >
          <SectionLabel>Featured Work</SectionLabel>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 500, letterSpacing: '-2px', color: '#0a0a0a', marginBottom: '12px' }}>
                Projects
              </h2>
              <p style={{ fontSize: '16px', color: '#6a6a6a', maxWidth: '44ch', lineHeight: 1.55 }}>
                Technical projects spanning semiconductors, sustainability, and software.
              </p>
            </div>

            <FilterPills
              filters={filtersWithCount}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              className="lg:self-end"
            />
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
                className={project.paperUrl ? 'md:col-span-2' : undefined}
              >
                {project.paperUrl
                  ? <LeadProjectCard project={project} />
                  : <ProjectCard project={project} />}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <p style={{ color: '#9a9a9a', fontSize: '16px' }}>No projects in this category.</p>
          </div>
        )}
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
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '20px' }}>
      {tags.slice(0, limit).map((tag) => (
        <span key={tag} className="mono-chip">{tag}</span>
      ))}
    </div>
  );
}

// Full-width card for research with a paper: accent top rule, status dot, stacked actions.
function LeadProjectCard({ project }) {
  return (
    <article className="project-card project-card--lead">
      <div style={{ minWidth: 0 }}>
        <p className="project-card__label">
          <span className="status-dot" aria-hidden="true" />
          {project.type}
          <span style={{ color: '#9a9a9a' }}>· {project.status}</span>
        </p>
        <h3 className="project-card__title" style={{ fontSize: '24px' }}>{project.title}</h3>
        <p className="project-card__body" style={{ maxWidth: '62ch' }}>{project.shortDescription}</p>
        <TagRow tags={project.tags} limit={5} />
      </div>

      <div className="project-actions">
        <a href={project.paperUrl} target="_blank" rel="noopener noreferrer" className="is-primary">
          Read the paper {CARD_LINK_ARROW}
        </a>
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            Code on GitHub {CARD_LINK_ARROW}
          </a>
        )}
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  const href = project.demoUrl || project.githubUrl;
  const Tag = href ? 'a' : 'article';
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Tag {...linkProps} className="project-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span className="project-card__meta">{project.type || project.category}</span>
        {project.status && <span className="project-card__meta">{project.status}</span>}
      </div>

      <h3 className="project-card__title">
        {project.title}
        {href && <span className="project-card__arrow">{CARD_LINK_ARROW}</span>}
      </h3>

      <p className="project-card__body" style={{ flex: 1 }}>{project.shortDescription}</p>

      <TagRow tags={project.tags} limit={4} />
    </Tag>
  );
}
