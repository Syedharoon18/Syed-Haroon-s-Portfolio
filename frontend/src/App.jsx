import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ResumeView from './pages/ResumeView';

const MainPortfolio = () => (
  <>
    <Home />
    <About />
    <Projects />
    <Contact />
  </>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<MainPortfolio />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/resume" element={<ResumeView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
