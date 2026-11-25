import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

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

export default function ProductsSection({ onOpenContact, onNavigate }) {
  const sectionRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const offsetHeadingRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headingWrapper = headingWrapperRef.current;
      const offsetHeading = offsetHeadingRef.current;
      if (headingWrapper && offsetHeading) {
        const handleMove = (e) => {
          const rect = headingWrapper.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;
          const dist = Math.hypot(dx, dy);
          const radius = Math.max(rect.width, rect.height) / 2 || 100;
          const intensity = Math.min(1, Math.max(0.25, dist / radius));
          const angle = Math.atan2(dy, dx);
          gsap.to(offsetHeading, {
            x: Math.cos(angle) * intensity * 5,
            y: Math.sin(angle) * intensity * 5,
            duration: 0.2,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        };
        const handleLeave = () => {
          gsap.to(offsetHeading, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1.1, 0.4)', overwrite: 'auto' });
        };
        headingWrapper.parentElement.addEventListener('pointermove', handleMove, { passive: true });
        headingWrapper.parentElement.addEventListener('pointerleave', handleLeave);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const units = [
    { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINS', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECS', value: String(timeLeft.seconds).padStart(2, '0') }
  ];

  return (
    <section
      ref={sectionRef}
      id="products"
      style={{
        width: '100%',
        padding: '6em 4vw',
        backgroundColor: 'var(--bg-main)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div className="section-about-text" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.12em' }}>
          VHX LABS • LAUNCHING SOON
        </div>
        <div ref={headingWrapperRef} className="section-heading-wrapper">
          <h2 className="section-heading">ENGINEERED INTERNALLY, PRODUCTIZED TO SCALE</h2>
          <h2 ref={offsetHeadingRef} className="section-heading accent-offset" aria-hidden="true">
            ENGINEERED INTERNALLY, PRODUCTIZED TO SCALE
          </h2>
        </div>

        <p style={{ maxWidth: '680px', margin: '1.4em auto 2.5em', color: 'var(--ink-gray)', fontSize: '1.1em', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          Our flagship proprietary software product is entering final launch readiness. Get notified the moment VHX Labs goes live on December 25.
        </p>

        {/* Launch Countdown Card */}
        <div
          style={{
            background: 'var(--surface-white)',
            border: '1.5px solid var(--border-light)',
            borderRadius: '28px',
            padding: 'clamp(2em, 4vw, 3.5em) clamp(1.2rem, 3vw, 2.5rem)',
            boxShadow: '0 24px 60px rgba(242, 140, 40, 0.12)'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6em',
              background: 'rgba(242, 140, 40, 0.14)',
              border: '1px solid var(--accent)',
              borderRadius: '999px',
              padding: '0.4em 1.1em',
              color: 'var(--accent)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.78em',
              fontWeight: 800,
              letterSpacing: '0.1em',
              marginBottom: '2em'
            }}
          >
            <span>● LAUNCHING DECEMBER 25, 2026</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
              gap: '1em',
              maxWidth: '640px',
              margin: '0 auto 2.4em'
            }}
          >
            {units.map((u) => (
              <div
                key={u.label}
                style={{
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '18px',
                  padding: '1.3em 0.8em'
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>
                  {u.value}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75em', fontWeight: 600, color: 'var(--ink-gray)', marginTop: '0.5em', letterSpacing: '0.12em' }}>
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
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1em', padding: '0.85em 2em' }}
            >
              <span className="cta-text">Notify Me on Launch</span>
              <span className="cta-btn-arrow">→</span>
              <span className="cta-btn-fill-hover"></span>
            </button>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('products')}
                className="cta-btn"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '1em', padding: '0.85em 2em', background: 'transparent', borderColor: 'var(--border-light)' }}
              >
                <span className="cta-text">Open Products Page</span>
                <span className="cta-btn-arrow">→</span>
                <span className="cta-btn-fill-hover"></span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
