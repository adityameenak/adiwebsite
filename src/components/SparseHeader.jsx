import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

const RESUME_PDF = '/AdityaMeenakshiResume.pdf';

/**
 * SparseHeader — minimal in-shell header.
 * Lives inside the rounded container (not fixed).
 * Left: name + descriptor. Right: nav links + status pill + LinkedIn.
 */
export default function SparseHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'Projects',   href: '/projects',    isRoute: true },
    { label: 'Experience', href: '/experience',  isRoute: true },
    { label: 'Resume',     href: RESUME_PDF,      external: true },
  ];

  const handleLinkClick = (e, link) => {
    if (link.isRoute) {
      e.preventDefault();
      navigate(link.href);
      setMobileOpen(false);
    } else if (!link.external) {
      setMobileOpen(false);
    }
  };

  return (
    <header className="relative flex items-center justify-between px-7 sm:px-10 lg:px-14 py-5 lg:py-6 border-b border-neutral-100/80">
      {/* Left — identity */}
      <a
        href="/"
        onClick={(e) => { e.preventDefault(); navigate('/'); }}
        className="flex items-center gap-2.5 group select-none"
      >
        <span className="font-semibold text-[15px] text-neutral-900 group-hover:text-accent transition-colors duration-200">
          Adi
        </span>
        <span className="text-neutral-300 hidden sm:block" aria-hidden>·</span>
        <span className="text-[13px] text-neutral-400 hidden sm:block">
          Chemical Engineering
        </span>
      </a>

      {/* Right — nav + status + social */}
      <div className="flex items-center gap-4 sm:gap-5 lg:gap-6">
        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={(e) => handleLinkClick(e, link)}
              className="text-[13px] text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Separator */}
        <span className="hidden md:block w-px h-4 bg-neutral-200" aria-hidden />

        {/* Status pill */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium tracking-wide whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="hidden xs:inline">Available</span>
        </span>

        {/* LinkedIn */}
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:block text-[13px] text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
        >
          LinkedIn
        </a>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden p-1 text-neutral-500 hover:text-neutral-900 transition-colors"
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

      {/* Mobile dropdown — sits inside shell */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-50 bg-surface border-b border-neutral-100 px-7 py-4 space-y-1"
            style={{ background: '#FEFCF9' }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                onClick={(e) => handleLinkClick(e, link)}
                className="block py-2.5 text-[15px] font-medium text-neutral-600 hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-neutral-100 mt-1 space-y-2.5">
              <a href={`mailto:${personalInfo.email}`} className="block py-1 text-[13px] text-neutral-400 hover:text-neutral-900 transition-colors">
                {personalInfo.email}
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="block py-1 text-[13px] text-neutral-400 hover:text-neutral-900 transition-colors">
                LinkedIn ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
