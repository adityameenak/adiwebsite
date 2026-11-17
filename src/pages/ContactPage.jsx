import SparseHeader from '../components/SparseHeader';
import FooterContact from '../components/FooterContact';
import { personalInfo } from '../data/content';
import { useReveal } from '../hooks/useReveal';

const CONTACT_LINKS = [
  { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/adityameenakshi', href: personalInfo.linkedin, external: true },
  { label: 'GitHub', value: 'github.com/adityameenak', href: personalInfo.github, external: true },
];

function ContactSection() {
  const ref = useReveal();

  return (
    <section ref={ref} id="contact" className="section section--page">
      <div className="frame contact-grid">
        <div>
          <h1 className="section-title" data-reveal style={{ marginBottom: '16px' }}>Get in touch</h1>
          <p className="hero__lede" data-reveal style={{ '--i': 1, marginBottom: '40px' }}>
            Reach out for research opportunities, collaborations, or just to connect.
          </p>

          <ul className="contact-links" data-reveal style={{ '--i': 2 }}>
            {CONTACT_LINKS.map(({ label, value, href, external }) => (
              <li key={label}>
                <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <span className="contact-links__label">{label}</span>
                  <span className="contact-links__value">{value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <figure className="contact-photo" data-reveal style={{ '--i': 3 }}>
          <img
            src="/images/ring-day.jpg"
            alt="Adi giving a thumbs up and showing his Aggie Ring by the lake at Texas A&M"
            width="750"
            height="1000"
            loading="lazy"
            decoding="async"
          />
          <figcaption>Aggie Ring Day · Texas A&amp;M</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <div className="site">
      <SparseHeader />
      <main>
        <ContactSection />
      </main>
      <FooterContact />
    </div>
  );
}
