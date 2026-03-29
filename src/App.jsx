import { LenisProvider } from './hooks/useLenis';
import SparseHeader from './components/SparseHeader';
import HeroChapter from './components/HeroChapter';
import About from './components/About';
import FooterContact from './components/FooterContact';

/**
 * App — Home page.
 *
 * Layout:
 *   Blush outer canvas → rounded shell (warm off-white + fine grid)
 *     SparseHeader (inside shell, not fixed)
 *     HeroChapter
 *     About
 *     FooterContact
 */
function App() {
  return (
    <LenisProvider>
      {/* Blush outer canvas */}
      <div className="min-h-screen" style={{ background: '#F3E6E1' }}>
        {/* Rounded main shell */}
        <div className="px-3 sm:px-5 lg:px-9 pt-3 pb-8">
          <div
            className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden fine-grid"
            style={{
              background: '#FEFCF9',
              minHeight: 'calc(100vh - 2.75rem)',
              boxShadow:
                '0 0 0 1px rgba(180,130,110,0.10), 0 4px 12px rgba(120,70,50,0.06), 0 20px 60px -12px rgba(120,70,50,0.09)',
            }}
          >
            <SparseHeader />
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
