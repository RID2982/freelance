import React from 'react';

const STACK_LOGOS = [
  {
    id: 'react',
    label: 'React',
    svg: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    )
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    svg: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm3.8 14.7L9.9 8.9v7.1H8.4V7.2h1.7l5.8 7.5V7.2h1.5v9.5h-1.6Z" />
      </svg>
    )
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M3 3h18v18H3V3Zm10.7 10.6h2.1v-1.3h-5.7v1.3h2.1V19h1.5v-5.4Zm5.6 1.7c0-1-.6-1.5-1.9-1.9l-.6-.2c-.6-.2-.9-.4-.9-.8s.3-.7.9-.7c.5 0 .9.2 1.2.6l1.1-.8c-.5-.7-1.3-1.1-2.3-1.1-1.4 0-2.4.8-2.4 2 0 1.1.7 1.7 1.9 2l.6.2c.7.2 1 .4 1 .9s-.4.8-1.1.8c-.7 0-1.2-.3-1.6-.9l-1.1.8c.5.9 1.4 1.4 2.7 1.4 1.6 0 2.5-.8 2.5-2.1Z" />
      </svg>
    )
  },
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    svg: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
        <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 1.9 1.4 1 1 2.1 2.1 4.6 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-1.9-1.4-1-1-2.1-2.1-4.6-2.1ZM7 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 1.9 1.4 1 1 2.1 2.1 4.6 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-1.9-1.4-1-1-2.1-2.1-4.6-2.1Z" />
      </svg>
    )
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    svg: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
        <path d="M9.5 14.5V9.5l5 5V9.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'python',
    label: 'Python',
    svg: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
        <path d="M11.9 2C8.4 2 8.7 3.5 8.7 3.5v1.6h3.3v.6H7.2S4.5 5.4 4.5 9s2.3 3.4 2.3 3.4h1.4v-1.7s-.1-2.3 2.3-2.3h3.9s2.2 0 2.2-2.1V3.8S16.9 2 11.9 2Zm-1.8 1.3a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4ZM12.1 22c3.5 0 3.2-1.5 3.2-1.5v-1.6H12v-.6h4.8s2.7.3 2.7-3.3-2.3-3.4-2.3-3.4h-1.4v1.7s.1 2.3-2.3 2.3H9.6s-2.2 0-2.2 2.1v2.5S7.1 22 12.1 22Zm1.8-1.3a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Z" />
      </svg>
    )
  },
  {
    id: 'postgres',
    label: 'PostgreSQL',
    svg: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
        <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
      </svg>
    )
  },
  {
    id: 'docker',
    label: 'Docker',
    svg: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
        <path d="M13 6h2.2v2.2H13V6Zm-3 0h2.2v2.2H10V6Zm-3 0h2.2v2.2H7V6Zm-3 3h2.2v2.2H4V9Zm3 0h2.2v2.2H7V9Zm3 0h2.2v2.2H10V9Zm3 0h2.2v2.2H13V9Zm-3-6h2.2v2.2H10V3Zm10.7 6.8c-.5-.4-1.6-.5-2.3-.3-.1-.8-.6-1.5-1.3-2l-.3-.2-.2.3c-.4.6-.5 1.5-.2 2.2.2.5.6.9 1 1.2H2.4l-.1.6c-.2 1.8.4 3.6 1.5 4.9 1.2 1.4 3 2.1 5.2 2.1 4.6 0 8.1-2.1 9.8-6.1.7 0 2.1 0 2.8-1.4.1-.1.3-.5.4-.7l-.3-.6Z" />
      </svg>
    )
  },
  {
    id: 'openai',
    label: 'OpenAI',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M12 2.5a4.5 4.5 0 0 1 4.2 2.9 4.5 4.5 0 0 1 3.3 6.2 4.5 4.5 0 0 1-1.9 6.8 4.5 4.5 0 0 1-5.6 3.1 4.5 4.5 0 0 1-6.2-2.9 4.5 4.5 0 0 1-3.3-6.2 4.5 4.5 0 0 1 1.9-6.8A4.5 4.5 0 0 1 12 2.5Z" />
        <polygon points="12 8 15.5 10 15.5 14 12 16 8.5 14 8.5 10" />
      </svg>
    )
  },
  {
    id: 'gemini',
    label: 'Gemini AI',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10Z" />
      </svg>
    )
  },
  {
    id: 'n8n',
    label: 'n8n Automation',
    svg: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="12" r="2.3" />
        <circle cx="12" cy="7" r="2.3" />
        <circle cx="12" cy="17" r="2.3" />
        <circle cx="19" cy="12" r="2.3" />
        <path d="M7.1 11l2.8-2.8M7.1 13l2.8 2.8M14.1 8.2l2.8 2.8M14.1 15.8l2.8-2.8" />
      </svg>
    )
  },
  {
    id: 'telegram',
    label: 'Telegram Bot API',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M20.7 3.7 2.8 10.6c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 10.6-6.7c.5-.3 1-.1.6.2l-8.6 7.8-.3 4.7c.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.7-1.2Z" />
      </svg>
    )
  }
];

export default function StackMarquee() {
  const trackItems = [...STACK_LOGOS, ...STACK_LOGOS];

  return (
    <div
      className="stack-section-wrap"
      style={{
        width: '100%',
        marginTop: '3.2em',
        padding: '1.5em 0 1em',
        overflow: 'visible',
        position: 'relative'
      }}
    >
      <div
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.82em',
          fontWeight: 800,
          letterSpacing: '0.22em',
          color: 'var(--ink-black)',
          textTransform: 'uppercase',
          marginBottom: '1em'
        }}
      >
        STACK
      </div>

      {/* Edge Fade Masks */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflowX: 'clip',
          overflowY: 'visible',
          paddingBlock: '1.5rem',
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
        }}
      >
        <div className="stack-marquee-track">
          {trackItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="stack-circle-badge"
              aria-label={item.label}
              title={item.label}
            >
              {item.svg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
