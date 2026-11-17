import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { personalInfo } from '../data/content';
import { useTheme } from '../hooks/useTheme';
import { FiSun, FiMoon } from 'react-icons/fi';

const RESUME_PDF = '/resume.pdf';

const NAV_LINKS = [
  { label: 'Projects',   href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Education',  href: '/education' },
  { label: 'Contact',    href: '/contact' },
];

export default function SparseHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // A rule appears under the bar once the page has moved (one passive listener, no per-frame work).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    navigate(href);
    window.scrollTo(0, 0);
  };

  return (
    <header className={`site-header${scrolled || mobileOpen ? ' is-scrolled' : ''}`}>
      <div className="frame site-header__inner">
        <a href="/" onClick={(e) => go(e, '/')} className="wordmark" aria-label="Aditya Meenakshisundaram, home">
          <span className="wordmark__mark" aria-hidden="true">AM</span>
          <span className="wordmark__name">Aditya Meenakshisundaram</span>
        </a>

        <div className="site-header__right">
          <nav className="site-nav" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className={`nav-link${location.pathname === link.href ? ' is-active' : ''}`}
                aria-current={location.pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer" className="btn btn--line btn--sm header-resume">
            Resume
          </a>

          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
          <div className="frame">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} onClick={(e) => go(e, link.href)}>{link.label}</a>
            ))}
            <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer">Resume</a>
            <a href={`mailto:${personalInfo.email}`}>Email</a>
          </div>
        </nav>
      )}
    </header>
  );
}
