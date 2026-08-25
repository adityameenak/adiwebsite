import { LenisProvider } from '../hooks/useLenis';
import SparseHeader from '../components/SparseHeader';
import AwardsChapter from '../components/AwardsChapter';
import FooterContact from '../components/FooterContact';

export default function AwardsPage() {
  return (
    <LenisProvider>
      <div style={{ background: '#fffaf0', minHeight: '100vh' }}>
        <SparseHeader />
        <main>
          <AwardsChapter />
        </main>
        <FooterContact />
      </div>
    </LenisProvider>
  );
}
