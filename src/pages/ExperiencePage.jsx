import SparseHeader from '../components/SparseHeader';
import ExperienceChapter from '../components/ExperienceChapter';
import FooterContact from '../components/FooterContact';

export default function ExperiencePage() {
  return (
    <div className="site">
      <SparseHeader />
      <main>
        <ExperienceChapter titleAs="h1" />
      </main>
      <FooterContact />
    </div>
  );
}
