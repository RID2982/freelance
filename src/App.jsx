import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import StudioLoader from './components/StudioLoader';
import Navbar from './components/Navbar';
import ContactModal from './components/ContactModal';
import Hero from './components/Hero';
import AboutPinned from './components/AboutPinned';
import ShowcaseSlider from './components/ShowcaseSlider';
import ProjectsVertical from './components/ProjectsVertical';
import ServicesSection from './components/ServicesSection';
import TestimonialsStack from './components/TestimonialsStack';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WorkPage from './components/WorkPage';
import AboutPage from './components/AboutPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const getInitialPage = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/work')) return 'work';
    if (path.includes('/about')) return 'about';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Scroll synchronized with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Refresh ScrollTrigger once preloader exits so pinned offsets are 100% accurate
  useEffect(() => {
    if (loaderComplete) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
    }
  }, [loaderComplete]);

  // Multi-Page Navigation Handler with History PushState & Smooth Scroll Reset
  const handleNavigate = (page, sectionId = null) => {
    setCurrentPage(page);
    const targetUrl = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ page }, '', targetUrl);
    }

    setTimeout(() => {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el && lenisRef.current) {
          lenisRef.current.scrollTo(el, { offset: -80, duration: 1.2 });
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }
      ScrollTrigger.refresh();
    }, 60);
  };

  // Browser back/forward navigation sync
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      let page = 'home';
      if (path.includes('/work')) page = 'work';
      else if (path.includes('/about')) page = 'about';

      setCurrentPage(page);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      setTimeout(() => ScrollTrigger.refresh(), 80);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="page">
      {/* Two26 Kinetic Preloader */}
      {!loaderComplete && (
        <StudioLoader onComplete={() => setLoaderComplete(true)} />
      )}

      {/* Floating Studio Navbar */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Fullscreen Contact Modal Overlay */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Conditional Multi-Page View */}
      {currentPage === 'work' && (
        <WorkPage
          onOpenContact={() => setIsContactOpen(true)}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'about' && (
        <AboutPage
          onOpenContact={() => setIsContactOpen(true)}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'home' && (
        <>
          <main className="main">
            {/* Hero with Magnetic Dual Offset Heading & Curved Ribbon Marquee */}
            <Hero
              onOpenContact={() => setIsContactOpen(true)}
              onNavigate={handleNavigate}
            />

            {/* Pinned Kinetic Letter Scrub & Milestone Pills */}
            <AboutPinned onNavigate={handleNavigate} />

            {/* Horizontal Showcase Slider with Directional Velocity Physics & Proximity Scale */}
            <ShowcaseSlider onNavigate={handleNavigate} />

            {/* Selected Works: 4-Card Flagship Grid & Design Highlights */}
            <ProjectsVertical
              onOpenContact={() => setIsContactOpen(true)}
              onNavigate={handleNavigate}
            />

            {/* Capabilities: Connecting Squiggle SVG Path & Proximity Expansions */}
            <ServicesSection />

            {/* Interactive Stacked Testimonial Deck with Dynamic Nav Arrow Cursor */}
            <TestimonialsStack />

            {/* Interactive FAQ Accordion with Studio Mascot */}
            <FAQ />
          </main>

          {/* Footer with Wolff Olins Signature Elastic Stretch & Settle Logo */}
          <Footer
            onOpenContact={() => setIsContactOpen(true)}
            onNavigate={handleNavigate}
          />
        </>
      )}

      {/* Quick Floating Action Button for Direct Project Contact (No Phone Numbers) */}
      <button
        onClick={() => setIsContactOpen(true)}
        className="wa-float"
        aria-label="Start a Project / Direct Inquiry"
        title="Start a Project"
        style={{
          background: 'var(--accent-gradient, linear-gradient(135deg, #2563eb, #00b4d8))',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 8px 30px rgba(37, 99, 235, 0.4)'
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
      </button>
    </div>
  );
}
