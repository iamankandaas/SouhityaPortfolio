import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import BrandView from './components/BrandView';
import ProjectDetail from './components/ProjectDetail';
import MainMenu from './components/MainMenu';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MeshGradient from './components/MeshGradient';
import { portfolioData } from './mock/mockData';
import './App.css';

// Splash screen — only on first entry
const Splash = ({ onComplete }) => {
  const [phase, setPhase] = useState('in'); // in → visible → out → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 100);
    const t2 = setTimeout(() => setPhase('out'), 2400);
    const t3 = setTimeout(() => onComplete(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: '#080c0f',
        opacity: phase === 'out' ? 0 : 1,
        transition: 'opacity 0.8s ease',
      }}
    >
      <p
        className="text-center tracking-[0.25em] uppercase"
        style={{
          fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
          fontWeight: 300,
          color: 'rgba(220,235,230,0.8)',
          opacity: phase === 'in' ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
      >
        Welcome to the creative helpline
      </p>
    </div>
  );
};

// Scroll to top on route change (except when returning to home with scrollToKeypad)
const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    if (!location.state?.scrollToKeypad) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return null;
};

// Global Keypad Listener
const KeypadListener = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only listen on specific pages
      if (location.pathname.includes('/project/')) return;

      switch (e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
          navigate(`/brand/${e.key}`);
          break;
        case '0':
          navigate('/', { state: { scrollToKeypad: true } });
          break;
        case '*':
          navigate('/about');
          break;
        case '#':
          navigate('/contact');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate, location]);

  return null;
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Hero />
      <Footer data={portfolioData.personal} />
    </div>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('sho_visited'));
  const [splashDone, setSplashDone] = useState(() => !!sessionStorage.getItem('sho_visited'));

  const handleSplashComplete = React.useCallback(() => {
    sessionStorage.setItem('sho_visited', '1');
    setShowSplash(false);
    setSplashDone(true);
  }, []);

  if (showSplash) {
    return <Splash onComplete={handleSplashComplete} />;
  }

  if (!splashDone) return null;

  return (
    <div className="App">
      <MeshGradient />
      <BrowserRouter>
        <ScrollToTop />
        <KeypadListener />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<><About /><Footer data={portfolioData.personal} /></>} />
          <Route path="/brand/:brandId" element={<BrandView />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/contact" element={<><Contact /><Footer data={portfolioData.personal} /></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
