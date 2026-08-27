import React from 'react';

const slugs = [
  'react', 'vite', 'nodedotjs', 'supabase', 'adobephotoshop', 'canva', 'figma', 'adobeillustrator',
  'tailwindcss', 'amazonaws', 'vercel', 'cloudflare', 'docker',
  'n8n', 
];

export default function TechLogos() {
  const allSlugs = [...slugs, ...slugs, ...slugs];

  const getIconUrl = (slug) => {
    switch (slug) {
      case 'adobephotoshop':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg';
      case 'adobeillustrator':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg';
      case 'canva':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg';
      case 'amazonaws':
        return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg';
      default:
        return `https://cdn.simpleicons.org/${slug}/222222`;
    }
  };

  return (
    <div className="reveal" style={{ margin: '20px auto 60px', textAlign: 'center' }}>
      <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a3a3a3', marginBottom: '20px' }}>
        Tools &amp; technologies we work with
      </p>
      <div className="marquee-container" style={{
        overflow: 'hidden', display: 'flex', width: '100%', maxWidth: '900px', margin: '0 auto', position: 'relative',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
      }}>
      <div className="marquee-content" style={{
        display: 'flex', alignItems: 'center', gap: '60px',
        animation: 'scroll-left 25s linear infinite', whiteSpace: 'nowrap'
      }}>
        {allSlugs.map((slug, idx) => (
          <img 
            key={`${slug}-${idx}`} 
            src={getIconUrl(slug)} 
            alt={slug} 
            className="marquee-icon"
            style={{ width: 'auto', height: '28px', opacity: 0.5, transition: 'opacity 0.2s', filter: 'grayscale(100%)' }}
            onMouseOver={e => e.currentTarget.style.opacity = 0.9}
            onMouseOut={e => e.currentTarget.style.opacity = 0.5}
          />
        ))}
      </div>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.33% - 20px)); }
        }
      `}</style>
      </div>
    </div>
  );
}
