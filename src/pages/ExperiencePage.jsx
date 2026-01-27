import { LenisProvider } from '../hooks/useLenis';
import WordmarkLogo from '../components/WordmarkLogo';
import { TopProgressBar } from '../components/ProgressRail';
import ExperienceChapter from '../components/ExperienceChapter';
import FooterContact from '../components/FooterContact';

/**
 * ExperiencePage - Dedicated page for Experience section
 */
export default function ExperiencePage() {
  return (
    <LenisProvider>
      <div className="min-h-screen bg-white relative">
        {/* Fixed elements */}
        <WordmarkLogo />
        <TopProgressBar />

        {/* Main content */}
        <main className="pt-24">
          <ExperienceChapter />
          <FooterContact />
        </main>
      </div>
    </LenisProvider>
  );
}
