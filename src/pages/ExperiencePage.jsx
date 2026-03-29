import { LenisProvider } from '../hooks/useLenis';
import WordmarkLogo from '../components/WordmarkLogo';
import { TopProgressBar } from '../components/ProgressRail';
import Navigation from '../components/Navigation';
import ExperienceChapter from '../components/ExperienceChapter';
import FooterContact from '../components/FooterContact';

/**
 * ExperiencePage - Dedicated page for Experience section
 */
export default function ExperiencePage() {
  return (
    <LenisProvider>
      <div className="min-h-screen" style={{ background: '#F5E8E3' }}>
        <Navigation />
        <WordmarkLogo />
        <TopProgressBar />

        <div className="px-3 sm:px-5 lg:px-8 pt-2 pb-8">
          <div
            className="relative rounded-3xl lg:rounded-[2.5rem] overflow-hidden dot-grid"
            style={{
              background: '#FEFCF9',
              minHeight: 'calc(100vh - 2.5rem)',
              boxShadow:
                '0 2px 8px rgba(120,80,60,0.06), 0 12px 48px -8px rgba(120,80,60,0.10)',
            }}
          >
            <main className="pt-20">
              <ExperienceChapter />
              <FooterContact />
            </main>
          </div>
        </div>
      </div>
    </LenisProvider>
  );
}
