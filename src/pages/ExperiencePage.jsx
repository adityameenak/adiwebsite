import { LenisProvider } from '../hooks/useLenis';
import SparseHeader from '../components/SparseHeader';
import ExperienceChapter from '../components/ExperienceChapter';
import FooterContact from '../components/FooterContact';

export default function ExperiencePage() {
  return (
    <LenisProvider>
      <div className="min-h-screen" style={{ background: '#F3E6E1' }}>
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
              <ExperienceChapter />
              <FooterContact />
            </main>
          </div>
        </div>
      </div>
    </LenisProvider>
  );
}
