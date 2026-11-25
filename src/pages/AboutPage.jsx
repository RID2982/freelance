import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const TEAM_MEMBERS = [
  {
    id: 'vinodhan',
    name: 'VINODHAN V A',
    role: 'FOUNDER & LEAD ENGINEER / DESIGNER',
    image: '/member-vinodhan.jpg',
    imgPosition: '50% 30%',
    bio: [
      'Full-stack engineer turned product architect with an obsession for micro-interactions, responsive architectures, and zero-latency interfaces. Leading VHX’s frontend engineering, GSAP physics pipelines, and core software systems.',
      'When not crafting component libraries or profiling frame rates, he is deep in software ergonomics, exploring typographic design systems, and building high-impact platforms for ambitious businesses.'
    ],
    socials: [
      { name: 'GitHub', url: 'https://github.com/vinodhan07' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/vinodhan-v-a' },
      { name: 'Email', url: 'mailto:vinovb21@gmail.com' }
    ]
  },
  {
    id: 'haridev',
    name: 'HARI DEV M V',
    role: 'CO-FOUNDER & TECHNICAL ARCHITECT / AI SPECIALIST',
    image: '/member-haridev.jpg',
    imgPosition: '50% 10%',
    bio: [
      'System architect and AI automation specialist with a strong background in backend distributed systems, API orchestration, and agentic workflows using n8n and large language models.',
      'He ensures every system built at VHX is rock-solid, secure, and capable of operating 24/7 without manual intervention. Always thinking three steps ahead in scalable system architecture.'
    ],
    socials: [
      { name: 'GitHub', url: 'https://github.com' },
      { name: 'LinkedIn', url: 'https://linkedin.com' },
      { name: 'Email', url: 'mailto:haridevvinothkumar@outlook.com' }
    ]
  }
];

export default function AboutPage({ onOpenContact, onNavigate }) {
  const heroRef = useRef(null);
  const pathRef = useRef(null);
  const storyContainerRef = useRef(null);
  const storyPathRef = useRef(null);
  const teamRef = useRef(null);
  const [activeMember, setActiveMember] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Line-by-line heading entrance
      const headingLines = heroRef.current?.querySelectorAll('.about-hero-line');
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
            delay: 0.1,
          }
        );
      }

      // 2. Pills pop-in
      const pills = heroRef.current?.querySelectorAll('.about-hero-pill');
      if (pills?.length) {
        gsap.fromTo(
          pills,
          { scale: 0.4, opacity: 0, y: 20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.15,
            ease: 'back.out(2.5)',
            delay: 0.35,
          }
        );
      }

      // 3. Hero SVG ribbon draw
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength ? pathRef.current.getTotalLength() : 1500;
        pathRef.current.style.strokeDasharray = length;
        pathRef.current.style.strokeDashoffset = length;

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.2,
        });
      }

      // 4. Mascot SVG Pop
      const mascotImg = heroRef.current?.querySelector('.about-hero-img');
      if (mascotImg) {
        gsap.fromTo(
          mascotImg,
          { scale: 0.65, opacity: 0, rotation: -6 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.85,
            ease: 'back.out(2.2)',
            delay: 0.4,
          }
        );
      }

      // 5. Continuous Animated Story SVG Path Scrub (Snakes cleanly without collapsing)
      if (storyPathRef.current && storyContainerRef.current) {
        const pathLen = storyPathRef.current.getTotalLength ? storyPathRef.current.getTotalLength() : 4200;
        storyPathRef.current.style.strokeDasharray = `${pathLen} ${pathLen}`;
        storyPathRef.current.style.strokeDashoffset = pathLen;

        gsap.to(storyPathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: storyContainerRef.current,
            start: 'top 75%',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // 6. Story Sections Reveal animations
      const storySections = storyContainerRef.current?.querySelectorAll('.about-story-section, .pillar-card');
      storySections?.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      // 7. Signature Two26 Round Art -> 2800px Stroke Width Expansion -> Full Viewport Blue Flood Transition
      if (teamRef.current && storyPathRef.current) {
        const floodTl = gsap.timeline({
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 82%',
            end: 'top 22%',
            scrub: 0.6,
            onEnter: () => teamRef.current?.classList.add('is-flooded'),
            onLeaveBack: () => teamRef.current?.classList.remove('is-flooded'),
          }
        });

        // Explode strokeWidth from 20px up to 2800px!
        floodTl.fromTo(
          storyPathRef.current,
          { strokeWidth: 20 },
          { strokeWidth: 2800, ease: 'power2.inOut', duration: 1 },
          0
        );

        // Flood the background of the team section to #2563eb
        floodTl.fromTo(
          teamRef.current,
          { backgroundColor: 'rgba(37, 99, 235, 0)' },
          { backgroundColor: 'rgba(37, 99, 235, 1)', ease: 'power2.inOut', duration: 1 },
          0
        );

        const teamHeading = teamRef.current.querySelector('.about-team-header h2');
        const teamBadge = teamRef.current.querySelector('.about-team-header .about-story-text');
        const teamDesc = teamRef.current.querySelector('.about-team-header p');

        if (teamHeading) floodTl.to(teamHeading, { color: '#ffffff', duration: 0.5 }, 0.2);
        if (teamBadge) floodTl.to(teamBadge, { color: '#bfdbfe', duration: 0.5 }, 0.2);
        if (teamDesc) floodTl.to(teamDesc, { color: 'rgba(255, 255, 255, 0.95)', duration: 0.5 }, 0.2);

        // Staggered pop-in for teammate cards
        const teamCards = teamRef.current.querySelectorAll('.team-card');
        if (teamCards?.length) {
          gsap.fromTo(
            teamCards,
            { y: 50, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.75,
              stagger: 0.16,
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: teamRef.current,
                start: 'top 65%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page-root" style={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* =======================================================
          TWO26 ABOUT HERO SECTION
          ======================================================= */}
      <section className="section-about-hero" ref={heroRef}>
        <div className="about-hero-wrapper">
          <div className="about-hero-text">
            <h1 className="heading left-align">
              <span className="about-hero-line-mask">
                <span className="about-hero-line">VHX SOLUTIONS,</span>
              </span>
            </h1>

            <div className="about-hero-pill two">
              <span>Software &amp; Automations</span>
            </div>

            <h1 className="heading right-align">
              <span className="about-hero-line-mask">
                <span className="about-hero-line">BUILT FOR IMPACT</span>
              </span>
            </h1>

            <div className="about-hero-pill one">
              <span>Founder-Led</span>
            </div>
          </div>

          {/* Two26 Decorative Ribbon Path */}
          <div className="about-hero-path" style={{ position: 'absolute', top: '8%', right: '1%', width: '160px', pointerEvents: 'none', zIndex: 1, opacity: 0.85 }}>
            <svg width="100%" viewBox="0 0 492 789" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                ref={pathRef}
                d="M346.027 773.963C346.027 773.963 123.155 751.726 37.5236 580.463C-5.47612 494.463 12.1589 403.856 98.5229 359.463C259.022 276.963 386.528 426.963 423.028 500.963C469.82 595.828 230.528 683.463 212.028 548.463C195.241 425.963 407.22 329.963 451.028 251.963C519.452 130.133 435.528 24.9629 380.528 15.9629C337.028 8.84469 282.028 42.1764 282.028 85.9629C282.028 142.463 359.528 181.463 359.528 181.463"
                stroke="var(--accent)"
                strokeWidth="24"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Two26 Mascot & Studio Statement */}
          <div className="about-hero-btm">
            <div className="about-hero-svg-wrapper">
              <svg className="about-hero-img" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="90" cy="90" r="75" stroke="#0a0a0a" strokeWidth="8" strokeDasharray="15 15" />
                <circle cx="90" cy="90" r="45" fill="var(--accent)" />
                <path d="M70 90 L85 105 L115 75" stroke="#0a0a0a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="90" cy="30" r="10" fill="#0a0a0a" />
                <circle cx="150" cy="90" r="10" fill="#0a0a0a" />
                <circle cx="90" cy="150" r="10" fill="#0a0a0a" />
                <circle cx="30" cy="90" r="10" fill="#0a0a0a" />
              </svg>
            </div>
            <p className="about-hero-para">
              Founded in Salem by Vinodhan V A and Hari Dev M V, VHX brings together years of intense engineering across full-stack software applications, distributed AI automation workflows, and proprietary digital products.
            </p>
          </div>
        </div>
      </section>

      {/* =======================================================
          TWO26 STORY SECTIONS WITH CONTINUOUS SVG PATH SCRUB
          ======================================================= */}
      <section className="about-story-team" ref={storyContainerRef} style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="about-story-team-wrapper" style={{ width: '100%', maxWidth: '100%', margin: '0 auto', padding: '6em 4vw', position: 'relative' }}>

          {/* Continuous Scrubbing SVG Path (Engineered with Two26 proportional curve anchors) */}
          <div className="about-story-scroll-path" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
            <svg width="100%" height="100%" viewBox="0 0 1440 3400" fill="none" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
              <path
                ref={storyPathRef}
                d="M 720 40 C 660 180, 1180 260, 1120 480 C 1050 780, 220 680, 240 1050 C 260 1420, 1260 1380, 1220 1820 C 1180 2150, 320 2250, 340 2600 C 360 2850, 720 2950, 720 3300"
                stroke="var(--accent)"
                strokeWidth="16"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
                fill="none"
              />
            </svg>
          </div>

          {/* =======================================================
              STORY 1: TWO TECH MINDS CONNECTING (FOUNDERS STORY)
              ======================================================= */}
          <div className="about-story-section">
            <div className="about-story-svg-wrap">
              <svg width="340" height="280" viewBox="0 0 340 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="two-minds-svg">
                <defs>
                  <linearGradient id="mindsWireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF7800" />
                    <stop offset="50%" stopColor="#F28C28" />
                    <stop offset="100%" stopColor="#FFB347" />
                  </linearGradient>
                  <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Connecting Synaptic Neural Arcs between the two minds */}
                <g className="connecting-wires">
                  <path
                    d="M 105 105 C 130 50, 210 50, 235 105"
                    stroke="url(#mindsWireGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="6 6"
                    fill="none"
                  />
                  <path
                    d="M 115 115 C 145 80, 195 80, 225 115"
                    stroke="url(#mindsWireGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 120 135 C 150 145, 190 145, 220 135"
                    stroke="#F28C28"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  {/* Central Innovation Spark Node */}
                  <circle cx="170" cy="78" r="10" fill="#F28C28" filter="url(#glowEffect)" />
                  <circle cx="170" cy="78" r="4" fill="#ffffff" />
                  <path d="M 170 60 L 170 70 M 170 86 L 170 96 M 154 78 L 162 78 M 178 78 L 186 78" stroke="#FFB347" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* BOY 1 (Left - Lead Engineer / Vinodhan) */}
                <g className="boy-left" transform="translate(30, 80)">
                  <path d="M 15 145 C 15 110, 35 95, 75 95 C 115 95, 135 110, 135 145" fill="#18181b" stroke="#F28C28" strokeWidth="2" />
                  <path d="M 50 100 L 75 125 L 100 100" fill="#F28C28" />
                  <circle cx="75" cy="50" r="32" fill="#12141A" stroke="#F28C28" strokeWidth="3" />
                  <path d="M 45 45 C 45 22, 65 14, 85 15 C 105 16, 110 30, 108 42 C 100 32, 85 30, 72 34 C 60 38, 50 45, 45 45 Z" fill="#FFFFFF" />
                  <rect x="56" y="44" width="16" height="12" rx="3" stroke="#F28C28" strokeWidth="2.5" fill="rgba(242,140,40,0.18)" />
                  <rect x="78" y="44" width="16" height="12" rx="3" stroke="#F28C28" strokeWidth="2.5" fill="rgba(242,140,40,0.18)" />
                  <line x1="72" y1="49" x2="78" y2="49" stroke="#F28C28" strokeWidth="2.5" />
                  <path d="M 68 64 Q 75 70 82 64" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 75 14 Q 75 2 82 -2" stroke="#FF7800" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="84" cy="-4" r="3.5" fill="#FF7800" filter="url(#glowEffect)" />
                </g>

                {/* BOY 2 (Right - Technical Architect / Hari Dev) */}
                <g className="boy-right" transform="translate(160, 80)">
                  <path d="M 15 145 C 15 110, 35 95, 75 95 C 115 95, 135 110, 135 145" fill="#18181b" stroke="#FFB347" strokeWidth="2" />
                  <path d="M 50 100 L 75 125 L 100 100" fill="#FF7800" />
                  <circle cx="75" cy="50" r="32" fill="#12141A" stroke="#FFB347" strokeWidth="3" />
                  <path d="M 44 42 C 45 18, 70 12, 95 15 C 108 17, 110 32, 108 45 C 98 32, 85 28, 70 32 C 55 36, 46 42, 44 42 Z" fill="#FFFFFF" />
                  <circle cx="63" cy="48" r="3" fill="#FFFFFF" />
                  <circle cx="87" cy="48" r="3" fill="#FFFFFF" />
                  <path d="M 68 64 Q 75 70 82 64" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 75 14 Q 75 2 68 -2" stroke="#FFB347" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="66" cy="-4" r="3.5" fill="#FFB347" filter="url(#glowEffect)" />
                </g>

                <circle cx="60" cy="50" r="4" fill="#FF7800" opacity="0.75" />
                <circle cx="280" cy="50" r="4" fill="#FFB347" opacity="0.75" />
              </svg>
            </div>
            <div>
              <div className="about-story-text">WHY VHX EXISTS</div>
              <h2 className="about-story-heading">Built to eliminate manual bottlenecks with intelligent software.</h2>
              <p className="about-story-para">
                VHX was founded by Vinodhan V A and Hari Dev M V to give businesses direct access to production-grade software engineering and AI automation. We replace slow, repetitive workflows with custom web platforms, mobile apps, and autonomous systems engineered for measurable real-world impact.
              </p>
            </div>
          </div>

          {/* =======================================================
              STORY 2: THE STUDIO SEATING / CHAIR ILLUSTRATION (TWO26 STYLE)
              ======================================================= */}
          <div className="about-story-section reverse">
            <div>
              <div className="about-story-text">HOW VHX OPERATES</div>
              <h2 className="about-story-heading">Direct founder engineering, zero agency bloat.</h2>
              <p className="about-story-para">
                At VHX, you never get passed through layers of account managers or slow handoffs. You work directly with our founders and core engineering team — moving 10x faster with full architectural ownership from day one.
              </p>
            </div>
            <div className="about-story-svg-wrap">
              {/* High-Fidelity Two26 Style Boutique Designer Chair / Seating Illustration */}
              <svg width="320" height="280" viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="chairCushion" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1A140E" />
                    <stop offset="100%" stopColor="#2A1F14" />
                  </linearGradient>
                  <linearGradient id="chairAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF7800" />
                    <stop offset="100%" stopColor="#F28C28" />
                  </linearGradient>
                </defs>

                {/* Ground Shadow Ellipse */}
                <ellipse cx="160" cy="245" rx="100" ry="14" fill="rgba(242, 140, 40, 0.14)" />

                {/* Designer Chair Base / Chrome Spider Tripod Legs */}
                <line x1="160" y1="185" x2="110" y2="240" stroke="#F28C28" strokeWidth="5" strokeLinecap="round" />
                <line x1="160" y1="185" x2="210" y2="240" stroke="#F28C28" strokeWidth="5" strokeLinecap="round" />
                <line x1="160" y1="185" x2="160" y2="245" stroke="#F28C28" strokeWidth="5.5" strokeLinecap="round" />
                <line x1="160" y1="185" x2="70" y2="235" stroke="#F28C28" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="160" y1="185" x2="250" y2="235" stroke="#F28C28" strokeWidth="4.5" strokeLinecap="round" />

                {/* Central Swivel Pillar */}
                <rect x="154" y="150" width="12" height="38" rx="4" fill="#18181b" />
                <rect x="151" y="160" width="18" height="6" rx="2" fill="#F28C28" />

                {/* Chair Seat Base */}
                <path
                  d="M 90 152 C 90 162, 230 162, 230 152 C 240 142, 235 125, 215 125 L 105 125 C 85 125, 80 142, 90 152 Z"
                  fill="url(#chairAccent)"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />

                {/* Ergonomic Curved Backrest */}
                <path
                  d="M 105 125 C 95 65, 110 35, 160 35 C 210 35, 225 65, 215 125 Z"
                  fill="url(#chairCushion)"
                  stroke="#F28C28"
                  strokeWidth="3"
                />

                {/* Cushioned Inset Lines */}
                <path d="M 125 50 Q 160 60 195 50" stroke="rgba(242, 140, 40, 0.45)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 120 75 Q 160 88 200 75" stroke="rgba(242, 140, 40, 0.45)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 115 100 Q 160 115 205 100" stroke="rgba(242, 140, 40, 0.45)" strokeWidth="2.5" strokeLinecap="round" />

                {/* Timber Curved Armrests */}
                <path d="M 85 110 C 75 95, 95 85, 105 95" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M 235 110 C 245 95, 225 85, 215 95" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" fill="none" />

                {/* Beside Table: Round Pedestal with Coffee & Laptop Wireframe */}
                <g transform="translate(210, 140)">
                  <ellipse cx="40" cy="85" rx="32" ry="7" fill="rgba(242, 140, 40, 0.14)" />
                  <rect x="37" y="35" width="6" height="50" fill="#FFFFFF" />
                  <ellipse cx="40" cy="35" rx="28" ry="6" fill="#1A140E" stroke="#F28C28" strokeWidth="2.5" />
                  {/* Steaming Coffee Cup */}
                  <rect x="25" y="18" width="12" height="15" rx="3" fill="#F28C28" stroke="#FFFFFF" strokeWidth="1.5" />
                  <path d="M 37 22 Q 42 25 37 28" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                  <path d="M 31 14 Q 34 8 31 4" stroke="#FFB347" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </g>

                {/* Tech Aura floating badge */}
                <g transform="translate(45, 60)">
                  <rect x="0" y="0" width="48" height="24" rx="12" fill="#1A140E" stroke="#F28C28" strokeWidth="1.5" />
                  <text x="24" y="16" fill="#F28C28" fontSize="10" fontWeight="700" fontFamily="monospace" textAnchor="middle">&lt;/&gt;</text>
                </g>
              </svg>
            </div>
          </div>

          {/* =======================================================
              CORE STUDIO VALUES: SUCCESS, GROWTH & TRUST
              (STORYSET / DRAWTKIT TECHNICAL VECTOR ILLUSTRATIONS)
              ======================================================= */}
          <div className="about-pillars-section">
            <div className="about-pillars-header">
              <div className="about-story-text">HOW WE DELIVER</div>
              <h2>Built On Three Uncompromising Pillars</h2>
              <p style={{ color: 'var(--ink-gray)', marginTop: '0.8em', fontSize: '1.15em' }}>
                Every engagement at VHX is governed by velocity, infinite scalability, and total architectural trust.
              </p>
            </div>

            <div className="about-pillars-grid">
              {/* PILLAR 1: SUCCESS & VELOCITY */}
              <div className="pillar-card">
                <div>
                  <div
                    style={{
                      width: '100%',
                      padding: '1.4em',
                      borderRadius: '16px',
                      marginBottom: '1.6em',
                      backgroundColor: '#0A0B0E',
                      backgroundImage: 'radial-gradient(circle at 85% 20%, rgba(242, 140, 40, 0.18), transparent 60%), radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
                      backgroundSize: '100% 100%, 16px 16px',
                      border: '1px solid rgba(242, 140, 40, 0.28)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '1.2em'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78em', fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.1em' }}>
                        01 // VELOCITY
                      </span>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(242, 140, 40, 0.14)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2em', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
                        10x <span style={{ color: 'var(--accent)', fontSize: '0.55em', fontWeight: 800 }}>FASTER SHIP</span>
                      </div>
                      <div style={{ marginTop: '0.6em', height: '4px', width: '100%', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '88%', background: 'linear-gradient(90deg, #FF7800, #FFB347)', borderRadius: '999px' }} />
                      </div>
                    </div>
                  </div>
                  <span className="pillar-badge">Velocity & Success</span>
                  <h3 className="pillar-title">Rapid Time-to-Market</h3>
                  <p className="pillar-desc">
                    Zero bureaucratic handoff lag. From high-fidelity prototypes to battle-tested production deployments in days, aligned with your revenue goals from day one.
                  </p>
                </div>
              </div>

              {/* PILLAR 2: GROWTH & SCALABILITY */}
              <div className="pillar-card">
                <div>
                  <div
                    style={{
                      width: '100%',
                      padding: '1.4em',
                      borderRadius: '16px',
                      marginBottom: '1.6em',
                      backgroundColor: '#0A0B0E',
                      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                      border: '1px solid rgba(242, 140, 40, 0.28)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '1.2em'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78em', fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.1em' }}>
                        02 // ARCHITECTURE
                      </span>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(242, 140, 40, 0.14)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                          <polyline points="17 6 23 6 23 12" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2em', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
                        100K+ <span style={{ color: 'var(--accent)', fontSize: '0.55em', fontWeight: 800 }}>TXN READY</span>
                      </div>
                      <div style={{ marginTop: '0.6em', display: 'flex', gap: '4px', alignItems: 'flex-end', height: '14px' }}>
                        {[35, 50, 65, 80, 95, 100].map((h, i) => (
                          <span key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '2px', background: i >= 4 ? 'var(--accent)' : 'rgba(242, 140, 40, 0.35)' }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="pillar-badge">Growth & Scale</span>
                  <h3 className="pillar-title">Engineered to Expand</h3>
                  <p className="pillar-desc">
                    Architectures designed to scale horizontally. Whether managing ten orders or half a million real-time database transactions, latency stays zero.
                  </p>
                </div>
              </div>

              {/* PILLAR 3: TRUST & RELIABILITY */}
              <div className="pillar-card">
                <div>
                  <div
                    style={{
                      width: '100%',
                      padding: '1.4em',
                      borderRadius: '16px',
                      marginBottom: '1.6em',
                      backgroundColor: '#0A0B0E',
                      backgroundImage: 'radial-gradient(circle at 15% 85%, rgba(242, 140, 40, 0.16), transparent 55%), repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0.025) 1px, transparent 1px, transparent 10px)',
                      border: '1px solid rgba(242, 140, 40, 0.28)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '1.2em'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78em', fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.1em' }}>
                        03 // RELIABILITY
                      </span>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(242, 140, 40, 0.14)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <polyline points="9 12 11 14 15 10" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2em', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
                        99.9% <span style={{ color: 'var(--accent)', fontSize: '0.55em', fontWeight: 800 }}>OWNERSHIP</span>
                      </div>
                      <div style={{ marginTop: '0.6em', fontFamily: 'var(--font-body)', fontSize: '0.78em', color: 'var(--ink-gray)', fontWeight: 600 }}>
                        ● Zero Lock-In • Automated Failover
                      </div>
                    </div>
                  </div>
                  <span className="pillar-badge">Trust & Reliability</span>
                  <h3 className="pillar-title">Uncompromising Quality</h3>
                  <p className="pillar-desc">
                    Clean, documented codebases you 100% own. Zero vendor lock-in, automated failover pipelines, and direct founder accountability on every commit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =======================================================
              TWO26 FOUNDER CARDS & EXPANDING MODAL (MEET THE FOUNDERS)
              ======================================================= */}
          <div className="about-team" ref={teamRef}>
            <div className="about-team-header">
              <div className="about-story-text">THE CORE DUO</div>
              <h2>MEET THE FOUNDERS</h2>
              <p style={{ color: 'var(--ink-gray)', marginTop: '0.5em', fontSize: '1.1em' }}>
                Click on any founder card to view their profile, engineering focus, and background.
              </p>
            </div>

            <div className="about-team-grid">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="team-card"
                  onClick={() => setActiveMember(member)}
                >
                  <div className="team-img-wrap">
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{ objectPosition: member.imgPosition || '50% 15%' }}
                    />
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  <div className="team-sub">{member.role}</div>
                  <div style={{ marginTop: '1em', fontSize: '0.85em', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '0.4em' }}>
                    <span>Click to read full story</span>
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 8.5L8.5 1.5M3 1.3L8.5 1.5L8.7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          TWO26 TEAM EXPANDING MODAL POPUP
          ======================================================= */}
      <div className={`team-popup-overlay ${activeMember ? 'is-active' : ''}`} onClick={() => setActiveMember(null)}>
        {activeMember && (
          <div className="team-popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="team-popup-close-btn" onClick={() => setActiveMember(null)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="team-popup-img-wrap" style={{ maxHeight: '440px' }}>
              <img
                src={activeMember.image}
                alt={activeMember.name}
                className="team-popup-img"
                style={{ objectPosition: activeMember.imgPosition || '50% 15%' }}
              />
            </div>

            <div className="team-popup-content">
              <div>
                <h3 className="team-popup-name">{activeMember.name}</h3>
                <div className="team-popup-role">{activeMember.role}</div>

                <div className="team-popup-body" style={{ marginTop: '1.25em' }}>
                  {activeMember.bio.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="team-popup-socials">
                {activeMember.socials.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="team-popup-pill"
                  >
                    <span>{soc.name}</span>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 8.5L8.5 1.5M3 1.3L8.5 1.5L8.7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =======================================================
          FOOTER WITH LOGO STANDING ANIMATION & TEXT REVEAL
          ======================================================= */}
      <Footer onOpenContact={onOpenContact} onNavigate={onNavigate} />
    </div>
  );
}
