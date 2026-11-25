import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import Footer from '../components/Footer';

const LAUNCH_DATE = new Date('2026-12-25T00:00:00+05:30').getTime();

function getTimeRemaining() {
  const diff = Math.max(0, LAUNCH_DATE - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

export default function ProductsPage({ onOpenContact, onNavigate }) {
  const heroRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const headingLines = heroRef.current?.querySelectorAll('.product-hero-line');
      if (headingLines?.length) {
        gsap.fromTo(
          headingLines,
          { y: '115%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: 'back.out(1.4)',
            delay: 0.1
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const units = [
    { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINUTES', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECONDS', value: String(timeLeft.seconds).padStart(2, '0') }
  ];

  return (
    <div className="products-page-root" style={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Hero Header */}
      <section ref={heroRef} style={{ width: '100%', padding: '8em 4vw 5em', textAlign: 'center', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6em',
              background: 'rgba(242, 140, 40, 0.12)',
              border: '1.5px solid var(--accent)',
              padding: '0.45em 1.3em',
              borderRadius: '999px',
              color: 'var(--accent)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.82em',
              letterSpacing: '0.1em',
              marginBottom: '1.6em'
            }}
          >
            <span>VHX LABS • LAUNCHING SOON</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.3rem, 5.5vw, 5rem)',
              fontWeight: 900,
              lineHeight: 0.96,
              letterSpacing: '-0.04em',
              color: 'var(--ink-black)',
              margin: '0 auto 0.5em',
              textTransform: 'uppercase'
            }}
          >
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span className="product-hero-line" style={{ display: 'inline-block' }}>ENGINEERED INTERNALLY,</span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span className="product-hero-line" style={{ display: 'inline-block', color: 'var(--accent)' }}>PRODUCTIZED TO SCALE.</span>
            </span>
          </h1>

          <p
            style={{
              maxWidth: '680px',
              margin: '1.5em auto 3em',
              fontFamily: 'var(--font-body)',
              fontSize: '1.12em',
              color: 'var(--ink-gray)',
              lineHeight: 1.65
            }}
          >
            Our first proprietary software product is launching soon. Built from real-world engineering bottlenecks into a standalone platform — arriving by December 25, 2026.
          </p>

          {/* Countdown Box */}
          <div
            style={{
              background: 'var(--surface-white)',
              border: '1.5px solid var(--border-light)',
              borderRadius: '28px',
              padding: 'clamp(2em, 4vw, 3.5em) clamp(1.2rem, 3vw, 3rem)',
              maxWidth: '780px',
              margin: '0 auto',
              boxShadow: '0 24px 60px rgba(242, 140, 40, 0.14)'
            }}
          >
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9em', fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '1.8em' }}>
              OFFICIAL LAUNCH COUNTDOWN • DEC 25, 2026
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '1em',
                marginBottom: '2.5em'
              }}
            >
              {units.map((u) => (
                <div
                  key={u.label}
                  style={{
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '20px',
                    padding: '1.6em 1em'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>
                    {u.value}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78em', fontWeight: 600, color: 'var(--ink-gray)', marginTop: '0.6em', letterSpacing: '0.12em' }}>
                    {u.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1em', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={onOpenContact}
                className="cta-btn"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05em', padding: '0.9em 2.2em' }}
              >
                <span className="cta-text">Get Launch Notification</span>
                <span className="cta-btn-arrow">→</span>
                <span className="cta-btn-fill-hover"></span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('services')}
                className="cta-btn"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1em',
                  padding: '0.9em 2em',
                  background: 'transparent',
                  borderColor: 'var(--border-light)'
                }}
              >
                <span className="cta-text">Explore Our Services</span>
                <span className="cta-btn-arrow">→</span>
                <span className="cta-btn-fill-hover"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer onOpenContact={onOpenContact} onNavigate={onNavigate} />
    </div>
  );
}
