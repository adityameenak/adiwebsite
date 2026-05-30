import { LenisProvider } from '../hooks/useLenis';
import SparseHeader from '../components/SparseHeader';
import ExperienceChapter from '../components/ExperienceChapter';
import FooterContact from '../components/FooterContact';

export default function ExperiencePage() {
  return (
    <LenisProvider>
      <div style={{ background: '#fffaf0', minHeight: '100vh' }}>
        <SparseHeader />
        <main>
          <ExperienceChapter />
        </main>
        <FooterContact />
      </div>
    </LenisProvider>
  );
}
