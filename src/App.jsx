import { LenisProvider } from './hooks/useLenis';
import WordmarkLogo from './components/WordmarkLogo';
import ProgressRail, { TopProgressBar } from './components/ProgressRail';
import HeroChapter from './components/HeroChapter';
import About from './components/About';
import ExperienceChapter from './components/ExperienceChapter';
import ProjectsChapter from './components/ProjectsChapter';
import Writing from './components/Writing';
import Resume from './components/Resume';
import FooterContact from './components/FooterContact';

/**
 * App - Main application component
 *
 * Premium Editorial Portfolio
 * - Lenis smooth scroll
 * - Fixed wordmark logo
 * - Progress rail indicator
 * - Scroll-driven section reveals
 */
function App() {
  return (
    <LenisProvider>
      <div className="min-h-screen bg-white relative">
        {/* Fixed elements */}
        <WordmarkLogo />
        <TopProgressBar />
        <ProgressRail />

        {/* Main content */}
        <main>
          <HeroChapter />
          <About />
          <ExperienceChapter />
          <ProjectsChapter />
          <Writing />
          <Resume />
          <FooterContact />
        </main>
      </div>
    </LenisProvider>
  );
}

export default App;
