import { LenisProvider } from '../hooks/useLenis';
import WordmarkLogo from '../components/WordmarkLogo';
import { TopProgressBar } from '../components/ProgressRail';
import ProjectsChapter from '../components/ProjectsChapter';
import Writing from '../components/Writing';
import FooterContact from '../components/FooterContact';

/**
 * ProjectsPage - Dedicated page for Projects + Writing sections
 */
export default function ProjectsPage() {
  return (
    <LenisProvider>
      <div className="min-h-screen bg-white relative">
        {/* Fixed elements */}
        <WordmarkLogo />
        <TopProgressBar />

        {/* Main content */}
        <main className="pt-24">
          <ProjectsChapter />
          <Writing />
          <FooterContact />
        </main>
      </div>
    </LenisProvider>
  );
}
