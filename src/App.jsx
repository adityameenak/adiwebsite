import { LenisProvider } from './hooks/useLenis';
import SparseHeader from './components/SparseHeader';
import HeroChapter from './components/HeroChapter';
import About from './components/About';
import TechStackSection from './components/TechStackSection';
import ExperienceChapter from './components/ExperienceChapter';
import ProjectsChapter from './components/ProjectsChapter';
import EducationChapter from './components/EducationChapter';
import AwardsChapter from './components/AwardsChapter';
import FooterContact from './components/FooterContact';
import ScrollAurora from './components/ScrollAurora';

// Translucent section surfaces so the scroll aurora shows through (home only).
const AURORA_SURFACES = {
  '--section-canvas': 'rgba(255, 250, 240, 0)',
  '--section-soft': 'rgba(250, 245, 232, 0.45)',
};

export default function App() {
  return (
    <LenisProvider>
      <div style={{ background: '#fffaf0', minHeight: '100vh', ...AURORA_SURFACES }}>
        <ScrollAurora />
        <SparseHeader />
        <main style={{ position: 'relative', zIndex: 1 }}>
          <HeroChapter />
          <About />
          <TechStackSection />
          <EducationChapter />
          <ExperienceChapter />
          <AwardsChapter />
          <ProjectsChapter />
        </main>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FooterContact />
        </div>
      </div>
    </LenisProvider>
  );
}
