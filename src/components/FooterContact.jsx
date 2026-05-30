import { motion } from 'framer-motion';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { FiMail, FiLinkedin } from 'react-icons/fi';

export default function FooterContact() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#faf5e8',
        borderTop: '1px solid #e5e5e5',
        padding: '40px 0',
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
          <p style={{ fontSize: '13px', color: '#9a9a9a', fontWeight: 400 }}>
            &copy; {currentYear} Adi. All rights reserved.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <SocialLink href={`mailto:${personalInfo.email}`} icon={FiMail} label="Email" />
            <SocialLink href={personalInfo.linkedin} icon={FiLinkedin} label="LinkedIn" />
          </div>

          <p style={{ fontSize: '13px', color: '#9a9a9a', fontWeight: 400 }}>
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
      style={{ padding: '8px', color: '#9a9a9a', display: 'flex', alignItems: 'center' }}
      whileHover={reducedMotion ? {} : { scale: 1.1, color: '#0a0a0a' }}
      whileTap={reducedMotion ? {} : { scale: 0.95 }}
    >
      <Icon style={{ width: '16px', height: '16px' }} />
    </motion.a>
  );
}
