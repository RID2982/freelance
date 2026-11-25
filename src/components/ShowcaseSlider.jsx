import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import telegramMockup from '../assets/telegram_food_automation.jpg';
import hrAutomation from '../assets/hr_automation.jpg';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 'forge',
    title: 'Forge Industrial Portal',
    cat: 'Full-Stack Platform',
    img: '/forge.png',
    accent: '#F28C28'
  },
  {
    id: 'rotaract',
    title: 'Rotaract Salem Club Platform',
    cat: 'High-Performance Web App',
    img: '/rotaract.png',
    accent: '#FF7800'
  },
  {
    id: 'telegram',
    title: 'Telegram Food Order Automation',
    cat: 'n8n & AI Agent Workflow',
    img: telegramMockup,
    accent: '#F28C28'
  },
  {
    id: 'hr',
    title: 'HR Recruitment Engine',
    cat: 'Autonomous Candidate Pipeline',
    img: hrAutomation,
    accent: '#FFB347'
  }
];

export default function ShowcaseSlider({ onNavigate }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const initialSlides = Array.from(track.querySelectorAll('.showcase-slide'));
    if (!initialSlides.length) return;

    const numInitial = initialSlides.length;

    // Clone slides to ensure infinite seamless wrap (at least 3 sets)
    const setsNeeded = 3;
    for (let s = 1; s < setsNeeded; s++) {
      initialSlides.forEach((slide) => {
        const clone = slide.cloneNode(true);
        clone.classList.add('is-marquee-clone');
        track.appendChild(clone);
      });
    }

    const allSlides = Array.from(track.querySelectorAll('.showcase-slide'));

    let setWidth = 0;
    const measureSetWidth = () => {
      if (allSlides.length > numInitial) {
        const first = allSlides[0];
        const clone = allSlides[numInitial];
        if (first && clone) {
          const dist = clone.offsetLeft - first.offsetLeft;
          if (dist > 0) {
            setWidth = dist;
            return;
          }
        }
      }
      setWidth = 420 * numInitial + 32 * numInitial;
    };

    measureSetWidth();
    window.addEventListener('resize', measureSetWidth);

    // Two26 Directional Velocity & Motion Physics
    let currentX = 0;
    let targetDirection = -1; // -1 = right-to-left
    let currentDirection = -1;
    let scrollVelocityBoost = 0;
    const BASE_SPEED = 1.35;

    // ScrollTrigger velocity listener
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const dir = self.direction === 1 ? -1 : 1;
        targetDirection = dir;
        const vel = Math.abs(self.getVelocity() || 0);
        scrollVelocityBoost = Math.min(vel / 200, 10) * dir;
      }
    });

    // Render loop with Center Proximity Scale (Two26 Signature)
    const tick = () => {
      currentDirection += (targetDirection - currentDirection) * 0.06;
      scrollVelocityBoost *= 0.92;

      const delta = BASE_SPEED * currentDirection + scrollVelocityBoost;
      currentX += delta;

      if (setWidth > 0) {
        while (currentX <= -setWidth) currentX += setWidth;
        while (currentX > 0) currentX -= setWidth;
      }

      gsap.set(track, { x: currentX, force3D: true });

      // Center proximity scale: 0.94 at center -> 1.0 at sides
      const wrapperRect = wrapper.getBoundingClientRect();
      const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;
      const halfWidth = wrapperRect.width * 0.45 || 400;

      allSlides.forEach((slide) => {
        const slideRect = slide.getBoundingClientRect();
        const slideCenter = slideRect.left + slideRect.width / 2;
        const dist = Math.abs(slideCenter - wrapperCenter);
        const normDist = Math.min(1, dist / halfWidth);
        const targetScale = 0.94 + 0.06 * normDist;
        gsap.set(slide, { scale: targetScale, transformOrigin: 'center center' });
      });
    };

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener('resize', measureSetWidth);
      gsap.ticker.remove(tick);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, []);

  return (
    <section
      className="section-slider-showcase"
      style={{
        position: 'relative',
        width: '100%',
        padding: '3em 0 4.5em',
        background: 'var(--bg-main)',
        overflow: 'hidden'
      }}
    >
      <div
        ref={wrapperRef}
        className="section-slider-wrapper"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          cursor: 'grab'
        }}
      >
        <div
          ref={trackRef}
          className="showcase-slider"
          style={{
            display: 'flex',
            gap: '2em',
            width: 'max-content',
            willChange: 'transform'
          }}
        >
          {slides.map((s, idx) => (
            <div
              key={idx}
              className="showcase-slide"
              style={{
                flexShrink: 0,
                width: 'clamp(340px, 32vw, 460px)',
                height: 'clamp(260px, 26vw, 360px)',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                background: '#0a0a0a',
                boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
                border: '1.5px solid rgba(0,0,0,0.08)',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = s.accent;
                e.currentTarget.style.boxShadow = `0 20px 50px ${s.accent}35`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)';
              }}
              onClick={() => onNavigate && onNavigate('work')}
            >
              <img
                src={s.img}
                alt={s.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0) 50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.5em'
                }}
              >
                <div style={{ fontSize: '0.75em', fontFamily: 'var(--font-mono)', fontWeight: 700, color: s.accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {s.cat}
                </div>
                <div style={{ fontSize: '1.15em', fontWeight: 800, color: '#ffffff', marginTop: '0.2em' }}>
                  {s.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
