import { LenisProvider } from './hooks/useLenis';
import WordmarkLogo from './components/WordmarkLogo';
import { TopProgressBar } from './components/ProgressRail';
import HeroChapter from './components/HeroChapter';
import About from './components/About';
import FooterContact from './components/FooterContact';

/**
 * App - Main application component (Home Page)
 *
 * Premium Editorial Portfolio
 * - Lenis smooth scroll
 * - Fixed wordmark logo
 * - Hero + About sections
 */
function App() {
  return (
    <LenisProvider>
      <div className="min-h-screen bg-white relative">
        {/* Fixed elements */}
        <WordmarkLogo />
        <TopProgressBar />

        {/* Main content */}
        <main>
          <HeroChapter />
          <About />
          <FooterContact />
        </main>
      </div>
    </LenisProvider>
  );
}

export default App;
