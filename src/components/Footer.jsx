import React from 'react';
import logo from '../assets/logo.png';

const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };

export default function Footer() {
  return (
    <footer className="footer-transparent" style={{ padding: '0 24px 40px 24px' }}>
      <div className="container reveal">
        <div className="footer-container-dark">
          {/* Top Split */}
          <div className="footer-top-grid">

            <div>
              <div style={{ color: '#10b981', fontSize: '0.95rem', fontWeight: 600, marginBottom: '24px' }}>Get in touch</div>
              <h2 className="footer-heading-shadow" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '24px' }}>Ready for your<br/>project?</h2>
              <p style={{ color: '#a3a3a3', fontSize: '1.1rem', marginBottom: '40px', maxWidth: '400px', lineHeight: 1.6 }}>Let's get started together. Send me a request and receive a response within 12 hours.</p>
              
              <a href="https://wa.me/919566697301?text=Hi%2C%20I%27m%20interested%20in%20getting%20a%20website!" target="_blank" rel="noreferrer" 
                style={{ 
                  display: 'inline-flex', padding: '16px 32px', border: '1px solid rgba(255,255,255,0.2)', 
                  borderRadius: '999px', color: 'white', fontWeight: 600, letterSpacing: '0.05em', 
                  alignItems: 'center', gap: '8px', textDecoration: 'none', background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
                  transition: 'all 0.3s'
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/></svg>
                START PROJECT
              </a>
            </div>
            {/* Right part: Yashtex Dark Card */}
            <div className="footer-dark-card-wrap">
              <div className="footer-dark-card">
                <div className="footer-logo-chip">
                  <img src={logo} alt="Sync Aura" />
                </div>
                <p style={{ color: '#a3a3a3', fontSize: '0.95rem', marginBottom: '24px' }}>Web Development & Automation Development</p>
                
                <div style={{ 
                  border: '1px solid rgba(16,185,129,0.3)', borderRadius: '999px', padding: '8px 16px', 
                  display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#10b981',
                  background: 'rgba(16,185,129,0.05)'
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
                  Available for new projects
                </div>
              </div>
            </div>
          </div>

          {/* Location Row */}
          <div style={{ 
            background: '#171717', border: '1px solid rgba(255,255,255,0.05)', 
            borderRadius: '16px', padding: '24px 32px', marginBottom: '60px' 
          }}>
            <div style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '8px' }}>Our Location</div>
            <div style={{ fontSize: '1.1rem' }}>India</div>
          </div>

          {/* Footer Bottom Nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px', color: '#a3a3a3', fontSize: '0.9rem' }}>
              <strong style={{ color: 'white', fontSize: '1.2rem', fontFamily: 'sans-serif', fontStyle: 'italic', paddingRight: '12px' }}>Sync Aura</strong>
              <span>© 2026</span>
              <span style={{ opacity: 0.5 }}>•</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='white'} onMouseOut={e=>e.currentTarget.style.color='#a3a3a3'}>Cookie Settings</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '32px', color: '#d4d4d4', fontSize: '0.95rem' }}>
              <button onClick={() => scrollTo('about')} style={{ textDecoration: 'none', color: 'inherit', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>About</button>
              <button onClick={() => scrollTo('portfolio')} style={{ textDecoration: 'none', color: 'inherit', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>Portfolio</button>
              <button onClick={() => scrollTo('hero')} style={{ textDecoration: 'none', color: 'inherit', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>Contact</button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: '16px' }}>
                <a href="#" style={{ color: '#d4d4d4', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='white'} onMouseOut={e=>e.currentTarget.style.color='#d4d4d4'}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                <a href="#" style={{ color: '#d4d4d4', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='white'} onMouseOut={e=>e.currentTarget.style.color='#d4d4d4'}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                <a href="#" style={{ color: '#d4d4d4', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='white'} onMouseOut={e=>e.currentTarget.style.color='#d4d4d4'}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
