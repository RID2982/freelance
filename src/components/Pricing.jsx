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
    desc: '4-page custom website development plus tailored CRM, E-Commerce, and business software built around your exact needs.',
    price: 'From ₹15,000',
    badge: '4 PAGES + CUSTOM SOFTWARE',
    customNote: 'Customization Notice: For CRM, E-Commerce, or additional custom pages, the price will differ based on requirements.',
    features: [
      '4 Pages of Website Development (Static & Dynamic)',
      'Custom Software: CRM, E-Commerce & Business Portals',
      'Vercel / AWS Cloud Hosting & Domain Setup',
      'Technical SEO Optimization & Performance',
      'Admin Control Panels & Ongoing Security Updates'
    ]
  },
  {
    id: 'n8n-automation',
    name: 'Workflow Automation (n8n & Bots)',
    desc: 'Automate daily operations, sync databases, send alerts, and build smart AI agents with n8n.',
    price: 'From ₹4,500',
    badge: 'N8N & AI AUTOMATION',
    customNote: null,
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
    name: 'Mobile Application Development',
    desc: 'Custom mobile apps for iOS & Android and full Website-to-Application conversions engineered with 100% custom code.',
    price: 'Based on Negotiation',
    badge: 'CUSTOM CODE & WEB-TO-APP',
    customNote: 'Customization Notice: Pricing is finalized based on customer negotiation, feature scope, and custom code complexity.',
    features: [
      'Custom Mobile Application Development (iOS & Android)',
      'Website-to-Application Conversion (100% Custom Code)',
      'App Store & Play Store Deployment',
      'Push Notifications & Offline Storage',
      'Secure Authentication & Long-Term Maintenance'
    ]
  },
  {
    id: 'saas-ai-voice',
    name: 'Software Systems, AI & Voice Agents',
    desc: 'End-to-end SaaS products, enterprise AI integration platforms, and intelligent AI Voice Call Agents tailored to your workflow.',
    price: 'Custom Quote',
    badge: 'SAAS • AI • VOICE AGENTS',
    customNote: 'Customization Notice: Major SaaS builds, AI integrations, and Voice Call Agents are priced dynamically per customer scope.',
    features: [
      'SaaS Product Engineering & Multi-Tenant Backends',
      'AI Integration Platforms & Autonomous LLM Agents',
      'AI Voice Call Agents (Inbound & Outbound Automation)',
      'Custom REST / GraphQL & Webhook APIs',
      'Dedicated Architecture & SLA Support'
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
                  background: 'var(--surface-white)',
                  border: isExpanded ? '2px solid var(--accent)' : '1.5px solid var(--border-light)',
                  borderRadius: '24px',
                  padding: '2.2em 1.8em',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.35s ease',
                  boxShadow: isExpanded ? '0 20px 40px rgba(242, 140, 40, 0.16)' : 'none',
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
                      {tier.customNote && (
                        <div
                          style={{
                            color: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            borderRadius: '10px',
                            padding: '0.7em 0.9em',
                            fontSize: '0.84em',
                            fontWeight: 700,
                            lineHeight: 1.45,
                            marginBottom: '1em'
                          }}
                        >
                          ★ {tier.customNote}
                        </div>
                      )}

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
                        <span className="cta-btn-fill-hover"></span>
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
