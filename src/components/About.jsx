import React from 'react';

const teamMembers = [
  { 
    name: 'Vinodhan V A', 
    role: 'Founder & Lead Developer', 
    email: 'vinovb21@gmail.com', 
    photo: '/member-vinodhan.png', 
    badge: 'Founder & Lead Developer' 
  },
  { 
    name: 'Hari Dev M V', 
    role: 'Director & Senior Web Developer', 
    email: 'haridevvinothkumar@outlook.com',
    photo: 'https://api.dicebear.com/7.x/initials/svg?seed=HariDev', 
    badge: 'Director & Senior Web Developer'
  },
];

const countWords = { 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five' };

export default function About() {
  const countWord = countWords[teamMembers.length] || teamMembers.length;

  return (
    <section id="about" className="about-section-new">
      <div className="container">
        {/* BACKGROUND HEADER */}
        <div className="about-header-bg reveal">
          <h2 className="about-title-large">About.</h2>
          <p className="about-subtitle-muted">The minds behind Sync Aura.</p>
        </div>

        {/* OVERLAPPING MAIN CARD */}
        <div className="about-main-card shadow-ultra reveal">
          <div className="about-grid-layout">
            
            {/* TEAM PROFILES GRID */}
            <div className="team-profiles-grid">
              {teamMembers.map((m, i) => (
                <div key={i} className={`reveal team-featured-card reveal-delay-${i+1}`}>
                  <div className="team-photo-container">
                    <img src={m.photo} alt={m.name} loading="lazy" decoding="async" className="team-photo-img" />
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
            <div className="about-stat-item">
              <div className="stat-value">100%</div>
              <div className="stat-label">Satisfied Clients</div>
            </div>
            <div className="about-stat-item">
              <div className="stat-value">March 19, 2026</div>
              <div className="stat-label">Agency Founded</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
