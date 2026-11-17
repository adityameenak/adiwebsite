import SparseHeader from '../components/SparseHeader';
import ProjectsChapter from '../components/ProjectsChapter';
import FooterContact from '../components/FooterContact';

export default function ProjectsPage() {
  return (
    <div className="site">
      <SparseHeader />
      <main>
        <ProjectsChapter titleAs="h1" />
      </main>
      <FooterContact />
    </div>
  );
}
