import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Writing from './components/Writing';
import Leadership from './components/Leadership';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ScrollProgress } from './components/motion';

function App() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Scroll progress indicator */}
      <ScrollProgress />

      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Writing />
      <Leadership />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
