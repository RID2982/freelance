import React from 'react';
export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner reveal">
        <h1>We build websites that{' '}<span className="hero-underline">grow your business<svg viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M2 8.5C52 2.5 102 2 152 6.5C202 11 252 5 298 3.5" stroke="#10b981" strokeWidth="4" strokeLinecap="round" /></svg></span></h1>
        <p>Premium web design, Next.js development, n8n Automation, and SEO optimization. We deliver stunning, high-performing websites tailored to scale your brand.</p>
        <a href="https://wa.me/919566697301?text=Hi%2C%20I%27m%20interested%20in%20getting%20a%20website!" target="_blank" rel="noreferrer" className="btn btn-dark hero-btn" style={{ padding: '16px 32px', fontSize: '1rem', marginTop: '16px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/><path d="M5 3v4M3 5h4"/></svg>
          Book a Call
        </a>
      </div>
    </section>
  );
}
