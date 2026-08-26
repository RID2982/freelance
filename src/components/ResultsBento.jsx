import React from 'react';
import CountUp from './CountUp';

const ChartSVG = () => (
  <svg viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', marginTop: 'auto' }}>
    <defs>
      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="150" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10b981" stopOpacity="0.2" />
        <stop offset="1" stopColor="#10b981" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0,150 L0,120 L40,110 L80,115 L120,70 L160,85 L200,50 L240,65 L280,45 L320,60 L360,35 L400,20 L400,150 Z" fill="url(#chartGradient)"/>
    <path d="M0,120 L40,110 L80,115 L120,70 L160,85 L200,50 L240,65 L280,45 L320,60 L360,35 L400,20" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="120" cy="70" r="5" fill="#10b981" />
  </svg>
);

const PillsGroup = () => (
  <div style={{ position: 'relative', height: '100px', width: '150px', marginLeft: 'auto', transform: 'rotate(-5deg)' }}>
    <div style={{ position: 'absolute', top: '10px', left: '0px', background: '#171717', color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600 }}>Copy</div>
    <div style={{ position: 'absolute', top: '5px', left: '50px', background: '#171717', color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600 }}>Development</div>
    <div style={{ position: 'absolute', top: '35px', left: '10px', background: '#171717', color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600 }}>Google</div>
    <div style={{ position: 'absolute', top: '35px', left: '70px', background: '#171717', color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600 }}>Support</div>
    <div style={{ position: 'absolute', top: '65px', left: '20px', background: '#171717', color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600 }}>Hosting</div>
    <div style={{ position: 'absolute', top: '65px', left: '80px', background: '#171717', color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600 }}>Strategy</div>
  </div>
);

const PageSpeed = () => (
  <div style={{ position: 'relative', width: '90px', height: '90px', borderRadius: '50%', border: '4px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontSize: '1.8rem', fontWeight: 700, marginLeft: 'auto' }}>
    <CountUp end={100} duration={1600} />
    <div style={{ position: 'absolute', top: '-10px', right: '-15px', background: 'transparent', border: '1px solid #ccc', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', color: '#555' }}><CountUp end={97} duration={1600} /></div>
    <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'transparent', border: '1px solid #ccc', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', color: '#555' }}><CountUp end={94} duration={1600} /></div>
  </div>
);

export default function ResultsBento() {
  return (
    <section id="capabilities">
      <div className="container">
        <div className="card-elevated reveal">
          <div className="section-header-row" style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '24px', marginBottom: '40px', display: 'flex', alignItems: 'baseline', gap: '24px', flexWrap: 'wrap' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem, 8vw, 4.5rem)', fontWeight: 500, letterSpacing: '-0.04em' }}>Capabilities.</h2>
            <div className="divider" style={{ width: '1px', height: '40px', background: '#e5e5e5' }}></div>
            <p className="section-subtitle" style={{ fontSize: '0.95rem', color: '#737373' }}>High-performance digital products engineered to scale.</p>
          </div>

          <div className="results-grid-new">
            
            {/* Top Row: Chart (Span 2) + Metrics Text (Span 2) */}
            <div className="results-cell-span-2 reveal reveal-delay-1" style={{ background: '#f9f9f9', borderRadius: '24px', padding: '32px 32px 0 32px', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #e5e5e5' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: 'auto' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6ee7b7' }}></div>
              </div>
              <ChartSVG />
            </div>

            <div className="results-cell-span-2 reveal reveal-delay-2" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 500, lineHeight: 1.2, marginBottom: '32px' }}>Digital tools engineered for real business growth</h3>
              <div className="results-metrics-grid">
                <div><h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>OnPage SEO</h4><p style={{ fontSize: '0.8rem', color: '#737373' }}>Ready to rank and drive organic visitors on search engines.</p></div>
                <div><h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Workflow Automation</h4><p style={{ fontSize: '0.8rem', color: '#737373' }}>Lead capture, bots, CRM syncs, and automated workflows using n8n.</p></div>
                <div><h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Mobile Applications</h4><p style={{ fontSize: '0.8rem', color: '#737373' }}>Responsive cross-platform web and mobile UI layouts built for iOS & Android.</p></div>
                <div><h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Scalable Architecture</h4><p style={{ fontSize: '0.8rem', color: '#737373' }}>Clean deployments on modern secure cloud environments (AWS, Vercel).</p></div>
              </div>
            </div>

            {/* Middle Row: Full Service (Span 2) + Lightning Fast (Span 2) */}
            <div className="results-cell-span-2 reveal reveal-delay-3" style={{ background: '#f9f9f9', borderRadius: '24px', padding: '32px', border: '1px solid #e5e5e5', display: 'flex', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '8px' }}>Full-Stack A to Z</h4>
                <p style={{ fontSize: '0.85rem', color: '#737373', maxWidth: '200px' }}>We handle it ourselves end-to-end — backend, database, frontend, and mobile — no outsourcing, no middlemen.</p>
              </div>
              <PillsGroup />
            </div>

            <div className="results-cell-span-2 reveal reveal-delay-4" style={{ background: '#f9f9f9', borderRadius: '24px', padding: '32px', border: '1px solid #e5e5e5', display: 'flex', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '8px' }}>Lightning-Fast Load Times</h4>
                <p style={{ fontSize: '0.85rem', color: '#737373' }}>Because instant loading drives maximum user retention.</p>
              </div>
              <PageSpeed />
            </div>

            {/* Bottom Row: 4 Single Cells */}
            <div className="reveal reveal-delay-5" style={{ background: '#ffffff', borderRadius: '24px', padding: '32px 24px', border: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ marginBottom: '16px', color: '#10b981' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h5 style={{ fontSize: '0.9rem', fontStyle: 'italic', fontWeight: 600 }}>Cross-Platform</h5>
            </div>

            <div className="reveal reveal-delay-6" style={{ background: '#ffffff', borderRadius: '24px', padding: '32px 24px', border: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ marginBottom: '16px', color: '#10b981' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="12" cy="12" r="3"/><path d="M12 8v-1"/><path d="M12 17v-1"/><path d="M8 12h-1"/><path d="M17 12h-1"/></svg></div>
              <h5 style={{ fontSize: '0.9rem', fontStyle: 'italic', fontWeight: 600 }}>Built to Scale</h5>
            </div>

            <div className="reveal reveal-delay-7" style={{ background: '#ffffff', borderRadius: '24px', padding: '32px 24px', border: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ marginBottom: '16px', color: '#10b981' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M12 6v6l4 2"></path></svg>
              </div>
              <h5 style={{ fontSize: '0.9rem', fontStyle: 'italic', fontWeight: 600 }}>Always Available</h5>
            </div>

            <div className="reveal reveal-delay-8" style={{ background: '#ffffff', borderRadius: '24px', padding: '32px 24px', border: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ marginBottom: '16px', color: '#10b981' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h5 style={{ fontSize: '0.9rem', fontStyle: 'italic', fontWeight: 600 }}>Secure & Compliant</h5>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
