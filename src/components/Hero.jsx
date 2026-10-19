import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import telegramMockup from '../assets/telegram_food_automation.jpg';
import hrAutomation from '../assets/hr_automation.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenContact, onNavigate }) {
  const heroRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const offsetHeadingRef = useRef(null);
  const pathLeftRef = useRef(null);
  const pathRightRef = useRef(null);
  const pillsRef = useRef([]);
  const textPathRef = useRef(null);
  const maskPathRef = useRef(null);
  const bgPathRef = useRef(null);
  const textGroupRef = useRef(null);

  // Magnetic Heading & Entrance GSAP Timeline
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Magnetic Heading Offset
    const headingWrapper = headingWrapperRef.current;
    const offsetHeading = offsetHeadingRef.current;

    if (headingWrapper && offsetHeading) {
      const MAX_OFFSET = 6;

      const handlePointerMove = (e) => {
        const rect = headingWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.hypot(dx, dy);
        const maxRadius = Math.max(rect.width, rect.height) / 2 || 100;
        const intensity = Math.min(1, Math.max(0.25, distance / maxRadius));
        const angle = Math.atan2(dy, dx);
        const targetX = Math.cos(angle) * (intensity * MAX_OFFSET);
        const targetY = Math.sin(angle) * (intensity * MAX_OFFSET);

        gsap.to(offsetHeading, {
          x: targetX,
          y: targetY,
          duration: 0.2,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      };

      const handlePointerLeave = () => {
        gsap.to(offsetHeading, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1.1, 0.4)',
          overwrite: 'auto'
        });
      };

      hero.addEventListener('pointermove', handlePointerMove, { passive: true });
      hero.addEventListener('pointerleave', handlePointerLeave);
    }

    // Squiggle paths
    const pathLeft = pathLeftRef.current;
    const pathRight = pathRightRef.current;
    [pathLeft, pathRight].forEach((p) => {
      if (p) {
        const len = p.getTotalLength ? p.getTotalLength() : 1500;
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
        gsap.set(p, { strokeWidth: 0 });
      }
    });

    // Milestone Badges Setup
    const pills = pillsRef.current.filter(Boolean);
    pills.forEach((pill) => {
      gsap.set(pill, { opacity: 0, scale: 0.4, y: 20 });
      const text = pill.querySelector('.hero-pill-text');
      if (text) gsap.set(text, { y: '105%', opacity: 0 });
    });

    // Hero Entrance Timeline
    const masterHeroTl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });

    // Lines entrance
    const heroLines = hero.querySelectorAll('.hero-line');
    if (heroLines.length) {
      masterHeroTl.fromTo(
        heroLines,
        { y: '115%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.85, stagger: 0.12, ease: 'back.out(1.4)' },
        0
      );
    }

    // Pill Badges pop
    pills.forEach((pill, i) => {
      const pillStart = 0.25 + i * 0.14;
      const text = pill.querySelector('.hero-pill-text');
      masterHeroTl.to(pill, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(2.5)' }, pillStart);
      if (text) {
        masterHeroTl.to(text, { y: '0%', opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, pillStart + 0.12);
      }
    });

    // Squiggle paths draw in
    [pathLeft, pathRight].forEach((p, idx) => {
      if (p) {
        masterHeroTl
          .to(p, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }, 0.4 + idx * 0.15)
          .to(p, { strokeWidth: 28, duration: 0.9, ease: 'power2.out' }, 0.4 + idx * 0.15);
      }
    });

    // Curved Ribbon Arc Marquee (Draws Right-to-Left on Scroll + Infinite Text Loop)
    const bgPath = bgPathRef.current;
    const maskPath = maskPathRef.current;
    const textPath = textPathRef.current;

    if (bgPath && maskPath && textPath) {
      const len = bgPath.getTotalLength ? bgPath.getTotalLength() : 2500;
      // Start with negative offset so stroke enters from the right end and draws toward the left
      bgPath.style.strokeDasharray = `${len}`;
      bgPath.style.strokeDashoffset = `${-len}`;
      maskPath.style.strokeDasharray = `${len}`;
      maskPath.style.strokeDashoffset = `${-len}`;

      // Infinite smooth sliding loop along curve
      const unitLength = 1600;
      gsap.to(textPath, {
        attr: { startOffset: -unitLength },
        duration: 20,
        ease: 'none',
        repeat: -1
      });

      // ScrollTrigger: As user scrolls down, draw the ribbon from RIGHT TO LEFT
      gsap.to([bgPath, maskPath], {
        strokeDashoffset: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.hero-marquee',
          start: 'top 85%',
          end: 'top 20%',
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });
    }

    // Play Hero sequence immediately or when loader signals complete
    const playHandler = () => {
      masterHeroTl.play();
    };

    if (window.__studioLoaderDone || !document.querySelector('.studio-loader')) {
      playHandler();
    } else {
      document.addEventListener('studio:loaderComplete', playHandler, { once: true });
      const fallback = setTimeout(playHandler, 400);
      return () => {
        document.removeEventListener('studio:loaderComplete', playHandler);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    <section ref={heroRef} className="section-hero" id="hero">
      {/* Decorative Organic Vector Squiggles (Two26 Authentic Art Direction) */}
      <div className="hero-path-svg-left">
        <svg viewBox="0 0 229 599" fill="none">
          <path
            ref={pathLeftRef}
            d="M33.5 584.1C104.5 557.1 147.9 475 143 393.6C139.5 335.6 106 281.6 59 252.6C7.8 221 -4.2 385.6 52.5 405.6C140.2 436.6 225 369.1 212 252.6C208.4 220.1 192.5 178.6 152 121.6C117.9 73.6 42 11.6 42 11.6"
            stroke="var(--accent)"
            strokeWidth="28"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="hero-path-svg-right">
        <svg viewBox="0 0 354 487" fill="none">
          <path
            ref={pathRightRef}
            d="M250.7 12.3C192.7 52.8 114.7 199.8 245.7 315.8C376.7 431.8 364.2 140.9 235.2 83.3C153.2 46.7 54.8 106.8 30.2 172.3C-59.6 410.8 277.7 471.8 277.7 471.8"
            stroke="var(--accent)"
            strokeWidth="28"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="section-hero-wrapper">
        <div className="hero-text">
          {/* Magnetic Dual Heading with Anchored Floating Badge Pills */}
          <div ref={headingWrapperRef} className="section-heading-wrapper" style={{ position: 'relative' }}>
            {/* Pill 1: Floating at Top-Right of Heading */}
            <div
              ref={(el) => (pillsRef.current[0] = el)}
              className="hero-pill one"
              style={{
                position: 'absolute',
                top: '-1.4em',
                right: '-1.5em',
                zIndex: 4,
                transform: 'rotate(6deg)'
              }}
            >
              <span className="hero-pill-text-mask">
                <span className="hero-pill-text">Salem &amp; Worldwide</span>
              </span>
            </div>

            {/* Pill 2: Floating at Bottom-Left of Heading */}
            <div
              ref={(el) => (pillsRef.current[1] = el)}
              className="hero-pill two"
              style={{
                position: 'absolute',
                bottom: '-0.8em',
                left: '-1em',
                zIndex: 4,
                transform: 'rotate(-7deg)'
              }}
            >
              <span className="hero-pill-text-mask">
                <span className="hero-pill-text">Digital Studio</span>
              </span>
            </div>

            <h1 className="section-heading">
              <span className="hero-line-mask">
                <span className="hero-line">ENGINEERING BOLD</span>
              </span>
              <span className="hero-line-mask">
                <span className="hero-line">DIGITAL IMPACT</span>
              </span>
            </h1>

            <h1 ref={offsetHeadingRef} className="section-heading accent-offset" aria-hidden="true">
              ENGINEERING BOLD<br />DIGITAL IMPACT
            </h1>
          </div>

          <p style={{ maxWidth: '640px', marginTop: '1.8em', fontSize: '1.15em', color: 'var(--ink-gray)', fontWeight: 500, lineHeight: 1.6 }}>
            Sync Aura crafts bespoke high-performance web applications, intelligent n8n workflows, and iconic brand identities engineered for real-world impact.
          </p>

          {/* Clean Primary Single CTA Button (Two26 Exact Standard) */}
          <div style={{ marginTop: '2.4em', display: 'flex', justifyContent: 'center' }}>
            <button className="cta-btn" onClick={onOpenContact} style={{ fontSize: '1.1em', padding: '0.9em 2.4em' }}>
              <span className="cta-text">Start a Project</span>
              <span className="cta-btn-arrow">
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                  <path d="M1.464 8.536L8.535 1.465M3.055 1.288L8.535 1.465L8.712 6.945" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="cta-btn-fill-hover"></span>
            </button>
          </div>
        </div>

        {/* Sync Aura Full-Width Bespoke Engineering & Design Showcase */}
        <div
          className="hero-showcase-wrapper"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
            margin: '3em auto 0',
            backgroundColor: '#0a0a0a',
            borderRadius: '28px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '2.5em clamp(1.2rem, 3vw, 3rem)',
            background: 'radial-gradient(circle at 50% 20%, #172554 0%, #0a0a0a 75%)',
            boxSizing: 'border-box'
          }}
        >
          {/* Subtle Ambient Glowing Grids */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }}></div>

          {/* Clean 3-Column Studio Platform Grid (Level, Perfectly Aligned) */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              alignItems: 'center',
              gap: 'clamp(1rem, 2vw, 2.5rem)',
              boxSizing: 'border-box'
            }}
          >
            {/* Left Card: Telegram AI Bot Ordering Platform */}
            <div
              style={{
                width: '100%',
                height: 'clamp(280px, 26vw, 400px)',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#18181b',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                transition: 'transform 0.35s ease, border-color 0.35s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <img src={telegramMockup} alt="Telegram Food Bot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '1em', left: '1em', right: '1em', background: 'rgba(10, 10, 10, 0.88)', backdropFilter: 'blur(10px)', padding: '0.75em 1em', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: '0.7em', color: '#00b4d8', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>AI &amp; N8N AUTOMATION</div>
                <div style={{ fontSize: '0.95em', color: '#ffffff', fontWeight: 700 }}>Telegram Order Engine</div>
              </div>
            </div>

            {/* Center Flagship Card: Forge Industrial Real-Time Portal */}
            <div
              style={{
                width: '100%',
                height: 'clamp(320px, 32vw, 440px)',
                borderRadius: '24px',
                overflow: 'hidden',
                background: '#09090b',
                border: '2px solid var(--accent)',
                boxShadow: '0 25px 60px rgba(37, 99, 235, 0.3)',
                position: 'relative',
                transition: 'transform 0.35s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
              }}
            >
              {/* Browser Header Bar */}
              <div style={{ height: '36px', background: '#18181b', display: 'flex', alignItems: 'center', padding: '0 1em', gap: '0.5em', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
                <div style={{ marginLeft: '1em', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '6px', padding: '2px 14px', fontSize: '0.72em', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-mono)' }}>
                  syncaura.studio/portal/telemetry
                </div>
              </div>
              <img src="/forge.png" alt="Forge Industrial Portal" style={{ width: '100%', height: 'calc(100% - 36px)', objectFit: 'cover' }} />
              
              {/* Floating Live Telemetry Badge */}
              <div style={{ position: 'absolute', top: '48px', right: '1em', background: 'rgba(10, 10, 10, 0.92)', backdropFilter: 'blur(12px)', border: '1px solid #10b981', borderRadius: '999px', padding: '0.35em 0.9em', display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 10px #10b981' }}></span>
                <span style={{ fontSize: '0.72em', fontFamily: 'var(--font-mono)', color: '#ffffff', fontWeight: 700 }}>LIVE PRODUCTION</span>
              </div>
            </div>

            {/* Right Card: Salem Rotaract Community Platform */}
            <div
              style={{
                width: '100%',
                height: 'clamp(280px, 26vw, 400px)',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#18181b',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                transition: 'transform 0.35s ease, border-color 0.35s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <img src="/rotaract.png" alt="Rotaract Salem Ecosystem" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '1em', left: '1em', right: '1em', background: 'rgba(10, 10, 10, 0.88)', backdropFilter: 'blur(10px)', padding: '0.75em 1em', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: '0.7em', color: '#8b5cf6', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>FULL-STACK WEB</div>
                <div style={{ fontSize: '0.95em', color: '#ffffff', fontWeight: 700 }}>Rotaract Salem Platform</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Sync Aura Signature Curved Ribbon Infinite Marquee */}
      <div
        className="hero-marquee"
        style={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          marginTop: '2.5em',
          pointerEvents: 'none'
        }}
      >
        <svg viewBox="0 0 1440 370" preserveAspectRatio="none" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
          <defs>
            <path
              id="hero-marquee-curve"
              d="M-43 292.8C179.6 174.3 464 116.5 712.7 90.6C934.6 67.6 1166.5 74.6 1436.9 105.1 L 5000 507"
              fill="none"
            />
            <mask id="hero-marquee-text-mask" maskUnits="userSpaceOnUse">
              <path
                ref={maskPathRef}
                d="M-43 292.8C179.6 174.3 464 116.5 712.7 90.6C934.6 67.6 1166.5 74.6 1436.9 105.1"
                stroke="#FFFFFF"
                strokeWidth="220"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </mask>
          </defs>

          {/* Background Ribbon Stroke in Sync Aura Electric Blue */}
          <path
            ref={bgPathRef}
            d="M-43 292.8C179.6 174.3 464 116.5 712.7 90.6C934.6 67.6 1166.5 74.6 1436.9 105.1"
            stroke="var(--accent)"
            strokeWidth="154"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Masked Sliding Text in Sync Aura Identity */}
          <g ref={textGroupRef} mask="url(#hero-marquee-text-mask)">
            <text className="hero-marquee-text" fontSize="74" fontWeight="900" fill="#FFFFFF">
              <textPath ref={textPathRef} href="#hero-marquee-curve" startOffset="0">
                SYNC AURA &nbsp;•&nbsp; SCALABLE WEB APPS &nbsp;•&nbsp; INTELLIGENT AUTOMATIONS &nbsp;•&nbsp; BESPOKE BRAND IDENTITIES &nbsp;•&nbsp;
                SYNC AURA &nbsp;•&nbsp; SCALABLE WEB APPS &nbsp;•&nbsp; INTELLIGENT AUTOMATIONS &nbsp;•&nbsp; BESPOKE BRAND IDENTITIES &nbsp;•&nbsp;
                SYNC AURA &nbsp;•&nbsp; SCALABLE WEB APPS &nbsp;•&nbsp; INTELLIGENT AUTOMATIONS &nbsp;•&nbsp; BESPOKE BRAND IDENTITIES &nbsp;•&nbsp;
                SYNC AURA &nbsp;•&nbsp; SCALABLE WEB APPS &nbsp;•&nbsp; INTELLIGENT AUTOMATIONS &nbsp;•&nbsp; BESPOKE BRAND IDENTITIES &nbsp;•&nbsp;
              </textPath>
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
