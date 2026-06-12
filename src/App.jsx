import { LenisProvider } from './hooks/useLenis';
import SparseHeader from './components/SparseHeader';
import HeroChapter from './components/HeroChapter';
import About from './components/About';
import TechStackSection from './components/TechStackSection';
import ExperienceChapter from './components/ExperienceChapter';
import ProjectsChapter from './components/ProjectsChapter';
import EducationChapter from './components/EducationChapter';
import FooterContact from './components/FooterContact';

export default function App() {
  return (
    <LenisProvider>
      <div style={{ background: '#fffaf0', minHeight: '100vh' }}>
        <SparseHeader />
        <main>
          <HeroChapter />
          <About />
          <TechStackSection />
          <ExperienceChapter />
          <ProjectsChapter />
          <EducationChapter />
        </main>
        <FooterContact />
      </div>
    </LenisProvider>
  );
}
