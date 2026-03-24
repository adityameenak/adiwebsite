import { LenisProvider } from '../hooks/useLenis';
import WordmarkLogo from '../components/WordmarkLogo';
import { TopProgressBar } from '../components/ProgressRail';
import ProjectsChapter from '../components/ProjectsChapter';
import Writing from '../components/Writing';
import FooterContact from '../components/FooterContact';
import ChemicalBackground from '../components/ChemicalBackground';

/**
 * ProjectsPage - Dedicated page for Projects + Writing sections
 */
export default function ProjectsPage() {
  return (
    <LenisProvider>
      <div className="min-h-screen bg-neutral-950 relative">
        <ChemicalBackground />
        <WordmarkLogo />
        <TopProgressBar />

        <main className="relative pt-24" style={{ zIndex: 1 }}>
          <ProjectsChapter />
          <Writing />
          <FooterContact />
        </main>
      </div>
    </LenisProvider>
  );
}
