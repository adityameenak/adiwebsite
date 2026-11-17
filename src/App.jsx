import SparseHeader from './components/SparseHeader';
import HeroChapter from './components/HeroChapter';
import ExperienceChapter from './components/ExperienceChapter';
import ProjectsChapter from './components/ProjectsChapter';
import EducationChapter from './components/EducationChapter';
import FooterContact from './components/FooterContact';
import IntroOverlay from './components/IntroOverlay';

export default function App() {
  return (
    <div className="site">
      <IntroOverlay />
      <SparseHeader />
      <main>
        <HeroChapter />
        <ExperienceChapter variant="compact" />
        <ProjectsChapter />
        <EducationChapter />
      </main>
      <FooterContact />
    </div>
  );
}
