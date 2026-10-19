import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const TEAM_MEMBERS = [
  {
    id: 'vinodhan',
    name: 'VINODHAN V A',
    role: 'FOUNDER & LEAD ENGINEER / DESIGNER',
    image: '/member-vinodhan.jpg',
    bio: [
      'Full-stack engineer turned design technologist with an obsession for micro-interactions, responsive architectures, and zero-latency interfaces. Leading Sync Aura’s frontend engineering, GSAP physics pipelines, and system architectures.',
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
    bio: [
      'System architect and AI automation specialist with a strong background in backend distributed systems, API orchestration, and agentic workflows using n8n and large language models.',
      'He ensures every system built at Sync Aura is rock-solid, secure, and capable of operating 24/7 without manual intervention. Always thinking three steps ahead in scalable system architecture.'
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
                <span className="about-hero-line">SMALL STUDIO,</span>
              </span>
            </h1>

            <div className="about-hero-pill two">
              <span>Boutique Engineering</span>
            </div>

            <h1 className="heading right-align">
              <span className="about-hero-line-mask">
                <span className="about-hero-line">BIG BRAND ENERGY</span>
              </span>
            </h1>

            <div className="about-hero-pill one">
              <span>Independent</span>
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
              Founded in Salem by Vinodhan V A and Hari Dev M V, Sync Aura brings together years of intense engineering across full-stack applications, distributed automation workflows, and high-conversion aesthetic brand design.
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
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                    <stop offset="0%" stopColor="#00b4d8" />
                    <stop offset="50%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#8b5cf6" />
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
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  {/* Central Innovation Spark Node */}
                  <circle cx="170" cy="78" r="9" fill="#8b5cf6" filter="url(#glowEffect)" />
                  <circle cx="170" cy="78" r="4" fill="#ffffff" />
                  <path d="M 170 60 L 170 70 M 170 86 L 170 96 M 154 78 L 162 78 M 178 78 L 186 78" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* BOY 1 (Left - Lead Engineer / Vinodhan) */}
                <g className="boy-left" transform="translate(30, 80)">
                  <path d="M 15 145 C 15 110, 35 95, 75 95 C 115 95, 135 110, 135 145" fill="#0a0a0a" />
                  <path d="M 50 100 L 75 125 L 100 100" fill="#2563eb" />
                  <circle cx="75" cy="50" r="32" fill="#f8f7f4" stroke="#0a0a0a" strokeWidth="3.5" />
                  <path d="M 45 45 C 45 22, 65 14, 85 15 C 105 16, 110 30, 108 42 C 100 32, 85 30, 72 34 C 60 38, 50 45, 45 45 Z" fill="#0a0a0a" />
                  <rect x="56" y="44" width="16" height="12" rx="3" stroke="#0a0a0a" strokeWidth="2.5" fill="rgba(37,99,235,0.15)" />
                  <rect x="78" y="44" width="16" height="12" rx="3" stroke="#0a0a0a" strokeWidth="2.5" fill="rgba(37,99,235,0.15)" />
                  <line x1="72" y1="49" x2="78" y2="49" stroke="#0a0a0a" strokeWidth="2.5" />
                  <path d="M 68 64 Q 75 70 82 64" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 75 14 Q 75 2 82 -2" stroke="#00b4d8" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="84" cy="-4" r="3.5" fill="#00b4d8" filter="url(#glowEffect)" />
                </g>

                {/* BOY 2 (Right - Technical Architect / Hari Dev) */}
                <g className="boy-right" transform="translate(160, 80)">
                  <path d="M 15 145 C 15 110, 35 95, 75 95 C 115 95, 135 110, 135 145" fill="#0a0a0a" />
                  <path d="M 50 100 L 75 125 L 100 100" fill="#8b5cf6" />
                  <circle cx="75" cy="50" r="32" fill="#f8f7f4" stroke="#0a0a0a" strokeWidth="3.5" />
                  <path d="M 44 42 C 45 18, 70 12, 95 15 C 108 17, 110 32, 108 45 C 98 32, 85 28, 70 32 C 55 36, 46 42, 44 42 Z" fill="#0a0a0a" />
                  <circle cx="63" cy="48" r="3" fill="#0a0a0a" />
                  <circle cx="87" cy="48" r="3" fill="#0a0a0a" />
                  <path d="M 68 64 Q 75 70 82 64" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 75 14 Q 75 2 68 -2" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="66" cy="-4" r="3.5" fill="#8b5cf6" filter="url(#glowEffect)" />
                </g>

                <circle cx="60" cy="50" r="4" fill="#00b4d8" opacity="0.6" />
                <circle cx="280" cy="50" r="4" fill="#8b5cf6" opacity="0.6" />
              </svg>
            </div>
            <div>
              <div className="about-story-text">HOW WE STARTED</div>
              <h2 className="about-story-heading">Two tech minds, one shared itch to build better digital experiences.</h2>
              <p className="about-story-para">
                After architecting software and automations across freelance contracts and open projects, we joined forces to create Sync Aura. A boutique studio where we question the brief, obsess over typography and physics, and engineer software that makes founders smile.
              </p>
            </div>
          </div>

          {/* =======================================================
              STORY 2: THE STUDIO SEATING / CHAIR ILLUSTRATION (TWO26 STYLE)
              ======================================================= */}
          <div className="about-story-section reverse">
            <div>
              <div className="about-story-text">NOW WE’RE HERE</div>
              <h2 className="about-story-heading">Less size, more scope.</h2>
              <p className="about-story-para">
                We haven’t bloated into a maze of account managers or bureaucratic bottlenecks. Sync Aura is an agile, founder-led core engineering team. This means you talk directly with the engineers building your product, moving 10x faster with complete accountability from day one.
              </p>
            </div>
            <div className="about-story-svg-wrap">
              {/* High-Fidelity Two26 Style Boutique Designer Chair / Seating Illustration */}
              <svg width="320" height="280" viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="chairCushion" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#eff6ff" />
                    <stop offset="100%" stopColor="#dbeafe" />
                  </linearGradient>
                  <linearGradient id="chairAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00b4d8" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>

                {/* Ground Shadow Ellipse */}
                <ellipse cx="160" cy="245" rx="100" ry="14" fill="rgba(10, 10, 10, 0.08)" />

                {/* Designer Chair Base / Chrome Spider Tripod Legs */}
                <line x1="160" y1="185" x2="110" y2="240" stroke="#0a0a0a" strokeWidth="5" strokeLinecap="round" />
                <line x1="160" y1="185" x2="210" y2="240" stroke="#0a0a0a" strokeWidth="5" strokeLinecap="round" />
                <line x1="160" y1="185" x2="160" y2="245" stroke="#0a0a0a" strokeWidth="5.5" strokeLinecap="round" />
                <line x1="160" y1="185" x2="70" y2="235" stroke="#0a0a0a" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="160" y1="185" x2="250" y2="235" stroke="#0a0a0a" strokeWidth="4.5" strokeLinecap="round" />

                {/* Central Swivel Pillar */}
                <rect x="154" y="150" width="12" height="38" rx="4" fill="#0a0a0a" />
                <rect x="151" y="160" width="18" height="6" rx="2" fill="#2563eb" />

                {/* Chair Seat Base */}
                <path
                  d="M 90 152 C 90 162, 230 162, 230 152 C 240 142, 235 125, 215 125 L 105 125 C 85 125, 80 142, 90 152 Z"
                  fill="url(#chairAccent)"
                  stroke="#0a0a0a"
                  strokeWidth="3.5"
                />

                {/* Ergonomic Curved Backrest */}
                <path
                  d="M 105 125 C 95 65, 110 35, 160 35 C 210 35, 225 65, 215 125 Z"
                  fill="url(#chairCushion)"
                  stroke="#0a0a0a"
                  strokeWidth="3.5"
                />

                {/* Cushioned Inset Lines */}
                <path d="M 125 50 Q 160 60 195 50" stroke="rgba(37, 99, 235, 0.3)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 120 75 Q 160 88 200 75" stroke="rgba(37, 99, 235, 0.3)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 115 100 Q 160 115 205 100" stroke="rgba(37, 99, 235, 0.3)" strokeWidth="2.5" strokeLinecap="round" />

                {/* Timber Curved Armrests */}
                <path d="M 85 110 C 75 95, 95 85, 105 95" stroke="#0a0a0a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M 235 110 C 245 95, 225 85, 215 95" stroke="#0a0a0a" strokeWidth="4.5" strokeLinecap="round" fill="none" />

                {/* Beside Table: Round Pedestal with Coffee & Laptop Wireframe */}
                <g transform="translate(210, 140)">
                  <ellipse cx="40" cy="85" rx="32" ry="7" fill="rgba(10, 10, 10, 0.08)" />
                  <rect x="37" y="35" width="6" height="50" fill="#0a0a0a" />
                  <ellipse cx="40" cy="35" rx="28" ry="6" fill="#f8f7f4" stroke="#0a0a0a" strokeWidth="2.5" />
                  {/* Steaming Coffee Cup */}
                  <rect x="25" y="18" width="12" height="15" rx="3" fill="#2563eb" stroke="#0a0a0a" strokeWidth="2" />
                  <path d="M 37 22 Q 42 25 37 28" stroke="#0a0a0a" strokeWidth="1.5" fill="none" />
                  <path d="M 31 14 Q 34 8 31 4" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </g>

                {/* Tech Aura floating badge */}
                <g transform="translate(45, 60)">
                  <rect x="0" y="0" width="48" height="24" rx="12" fill="#0a0a0a" />
                  <text x="24" y="16" fill="#00b4d8" fontSize="10" fontWeight="700" fontFamily="monospace" textAnchor="middle">&lt;/&gt;</text>
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
                Every engagement at Sync Aura is governed by velocity, infinite scalability, and total architectural trust.
              </p>
            </div>

            <div className="about-pillars-grid">
              {/* PILLAR 1: SUCCESS & VELOCITY */}
              <div className="pillar-card">
                <div>
                  <div className="pillar-img-wrap">
                    <svg viewBox="0 0 200 160" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="rocketThrust" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#00b4d8" />
                          <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                      </defs>
                      {/* Orbital Trajectory Arc */}
                      <path d="M 30 145 C 50 80, 100 45, 170 30" stroke="var(--accent-soft)" strokeWidth="8" strokeDasharray="6 6" fill="none" />
                      {/* Speed Particles */}
                      <circle cx="155" cy="20" r="3" fill="#00b4d8" />
                      <circle cx="175" cy="45" r="2.5" fill="#8b5cf6" />
                      <circle cx="35" cy="120" r="2" fill="#2563eb" />
                      {/* Flame Exhaust */}
                      <path d="M 80 105 C 70 125, 75 145, 65 155 C 80 145, 95 140, 95 112 Z" fill="url(#rocketThrust)" />
                      {/* Rocket Ship Body */}
                      <path d="M 130 40 C 130 40, 100 65, 85 105 L 115 115 C 135 90, 150 55, 150 40 Z" fill="#ffffff" stroke="#0a0a0a" strokeWidth="3" />
                      {/* Rocket Nosecone */}
                      <path d="M 130 40 C 135 25, 150 25, 150 40 Z" fill="#2563eb" stroke="#0a0a0a" strokeWidth="2.5" />
                      {/* Porthole Glass */}
                      <circle cx="120" cy="68" r="8" fill="#eff6ff" stroke="#0a0a0a" strokeWidth="2.5" />
                      <circle cx="120" cy="68" r="4" fill="#00b4d8" />
                      {/* Rocket Fins */}
                      <polygon points="80,100 60,115 88,110" fill="#0a0a0a" />
                      <polygon points="110,118 120,135 125,115" fill="#0a0a0a" />
                      {/* Target KPI Metric Badge */}
                      <rect x="15" y="30" width="60" height="24" rx="6" fill="#0a0a0a" />
                      <text x="45" y="46" fill="#00F59B" fontSize="10" fontWeight="700" fontFamily="monospace" textAnchor="middle">10x SPEED</text>
                    </svg>
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
                  <div className="pillar-img-wrap">
                    <svg viewBox="0 0 200 160" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                      </defs>
                      {/* Isometric Grid Base */}
                      <path d="M 30 130 L 100 150 L 170 130 L 100 110 Z" fill="var(--accent-soft)" stroke="rgba(37, 99, 235, 0.2)" strokeWidth="1.5" />
                      {/* Rising Bar 1 */}
                      <rect x="50" y="90" width="18" height="40" rx="3" fill="#dbeafe" stroke="#0a0a0a" strokeWidth="2" />
                      {/* Rising Bar 2 */}
                      <rect x="78" y="70" width="18" height="60" rx="3" fill="#93c5fd" stroke="#0a0a0a" strokeWidth="2" />
                      {/* Rising Bar 3 */}
                      <rect x="106" y="45" width="18" height="85" rx="3" fill="url(#barGrad)" stroke="#0a0a0a" strokeWidth="2" />
                      {/* Rising Bar 4 (Peak) */}
                      <rect x="134" y="25" width="18" height="105" rx="3" fill="#2563eb" stroke="#0a0a0a" strokeWidth="2" />
                      {/* Upward Growth Vector Arrow */}
                      <path d="M 45 105 Q 95 65 155 18" stroke="#00b4d8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                      <polyline points="145,18 155,18 155,28" stroke="#00b4d8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      {/* Connected Scale Node */}
                      <circle cx="155" cy="18" r="6" fill="#00F59B" stroke="#0a0a0a" strokeWidth="2" />
                      {/* Scalability Badge */}
                      <rect x="15" y="15" width="70" height="24" rx="6" fill="#0a0a0a" />
                      <text x="50" y="31" fill="#8b5cf6" fontSize="10" fontWeight="700" fontFamily="monospace" textAnchor="middle">100K+ SCALE</text>
                    </svg>
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
                  <div className="pillar-img-wrap">
                    <svg viewBox="0 0 200 160" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#eff6ff" />
                          <stop offset="100%" stopColor="#dbeafe" />
                        </linearGradient>
                      </defs>
                      {/* Outer Cryptographic Trust Ring */}
                      <circle cx="100" cy="80" r="62" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 6" fill="none" />
                      {/* Shield Outer Silhouette */}
                      <path
                        d="M 100 30 C 130 30, 148 45, 148 75 C 148 110, 115 130, 100 140 C 85 130, 52 110, 52 75 C 52 45, 70 30, 100 30 Z"
                        fill="url(#shieldGrad)"
                        stroke="#0a0a0a"
                        strokeWidth="3.5"
                      />
                      {/* Verified Checkmark */}
                      <path
                        d="M 82 80 L 95 93 L 122 66"
                        stroke="#2563eb"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Interlocking Handshake / Key Nodes */}
                      <circle cx="65" cy="50" r="4" fill="#00b4d8" />
                      <circle cx="135" cy="50" r="4" fill="#8b5cf6" />
                      <circle cx="100" cy="148" r="4" fill="#2563eb" />
                      {/* Uptime Badge */}
                      <rect x="65" y="118" width="70" height="24" rx="6" fill="#0a0a0a" />
                      <text x="100" y="134" fill="#00F59B" fontSize="10" fontWeight="700" fontFamily="monospace" textAnchor="middle">99.9% TRUST</text>
                    </svg>
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
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  <div className="team-sub">{member.role}</div>
                  <div style={{ marginTop: '1em', fontSize: '0.85em', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '0.4em' }}>
                    <span>Click to read full story</span>
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 8.5L8.5 1.5M3 1.3L8.5 1.5L8.7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

            <div className="team-popup-img-wrap">
              <img src={activeMember.image} alt={activeMember.name} className="team-popup-img" />
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
                      <path d="M1.5 8.5L8.5 1.5M3 1.3L8.5 1.5L8.7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
