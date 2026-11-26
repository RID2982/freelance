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
import ProductsSection from './components/ProductsSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsStack from './components/TestimonialsStack';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WorkPage from './pages/WorkPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const getInitialPage = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/work')) return 'work';
    if (path.includes('/products')) return 'products';
    if (path.includes('/services')) return 'services';
    if (path.includes('/about')) return 'about';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [transitionLabel, setTransitionLabel] = useState('');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const lenisRef = useRef(null);
  const curtainRef = useRef(null);
  const pageViewRef = useRef(null);
  const isTransitioningRef = useRef(false);

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

  // Multi-Page Navigation Handler with Kinetic Curtain Page Transition
  const handleNavigate = (page, sectionId = null) => {
    const targetUrl = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ page }, '', targetUrl);
    }

    const scrollToTarget = () => {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el && lenisRef.current) {
          lenisRef.current.scrollTo(el, { offset: -80, duration: 1.0 });
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
    };

    // If staying on the same page, just scroll smoothly without a curtain wipe
    if (page === currentPage) {
      scrollToTarget();
      return;
    }

    const curtain = curtainRef.current;
    if (!curtain || isTransitioningRef.current) {
      setCurrentPage(page);
      setTimeout(scrollToTarget, 60);
      return;
    }

    isTransitioningRef.current = true;
    const labels = {
      home: 'VHX STUDIO',
      work: 'SELECTED WORK',
      products: 'VHX LABS',
      services: 'CAPABILITIES',
      about: 'ABOUT VHX',
    };
    setTransitionLabel(labels[page] || page.toUpperCase());

    const labelEl = curtain.querySelector('.page-transition-label');
    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false;
      },
    });

    gsap.set(curtain, { display: 'flex', transformOrigin: 'bottom center', scaleY: 0 });
    if (labelEl) gsap.set(labelEl, { opacity: 0, y: 18 });

    tl.to(curtain, {
      scaleY: 1,
      duration: 0.32,
      ease: 'power3.inOut',
    })
      .to(
        labelEl,
        { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
        0.14
      )
      .add(() => {
        setCurrentPage(page);
        requestAnimationFrame(() => {
          scrollToTarget();
          if (pageViewRef.current) {
            gsap.fromTo(
              pageViewRef.current,
              { opacity: 0.2, y: 24 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', clearProps: 'transform,opacity' }
            );
          }
        });
      })
      .to(
        labelEl,
        { opacity: 0, y: -14, duration: 0.16, ease: 'power2.in' },
        '+=0.08'
      )
      .to(curtain, {
        transformOrigin: 'top center',
        scaleY: 0,
        duration: 0.38,
        ease: 'power3.inOut',
      })
      .set(curtain, { display: 'none' });
  };

  // Browser back/forward navigation sync
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      let page = 'home';
      if (path.includes('/work')) page = 'work';
      else if (path.includes('/products')) page = 'products';
      else if (path.includes('/services')) page = 'services';
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

      {/* Page Transition Curtain Overlay */}
      <div ref={curtainRef} className="page-transition-curtain" aria-hidden="true">
        <div className="page-transition-accent-bar" />
        <span className="page-transition-label">{transitionLabel}</span>
      </div>

      {/* Conditional Multi-Page View (5 Dedicated Enterprise Pages) */}
      <div ref={pageViewRef} className="page-view-shell">
      {currentPage === 'work' && (
        <WorkPage
          onOpenContact={() => setIsContactOpen(true)}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'products' && (
        <ProductsPage
          onOpenContact={() => setIsContactOpen(true)}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'services' && (
        <ServicesPage
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

            {/* Selected Works: 4-Card Flagship Grid */}
            <ProjectsVertical
              onOpenContact={() => setIsContactOpen(true)}
              onNavigate={handleNavigate}
            />

            {/* VHX Labs: Proprietary Product Releases Showcase */}
            <ProductsSection
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
      </div>

      {/* Quick Floating Action Button for Direct Project Contact (No Phone Numbers) */}
      <button
        onClick={() => setIsContactOpen(true)}
        className="wa-float"
        aria-label="Start a Project / Direct Inquiry"
        title="Start a Project"
        style={{
          background: 'var(--accent-gradient, linear-gradient(135deg, #FF7800, #F28C28))',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 8px 30px rgba(242, 140, 40, 0.4)'
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
