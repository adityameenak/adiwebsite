import { personalInfo } from '../data/content';

const OUT = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

export default function FooterContact() {
  return (
    <footer id="contact-footer" className="site-footer">
      <div className="frame">
        <div className="site-footer__top">
          <div>
            <h2 className="site-footer__title">Get in touch</h2>
            <p className="site-footer__note">
              Reach out for research opportunities, collaborations, or just to connect.
            </p>
          </div>
          <a className="site-footer__mail" href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
        </div>

        <div className="site-footer__bottom">
          <p>&copy; {new Date().getFullYear()} Aditya Meenakshisundaram · {personalInfo.location}</p>
          <div className="site-footer__links">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn {OUT}</a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub {OUT}</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume {OUT}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
