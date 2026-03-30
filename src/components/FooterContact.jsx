import { motion } from 'framer-motion';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { FiMail, FiLinkedin } from 'react-icons/fi';

/**
 * FooterContact — minimal footer bar.
 * The heavy "Get in Touch" section has been replaced by /contact.
 */
export default function FooterContact() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-7 border-t border-neutral-200">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-neutral-400">
            © {currentYear} Adi. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <SocialLink href={`mailto:${personalInfo.email}`} icon={FiMail} label="Email" />
            <SocialLink href={personalInfo.linkedin} icon={FiLinkedin} label="LinkedIn" />
          </div>

          <p className="text-[12px] text-neutral-400">{personalInfo.location}</p>
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
      className="p-1.5 text-neutral-400 hover:text-neutral-700 transition-colors duration-200"
      whileHover={reducedMotion ? {} : { scale: 1.1 }}
      whileTap={reducedMotion ? {} : { scale: 0.95 }}
    >
      <Icon className="w-4 h-4" />
    </motion.a>
  );
}
