import { LenisProvider } from './hooks/useLenis';
import WordmarkLogo from './components/WordmarkLogo';
import { TopProgressBar } from './components/ProgressRail';
import Navigation from './components/Navigation';
import HeroChapter from './components/HeroChapter';
import About from './components/About';
import FooterContact from './components/FooterContact';

/**
 * App - Main application component (Home Page)
 *
 * Premium Editorial Portfolio — soft blush canvas, warm rounded stage.
 */
function App() {
  return (
    <LenisProvider>
      {/* Blush outer canvas */}
      <div className="min-h-screen" style={{ background: '#F5E8E3' }}>
        {/* Fixed chrome */}
        <Navigation />
        <WordmarkLogo />
        <TopProgressBar />

        {/* Main rounded stage */}
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
            <main>
              <HeroChapter />
              <About />
              <FooterContact />
            </main>
          </div>
        </div>
      </div>
    </LenisProvider>
  );
}

export default App;
