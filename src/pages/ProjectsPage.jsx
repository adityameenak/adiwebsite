import { LenisProvider } from '../hooks/useLenis';
import SparseHeader from '../components/SparseHeader';
import ProjectsChapter from '../components/ProjectsChapter';
import FooterContact from '../components/FooterContact';

export default function ProjectsPage() {
  return (
    <LenisProvider>
      <div style={{ background: '#fffaf0', minHeight: '100vh' }}>
        <SparseHeader />
        <main>
          <ProjectsChapter />
        </main>
        <FooterContact />
      </div>
    </LenisProvider>
  );
}
