import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const tiers = [
  {
    id: 'web-dev',
    name: 'Website Development & Management',
    desc: 'High-performance websites, custom landing pages, Next.js dynamic apps, and active site management.',
    price: 'From ₹15,000',
    badge: 'WEBSITES & WEB APPS',
    features: [
      'Static & Dynamic Web App Development',
      'Vercel / AWS Cloud Hosting & Domain Setup',
      'Technical SEO Optimization & Performance',
      'Admin Control Panels & Secure Auth',
      'Ongoing Security & Content Updates'
    ]
  },
  {
    id: 'n8n-automation',
    name: 'Workflow Automation (n8n & Bots)',
    desc: 'Automate daily operations, sync databases, send alerts, and build smart AI agents with n8n.',
    price: 'From ₹4,500',
    badge: 'N8N & AI AUTOMATION',
    features: [
      'n8n Custom Workflow Automations',
      'API Integrations (Telegram, WhatsApp, Slack)',
      'Google Sheets & Real-Time Database Sync',
      'AI Agent & LLM Resume / Lead Filtering',
      'Automated Business Reporting & Alerting'
    ]
  },
  {
    id: 'mobile-app',
    name: 'Mobile App Engineering',
    desc: 'Custom cross-platform mobile apps for iOS and Android built with modern frameworks and seamless APIs.',
    price: 'Custom Quote',
    badge: 'MOBILE ENGINEERING',
    features: [
      'Cross-Platform iOS & Android Apps',
      'App Store & Play Store Deployment',
      'Push Notifications & Offline Storage',
      'Secure Authentication & Backend APIs',
      'Long-Term Maintenance & Updates'
    ]
  },
  {
    id: 'branding-posters',
    name: 'Brand & Poster Designing',
    desc: 'Professional visual branding and custom digital posters designed to elevate your brand presence.',
    price: '₹2,500 (Pack of 10)',
    badge: 'BRANDING & GRAPHICS',
    features: [
      '10 Custom High-Res Poster Designs',
      'Typography & Brand Palette Matching',
      'Fast Turnaround & Rapid Revision Loops',
      'Tailored for Instagram & Social Marketing',
      'Vector Asset Deliverables (Figma/SVG/PNG)'
    ]
  }
];

export default function Pricing({ onOpenContact }) {
  const headingWrapperRef = useRef(null);
  const offsetHeadingRef = useRef(null);
  const [expandedTier, setExpandedTier] = useState(null);

  useEffect(() => {
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
  }, []);

  const toggleTier = (id) => {
    setExpandedTier(expandedTier === id ? null : id);
  };

  return (
    <section className="section-pricing" id="pricing" style={{ width: '100%', maxWidth: '100%', padding: '6em 4vw' }}>
      <div className="section-pricing-wrapper" style={{ width: '100%', maxWidth: '100%', margin: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5em' }}>
          <div className="section-about-text">TRANSPARENT COSTS</div>
          <div ref={headingWrapperRef} className="section-heading-wrapper">
            <h2 className="section-heading">NO HIDDEN AGENDAS</h2>
            <h2 ref={offsetHeadingRef} className="section-heading accent-offset" aria-hidden="true">
              NO HIDDEN AGENDAS
            </h2>
          </div>
          <p style={{ marginTop: '1em', color: 'var(--ink-gray)', fontSize: '1.1em' }}>
            Predictable investment with fast turnarounds. Click any plan to inspect deliverables.
          </p>
        </div>

        <div className="pricing-grid" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2em' }}>
          {tiers.map((tier) => {
            const isExpanded = expandedTier === tier.id;
            return (
              <div
                key={tier.id}
                className="pricing-card"
                style={{
                  background: '#ffffff',
                  border: isExpanded ? '2px solid var(--accent)' : '1.5px solid var(--border-light)',
                  borderRadius: '24px',
                  padding: '2.2em 1.8em',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.35s ease',
                  boxShadow: isExpanded ? '0 20px 40px rgba(37, 99, 235, 0.12)' : 'none',
                  cursor: 'pointer'
                }}
                onClick={() => toggleTier(tier.id)}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
                    <span className="pricing-badge">{tier.badge}</span>
                    <span style={{ fontSize: '0.8em', color: 'var(--accent)', fontWeight: 700 }}>
                      {isExpanded ? '▲ Hide' : '▼ Details'}
                    </span>
                  </div>

                  <h3 className="pricing-title" style={{ fontSize: '1.45em', marginBottom: '0.4em' }}>{tier.name}</h3>
                  <p className="pricing-desc" style={{ fontSize: '0.95em', marginBottom: '1.2em' }}>{tier.desc}</p>
                  
                  {/* Clean Clickable Price Callout */}
                  <div
                    className="pricing-price"
                    style={{
                      fontSize: '1.85em',
                      fontWeight: 800,
                      color: isExpanded ? 'var(--accent)' : 'var(--ink-black)',
                      fontFamily: 'var(--font-heading)',
                      marginBottom: isExpanded ? '1em' : '0.5em',
                      paddingBottom: '0.6em',
                      borderBottom: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'color 0.25s ease'
                    }}
                  >
                    <span>{tier.price}</span>
                    <span style={{ fontSize: '0.45em', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600 }}>
                      {isExpanded ? '▲ Hide details' : '▼ View details'}
                    </span>
                  </div>

                  {!isExpanded && (
                    <div style={{ fontSize: '0.8em', color: 'var(--ink-muted)', marginTop: '0.4em' }}>
                      Click to expand deliverables & enquire →
                    </div>
                  )}

                  {/* Collapsible Features Details & Enquiry Button */}
                  {isExpanded && (
                    <div style={{ marginTop: '0.8em', animation: 'fadeIn 0.3s ease' }}>
                      <div style={{ fontSize: '0.78em', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '0.6em', letterSpacing: '0.05em' }}>
                        Included Deliverables:
                      </div>
                      <ul className="pricing-features" style={{ listStyle: 'none', padding: 0, margin: '0 0 1.8em 0', display: 'flex', flexDirection: 'column', gap: '0.6em' }}>
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.6em', fontSize: '0.9em', color: 'var(--ink-gray)' }}>
                            <Check />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        className="cta-btn"
                        style={{ width: '100%', justifyContent: 'center' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenContact();
                        }}
                      >
                        <span className="cta-text">Enquire for this Scope</span>
                        <span className="cta-btn-arrow">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1.464 8.536L8.535 1.465M3.055 1.288L8.535 1.465L8.712 6.945" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
