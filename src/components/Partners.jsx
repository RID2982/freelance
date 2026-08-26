import React from 'react';

export default function Partners() {
  return (
    <section id="partners" style={{ padding: '40px 24px' }}>
      <div className="container">
        <div className="card-elevated reveal" style={{ padding: '60px', background: '#171717', color: 'white', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div className="section-header-row" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '24px', marginBottom: '40px', display: 'flex', alignItems: 'baseline', gap: '24px', flexWrap: 'wrap' }}>
            <h2 className="section-title" style={{ fontSize: '4.5rem', fontWeight: 500, letterSpacing: '-0.04em', color: 'white' }}>Partners.</h2>
            <div className="divider" style={{ width: '1px', height: '40px', background: 'rgba(255, 255, 255, 0.2)' }}></div>
            <p className="section-subtitle" style={{ fontSize: '0.95rem', color: '#a3a3a3' }}>Collaborative strength. End-to-end growth solutions.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
            {/* Left Column: Brand description */}
            <div style={{ textAlign: 'left' }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'rgba(124, 58, 237, 0.1)', 
                border: '1px solid rgba(124, 58, 237, 0.3)', 
                color: '#c084fc', 
                padding: '6px 14px', 
                borderRadius: '999px', 
                fontSize: '0.75rem', 
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '20px'
              }}>
                <span style={{ width: '8px', height: '8px', background: '#a855f7', borderRadius: '50%', boxShadow: '0 0 8px #a855f7' }}></span>
                Official Alliance
              </div>
              <h3 style={{ fontSize: '2.2rem', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: '1.2', marginBottom: '16px' }}>
                Panthers Club <br/>
                <span style={{ color: '#a855f7' }}>& Sync Aura</span>
              </h3>
              <p style={{ color: '#d4d4d4', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                We have officially partnered with <strong>Panthers Club</strong>, Salem's premier digital marketing agency. 
                By combining Sync Aura's technical mastery in high-performance web development and automation with Panthers Club's marketing power, we provide a unified digital growth engine for your brand.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#a3a3a3' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  Full-Funnel Digital Marketing & Campaigns
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#a3a3a3' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  High-Converting Landing Pages & Custom Web Development
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#a3a3a3' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  SEO, Lead Generation, and Workflow Automations
                </div>
              </div>
            </div>

            {/* Right Column: Visual Bento Banner */}
            <div style={{ 
              background: '#262626', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              borderRadius: '24px', 
              padding: '40px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚀</div>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '8px' }}>Grow Faster Together</h4>
              <p style={{ color: '#a3a3a3', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '24px' }}>
                No need to coordinate between developers and marketing teams. We work as a unified force to construct, launch, and scale your online footprint.
              </p>
              <a href={`https://wa.me/919566697301?text=${encodeURIComponent('Hi Sync Aura, I would like to know more about the joint growth services with Panthers Club!')}`} 
                 target="_blank" rel="noreferrer" 
                 style={{ 
                   display: 'inline-flex', justifyContent: 'center', padding: '14px 28px', borderRadius: '14px', 
                   background: '#a855f7', color: 'white', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', transition: 'transform 0.2s, background 0.2s', cursor: 'pointer'
                 }}
                 onMouseOver={e => { e.currentTarget.style.transform = 'scale(0.98)'; e.currentTarget.style.background = '#9333ea'; }}
                 onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#a855f7'; }}
              >
                Inquire About Joint Services →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
