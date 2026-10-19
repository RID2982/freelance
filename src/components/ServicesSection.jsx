import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: 'web',
    title1: 'Web Application',
    title2: '& Landing Page',
    desc: 'High-performance bespoke web applications and high-conversion landing pages built with React and Next.js.',
    accent: '#2563eb',
    align: 'right',
    offset: '8vw',
    illustration: (
      <svg width="100%" height="100%" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="60" height="42" rx="6" fill="#0a0a0a" stroke="#2563eb" strokeWidth="2" />
        <circle cx="18" cy="18" r="2.5" fill="#ef4444" />
        <circle cx="25" cy="18" r="2.5" fill="#f59e0b" />
        <circle cx="32" cy="18" r="2.5" fill="#10b981" />
        <line x1="10" y1="24" x2="70" y2="24" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <rect x="16" y="29" width="22" height="18" rx="3" fill="rgba(37,99,235,0.25)" stroke="#2563eb" strokeWidth="1.2" />
        <line x1="44" y1="31" x2="62" y2="31" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <line x1="44" y1="37" x2="58" y2="37" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="44" y1="43" x2="52" y2="43" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'mobile',
    title1: 'Mobile App',
    title2: 'Development',
    desc: 'Fluid, cross-platform mobile experiences and intuitive interfaces designed for iOS and Android.',
    accent: '#00b4d8',
    align: 'left',
    offset: '6vw',
    illustration: (
      <svg width="100%" height="100%" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="8" width="30" height="46" rx="6" fill="#0a0a0a" stroke="#00b4d8" strokeWidth="2" />
        <line x1="36" y1="12" x2="44" y2="12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="29" y="17" width="22" height="28" rx="3" fill="#e0f2fe" />
        <circle cx="35" cy="24" r="3" fill="#00b4d8" />
        <rect x="31" y="31" width="18" height="3" rx="1.5" fill="#0284c7" />
        <rect x="31" y="37" width="12" height="3" rx="1.5" fill="#38bdf8" />
        <circle cx="40" cy="50" r="1.5" fill="rgba(255,255,255,0.6)" />
      </svg>
    )
  },
  {
    id: 'automations',
    title1: 'AI & Workflow',
    title2: 'Automations',
    desc: 'Autonomous n8n workflows connecting Telegram bots, WhatsApp APIs, CRMs, and LLM reasoning.',
    accent: '#10b981',
    align: 'left',
    offset: '22vw',
    illustration: (
      <svg width="100%" height="100%" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="30" r="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2.5" />
        <circle cx="60" cy="18" r="9" fill="#0a0a0a" stroke="#10b981" strokeWidth="2" />
        <circle cx="60" cy="42" r="9" fill="#0a0a0a" stroke="#10b981" strokeWidth="2" />
        <path d="M30 30 C44 30, 46 18, 51 18" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 30 C44 30, 46 42, 51 42" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        <circle cx="40" cy="30" r="3" fill="#10b981" />
        <path d="M18 30 L22 30 M20 28 L20 32" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'posters',
    title1: 'Poster Design',
    title2: '& Carousels',
    desc: 'High-impact editorial posters, dynamic social carousels, and eye-catching visual campaign collateral.',
    accent: '#f59e0b',
    align: 'right',
    offset: '7vw',
    illustration: (
      <svg width="100%" height="100%" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="10" width="30" height="42" rx="4" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2" />
        <rect x="30" y="8" width="30" height="42" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="45" cy="22" r="6" fill="#f59e0b" />
        <line x1="36" y1="34" x2="54" y2="34" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
        <line x1="36" y1="40" x2="48" y2="40" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'brand',
    title1: 'Logos & Brand',
    title2: 'Identity',
    desc: 'Distinctive logos, calibrated typography systems, and iconic visual identities built to endure.',
    accent: '#8b5cf6',
    align: 'left',
    offset: '12vw',
    illustration: (
      <svg width="100%" height="100%" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="30" r="22" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3 3" />
        <polygon points="40,14 62,26 40,38 18,26" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="18,26 40,38 40,50 18,38" fill="#7c3aed" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="62,26 40,38 40,50 62,38" fill="#a78bfa" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'direction',
    title1: 'Art Direction',
    title2: '& Video',
    desc: 'Creative supervision, promotional video production, and cohesive visual storytelling for modern brands.',
    accent: '#2563eb',
    align: 'center',
    offset: '0%',
    illustration: (
      <svg width="100%" height="100%" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="12" width="52" height="38" rx="6" fill="#0a0a0a" stroke="#2563eb" strokeWidth="2" />
        <polygon points="36,22 48,31 36,40" fill="#00b4d8" />
        <line x1="14" y1="20" x2="66" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="58" cy="16" r="2" fill="#ef4444" />
      </svg>
    )
  }
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const offsetHeadingRef = useRef(null);
  const pathRef = useRef(null);
  const tracerRef = useRef(null);
  const journeyRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Magnetic Dual Heading Offset (Two26 Signature)
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

      // 2. Setup Winding Serpentine SVG Path
      const path = pathRef.current;
      const tracer = tracerRef.current;
      if (!path) return;

      const len = path.getTotalLength ? path.getTotalLength() : 4800;
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;

      // Position tracer dot at start coordinates (Top Right Corner)
      if (tracer && path.getPointAtLength) {
        const startPt = path.getPointAtLength(0);
        tracer.setAttribute('cx', startPt.x);
        tracer.setAttribute('cy', startPt.y);
        tracer.setAttribute('opacity', 1);
      }

      // 3. Setup Initial State for Service Items
      itemsRef.current.forEach((el) => {
        if (!el) return;
        const capsule = el.querySelector('.service-capsule');
        const pill = el.querySelector('.service-pill');
        if (capsule) gsap.set(capsule, { scale: 0, width: 0, opacity: 0 });
        if (pill) gsap.set(pill, { scale: 0.75, opacity: 0, y: 15 });
      });

      // 4. Master Scrubbed Timeline: Draws along path from Top-Right Corner to Bottom-Left Corner
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: journeyRef.current || section,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });

      masterTl.fromTo(
        path,
        { strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 1,
          onUpdate: function () {
            if (tracer && path.getPointAtLength) {
              const p = this.progress();
              const drawnLength = Math.min(len, Math.max(0, p * len));
              const pt = path.getPointAtLength(drawnLength);
              tracer.setAttribute('cx', pt.x);
              tracer.setAttribute('cy', pt.y);
            }
          }
        },
        0
      );

      // Staggered Expansion for Each Service as Winding Path Reaches It
      const totalLayers = itemsRef.current.length;
      itemsRef.current.forEach((el, index) => {
        if (!el) return;
        const capsule = el.querySelector('.service-capsule');
        const pill = el.querySelector('.service-pill');

        const point = totalLayers > 1 ? index / (totalLayers - 1) : 0;
        const stepDuration = 0.12;
        const startTime = Math.max(0, point - 0.03);

        if (capsule) {
          masterTl.fromTo(
            capsule,
            { scale: 0, width: 0, opacity: 0 },
            {
              scale: 1,
              width: 'clamp(58px, 6.8vw, 88px)',
              opacity: 1,
              duration: stepDuration,
              ease: 'back.out(3.2)'
            },
            startTime
          );
        }

        if (pill) {
          masterTl.fromTo(
            pill,
            { scale: 0.75, opacity: 0, y: 15 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: stepDuration,
              ease: 'back.out(2.2)'
            },
            startTime + 0.02
          );
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-services"
      id="services"
      style={{
        position: 'relative',
        backgroundColor: '#fafafa',
        overflow: 'hidden',
        width: '100%',
        padding: '7em 0 10em',
        margin: 0,
        boxSizing: 'border-box'
      }}
    >
      {/* Section Header with Two26 Magnetic Dual Heading */}
      <div
        className="section-services-header-wrap"
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto 4em',
          padding: '0 2em',
          textAlign: 'center'
        }}
      >
        <div
          className="section-about-text"
          style={{
            color: 'var(--accent)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.15em',
            fontWeight: 700,
            fontSize: '0.85em',
            textTransform: 'uppercase'
          }}
        >
          ENGINEERING &amp; CREATIVE STACK
        </div>
        <div ref={headingWrapperRef} className="section-heading-wrapper" style={{ marginTop: '0.6em' }}>
          <h2
            className="section-heading"
            style={{
              color: 'var(--ink-black, #0a0a0a)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1
            }}
          >
            THIS IS OUR CRAFT
          </h2>
          <h2
            ref={offsetHeadingRef}
            className="section-heading accent-offset"
            aria-hidden="true"
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1
            }}
          >
            THIS IS OUR CRAFT
          </h2>
        </div>
        <p
          style={{
            maxWidth: '560px',
            margin: '1.2em auto 0',
            color: 'var(--ink-gray)',
            fontSize: '1.1em',
            lineHeight: 1.6
          }}
        >
          Every capability we offer is built with extreme technical polish, deep systems design, and seamless user flow.
        </p>
      </div>

      {/* The Winding Journey Container - 100vw Edge-to-Edge Corner to Corner */}
      <div
        ref={journeyRef}
        className="services-journey-container"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '2200px',
          margin: 0,
          padding: 0,
          overflow: 'hidden'
        }}
      >
        {/* Continuous Winding SVG Stroke (Draws dynamically from top-right corner to bottom-left corner on scroll) */}
        <svg
          className="services-journey-svg"
          viewBox="0 0 1920 2200"
          fill="none"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {/* Path: Starts at Top-Right Corner (1920, 25), loops every service, exits at Bottom-Left Corner (0, 2180) */}
          <path
            ref={pathRef}
            d="
              M 1920 25
              C 1780 30, 1620 40, 1500 110
              C 1400 170, 1520 230, 1580 200
              C 1640 160, 1300 240, 950 360
              C 600 480, 290 520, 260 630
              C 230 740, 380 790, 520 810
              C 660 830, 620 920, 560 980
              C 490 1040, 620 1110, 840 1130
              C 1120 1150, 1640 1200, 1580 1330
              C 1520 1450, 1260 1480, 960 1510
              C 650 1540, 320 1580, 290 1690
              C 260 1800, 480 1840, 740 1850
              C 1080 1860, 1500 1900, 1300 2020
              C 1050 2120, 600 2160, 300 2175
              L 0 2180
            "
            stroke="var(--accent)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />

          {/* Start Pin at Exact Far Right Screen Corner (1895, 25) */}
          <g transform="translate(1895, 25)">
            <circle r="18" fill="#ffffff" stroke="var(--accent)" strokeWidth="4" />
            <circle r="8" fill="var(--accent)" />
          </g>

          {/* Active Glowing Tracer Dot (Rides drawing head dynamically) */}
          <circle
            ref={tracerRef}
            cx="1895"
            cy="25"
            r="10"
            fill="var(--accent)"
            stroke="#ffffff"
            strokeWidth="4"
            style={{
              filter: 'drop-shadow(0 0 16px rgba(37,99,235,0.95))'
            }}
          />

          {/* End Pin at Exact Far Left Screen Corner (25, 2180) */}
          <g transform="translate(25, 2180)">
            <circle r="18" fill="#ffffff" stroke="var(--accent)" strokeWidth="4" />
            <circle r="8" fill="var(--accent)" />
          </g>
        </svg>

        {/* Staggered Services Items Spanning Across Full Screen Width */}
        <div
          className="services-items-flow"
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: '7.2em',
            padding: '1.5em 5vw',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {servicesData.map((item, index) => {
            let alignStyle = { alignSelf: 'center' };
            if (item.align === 'right') {
              alignStyle = { alignSelf: 'flex-end', marginRight: item.offset };
            } else if (item.align === 'left') {
              alignStyle = { alignSelf: 'flex-start', marginLeft: item.offset };
            } else if (item.align === 'center-left') {
              alignStyle = { alignSelf: 'flex-start', marginLeft: item.offset };
            }

            return (
              <div
                key={item.id}
                ref={(el) => (itemsRef.current[index] = el)}
                className={`service-flow-item service-${item.id}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: item.align === 'right' ? 'flex-end' : item.align === 'center' ? 'center' : 'flex-start',
                  maxWidth: '720px',
                  ...alignStyle
                }}
              >
                {/* Title Row with Expanding Illustration Capsule */}
                <div
                  className="service-title-row"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65em',
                    flexWrap: 'wrap',
                    position: 'relative',
                    zIndex: 3
                  }}
                >
                  <span
                    className="service-word"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(2.4rem, 5.2vw, 4.8rem)',
                      fontWeight: 900,
                      letterSpacing: '-0.04em',
                      lineHeight: 0.95,
                      color: 'var(--ink-black, #0a0a0a)',
                      textShadow: '0 0 20px #fafafa, 0 0 35px #fafafa'
                    }}
                  >
                    {item.title1}
                  </span>

                  {/* Capsule containing custom vector illustration */}
                  <div
                    className="service-capsule"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 'clamp(52px, 7vw, 76px)',
                      borderRadius: '999px',
                      overflow: 'hidden',
                      backgroundColor: '#ffffff',
                      border: `2px solid ${item.accent}`,
                      padding: '0.45em',
                      boxShadow: `0 8px 24px ${item.accent}30`,
                      position: 'relative',
                      zIndex: 4
                    }}
                  >
                    <div
                      style={{
                        width: 'clamp(48px, 6vw, 68px)',
                        height: 'clamp(36px, 5vw, 52px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {item.illustration}
                    </div>
                  </div>

                  <span
                    className="service-word"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(2.4rem, 5.2vw, 4.8rem)',
                      fontWeight: 900,
                      letterSpacing: '-0.04em',
                      lineHeight: 0.95,
                      color: 'var(--ink-black, #0a0a0a)',
                      textShadow: '0 0 20px #fafafa, 0 0 35px #fafafa'
                    }}
                  >
                    {item.title2}
                  </span>
                </div>

                {/* Clean Two26 Description Pill below title */}
                <div
                  className="service-pill"
                  style={{
                    marginTop: '0.9em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.65em 1.4em',
                    borderRadius: '999px',
                    background: '#ffffff',
                    border: `1.5px solid ${item.accent}`,
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
                    maxWidth: '480px',
                    transformOrigin: 'left center',
                    position: 'relative',
                    zIndex: 3
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                      fontWeight: 500,
                      lineHeight: 1.45,
                      color: '#1f2937'
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Terminating Callout Pill at Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5em',
            position: 'relative',
            zIndex: 3
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8em',
              padding: '0.7em 1.6em',
              borderRadius: '999px',
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1.5px solid var(--accent)',
              color: 'var(--ink-black)',
              fontWeight: 700,
              fontSize: '0.92em',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                display: 'inline-block'
              }}
            />
            HAVE A VISION? WE BUILD THE ENTIRE PIPELINE.
          </div>
        </div>
      </div>
    </section>
  );
}
