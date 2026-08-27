import React from 'react';
import CountUp from './CountUp';

const teamMembers = [
  {
    name: 'Vinodhan V A',
    role: 'Founder & Lead Developer',
    email: 'vinovb21@gmail.com',
    photo: '/member-vinodhan.jpg',
    focus: '50% 35%',
    scale: 1.45,
    transformOrigin: '50% 35%',
    badge: 'Founder & Lead Developer'
  },
  {
    name: 'Hari Dev M V',
    role: 'Director & Senior Web Developer',
    email: 'haridevvinothkumar@outlook.com',
    photo: '/member-haridev.jpg',
    focus: '50% 26%',
    scale: 1,
    badge: 'Director & Senior Web Developer'
  },
];

const countWords = { 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five' };

export default function About() {
  const countWord = countWords[teamMembers.length] || teamMembers.length;

  return (
    <section id="about">
      <div className="container">
        <div className="card-elevated reveal">
          <div className="section-header-row" style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '24px', marginBottom: '40px', display: 'flex', alignItems: 'baseline', gap: '24px', flexWrap: 'wrap' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 500, letterSpacing: '-0.04em' }}>About.</h2>
            <div className="divider" style={{ width: '1px', height: '40px', background: '#e5e5e5' }}></div>
            <p className="section-subtitle" style={{ fontSize: '0.95rem', color: '#737373' }}>The minds behind Sync Aura.</p>
          </div>

          <div className="about-grid-layout">
            
            {/* TEAM PROFILES GRID */}
            <div className="team-profiles-grid">
              {teamMembers.map((m, i) => (
                <div key={i} className={`reveal team-featured-card reveal-delay-${i+1}`}>
                  <div className="team-photo-container">
                    {m.photo ? (
                      <img 
                        src={m.photo} 
                        alt={m.name} 
                        loading="lazy" 
                        decoding="async" 
                        className="team-photo-img" 
                        style={{ 
                          objectPosition: m.focus || '50% 50%',
                          transform: m.scale ? `scale(${m.scale})` : 'none',
                          transformOrigin: m.transformOrigin || m.focus || '50% 50%'
                        }} 
                      />
                    ) : (
                      <div className="team-photo-placeholder" role="img" aria-label={`${m.name} — photo coming soon`}>
                        <img src="/favicon.svg" alt="" loading="lazy" decoding="async" className="team-photo-placeholder-icon" />
                      </div>
                    )}
                    <div className="team-photo-label-overlay">
                      <div className="badge-white">
                        <span className="dot-emerald"></span> {m.badge}
                      </div>
                      <h4 className="team-member-name-overlay">{m.name}</h4>
                      {m.email && <p className="team-member-email-overlay">{m.email}</p>}
                      {m.age && <p className="team-member-meta-overlay">{m.age} · India</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TEAM STORY & STATS */}
            <div className="team-story-content">
              <h3 className="story-heading">{countWord} minds, clear vision.</h3>
              <p className="story-description">
                We're the team behind Sync Aura — no big agency, no unnecessary meetings, no wasted hours. 
                As young developers with innovative thinking, we work efficiently, with quality, and fast.
              </p>
              <p className="story-description">
                We manage and execute everything ourselves to deliver the best result. 
                No 500 hours of work for things that simply need to work. 
                We're the best partners you'll find when it comes to excellence.
              </p>

              <div className="about-tech-tags">
                <span className="tech-tag-pill">WEB DEVELOPMENT</span>
                <span className="tech-tag-pill">UI/UX DESIGN</span>
                <span className="tech-tag-pill">SEO</span>
                <span className="tech-tag-pill">AUTOMATION</span>
              </div>
            </div>

          </div>

          {/* EXTENDED FULL-WIDTH STATS */}
          <div className="about-stats-row">
            <div className="about-stat-item reveal reveal-delay-1">
              <div className="stat-value"><CountUp end={100} suffix="%" /></div>
              <div className="stat-label">Satisfied Clients</div>
            </div>
            <div className="about-stat-item reveal reveal-delay-2">
              <div className="stat-value">July 10, 2026</div>
              <div className="stat-label">Agency Founded</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
