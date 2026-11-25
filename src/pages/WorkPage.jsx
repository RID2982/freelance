import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import telegramMockup from '../assets/telegram_food_automation.jpg';
import hrAutomation from '../assets/hr_automation.jpg';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 'forge-industrial',
    category: 'web',
    categoryLabel: 'Web Application',
    title: 'Forge Industrial Portal',
    client: 'Forge Industrial Technologies',
    year: '2026',
    desc: 'High-performance manufacturing dashboard with real-time telemetry, automated asset dispatching, and sensory alert pipelines.',
    impact: '42% decrease in machine downtime',
    tech: ['React', 'Vite', 'TailwindCSS', 'WebSocket', 'Node.js'],
    color: '#F28C28',
    imgMain: '/forge.png',
    imgHover: '/rotaract.png',
  },
  {
    id: 'rotaract-salem',
    category: 'web',
    categoryLabel: 'Full-Stack Portal',
    title: 'Rotaract Club of Salem',
    client: 'Rotaract Club Salem Central',
    year: '2026',
    desc: 'Institutional ecosystem platform managing multi-chapter community events, real-time member registrations, and automated fundraising receipts.',
    impact: '10,000+ active members onboarded',
    tech: ['Next.js', 'React', 'TailwindCSS', 'PostgreSQL', 'Express'],
    color: '#FF7800',
    imgMain: '/rotaract.png',
    imgHover: '/forge.png',
  },
  {
    id: 'telegram-ai-bot',
    category: 'automation',
    categoryLabel: 'AI & Automation',
    title: 'Telegram Food & Order AI Bot',
    client: 'Cloud Kitchen Network',
    year: '2026',
    desc: 'Conversational order orchestration bot with natural language processing, dynamic menu recommendations, and automated POS sync.',
    impact: '3.4x faster order turnaround',
    tech: ['Python', 'Telegram API', 'Gemini AI', 'n8n', 'Redis'],
    color: '#F28C28',
    imgMain: telegramMockup,
    imgHover: hrAutomation,
  },
  {
    id: 'hr-automation',
    category: 'automation',
    categoryLabel: 'AI & Automation',
    title: 'HR Recruitment Engine',
    client: 'Global Talent Partners',
    year: '2025',
    desc: 'Autonomous candidate pipeline analyzing resumes against job descriptions, auto-scheduling interviews, and scoring assessments via LLM agents.',
    impact: '85% manual screening reduction',
    tech: ['n8n', 'Gemini Pro', 'REST APIs', 'PostgreSQL', 'Slack Bot'],
    color: '#FFB347',
    imgMain: hrAutomation,
    imgHover: '/forge.png',
  },
];

export default function WorkPage({ onOpenContact, onNavigate }) {
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);
  const heroRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Line-by-line heading entrance
      const headingLines = heroRef.current?.querySelectorAll('.work-hero-line');
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
      const pills = heroRef.current?.querySelectorAll('.work-hero-pill');
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

      // 3. SVG ribbon draw
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

      // 4. Mascot Cat Illustration pop
      const catImg = heroRef.current?.querySelector('.cat-work-img');
      if (catImg) {
        gsap.fromTo(
          catImg,
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="work-page-root" style={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* =======================================================
          TWO26 WORK HERO SECTION
          ======================================================= */}
      <section className="section-work-hero" ref={heroRef}>
        <div className="work-hero-wrapper">
          <div className="work-hero-text">
            <h1 className="heading left-align">
              <span className="work-hero-line-mask">
                <span className="work-hero-line">A FEW PROJECTS</span>
              </span>
            </h1>

            <div className="work-hero-pill two">
              <span>Selected Works</span>
            </div>

            <h1 className="heading right-align">
              <span className="work-hero-line-mask">
                <span className="work-hero-line">TO BRAG ABOUT</span>
              </span>
            </h1>

            <div className="work-hero-pill one">
              <span>Kind of proud</span>
            </div>
          </div>

          {/* Two26 Decorative Serpentine Path (Corner placement without cutting text) */}
          <div className="work-hero-path" style={{ position: 'absolute', top: '-5%', right: '0%', width: '140px', pointerEvents: 'none', zIndex: 0, opacity: 0.85 }}>
            <svg width="100%" viewBox="0 0 230 575" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                ref={pathRef}
                d="M171.769 562.464C171.769 562.464 -1.40879 424.611 16.2688 279.464C25.7685 201.464 68.7349 148.19 136.269 152.464C206.346 156.9 248.62 311.964 179.269 311.964C138.269 311.964 85.2685 223.964 101.269 138.964C114.373 69.3474 171.769 10.4645 171.769 10.4645"
                stroke="var(--accent)"
                strokeWidth="20"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Two26 Cat / Mascot and Subtitle */}
          <div className="work-hero-btm">
            <div className="cat-work-wrapper">
              <svg className="cat-work-img" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="workCatGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#eff6ff" />
                    <stop offset="100%" stopColor="#dbeafe" />
                  </linearGradient>
                </defs>
                {/* Tech laptop base */}
                <rect x="25" y="125" width="150" height="10" rx="5" fill="#0a0a0a" />
                <rect x="35" y="123" width="130" height="4" rx="2" fill="#2563eb" />
                {/* Body */}
                <ellipse cx="100" cy="100" rx="48" ry="32" fill="url(#workCatGlow)" stroke="#0a0a0a" strokeWidth="3" />
                <path d="M75 106 C75 120, 85 128, 100 128 C115 128, 125 120, 125 106" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2" />
                {/* Head */}
                <circle cx="100" cy="58" r="30" fill="url(#workCatGlow)" stroke="#0a0a0a" strokeWidth="3" />
                {/* Ears */}
                <path d="M78 40 L65 12 C63 9, 68 8, 71 11 L90 32 Z" fill="#2563eb" stroke="#0a0a0a" strokeWidth="3" />
                <polygon points="72,17 69,15 82,30" fill="#fbcfe8" />
                <path d="M122 40 L135 12 C137 9, 132 8, 129 11 L110 32 Z" fill="#2563eb" stroke="#0a0a0a" strokeWidth="3" />
                <polygon points="128,17 131,15 118,30" fill="#fbcfe8" />
                {/* Eyes */}
                <ellipse cx="89" cy="56" rx="5.5" ry="6.5" fill="#0a0a0a" />
                <circle cx="91" cy="54" r="2" fill="#ffffff" />
                <circle cx="88" cy="58" r="1" fill="#00b4d8" />
                <ellipse cx="111" cy="56" rx="5.5" ry="6.5" fill="#0a0a0a" />
                <circle cx="113" cy="54" r="2" fill="#ffffff" />
                <circle cx="110" cy="58" r="1" fill="#00b4d8" />
                {/* Cheeks & Nose */}
                <ellipse cx="80" cy="64" rx="4" ry="2.5" fill="#f472b6" opacity="0.6" />
                <ellipse cx="120" cy="64" rx="4" ry="2.5" fill="#f472b6" opacity="0.6" />
                <polygon points="100,63 97,60 103,60" fill="#ec4899" />
                <path d="M100 63 L100 67 M100 67 Q95 72 90 68 M100 67 Q105 72 110 68" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
                {/* Tail */}
                <path d="M140 108 C160 112, 180 102, 175 75 C170 55, 155 60, 160 75" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <p className="work-hero-para">
              A curated selection of production software, intelligent AI automations, and modern web platforms built for speed, conversion, and effortless scale. Different challenges, same boutique obsession for getting every pixel right.
            </p>
          </div>
        </div>
      </section>

      {/* =======================================================
          FILTER TABS
          ======================================================= */}
      <div className="work-filter-bar">
        {[
          { key: 'all', label: 'All Projects' },
          { key: 'web', label: 'Software & Web' },
          { key: 'automation', label: 'AI & Automations' },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`work-filter-btn ${filter === tab.key ? 'active' : ''}`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* =======================================================
          PROJECTS SHOWCASE GRID (TWO26 3D REVEAL STYLE)
          ======================================================= */}
      <section style={{ width: '100%', maxWidth: '1840px', margin: '0 auto', padding: '1em clamp(1.2rem, 2.2vw, 2.5rem) 6em', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '2em' }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="work-card-container"
              style={{
                position: 'relative',
                background: 'var(--surface-white)',
                border: '1.5px solid var(--border-light)',
                borderRadius: '24px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease, border-color 0.3s ease',
              }}
              onClick={() => setActiveProject(project)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(37, 99, 235, 0.15)';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }}
            >
              {/* Image with hover zoom */}
              <div style={{ position: 'relative', width: '100%', height: '320px', overflow: 'hidden', backgroundColor: '#0a0a0a' }}>
                <img
                  src={project.imgMain}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                <div style={{ position: 'absolute', top: '1.25em', left: '1.25em', zIndex: 2 }}>
                  <span style={{
                    padding: '0.4em 0.9em',
                    borderRadius: '999px',
                    fontSize: '0.75em',
                    fontWeight: '700',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: '#0a0a0a',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    {project.categoryLabel}
                  </span>
                </div>
                <div style={{ position: 'absolute', top: '1.25em', right: '1.25em', zIndex: 2 }}>
                  <span style={{
                    padding: '0.4em 0.9em',
                    borderRadius: '999px',
                    fontSize: '0.75em',
                    fontWeight: '700',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'var(--accent)',
                    color: '#0A0B0E'
                  }}>
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div style={{ padding: '2em', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.85em', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', marginBottom: '0.3em', textTransform: 'uppercase' }}>
                    {project.client}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2em', color: 'var(--ink-black)', marginBottom: '0.6em' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '1.05em', lineHeight: '1.5', color: 'var(--ink-gray)', marginBottom: '1.5em' }}>
                    {project.desc}
                  </p>
                </div>

                <div>
                  {/* Impact Highlight */}
                  <div style={{
                    padding: '0.75em 1em',
                    borderRadius: '12px',
                    backgroundColor: 'var(--accent-soft)',
                    borderLeft: '4px solid var(--accent)',
                    marginBottom: '1.5em',
                    fontSize: '0.9em',
                    fontWeight: '600',
                    color: 'var(--accent)'
                  }}>
                    ★ Impact: {project.impact}
                  </div>

                  {/* Tech Badges & CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1em' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4em' }}>
                      {project.tech.map((t) => (
                        <span key={t} style={{
                          fontSize: '0.75em',
                          padding: '0.25em 0.6em',
                          borderRadius: '6px',
                          background: '#f4f4f5',
                          color: '#52525b',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4em',
                        color: 'var(--accent)',
                        fontWeight: '700',
                        fontSize: '0.9em',
                        borderBottom: '2px solid var(--accent)',
                        paddingBottom: '2px'
                      }}
                    >
                      Case Study
                      <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 8.5L8.5 1.5M3 1.3L8.5 1.5L8.7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =======================================================
          PROJECT CASE STUDY EXPANDING MODAL POPUP
          ======================================================= */}
      <div className={`team-popup-overlay ${activeProject ? 'is-active' : ''}`} onClick={() => setActiveProject(null)}>
        {activeProject && (
          <div className="team-popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="team-popup-close-btn" onClick={() => setActiveProject(null)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="team-popup-img-wrap" style={{ maxHeight: '380px' }}>
              <img src={activeProject.imgMain} alt={activeProject.title} className="team-popup-img" />
            </div>

            <div className="team-popup-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.6em', alignItems: 'center', marginBottom: '0.5em' }}>
                  <span className="pricing-badge">{activeProject.categoryLabel}</span>
                  <span style={{ fontSize: '0.85em', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>{activeProject.year} • {activeProject.client}</span>
                </div>

                <h3 className="team-popup-name" style={{ fontSize: '2.2em' }}>{activeProject.title}</h3>
                <div className="team-popup-role" style={{ color: 'var(--accent)', marginTop: '0.2em' }}>Impact: {activeProject.impact}</div>

                <div className="team-popup-body" style={{ marginTop: '1.25em' }}>
                  <p>{activeProject.desc}</p>
                  <p style={{ marginTop: '0.8em', fontSize: '0.95em', color: 'var(--ink-gray)' }}>
                    Engineered from concept to deployment by VHX. Designed with bespoke micro-animations, zero-latency workflows, and production-tested resilience.
                  </p>
                </div>

                <div style={{ marginTop: '1.2em' }}>
                  <div style={{ fontSize: '0.8em', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '0.5em' }}>
                    Technology Stack:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
                    {activeProject.tech.map((t) => (
                      <span key={t} style={{
                        padding: '0.35em 0.8em',
                        borderRadius: '8px',
                        background: 'var(--accent-soft)',
                        color: 'var(--accent)',
                        fontWeight: 700,
                        fontSize: '0.82em',
                        fontFamily: 'var(--font-mono)'
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2em', display: 'flex', gap: '1em' }}>
                <button
                  className="cta-btn"
                  onClick={() => {
                    setActiveProject(null);
                    onOpenContact();
                  }}
                >
                  <span className="cta-text">Start a Project Like This</span>
                  <span className="cta-btn-arrow">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.464 8.536L8.535 1.465M3.055 1.288L8.535 1.465L8.712 6.945" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="cta-btn-fill-hover"></span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =======================================================
          FOOTER WITH LOGO BOUNCE
          ======================================================= */}
      <Footer onOpenContact={onOpenContact} onNavigate={onNavigate} />
    </div>
  );
}
