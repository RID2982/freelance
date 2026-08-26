import React, { useState } from 'react';
import telegramMockup from '../assets/telegram_food_automation.jpg';
import hrAutomation from '../assets/hr_automation.jpg';

const projects = [
  { 
    id: 7, 
    title: 'Forge Industrial Portal', 
    category: 'FULL WEBSITE DEVELOPMENT', 
    description: 'A full-stack enterprise web application deployed on AWS (S3, Lambda, API Gateway) featuring industrial training, secure admin controls, and custom database integrations.', 
    image: '/forge.png',
    tools: ['React', 'Node.js', 'AWS Lambda & S3', 'REST API'],
    type: 'website',
    link: 'https://www.forge.ind.in/login'
  },
  { 
    id: 8, 
    title: 'Rotaract Club Salem Midtown', 
    category: 'STATIC WEB DEVELOPMENT', 
    description: 'A high-performance static website for the Rotaract Club Salem Midtown. Displays community projects, calendars, and outreach logs. Optimized for high speed and mobile responsiveness.', 
    image: '/rotaract.png',
    tools: ['React', 'Vite', 'Tailwind CSS', 'Mobile Responsive'],
    type: 'website',
    link: 'https://racsalemmidtown.in'
  },
  { 
    id: 1, 
    title: 'Telegram Food Order Automation', 
    category: 'N8N AUTOMATION', 
    description: 'Automated workflow system integrating a Telegram bot with n8n and Google Sheets to capture, format, and log customer food orders in real-time.', 
    image: telegramMockup,
    tools: ['n8n', 'Telegram API', 'Google Sheets'],
    type: 'automation',
    link: 'https://github.com/vinodhan07'
  },
  { 
    id: 9, 
    title: 'HR Agent Pre-Screening Workflow', 
    category: 'N8N AUTOMATION', 
    description: 'Automated recruitment pre-screening system built with n8n and an AI Agent that processes CV files, scores applicant profiles, and logs results in Google Sheets automatically.', 
    image: hrAutomation,
    tools: ['n8n', 'AI Agent', 'Google Sheets', 'OpenAI API'],
    type: 'automation',
    link: 'https://github.com/N8n-automations-works/HR-Agent-Pre-Screening-Workflow-.git'
  },
  { 
    id: 2, 
    title: 'Modern Restaurant Menu Design', 
    category: 'POSTERS & GRAPHIC DESIGN', 
    description: 'A striking, high-contrast black and orange modern menu design created for premium dining branding.', 
    image: '/posters/Black and Orange Modern Restaurant Menu.png',
    tools: ['Branding', 'Graphic Design', 'Typography'],
    type: 'poster'
  },
  { 
    id: 3, 
    title: 'Quiz Night Promotion Poster', 
    category: 'POSTERS & GRAPHIC DESIGN', 
    description: 'Vibrant and engaging quiz night poster featuring bold typography and bright, high-contrast color palettes.', 
    image: '/posters/Red and Yellow Modern Quiz Night Poster.png',
    tools: ['Marketing', 'Poster Design', 'Vector Illustration'],
    type: 'poster'
  },
  { 
    id: 4, 
    title: 'Race Car Tournament Promotion', 
    category: 'POSTERS & GRAPHIC DESIGN', 
    description: 'Dynamic, high-speed action concept design for a simulated racing car tournament social media campaign.', 
    image: '/posters/Red and Black Dynamic Race Car Tournament Instagram Post.png',
    tools: ['Photoshop Editing', 'Motion Graphics', 'Social Media'],
    type: 'poster'
  },
  { 
    id: 5, 
    title: 'Salem Midtown Rotaract Graphics', 
    category: 'POSTERS & GRAPHIC DESIGN', 
    description: 'Official branding material and informational poster designed for the Salem Midtown Rotaract organization.', 
    image: '/posters/Salem Midtown.Rotaract2982.org.png',
    tools: ['Non-Profit Branding', 'CorelDraw', 'Public Relations'],
    type: 'poster'
  },
  { 
    id: 6, 
    title: 'Handloom Day Campaign Design', 
    category: 'POSTERS & GRAPHIC DESIGN', 
    description: 'Minimalistic and cultural design poster honoring the national handloom weaving heritage and artisan craftsmanship.', 
    image: '/posters/handloom day.png',
    tools: ['Cultural Campaign', 'Heritage', 'Vector Art'],
    type: 'poster'
  }
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.type === activeTab);

  const closeModal = () => setSelectedProject(null);

  return (
    <section id="portfolio" style={{ marginBottom: '40px' }}>
      <div className="container">
        <div className="card-elevated reveal">
          {/* Header Row */}
          <div className="section-header-row" style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '24px', marginBottom: '32px', display: 'flex', alignItems: 'baseline', gap: '24px', flexWrap: 'wrap' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 500, letterSpacing: '-0.04em' }}>Portfolio.</h2>
            <div className="divider" style={{ width: '1px', height: '40px', background: '#e5e5e5' }}></div>
            <p className="section-subtitle" style={{ fontSize: '0.95rem', color: '#737373' }}>Selected work. From web automations to premium branding graphics.</p>
          </div>

          {/* Category Tabs */}
          <div className="portfolio-tabs" style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'website', label: 'Websites' },
              { id: 'automation', label: 'Automation' },
              { id: 'poster', label: 'Graphic Design & Posters' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor: activeTab === tab.id ? '#10b981' : '#e5e5e5',
                  background: activeTab === tab.id ? '#10b981' : 'white',
                  color: activeTab === tab.id ? 'white' : '#525252',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(16, 185, 129, 0.2)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="portfolio-grid-new" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {filteredProjects.map(p => (
              <div key={p.id} className="portfolio-card-new" style={{ display: 'flex', flexDirection: 'column' }}>
                <div 
                  className="portfolio-img-area" 
                  onClick={() => setSelectedProject(p)}
                  style={{ height: '320px', borderRadius: '16px', border: '1px solid #f0f0f0', marginBottom: '20px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
                >
                  <img src={p.image} alt={p.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} className="portfolio-card-img" />
                  <div className="portfolio-img-hover-overlay" style={{
                    position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s ease'
                  }}>
                    <div style={{ background: 'white', color: '#171717', padding: '10px 20px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', transform: 'translateY(10px)', transition: 'transform 0.2s ease' }} className="portfolio-hover-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                      Quick View
                    </div>
                  </div>
                  <div className="portfolio-tag-white" style={{ 
                    position: 'absolute', 
                    top: '16px', 
                    left: '16px', 
                    background: 'white', 
                    border: '1px solid #e5e5e5', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.65rem', 
                    fontWeight: 600, 
                    color: '#737373',
                    pointerEvents: 'none',
                    zIndex: 2
                  }}>
                    {p.category}
                  </div>
                </div>
                <div className="portfolio-body-new" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#171717', marginBottom: '8px', textAlign: 'left' }}>
                    <span 
                      onClick={() => setSelectedProject(p)} 
                      style={{ color: '#171717', textDecoration: 'none', transition: 'color 0.2s', cursor: 'pointer' }} 
                      onMouseOver={e=>e.currentTarget.style.color='#10b981'} 
                      onMouseOut={e=>e.currentTarget.style.color='#171717'}
                    >
                      {p.title}
                    </span>
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#737373', lineHeight: '1.5', marginBottom: '16px', textAlign: 'left', flexGrow: 1 }}>{p.description}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                    {p.tools && p.tools.map((t, i) => (
                      <span key={i} style={{ 
                        padding: '4px 10px', 
                        background: '#f8f8f8', 
                        border: '1px solid #eeeeee', 
                        borderRadius: '6px', 
                        fontSize: '0.7rem', 
                        color: '#737373', 
                        fontWeight: 500 
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => setSelectedProject(p)}
                    style={{ 
                      marginTop: 'auto', display: 'inline-flex', justifyContent: 'center', padding: '10px 16px', borderRadius: '10px',
                      background: '#171717', color: 'white', fontWeight: 600, fontSize: '0.8rem', border: 'none', transition: 'background 0.2s, transform 0.2s', cursor: 'pointer',
                      alignSelf: 'flex-start'
                    }}
                    onMouseOver={e => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.transform = 'scale(0.98)'; }}
                    onMouseOut={e => { e.currentTarget.style.background = '#171717'; e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup Overlay */}
      {selectedProject && (
        <div className="portfolio-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }} onClick={closeModal}>
          <div className="portfolio-modal-content" style={{ background: 'white', borderRadius: '24px', maxWidth: '800px', width: '100%', overflow: 'hidden', position: 'relative', padding: '40px' }} onClick={e => e.stopPropagation()}>
            <button className="portfolio-modal-close" onClick={closeModal} aria-label="Close project details" style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: '#f5f5f5', cursor: 'pointer', padding: '8px', borderRadius: '50%' }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="portfolio-modal-img-area" style={{ marginBottom: '24px', borderRadius: '16px', overflow: 'hidden' }}>
              <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div className="portfolio-modal-body">
              <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px', display: 'inline-block' }}>
                {selectedProject.category}
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#171717', marginBottom: '16px', lineHeight: '1.2' }}>
                {selectedProject.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#525252', lineHeight: '1.6', marginBottom: '24px' }}>
                {selectedProject.description}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {selectedProject.tools && selectedProject.tools.map((t, i) => (
                  <span key={i} style={{ 
                    padding: '6px 12px', 
                    background: '#f5f5f5', 
                    border: '1px solid #e5e5e5', 
                    borderRadius: '8px', 
                    fontSize: '0.75rem', 
                    color: '#525252', 
                    fontWeight: 500 
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {selectedProject.link && (
                <a href={selectedProject.link} target="_blank" rel="noreferrer" 
                   style={{ 
                     display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '14px',
                     background: '#10b981', color: 'white', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s', cursor: 'pointer',
                     boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)', alignSelf: 'flex-start'
                   }}
                   onMouseOver={e => { e.currentTarget.style.background = '#059669'; e.currentTarget.style.transform = 'scale(0.98)'; }}
                   onMouseOut={e => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  {selectedProject.type === 'automation' ? 'View GitHub Code' : 'View Live Website'}
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
