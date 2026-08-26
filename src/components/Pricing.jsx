import React from 'react';

const Check = ({ color }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>;

// Configurable Google Form link (users can update this URL easily)
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfD_YOUR_GOOGLE_FORM_ID_HERE/viewform?usp=sf_link";

const tiers = [
  { 
    name: 'Website Development & Management', 
    desc: 'High-performance websites, custom landing pages, Next.js dynamic apps, and active site management.', 
    price: 'Starts from ₹15,000', 
    accent: 'emerald', 
    features: ['Static & Dynamic Web App Development', 'Vercel / AWS Hosting & Domain Setup', 'SEO Optimization & Maintenance', 'Admin Control Panels & Secure Auth', 'Ongoing Site Management'], 
    color: '#10b981', 
    badge: 'WEBSITES' 
  },
  { 
    name: 'Workflow Automation (N8N/Bots)', 
    desc: 'Automate your daily workflows, sync databases, send notifications, and build smart AI agents with n8n.', 
    price: 'Starts from ₹4,500', 
    accent: 'blue', 
    features: ['n8n Automations & Custom Workflows', 'API Integrations (Telegram, WhatsApp, Slack)', 'Google Sheets & Database Syncing', 'AI Agent / LLM Pre-screening & Tools', 'Automated Business Reporting'], 
    color: '#2563eb', 
    badge: 'N8N AUTOMATION' 
  },
  { 
    name: 'Mobile App Development', 
    desc: 'Custom cross-platform mobile apps for iOS and Android built using modern frameworks, tailored to your exact business workflow.', 
    price: 'Custom Quote', 
    accent: 'orange', 
    features: ['Cross-Platform (iOS & Android)', 'App Store & Play Store Publishing', 'Push Notifications Integration', 'Offline Capabilities & Database', 'Secure API Integration', 'Ongoing Maintenance Options'], 
    color: '#ea580c', 
    badge: 'MOBILE APP' 
  },
  { 
    name: 'Poster Designing (Add-on)', 
    desc: 'Professional visual branding and custom digital posters designed to elevate your brand presence.', 
    price: '₹2,500 (Pack of 10)', 
    accent: 'purple', 
    features: ['10 Custom High-Quality Poster Designs', 'High-Resolution Output Formats', 'Branding & Typography Matching', 'Fast Turnaround & Revision Loops', 'Professional Graphic Design', 'Suitable for Social Media Marketing'], 
    color: '#7c3aed', 
    badge: 'CREATIVE ADD-ON' 
  },
];

export default function Pricing() {
  return (
    <section id="pricing">
      <div className="container">
        <div className="card-elevated reveal">
          <div className="section-header-row" style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '24px', marginBottom: '40px', display: 'flex', alignItems: 'baseline', gap: '24px' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 500, letterSpacing: '-0.04em' }}>Pricing.</h2>
            <div className="divider" style={{ width: '1px', height: '40px', background: '#e5e5e5' }}></div>
            <p className="section-subtitle" style={{ fontSize: '0.95rem', color: '#737373' }}>Transparent costs. Built to scale your business.</p>
          </div>
          
          <div className="pricing-grid" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '24px', maxWidth: 'none' }}>
            {tiers.map((t, i) => (
              <div key={t.name} className={`reveal reveal-delay-${i + 1}`} style={{
                border: `2px solid ${t.accent === 'emerald' ? '#bbf7d0' : t.accent === 'blue' ? '#bfdbfe' : t.accent === 'purple' ? '#ddd6fe' : '#ffedd5'}`,
                borderRadius: '24px',
                padding: '32px',
                background: t.accent === 'emerald' ? 'linear-gradient(to bottom, #f0fdf4, #ffffff)' : t.accent === 'blue' ? 'linear-gradient(to bottom, #eff6ff, #ffffff)' : t.accent === 'purple' ? 'linear-gradient(to bottom, #f5f3ff, #ffffff)' : 'linear-gradient(to bottom, #fff7ed, #ffffff)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                flex: '1 1 230px',
                minWidth: '220px',
                maxWidth: '265px'
              }}>
                {t.badge && (
                  <div style={{ position: 'absolute', top: '16px', right: '16px', background: t.color, color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700 }}>
                    {t.badge}
                  </div>
                )}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: '8px', textAlign: 'left', paddingRight: '60px', minHeight: '60px', display: 'flex', alignItems: 'center' }}>{t.name}</h3>
                <p style={{ color: '#525252', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '24px', textAlign: 'left', minHeight: '80px' }}>{t.desc}</p>
                <div style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.05em', color: '#737373', textTransform: 'uppercase', marginBottom: '4px', textAlign: 'center' }}>INVESTMENT</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '24px', textAlign: 'center', color: '#171717', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.price}</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px', flexGrow: 1 }}>
                  {t.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#404040', textAlign: 'left' }}>
                      <Check color={t.color} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href={`https://wa.me/919566697301?text=${encodeURIComponent('Hi Sync Aura team, I\'m interested in the ' + t.name + ' package!')}`} target="_blank" rel="noreferrer" 
                     style={{ 
                       display: 'flex', justifyContent: 'center', padding: '14px', borderRadius: '14px', 
                       background: t.color, color: 'white', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', transition: 'transform 0.2s', cursor: 'pointer'
                     }}
                     onMouseOver={e => e.currentTarget.style.transform = 'scale(0.98)'}
                     onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
