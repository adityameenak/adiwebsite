import { education, awards, technicalSkills } from '../data/content';
import { useReveal } from '../hooks/useReveal';

const COURSEWORK = [
  'Fluid Mechanics',
  'Thermodynamics',
  'Heat & Mass Transfer',
  'Chemical Reaction Engineering',
  'Transport Phenomena',
  'Process Dynamics & Control',
  'Materials Science',
  'Electrochemistry & Battery Systems',
  'Semiconductor Processes & Microelectronics',
  'Engineering Mathematics',
];

export default function EducationChapter({ titleAs: Title = 'h2' }) {
  const ref = useReveal();
  const isPage = Title === 'h1';

  return (
    <section ref={ref} id="education" className={`section${isPage ? ' section--page' : ''}`}>
      <div className="frame">
        <header className="section-head" data-reveal>
          <Title className="section-title">Education</Title>
          <p className="section-desc">Degree, honors and the tools I work with.</p>
        </header>

        <div className="edu">
          <div className="edu__main" data-reveal style={{ '--i': 1 }}>
            <h3 className="edu__school">{education.school}</h3>
            <p className="edu__degree">{education.degree}, {education.major}</p>
            <dl className="facts">
              <div><dt>GPA</dt><dd>{education.gpa}</dd></div>
              <div><dt>Graduating</dt><dd>{education.graduationDate}</dd></div>
              <div><dt>Location</dt><dd>{education.location}</dd></div>
            </dl>
            <h4 className="label">Coursework</h4>
            <ul className="tags">
              {COURSEWORK.map((c) => <li key={c} className="tag">{c}</li>)}
            </ul>
          </div>

          <div id="awards" className="edu__side" data-reveal style={{ '--i': 2, scrollMarginTop: '88px' }}>
            <h3 className="label">Honors &amp; awards</h3>
            <ul className="ledger">
              {awards.map((award) => (
                <li key={award.id}>
                  <span>{award.name}</span>
                  {award.org && <span className="ledger__meta">{award.org}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="skills" data-reveal style={{ '--i': 3 }}>
          <h3 className="label">Toolkit</h3>
          <dl>
            {technicalSkills.map((group) => (
              <div key={group.category}>
                <dt>{group.category}</dt>
                <dd>{group.skills.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
