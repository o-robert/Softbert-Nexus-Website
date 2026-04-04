import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useContent } from './context/ContentContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminRoute from './components/admin/AdminRoute';

function MainSite() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const { theme } = useContent();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/admin/*" element={<AdminRoute />} />
    </Routes>
  );
}
