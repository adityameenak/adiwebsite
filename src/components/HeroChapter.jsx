import { useNavigate } from 'react-router-dom';
import { personalInfo, about } from '../data/content';

const OUT = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

export default function HeroChapter() {
  const navigate = useNavigate();

  return (
    <section id="home" className="hero">
      <div className="frame hero__grid">
        <div className="hero__text">
          <p className="hero__meta">Chemical Engineering · Texas A&amp;M · Class of 2028</p>
          <h1 className="hero__name">
            <span>Aditya</span> <span>Meenakshisundaram</span>
          </h1>
          <p className="hero__lede">
            Hi, I&rsquo;m Adi. I&rsquo;m a chemical engineering honors student fascinated by how materials are made,
            why they behave the way they do, and how far we can push them.
          </p>
          <p className="hero__body">
            My work moves between the lab and the computer, spanning materials research, semiconductor manufacturing,
            battery safety and scientific computing.
          </p>

          <div className="hero__actions">
            <a
              href="/projects"
              className="btn btn--solid"
              onClick={(e) => { e.preventDefault(); navigate('/projects'); window.scrollTo(0, 0); }}
            >
              View projects
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--line">Resume {OUT}</a>
            <span className="hero__socials">
              <a className="ulink" href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="ulink" href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="ulink" href={`mailto:${personalInfo.email}`}>Email</a>
            </span>
          </div>
        </div>

        <figure className="hero__photo">
          <img
            src="/images/profile-portrait.jpg"
            srcSet="/images/profile-portrait-520.jpg 520w, /images/profile-portrait.jpg 780w"
            sizes="(max-width: 860px) 70vw, 380px"
            width="780"
            height="975"
            alt="Adi in a grey suit and navy tie, standing by a canal lined with trees"
            fetchPriority="high"
            decoding="async"
          />
        </figure>
      </div>

      <div className="frame">
        <div className="now">
          <h2 className="now__title">Currently</h2>
          <ul className="now__list">
            {about.currently.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
