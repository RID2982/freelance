import React, { useState } from 'react';
import telegramMockup from '../assets/telegram_food_automation.png';

const projects = [
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
  },
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
  }
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.type === activeTab);

  return (
    <section id="portfolio" style={{ marginBottom: '40px' }}>
      <div className="container">
        <div className="card-elevated reveal">
          {/* Header Row */}
          <div className="section-header-row" style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '24px', marginBottom: '32px', display: 'flex', alignItems: 'baseline', gap: '24px', flexWrap: 'wrap' }}>
            <h2 className="section-title" style={{ fontSize: '4.5rem', fontWeight: 500, letterSpacing: '-0.04em' }}>Portfolio.</h2>
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
                onMouseOver={e => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.borderColor = '#10b981';
                    e.currentTarget.style.color = '#10b981';
                  }
                }}
                onMouseOut={e => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.borderColor = '#e5e5e5';
                    e.currentTarget.style.color = '#525252';
                  }
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
                <div className="portfolio-img-area" style={{ height: '320px', borderRadius: '16px', border: '1px solid #f0f0f0', marginBottom: '20px', overflow: 'hidden', position: 'relative' }}>
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} onMouseOver={e=>e.currentTarget.style.transform='scale(1.05)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'} />
                    </a>
                  ) : (
                    <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
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
                    pointerEvents: 'none'
                  }}>
                    {p.category}
                  </div>
                </div>
                <div className="portfolio-body-new" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#171717', marginBottom: '8px', textAlign: 'left' }}>
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noreferrer" style={{ color: '#171717', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.currentTarget.style.color='#10b981'} onMouseOut={e=>e.currentTarget.style.color='#171717'}>
                        {p.title} <span style={{ fontSize: '0.85rem', color: '#10b981', verticalAlign: 'middle', marginLeft: '4px' }}>↗</span>
                      </a>
                    ) : p.title}
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

                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" 
                       style={{ 
                         marginTop: 'auto', display: 'inline-flex', justifyContent: 'center', padding: '10px 16px', borderRadius: '10px',
                         background: '#171717', color: 'white', fontWeight: 600, fontSize: '0.8rem', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s', cursor: 'pointer',
                         alignSelf: 'flex-start'
                       }}
                       onMouseOver={e => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.transform = 'scale(0.98)'; }}
                       onMouseOut={e => { e.currentTarget.style.background = '#171717'; e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                      {p.type === 'automation' ? 'View GitHub Code →' : 'View Live Website →'}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
