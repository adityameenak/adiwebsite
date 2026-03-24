import { LenisProvider } from '../hooks/useLenis';
import WordmarkLogo from '../components/WordmarkLogo';
import { TopProgressBar } from '../components/ProgressRail';
import ExperienceChapter from '../components/ExperienceChapter';
import FooterContact from '../components/FooterContact';
import ChemicalBackground from '../components/ChemicalBackground';

/**
 * ExperiencePage - Dedicated page for Experience section
 */
export default function ExperiencePage() {
  return (
    <LenisProvider>
      <div className="min-h-screen bg-neutral-950 relative">
        <ChemicalBackground />
        <WordmarkLogo />
        <TopProgressBar />

        <main className="relative pt-24" style={{ zIndex: 1 }}>
          <ExperienceChapter />
          <FooterContact />
        </main>
      </div>
    </LenisProvider>
  );
}
