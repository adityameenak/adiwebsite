import { LenisProvider } from './hooks/useLenis';
import SparseHeader from './components/SparseHeader';
import HeroChapter from './components/HeroChapter';
import About from './components/About';
import ExperienceChapter from './components/ExperienceChapter';
import ProjectsChapter from './components/ProjectsChapter';
import EducationChapter from './components/EducationChapter';
import FooterContact from './components/FooterContact';

export default function App() {
  return (
    <LenisProvider>
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <SparseHeader />
        <main style={{ position: 'relative', zIndex: 1 }}>
          <HeroChapter />
          <About />
          <EducationChapter />
          <ExperienceChapter />
          <ProjectsChapter />
        </main>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FooterContact />
        </div>
      </div>
    </LenisProvider>
  );
}
