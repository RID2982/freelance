import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: 'web',
    title1: 'Full-Stack Web',
    title2: '& SaaS Platforms',
    desc: 'High-performance bespoke web applications, SaaS dashboards, and scalable cloud platforms built with React, Next.js, and Node.js.',
    accent: '#F28C28',
    align: 'right',
    offset: '8vw',
    illustration: (
      <svg width="100%" height="100%" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="60" height="42" rx="6" fill="#0a0b0e" stroke="#F28C28" strokeWidth="2" />
        <circle cx="18" cy="18" r="2.5" fill="#ef4444" />
        <circle cx="25" cy="18" r="2.5" fill="#F28C28" />
        <circle cx="32" cy="18" r="2.5" fill="#10b981" />
        <line x1="10" y1="24" x2="70" y2="24" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <rect x="16" y="29" width="22" height="18" rx="3" fill="rgba(242,140,40,0.22)" stroke="#F28C28" strokeWidth="1.2" />
        <line x1="44" y1="31" x2="62" y2="31" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <line x1="44" y1="37" x2="58" y2="37" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="44" y1="43" x2="52" y2="43" stroke="#F28C28" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'automations',
    title1: 'AI & n8n',
    title2: 'Automations',
    desc: 'Autonomous n8n workflows connecting Telegram bots, WhatsApp APIs, CRMs, databases, and LLM reasoning pipelines.',
    accent: '#FF7800',
    align: 'left',
    offset: '6vw',
    illustration: (
      <svg width="100%" height="100%" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="30" r="10" fill="#1A140E" stroke="#FF7800" strokeWidth="2.5" />
        <circle cx="60" cy="18" r="9" fill="#0a0b0e" stroke="#FF7800" strokeWidth="2" />
        <circle cx="60" cy="42" r="9" fill="#0a0b0e" stroke="#FF7800" strokeWidth="2" />
        <path d="M30 30 C44 30, 46 18, 51 18" stroke="#FF7800" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 30 C44 30, 46 42, 51 42" stroke="#FF7800" strokeWidth="2" strokeLinecap="round" />
        <circle cx="40" cy="30" r="3" fill="#FF7800" />
        <path d="M18 30 L22 30 M20 28 L20 32" stroke="#FF7800" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'mobile',
    title1: 'Mobile App',
    title2: 'Engineering',
    desc: 'Fluid, cross-platform mobile applications and native-feeling experiences engineered for iOS and Android.',
    accent: '#F28C28',
    align: 'left',
    offset: '20vw',
    illustration: (
      <svg width="100%" height="100%" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="8" width="30" height="46" rx="6" fill="#0a0b0e" stroke="#F28C28" strokeWidth="2" />
        <line x1="36" y1="12" x2="44" y2="12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="29" y="17" width="22" height="28" rx="3" fill="#1A140E" />
        <circle cx="35" cy="24" r="3" fill="#F28C28" />
        <rect x="31" y="31" width="18" height="3" rx="1.5" fill="#FF7800" />
        <rect x="31" y="37" width="12" height="3" rx="1.5" fill="#FFB347" />
        <circle cx="40" cy="50" r="1.5" fill="rgba(255,255,255,0.6)" />
      </svg>
    )
  },
  {
    id: 'apis',
    title1: 'Custom APIs &',
    title2: 'Cloud Systems',
    desc: 'Resilient backend architectures, real-time WebSocket engines, payment gateways, and automated data synchronization.',
    accent: '#FFB347',
    align: 'center',
    offset: '0%',
    illustration: (
      <svg width="100%" height="100%" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="14" width="52" height="32" rx="6" fill="#0a0b0e" stroke="#FFB347" strokeWidth="2" />
        <path d="M26 26 L20 30 L26 34" stroke="#F28C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M54 26 L60 30 L54 34" stroke="#F28C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="44" y1="22" x2="36" y2="38" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
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
        backgroundColor: 'var(--bg-main)',
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
          minHeight: '1380px',
          margin: 0,
          padding: 0,
          overflow: 'hidden'
        }}
      >
        {/* Continuous Winding SVG Stroke (Draws dynamically from top-right corner through all 4 services to bottom-left corner) */}
        <svg
          className="services-journey-svg"
          viewBox="0 0 1920 1400"
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
          {/* Path: Starts at Top-Right Corner (1895, 30), loops cleanly through all 4 services, exits at Bottom-Left Pin (25, 1360) */}
          <path
            ref={pathRef}
            d="
              M 1895 30
              C 1720 40, 1580 120, 1380 210
              C 1180 300, 620 260, 380 410
              C 220 510, 340 640, 680 680
              C 1020 720, 620 820, 420 930
              C 260 1020, 480 1120, 960 1160
              C 1380 1195, 1180 1310, 640 1345
              L 25 1360
            "
            stroke="var(--accent)"
            strokeWidth="16"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />

          {/* Start Pin at Top-Right Corner (1895, 30) */}
          <g transform="translate(1895, 30)">
            <circle r="16" fill="#0A0B0E" stroke="var(--accent)" strokeWidth="4" />
            <circle r="7" fill="var(--accent)" />
          </g>

          {/* Active Glowing Tracer Dot (Rides drawing head dynamically) */}
          <circle
            ref={tracerRef}
            cx="1895"
            cy="30"
            r="10"
            fill="var(--accent)"
            stroke="#ffffff"
            strokeWidth="3.5"
            style={{
              filter: 'drop-shadow(0 0 16px rgba(242, 140, 40, 0.95))'
            }}
          />

          {/* End Pin at Bottom-Left Corner (25, 1360) */}
          <g transform="translate(25, 1360)">
            <circle r="16" fill="#0A0B0E" stroke="var(--accent)" strokeWidth="4" />
            <circle r="7" fill="var(--accent)" />
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
                      color: 'var(--ink-black, #ffffff)',
                      textShadow: '0 0 20px rgba(10,11,14,0.9), 0 0 35px rgba(10,11,14,0.8)'
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
                      backgroundColor: 'var(--surface-white)',
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
                      color: 'var(--ink-black, #ffffff)',
                      textShadow: '0 0 20px rgba(10,11,14,0.9), 0 0 35px rgba(10,11,14,0.8)'
                    }}
                  >
                    {item.title2}
                  </span>
                </div>

                {/* Clean Description Pill below title */}
                <div
                  className="service-pill"
                  style={{
                    marginTop: '0.9em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.65em 1.4em',
                    borderRadius: '999px',
                    background: 'var(--surface-white)',
                    border: `1.5px solid ${item.accent}`,
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.28)',
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
                      color: 'var(--ink-gray)'
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
              background: 'rgba(242, 140, 40, 0.1)',
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
