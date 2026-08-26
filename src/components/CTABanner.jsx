import React from 'react';

export default function CTABanner() {
  return (
    <section id="cta-banner" style={{ padding: '0 24px 40px 24px' }}>
      <div className="container">
        <div className="cta-banner-new reveal">
          <h2>Ready for your project?</h2>
          <p>Let's create something extraordinary together. We look forward to hearing from you.</p>
          
          <div className="cta-buttons-row">
            <a href="https://wa.me/919566697301" target="_blank" rel="noreferrer" className="cta-btn-white">
              Book a Call 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            
            <a href="tel:+919566697301" className="cta-btn-dark-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
