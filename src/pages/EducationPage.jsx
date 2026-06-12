import { LenisProvider } from '../hooks/useLenis';
import SparseHeader from '../components/SparseHeader';
import EducationChapter from '../components/EducationChapter';
import FooterContact from '../components/FooterContact';

export default function EducationPage() {
  return (
    <LenisProvider>
      <div style={{ background: '#fffaf0', minHeight: '100vh' }}>
        <SparseHeader />
        <main>
          <EducationChapter />
        </main>
        <FooterContact />
      </div>
    </LenisProvider>
  );
}
