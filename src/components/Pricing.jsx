import React from 'react';

const Check = ({ color }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>;

// Configurable Google Form link (users can update this URL easily)
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfD_YOUR_GOOGLE_FORM_ID_HERE/viewform?usp=sf_link";

const tiers = [
  { 
    name: 'Static Website / Branding Page', 
    desc: 'Ideal for launching a branding page, single product landing, or small static business site. Fully optimized for all screen sizes.', 
    price: '₹6,000 - ₹8,000', 
    accent: 'emerald', 
    features: ['1-3 Highly Optimized Pages', 'Responsive (Mobile, Tab, Desktop)', 'Contact Form Integration', 'SEO Foundation & Metadata', 'Fast Static Hosting Setup'], 
    color: '#10b981', 
    badge: 'BRANDING' 
  },
  { 
    name: 'Dynamic Web App / Custom Portal', 
    desc: 'For custom portals, admin panels, database integrations, or automation setups. Pricing scales based on custom complexity.', 
    price: 'Starts from ₹15,000', 
    accent: 'blue', 
    features: ['Custom Database Integrations', 'Admin Dashboards & Secure Auth', 'Automated n8n Workflows', 'AWS / Cloud Deployment', 'Scalable Performance Architecture', 'Custom Quote based on Needs'], 
    color: '#2563eb', 
    badge: 'FULL STACK' 
  },
  { 
    name: 'Creative Content & Video Editing', 
    desc: 'Professional visual branding, custom social media designs, posters, and high-impact video editing with standard market rates.', 
    price: '₹1,499 - ₹4,999', 
    accent: 'purple', 
    features: ['Custom Poster Design (from ₹1,499)', 'Social Media Design Pack (from ₹2,499)', 'Video Editing (from ₹2,999/video)', 'High-Resolution Export Formats', 'Fast Turnaround & Revision Loops', 'Professional Graphic Retouching'], 
    color: '#7c3aed', 
    badge: 'CREATIVE' 
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
];

export default function Pricing() {
  return (
    <center>
    <section id="pricing">
      <div className="container">
        <div className="card-elevated reveal" style={{ padding: '60px' }}>
          <div className="section-header-row" style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '24px', marginBottom: '40px', display: 'flex', alignItems: 'baseline', gap: '24px' }}>
            <h2 className="section-title" style={{ fontSize: '4.5rem', fontWeight: 500, letterSpacing: '-0.04em' }}>Pricing.</h2>
            <div className="divider" style={{ width: '1px', height: '40px', background: '#e5e5e5' }}></div>
            <p className="section-subtitle" style={{ fontSize: '0.95rem', color: '#737373' }}>Transparent costs. Built to scale your business.</p>
          </div>
          
          <div className="pricing-grid" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '24px' }}>
            {tiers.map(t => (
              <div key={t.name} style={{
                border: `2px solid ${t.accent === 'emerald' ? '#bbf7d0' : t.accent === 'blue' ? '#bfdbfe' : t.accent === 'purple' ? '#ddd6fe' : '#ffedd5'}`,
                borderRadius: '24px',
                padding: '32px',
                background: t.accent === 'emerald' ? 'linear-gradient(to bottom, #f0fdf4, #ffffff)' : t.accent === 'blue' ? 'linear-gradient(to bottom, #eff6ff, #ffffff)' : t.accent === 'purple' ? 'linear-gradient(to bottom, #f5f3ff, #ffffff)' : 'linear-gradient(to bottom, #fff7ed, #ffffff)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                flex: '1',
                minWidth: '270px',
                maxWidth: '340px'
              }}>
                {t.badge && (
                  <div style={{ position: 'absolute', top: '16px', right: '16px', background: t.color, color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700 }}>
                    {t.badge}
                  </div>
                )}
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: '8px', textAlign: 'left', paddingRight: '100px', minHeight: '60px', display: 'flex', alignItems: 'center' }}>{t.name}</h3>
                <p style={{ color: '#525252', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '24px', textAlign: 'left', minHeight: '80px' }}>{t.desc}</p>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em', color: '#737373', textTransform: 'uppercase', marginBottom: '4px', textAlign: 'center' }}>INVESTMENT</div>
                <div style={{ fontSize: '1.65rem', fontWeight: 700, letterSpacing: '-0.05em', marginBottom: '24px', textAlign: 'center', color: '#171717', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.price}</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px', flexGrow: 1 }}>
                  {t.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#404040', textAlign: 'left' }}>
                      <Check color={t.color} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href={`https://wa.me/919566697301?text=${encodeURIComponent('Hi Sync Aura team, I\'m interested in the ' + t.name + ' package!')}`} target="_blank" rel="noreferrer" 
                     style={{ 
                       display: 'flex', justifyContent: 'center', padding: '14px', borderRadius: '14px', 
                       background: t.color, color: 'white', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none', transition: 'transform 0.2s', cursor: 'pointer'
                     }}
                     onMouseOver={e => e.currentTarget.style.transform = 'scale(0.98)'}
                     onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    Chat on WhatsApp →
                  </a>

                  <a href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer" 
                     style={{ 
                       display: 'flex', justifyContent: 'center', padding: '12px', borderRadius: '14px', 
                       border: `1px solid ${t.color}`, color: t.color, fontWeight: 500, fontSize: '0.85rem', textDecoration: 'none', transition: 'transform 0.2s', cursor: 'pointer',
                       background: 'transparent'
                     }}
                     onMouseOver={e => { e.currentTarget.style.transform = 'scale(0.98)'; e.currentTarget.style.background = `${t.color}10`; }}
                     onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'transparent'; }}
                  >
                    Submit Requirements Form
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </center>
  );
}
