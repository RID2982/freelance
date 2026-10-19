import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import telegramMockup from '../assets/telegram_food_automation.jpg';
import hrAutomation from '../assets/hr_automation.jpg';

gsap.registerPlugin(ScrollTrigger);

const primaryProjects = [
  {
    id: 1,
    name: 'Forge Industrial Portal',
    category: 'FULL-STACK CLOUD PLATFORM',
    desc: 'Mission-critical manufacturing dashboard with real-time telemetry, automated asset dispatching, and high-density telemetry.',
    impact: '42% decrease in downtime',
    img: '/forge.png',
    link: 'https://www.forge.ind.in/login',
    accentColor: '#2563eb',
    tags: ['React', 'Vite', 'Node.js', 'WebSocket']
  },
  {
    id: 2,
    name: 'Rotaract Club Salem Platform',
    category: 'HIGH-PERFORMANCE WEB APP',
    desc: 'High-throughput community platform managing multi-chapter event registration, automated digital ticketing, and member directories.',
    impact: '10,000+ members onboarded',
    img: '/rotaract.png',
    link: 'https://racsalemmidtown.in',
    accentColor: '#00b4d8',
    tags: ['Next.js', 'PostgreSQL', 'Express', 'TailwindCSS']
  },
  {
    id: 3,
    name: 'Telegram Food Order Automation',
    category: 'N8N BOT & DATABASE SYNC',
    desc: 'Autonomous conversational ordering bot connected to n8n pipelines, dynamic restaurant menus, and real-time POS accounting.',
    impact: '3.4x faster order fulfillment',
    img: telegramMockup,
    link: 'https://github.com/vinodhan07',
    accentColor: '#10b981',
    tags: ['Python', 'n8n', 'Telegram API', 'PostgreSQL']
  },
  {
    id: 4,
    name: 'HR Agent Pre-Screening Workflow',
    category: 'N8N & OPENAI RECRUITMENT AGENT',
    desc: 'Intelligent recruitment orchestration engine analyzing applicant resumes, automated skill scoring, and calendar scheduling.',
    impact: '85% manual screening reduction',
    img: hrAutomation,
    link: 'https://github.com/N8n-automations-works/HR-Agent-Pre-Screening-Workflow-.git',
    accentColor: '#8b5cf6',
    tags: ['n8n', 'OpenAI', 'REST APIs', 'Slack Bot']
  }
];

const spotlightPosters = [
  {
    id: 1,
    title: 'Modern Restaurant Brand System',
    type: 'Brand Identity & Visual Menu',
    img: '/posters/Black and Orange Modern Restaurant Menu.png',
    accent: '#f59e0b'
  },
  {
    id: 2,
    title: 'Dynamic Motorsport Campaign',
    type: 'High-Octane Visual Motion',
    img: '/posters/Red and Black Dynamic Race Car Tournament Instagram Post.png',
    accent: '#ef4444'
  }
];

const MASK_PATH_D =
  'M25.007 729.507C25.007 729.507 136.507 1065.7 290.007 969.007C506.711 832.495 -164.765 175.16 89.5069 44.5066C315.057 -71.3883 462.507 559.507 615.507 515.007C768.507 470.507 615.507 25.0068 615.507 25.0068';

export default function ProjectsVertical({ onOpenContact, onNavigate }) {
  const sectionRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const offsetHeadingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 1. Two26 Magnetic Dual Heading Offset
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

    // 2. High-Impact Scroll Entrance & 3D Tilt Reveal for Project Cards
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const img = card.querySelector('img');

      // Card 3D Entrance Animation
      gsap.fromTo(
        card,
        {
          y: 70,
          opacity: 0.3,
          scale: 0.92,
          rotationX: 14,
          rotationY: index % 2 === 0 ? -6 : 6,
          transformPerspective: 1000
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        }
      );

      // Parallax Image Shift on scroll
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    });

    // 3. Projects End CTA Line-by-Line Reveal
    const endPara = section.querySelector('.projects-end-para');
    if (endPara) {
      const endLines = endPara.querySelectorAll('.project-line');
      gsap.fromTo(
        endLines,
        { y: '115%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.projects-end',
            start: 'top 85%'
          }
        }
      );
    }
  }, []);

  // Two26 Card Hover Paintbrush Stroke Draw & Arrow Spring Bounce
  const handleCardMouseEnter = (e, cardIndex) => {
    const card = e.currentTarget;
    const strokePath = card.querySelector(`.brush-stroke-path-${cardIndex}`);
    const arrow = card.querySelector('.project-card-arrow-icon');

    if (strokePath) {
      const len = strokePath.getTotalLength ? strokePath.getTotalLength() : 2500;
      gsap.fromTo(
        strokePath,
        { strokeDashoffset: len, strokeWidth: 0, opacity: 0 },
        { strokeDashoffset: 0, strokeWidth: 80, opacity: 0.35, duration: 0.85, ease: 'power2.out', overwrite: 'auto' }
      );
    }

    if (arrow) {
      gsap.timeline()
        .to(arrow, { rotation: -45, duration: 0.25, ease: 'power2.out' })
        .to(arrow, { rotation: 0, duration: 0.65, ease: 'elastic.out(1.15, 0.35)' });
    }
  };

  const handleCardMouseLeave = (e, cardIndex) => {
    const card = e.currentTarget;
    const strokePath = card.querySelector(`.brush-stroke-path-${cardIndex}`);
    if (strokePath) {
      const len = strokePath.getTotalLength ? strokePath.getTotalLength() : 2500;
      gsap.to(strokePath, { strokeDashoffset: -len, strokeWidth: 0, opacity: 0, duration: 0.5, ease: 'power2.in', overwrite: 'auto' });
    }
  };

  return (
    <section ref={sectionRef} className="section-projects" id="projects" style={{ padding: '6em 0 5em', background: '#fafafa', width: '100%' }}>
      <div className="section-projects-wrapper" style={{ width: '100%', maxWidth: '1720px', margin: '0 auto', padding: '0 4vw' }}>
        
        {/* Section Header with Two26 Magnetic Dual Heading */}
        <div className="section-projects-header" style={{ marginBottom: '3.5em' }}>
          <div className="section-about-text" style={{ letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700, fontSize: '0.85em', marginBottom: '0.75em' }}>
            ENGINEERED EXCELLENCE
          </div>
          <div ref={headingWrapperRef} className="section-heading-wrapper">
            <h2 className="section-heading" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
              SELECTED WORKS
            </h2>
            <h2 ref={offsetHeadingRef} className="section-heading accent-offset" aria-hidden="true" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
              SELECTED WORKS
            </h2>
          </div>
          <p style={{ maxWidth: '620px', marginTop: '1.2em', color: 'var(--ink-gray)', fontSize: '1.15em', lineHeight: 1.6 }}>
            Bespoke full-stack web applications, zero-friction n8n workflow automations, and resilient digital architectures built for measurable performance.
          </p>
        </div>

        {/* 4-Card Flagship Grid with Two26 3D Perspective Reveal & Paintbrush Hover */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 580px), 1fr))',
            gap: '2.5em',
            marginBottom: '4.5em'
          }}
        >
          {primaryProjects.map((proj, idx) => (
            <div key={proj.id} className="project-item" style={{ width: '100%' }}>
              <div className="project-card-clip-mask" style={{ width: '100%', height: '100%' }}>
                <a
                  ref={(el) => (cardsRef.current[idx] = el)}
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project-card"
                  onMouseEnter={(e) => handleCardMouseEnter(e, idx)}
                  onMouseLeave={(e) => handleCardMouseLeave(e, idx)}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid var(--border-light, #e5e7eb)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                    textDecoration: 'none',
                    color: 'inherit',
                    position: 'relative',
                    transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
                  }}
                >
                  {/* Image Container with Paintbrush Stroke Overlay */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '360px',
                      overflow: 'hidden',
                      backgroundColor: '#0a0a0a'
                    }}
                  >
                    <img
                      src={proj.img}
                      alt={proj.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />

                    {/* Paintbrush Stroke Drawing on Hover */}
                    <svg
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        zIndex: 2
                      }}
                      viewBox="0 0 709 1012"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      <path
                        className={`brush-stroke-path-${idx}`}
                        d={MASK_PATH_D}
                        stroke={proj.accentColor}
                        strokeWidth="0"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        style={{ opacity: 0 }}
                      />
                    </svg>
                  </div>

                  {/* Card Detail Content */}
                  <div style={{ padding: '2em', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.78em', fontFamily: 'var(--font-mono)', fontWeight: 700, color: proj.accentColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.45em' }}>
                        {proj.category} &bull; {proj.impact}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1em' }}>
                        <h3 style={{ fontSize: '1.5em', fontWeight: 800, margin: 0, color: 'var(--ink-black, #0a0a0a)', letterSpacing: '-0.02em' }}>
                          {proj.name}
                        </h3>
                        <div
                          className="project-card-arrow-icon"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(10, 10, 10, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ color: 'var(--ink-black)' }}>
                            <path
                              d="M1.17 17.94L18.65 2.3M5.84 1.17L18.65 2.3L18.35 15.16"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <p style={{ marginTop: '0.85em', color: 'var(--ink-gray, #4b5563)', fontSize: '0.98em', lineHeight: 1.55 }}>
                        {proj.desc}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em', marginTop: '1.5em', paddingTop: '1.2em', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      {proj.tags.map((t, tidx) => (
                        <span
                          key={tidx}
                          style={{
                            fontSize: '0.78em',
                            fontWeight: 600,
                            padding: '0.3em 0.75em',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(10, 10, 10, 0.04)',
                            color: 'var(--ink-black)',
                            fontFamily: 'var(--font-mono, monospace)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 2 Curated Posters Spotlight */}
        <div style={{ marginTop: '3em', marginBottom: '4em' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.8em', flexWrap: 'wrap', gap: '1em' }}>
            <div>
              <div style={{ fontSize: '0.8em', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                DESIGN SPOTLIGHTS
              </div>
              <h3 style={{ fontSize: '1.8em', fontWeight: 800, margin: '0.2em 0 0', color: 'var(--ink-black)' }}>
                Visual Identity &amp; Print Typography
              </h3>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('work')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                fontWeight: 700,
                fontSize: '0.95em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5em'
              }}
            >
              <span>View All Studio Artifacts</span>
              <span>→</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: '2em' }}>
            {spotlightPosters.map((poster) => (
              <div
                key={poster.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1.5px solid var(--border-light, #e5e7eb)',
                  overflow: 'hidden',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.04)',
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = `0 20px 45px ${poster.accent}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = '0 6px 25px rgba(0,0,0,0.04)';
                }}
              >
                <div style={{ width: '100%', height: '300px', overflow: 'hidden', backgroundColor: '#0a0a0a' }}>
                  <img
                    src={poster.img}
                    alt={poster.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: '1.5em 1.8em' }}>
                  <div style={{ fontSize: '0.78em', fontFamily: 'var(--font-mono)', fontWeight: 700, color: poster.accent, textTransform: 'uppercase', marginBottom: '0.25em' }}>
                    {poster.type}
                  </div>
                  <h4 style={{ fontSize: '1.25em', fontWeight: 800, margin: 0, color: 'var(--ink-black)' }}>
                    {poster.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects End Line-by-Line Reveal with Milestone Pills */}
        <div className="projects-end" style={{ textAlign: 'center', padding: '3em 1em 1em' }}>
          <div className="projects-end-inner-wrapper">
            <p className="projects-end-para" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 auto 1.2em' }}>
              <span className="project-line-mask" style={{ display: 'block', overflow: 'hidden' }}>
                <span className="project-line" style={{ display: 'inline-block' }}>WE COULD KEEP GOING,</span>
              </span>
              <span className="project-line-mask" style={{ display: 'block', overflow: 'hidden' }}>
                <span className="project-line" style={{ display: 'inline-block' }}>BUT THERE'S A WHOLE PORTFOLIO</span>
              </span>
              <span className="project-line-mask" style={{ display: 'block', overflow: 'hidden' }}>
                <span className="project-line" style={{ display: 'inline-block' }}>WAITING FOR YOU.</span>
              </span>
            </p>

            <div style={{ display: 'flex', gap: '1.25em', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5em' }}>
              <button
                className="cta-btn"
                style={{ fontSize: '1.05em', padding: '0.85em 2.2em', backgroundColor: 'var(--accent)', color: '#ffffff' }}
                onClick={() => {
                  if (onNavigate) onNavigate('work');
                }}
              >
                <span className="cta-text" style={{ color: '#ffffff', fontWeight: '800' }}>Explore All Projects</span>
                <span className="cta-btn-arrow" style={{ backgroundColor: '#ffffff' }}>
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1.464 8.536L8.535 1.465M3.055 1.288L8.535 1.465L8.712 6.945"
                      stroke="#0a0a0a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <button
                className="cta-btn"
                style={{ fontSize: '1.05em', padding: '0.85em 2.2em', background: 'transparent', color: 'var(--ink-black)', border: '1.5px solid rgba(10,10,10,0.2)' }}
                onClick={onOpenContact}
              >
                <span className="cta-text">Start a Project</span>
                <span className="cta-btn-arrow">
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1.464 8.536L8.535 1.465M3.055 1.288L8.535 1.465L8.712 6.945"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
