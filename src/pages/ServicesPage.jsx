import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const CORE_SERVICES = [
  {
    id: 'web-platforms',
    badge: 'FRONTEND & SAAS PLATFORMS',
    title: 'Full-Stack Web & SaaS Platform Engineering',
    desc: 'We engineer high-performance web applications, client portals, and administrative software using React, Next.js, Vite, and Node.js. Built with zero bloated templates and sub-second execution speeds.',
    accent: '#F28C28',
    deliverables: [
      'Bespoke React / Next.js dynamic web applications',
      'High-throughput client portals with live telemetry',
      'Modular component libraries & accessible token architecture',
      'Technical Core Web Vitals SEO and Google speed ranking',
      'Vercel, AWS, or Docker production cloud deployments'
    ],
    tech: ['React 19', 'Next.js', 'Vite', 'Node.js', 'TypeScript', 'TailwindCSS']
  },
  {
    id: 'n8n-automations',
    badge: 'INTELLIGENT WORKFLOWS',
    title: 'Autonomous n8n & AI Agent Workflows',
    desc: 'We automate mission-critical business operations, connecting conversational bots, payment gateways, live databases, and LLM reasoning models. Say goodbye to manual data entry and human bottlenecks.',
    accent: '#FF7800',
    deliverables: [
      'Telegram & WhatsApp automated customer ordering bots',
      'Bidirectional CRM, Supabase & Google Sheets sync',
      'Autonomous resume screening & candidate classification pipelines',
      'Real-time transaction alerting and Slack operations feeds',
      'Self-hosted enterprise n8n server setup and maintenance'
    ],
    tech: ['n8n', 'Python', 'Gemini Pro', 'Telegram Bot API', 'PostgreSQL', 'Redis']
  },
  {
    id: 'mobile-apps',
    badge: 'CROSS-PLATFORM ENGINEERING',
    title: 'Native-Feeling Mobile Applications',
    desc: 'Fluid, gesture-rich mobile experiences for iOS and Android engineered with modern cross-platform frameworks. We prioritize offline reliability, zero-latency interactions, and flawless Apple HIG ergonomics.',
    accent: '#F28C28',
    deliverables: [
      'Cross-platform iOS and Android production apps',
      'Secure biometric authentication and session tokens',
      'Local offline caching and background synchronization',
      'Seamless Apple App Store and Google Play submissions',
      'Real-time push notification pipelines via FCM'
    ],
    tech: ['React Native', 'Expo', 'Swift', 'Kotlin', 'REST APIs', 'Firebase']
  },
  {
    id: 'custom-apis',
    badge: 'BACKEND INFRASTRUCTURE',
    title: 'Custom APIs & Cloud Microservice Architecture',
    desc: 'Resilient backend engines, high-concurrency WebSocket channels, and secure database schemas engineered to scale effortlessly as your active user base multiplies.',
    accent: '#FFB347',
    deliverables: [
      'Type-safe REST and GraphQL APIs with Swagger/OpenAPI docs',
      'Real-time bidirectional WebSocket telemetry servers',
      'Relational database modeling with PostgreSQL & Prisma',
      'Role-based access control (RBAC) and audit logging',
      'Automated CI/CD build test pipelines and Docker packaging'
    ],
    tech: ['FastAPI', 'Express', 'PostgreSQL', 'Docker', 'WebSockets', 'Prisma']
  }
];

export default function ServicesPage({ onOpenContact, onNavigate }) {
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const headingLines = heroRef.current?.querySelectorAll('.services-hero-line');
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

  return (
    <div className="services-page-root" style={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Services Hero Header */}
      <section ref={heroRef} style={{ width: '100%', padding: '7em 4vw 4em', textAlign: 'center', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6em',
              background: 'rgba(242, 140, 40, 0.12)',
              border: '1.5px solid var(--accent)',
              padding: '0.4em 1.2em',
              borderRadius: '999px',
              color: 'var(--accent)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.82em',
              letterSpacing: '0.1em',
              marginBottom: '1.5em'
            }}
          >
            <span>VHX • FULL-STACK ENGINEERING, AI AUTOMATION &amp; INTEGRATION PLATFORMS</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.3rem, 5.5vw, 5rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: 'var(--ink-black)',
              margin: '0 auto 0.5em',
              textTransform: 'uppercase'
            }}
          >
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span className="services-hero-line" style={{ display: 'inline-block' }}>FULL-STACK ENGINEERING &amp;</span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span className="services-hero-line" style={{ display: 'inline-block', color: 'var(--accent)' }}>AI INTEGRATION PLATFORMS.</span>
            </span>
          </h1>

          <p
            style={{
              maxWidth: '740px',
              margin: '1.5em auto 0',
              fontFamily: 'var(--font-body)',
              fontSize: '1.12em',
              color: 'var(--ink-gray)',
              lineHeight: 1.6
            }}
          >
            From 4-page business websites, custom CRM &amp; E-Commerce software, and custom-code Web-to-App conversions to autonomous n8n workflows, SaaS systems, and AI Voice Call Agents.
          </p>

          <div style={{ marginTop: '2.5em', display: 'flex', justifyContent: 'center', gap: '1em', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onOpenContact}
              className="cta-btn"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05em', padding: '0.85em 2.2em' }}
            >
              <span className="cta-text">Start a Project Consultation</span>
              <span className="cta-btn-arrow">→</span>
              <span className="cta-btn-fill-hover"></span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('products')}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.98em',
                fontWeight: 700,
                padding: '0.85em 1.8em',
                borderRadius: '999px',
                background: 'var(--surface-white)',
                border: '1px solid var(--border-light)',
                color: 'var(--ink-black)',
                cursor: 'pointer'
              }}
            >
              Explore Proprietary Products
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid Showcase */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '1em 4vw 4em', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 560px), 1fr))', gap: '2.5em' }}>
          {CORE_SERVICES.map((srv) => (
            <div
              key={srv.id}
              style={{
                background: 'var(--surface-white)',
                border: '1.5px solid var(--border-light)',
                borderRadius: '26px',
                padding: 'clamp(2em, 3.5vw, 3em)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.25)',
                transition: 'border-color 0.35s ease, transform 0.35s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = srv.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.74em',
                    fontWeight: 800,
                    color: srv.accent,
                    background: 'rgba(242, 140, 40, 0.12)',
                    padding: '0.35em 0.85em',
                    borderRadius: '999px',
                    display: 'inline-block',
                    marginBottom: '1.2em'
                  }}
                >
                  {srv.badge}
                </span>

                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)', fontWeight: 800, color: 'var(--ink-black)', margin: '0 0 0.8em', letterSpacing: '-0.02em' }}>
                  {srv.title}
                </h2>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.02em', color: 'var(--ink-gray)', lineHeight: 1.6, marginBottom: '2em' }}>
                  {srv.desc}
                </p>

                <div style={{ marginBottom: '2em' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85em', fontWeight: 800, color: 'var(--ink-black)', marginBottom: '0.9em', textTransform: 'uppercase' }}>
                    What We Deliver:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65em' }}>
                    {srv.deliverables.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7em', fontFamily: 'var(--font-body)', fontSize: '0.94em', color: 'var(--ink-black)' }}>
                        <span style={{ color: srv.accent, fontWeight: 900, lineHeight: 1 }}>✔</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5em', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1em' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
                  {srv.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.78em',
                        fontWeight: 700,
                        padding: '0.3em 0.75em',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: 'var(--ink-black)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onOpenContact}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.92em',
                    fontWeight: 800,
                    color: srv.accent,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4em'
                  }}
                >
                  <span>Inquire</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transparent Pricing Section */}
      <Pricing onOpenContact={onOpenContact} />

      {/* Footer */}
      <Footer onOpenContact={onOpenContact} onNavigate={onNavigate} />
    </div>
  );
}
