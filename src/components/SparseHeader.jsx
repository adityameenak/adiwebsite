import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

const RESUME_PDF = '/AdityaMeenakshiResume.pdf';

export default function SparseHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'Projects',   href: '/projects',   isRoute: true },
    { label: 'Experience', href: '/experience', isRoute: true },
    { label: 'Education',  href: '/education',  isRoute: true },
    { label: 'Contact',    href: '/contact',    isRoute: true },
  ];

  const handleLinkClick = (e, link) => {
    if (link.isRoute) {
      e.preventDefault();
      navigate(link.href);
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
    }
  };

  const isActive = (href) => location.pathname === href;

  return (
    <header
      style={{
        background: '#fffaf0',
        height: '64px',
        borderBottom: '1px solid #e5e5e5',
      }}
      className="relative flex items-center justify-between px-6 sm:px-10 lg:px-14"
    >
      {/* Wordmark */}
      <a
        href="/"
        onClick={(e) => { e.preventDefault(); navigate('/'); }}
        className="select-none"
        style={{ fontSize: '15px', fontWeight: 600, color: '#0a0a0a', letterSpacing: 0 }}
      >
        Adi
        <span style={{ color: '#9a9a9a', margin: '0 8px', fontWeight: 400 }}>·</span>
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#6a6a6a' }} className="hidden sm:inline">
          Chemical Engineering
        </span>
      </a>

      {/* Right cluster */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: isActive(link.href) ? '#0a0a0a' : '#6a6a6a',
                textDecoration: 'none',
              }}
              className="hover:text-ink transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Separator */}
        <span className="hidden md:block" style={{ width: '1px', height: '16px', background: '#e5e5e5' }} aria-hidden />

        {/* Status pill */}
        <span
          className="hidden sm:inline-flex items-center gap-1.5"
          style={{
            padding: '4px 12px',
            borderRadius: '9999px',
            background: '#f5f0e0',
            border: '1px solid #e5e5e5',
            fontSize: '12px',
            fontWeight: 600,
            color: '#3a3a3a',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          Available
        </span>

        {/* Resume CTA */}
        <a
          href={RESUME_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center justify-center"
          style={{
            height: '36px',
            padding: '0 16px',
            borderRadius: '8px',
            background: '#0a0a0a',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Resume
        </a>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden p-1"
          style={{ color: '#6a6a6a' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          whileTap={reducedMotion ? {} : { scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </motion.button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-50 px-6 py-4 space-y-1"
            style={{
              background: '#fffaf0',
              borderBottom: '1px solid #e5e5e5',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="block py-2.5 transition-colors"
                style={{ fontSize: '15px', fontWeight: 500, color: '#3a3a3a', textDecoration: 'none' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2.5 transition-colors"
              style={{ fontSize: '15px', fontWeight: 500, color: '#3a3a3a', textDecoration: 'none' }}
            >
              Resume
            </a>
            <div style={{ borderTop: '1px solid #e5e5e5', marginTop: '8px', paddingTop: '12px' }} className="space-y-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="block py-1 transition-colors"
                style={{ fontSize: '13px', color: '#6a6a6a', textDecoration: 'none' }}
              >
                {personalInfo.email}
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1 transition-colors"
                style={{ fontSize: '13px', color: '#6a6a6a', textDecoration: 'none' }}
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
