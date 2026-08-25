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

export default function App() {
  return (
    <LenisProvider>
      <div style={{ background: '#fffaf0', minHeight: '100vh' }}>
        <SparseHeader />
        <main>
          <HeroChapter />
          <About />
          <TechStackSection />
          <EducationChapter />
          <ExperienceChapter />
          <AwardsChapter />
          <ProjectsChapter />
        </main>
        <FooterContact />
      </div>
    </LenisProvider>
  );
}
