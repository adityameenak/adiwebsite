import { LenisProvider } from './hooks/useLenis';
import WordmarkLogo from './components/WordmarkLogo';
import { TopProgressBar } from './components/ProgressRail';
import HeroChapter from './components/HeroChapter';
import About from './components/About';
import FooterContact from './components/FooterContact';
import ChemicalBackground from './components/ChemicalBackground';

/**
 * App - Main application component (Home Page)
 *
 * Premium Editorial Portfolio
 * - Lenis smooth scroll
 * - Fixed wordmark logo
 * - Animated chemical background system
 * - Hero + About sections
 */
function App() {
  return (
    <LenisProvider>
      <div className="min-h-screen bg-neutral-950 relative">
        {/* Animated background system (fixed, behind all content) */}
        <ChemicalBackground />

        {/* Fixed UI chrome */}
        <WordmarkLogo />
        <TopProgressBar />

        {/* Main content */}
        <main className="relative" style={{ zIndex: 1 }}>
          <HeroChapter />
          <About />
          <FooterContact />
        </main>
      </div>
    </LenisProvider>
  );
}

export default App;
