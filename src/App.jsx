import { LenisProvider } from './hooks/useLenis';
import SparseHeader from './components/SparseHeader';
import HeroChapter from './components/HeroChapter';
import About from './components/About';
import ProjectsChapter from './components/ProjectsChapter';
import ExperienceChapter from './components/ExperienceChapter';
import FooterContact from './components/FooterContact';

export default function App() {
  return (
    <LenisProvider>
      <div style={{ background: '#fffaf0', minHeight: '100vh' }}>
        <SparseHeader />
        <main>
          <HeroChapter />
          <About />
          <ExperienceChapter />
          <ProjectsChapter />
        </main>
        <FooterContact />
      </div>
    </LenisProvider>
  );
}
