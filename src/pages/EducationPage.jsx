import SparseHeader from '../components/SparseHeader';
import EducationChapter from '../components/EducationChapter';
import FooterContact from '../components/FooterContact';

export default function EducationPage() {
  return (
    <div className="site">
      <SparseHeader />
      <main>
        <EducationChapter titleAs="h1" />
      </main>
      <FooterContact />
    </div>
  );
}
