import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const faqData = [
  {
    q: 'What kind of projects does VHX take on?',
    a: 'Full-stack web applications, custom SaaS platforms, n8n workflow automations, AI agents, and mobile apps. We focus 100% on software engineering and intelligent automations that eliminate bottlenecks and scale.'
  },
  {
    q: 'How much does a website development project cost?',
    a: 'It depends on what we are building. Landing pages typically start at ₹6,000–₹8,000, while comprehensive full-stack web platforms start from ₹15,000. We price based on scope rather than pulling a mysterious number out of a hat.'
  },
  {
    q: 'How long does a typical build take?',
    a: 'Landing pages are usually delivered within 3 to 5 business days. Full multi-page web applications and complex automation pipelines take 7 to 14 days depending on third-party API integrations.'
  },
  {
    q: 'Why not use a page builder like WordPress or Wix?',
    a: 'Page builders are slow, heavy, vulnerable, and restrictive. We hand-code our web applications using React, Next.js, and Vite, resulting in instant sub-second page loads, unmatched SEO rankings, and complete freedom.'
  },
  {
    q: 'What is n8n workflow automation and how does it help?',
    a: 'n8n is a powerful workflow automation engine. We connect your website, Telegram bots, WhatsApp API, Google Sheets, CRM, and AI agents so leads, payments, and orders are processed automatically without manual human effort.'
  },
  {
    q: 'Do you work with clients outside Salem / India?',
    a: 'Absolutely. We are based in Salem, Tamil Nadu, but our high-speed internet travels remarkably well. We collaborate with clients across India, the US, UK, and worldwide.'
  },
  {
    q: 'Can you work with a brand or system that already exists?',
    a: 'Of course. Not everything needs to be burned to the ground and rebuilt from scratch. Sometimes a system just needs a fresh set of eyes, optimized code, and thoughtful architectural changes.'
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsRef = useRef([]);

  const getOpenWidth = () => {
    return window.innerWidth < 992 ? '85%' : '65%';
  };

  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      const qBlock = item.querySelector('.question-block');
      const aBlock = item.querySelector('.faq-block-btm');
      const logo = item.querySelector('.faq-logo');
      const answerText = item.querySelector('.faq-answer');

      if (qBlock) gsap.killTweensOf(qBlock);
      if (aBlock) gsap.killTweensOf(aBlock);
      if (logo) gsap.killTweensOf(logo);
      if (answerText) gsap.killTweensOf(answerText);

      if (index === activeIndex) {
        // Open active item
        gsap.to(qBlock, { width: getOpenWidth(), borderWidth: '1.5px', duration: 0.4, ease: 'power2.out' });
        if (aBlock) {
          gsap.set(aBlock, { display: 'flex', overflow: 'hidden' });
          gsap.fromTo(aBlock, { height: 0, scale: 0.92 }, { height: 'auto', scale: 1, duration: 0.45, ease: 'back.out(1.4)' });
        }
        if (logo) gsap.fromTo(logo, { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
        if (answerText) gsap.fromTo(answerText, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, delay: 0.1, ease: 'power2.out' });
      } else {
        // Close other items
        gsap.to(qBlock, { width: '100%', borderWidth: '0px', duration: 0.35, ease: 'power2.out' });
        if (answerText) gsap.to(answerText, { opacity: 0, duration: 0.18 });
        if (logo) gsap.to(logo, { scale: 0, duration: 0.18 });
        if (aBlock) {
          gsap.to(aBlock, {
            scale: 0.92,
            height: 0,
            duration: 0.3,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.set(aBlock, { display: 'none' });
            }
          });
        }
      }
    });
  }, [activeIndex]);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section-faq" id="faq">
      <div className="section-faq-wrapper">
        {/* Left Side: Header & Studio Art */}
        <div className="faq-left">
          <div className="section-about-text">FREQUENTLY ASKED QUESTIONS</div>
          <div className="section-heading-wrapper">
            <h2 className="section-heading" style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.8rem)' }}>
              THINGS YOU MIGHT ASK
            </h2>
            <h2 className="section-heading accent-offset" style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.8rem)' }} aria-hidden="true">
              THINGS YOU MIGHT ASK
            </h2>
          </div>

          <p style={{ marginTop: '1.2em', color: 'var(--ink-gray)', fontSize: '1.05em', lineHeight: 1.6 }}>
            Straightforward answers. No corporate jargon. Just what you need to know to make the right decision.
          </p>

          {/* Studio Mascot / Character Art SVG (Storyset & Two26 Style High-Fidelity Vector Cat) */}
          <div className="cat-svg">
            <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="catGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF4E8" />
                  <stop offset="100%" stopColor="#FFE4C4" />
                </linearGradient>
                <filter id="catShadow" x="-10%" y="-10%" width="120%" height="130%">
                  <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#F28C28" floodOpacity="0.16" />
                </filter>
              </defs>

              {/* Tech Pedestal / Laptop Pad */}
              <rect x="25" y="175" width="270" height="14" rx="7" fill="#0a0a0a" filter="url(#catShadow)" />
              <rect x="35" y="172" width="250" height="6" rx="3" fill="#F28C28" />

              {/* Cat Body */}
              <ellipse cx="160" cy="140" rx="65" ry="44" fill="url(#catGlow)" stroke="#0a0a0a" strokeWidth="3.5" />
              <path d="M125 150 C125 168, 140 178, 160 178 C180 178, 195 168, 195 150" fill="#ffffff" stroke="#0a0a0a" strokeWidth="2.5" />

              {/* Playful Curled Tail */}
              <path
                d="M215 150 C245 155, 275 140, 270 105 C265 80, 240 85, 245 105"
                stroke="#0a0a0a"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M215 150 C245 155, 275 140, 270 105 C265 80, 240 85, 245 105"
                stroke="#F28C28"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Cat Head */}
              <circle cx="160" cy="85" r="42" fill="url(#catGlow)" stroke="#0a0a0a" strokeWidth="3.5" />

              {/* Cat Ears */}
              <path d="M130 58 L112 18 C110 14, 116 12, 120 16 L148 48 Z" fill="#F28C28" stroke="#0a0a0a" strokeWidth="3.5" strokeLinejoin="round" />
              <polygon points="122,25 118,22 135,46" fill="#FFE4C4" />

              <path d="M190 58 L208 18 C210 14, 204 12, 200 16 L172 48 Z" fill="#F28C28" stroke="#0a0a0a" strokeWidth="3.5" strokeLinejoin="round" />
              <polygon points="198,25 202,22 185,46" fill="#FFE4C4" />

              {/* Expressive Eyes */}
              <ellipse cx="144" cy="82" rx="7.5" ry="9" fill="#0a0a0a" />
              <circle cx="146.5" cy="79.5" r="3" fill="#ffffff" />
              <circle cx="142.5" cy="84.5" r="1.5" fill="#F28C28" />

              <ellipse cx="176" cy="82" rx="7.5" ry="9" fill="#0a0a0a" />
              <circle cx="178.5" cy="79.5" r="3" fill="#ffffff" />
              <circle cx="174.5" cy="84.5" r="1.5" fill="#F28C28" />

              {/* Cute Pink Cheeks */}
              <ellipse cx="132" cy="94" rx="6" ry="3.5" fill="#f472b6" opacity="0.6" />
              <ellipse cx="188" cy="94" rx="6" ry="3.5" fill="#f472b6" opacity="0.6" />

              {/* Nose & Mouth */}
              <polygon points="160,92 156,88 164,88" fill="#ec4899" />
              <path d="M160 92 L160 98 M160 98 Q154 104 148 99 M160 98 Q166 104 172 99" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" />

              {/* Whiskers */}
              <line x1="124" y1="88" x2="94" y2="83" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
              <line x1="122" y1="94" x2="88" y2="95" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
              <line x1="124" y1="100" x2="96" y2="106" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />

              <line x1="196" y1="88" x2="226" y2="83" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
              <line x1="198" y1="94" x2="232" y2="95" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
              <line x1="196" y1="100" x2="224" y2="106" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />

              {/* Floating Storyset Query Bubble */}
              <g transform="translate(230, 25)">
                <circle cx="18" cy="18" r="18" fill="#12141A" stroke="#F28C28" strokeWidth="2" />
                <text x="18" y="24" textAnchor="middle" fill="#F28C28" fontSize="18" fontWeight="900" fontFamily="var(--font-heading)">?</text>
              </g>
              <circle cx="225" cy="58" r="4" fill="#FF7800" />
              <circle cx="218" cy="68" r="2.5" fill="#FFB347" />
            </svg>
          </div>
        </div>

        {/* Right Side: Interactive Two26 Accordion */}
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="faq-block"
            >
              <div
                className="question-block"
                onClick={() => toggleItem(index)}
              >
                <div className="faq-ques">{item.q}</div>
                <div style={{ transform: activeIndex === index ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease', fontSize: '1.4em', color: 'var(--accent)' }}>
                  +
                </div>
              </div>

              <div className="faq-block-btm">
                <div className="answer-block">
                  <p className="faq-answer">{item.a}</p>
                </div>

                <div className="faq-logo" style={{ color: '#0A0B0E' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.15em', color: '#0A0B0E' }}>VHX</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
