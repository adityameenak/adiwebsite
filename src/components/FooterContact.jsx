import { motion } from 'framer-motion';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';

export default function FooterContact() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--bg-soft)',
        borderTop: '1px solid var(--rule)',
        padding: '28px 0',
      }}
    >
      <div className="container-wide">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
          className="sm:flex-row sm:justify-between"
        >
          <p style={{ fontSize: '13px', color: 'var(--faint)', fontWeight: 400 }}>
            &copy; {currentYear} Aditya Meenakshisundaram
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <SocialLink href={`mailto:${personalInfo.email}`} icon={FiMail} label="Email" />
            <SocialLink href={personalInfo.linkedin} icon={FiLinkedin} label="LinkedIn" />
            <SocialLink href={personalInfo.github} icon={FiGithub} label="GitHub" />
          </div>

          <p style={{ fontSize: '13px', color: 'var(--faint)', fontWeight: 400 }}>
            {personalInfo.location}
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon, label }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="footer-social"
      style={{ padding: '8px', display: 'flex', alignItems: 'center' }}
      whileHover={reducedMotion ? {} : { scale: 1.1 }}
      whileTap={reducedMotion ? {} : { scale: 0.95 }}
    >
      <Icon style={{ width: '16px', height: '16px' }} />
    </motion.a>
  );
}
