import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const testimonials = [
  {
    id: 1,
    heading: 'Working with VHX has been one of the smoothest technical collaborations we have ever had',
    name: 'Suresh Kumar',
    designation: 'Managing Director, Forge Industrial Technologies',
    avatar: (
      <svg viewBox="0 0 80 80" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="40" fill="#eff6ff" />
        <circle cx="40" cy="32" r="18" fill="#fed7aa" stroke="#0a0a0a" strokeWidth="2.5" />
        {/* Hair */}
        <path d="M22 28 C23 14, 35 12, 45 13 C55 14, 58 20, 58 28 C54 22, 44 20, 36 22 C28 24, 23 28, 22 28 Z" fill="#0a0a0a" />
        {/* Glasses */}
        <rect x="28" y="28" width="10" height="8" rx="2" stroke="#2563eb" strokeWidth="2" fill="rgba(37,99,235,0.15)" />
        <rect x="42" y="28" width="10" height="8" rx="2" stroke="#2563eb" strokeWidth="2" fill="rgba(37,99,235,0.15)" />
        <line x1="38" y1="32" x2="42" y2="32" stroke="#2563eb" strokeWidth="2" />
        {/* Smile */}
        <path d="M35 41 Q40 45 45 41" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
        {/* Suit & Tie */}
        <path d="M14 74 C14 56, 26 50, 40 50 C54 50, 66 56, 66 74" fill="#1e293b" stroke="#0a0a0a" strokeWidth="2.5" />
        <polygon points="40,50 36,65 40,75 44,65" fill="#2563eb" />
      </svg>
    ),
    para: "They're exceptionally sharp, responsive, and built our entire industrial dashboard with surgical precision. Tight deadlines and complex database requirements were handled effortlessly. Highly recommend working with them!"
  },
  {
    id: 2,
    heading: 'VHX truly brought our community web platform to life with incredible speed and polish',
    name: 'Dr. K. Vignesh',
    designation: 'President, Rotaract Club Salem Midtown',
    avatar: (
      <svg viewBox="0 0 80 80" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="40" fill="#e0f2fe" />
        <circle cx="40" cy="32" r="18" fill="#fde68a" stroke="#0a0a0a" strokeWidth="2.5" />
        {/* Hair */}
        <path d="M22 26 C24 13, 38 12, 48 14 C58 16, 58 24, 57 28 C52 23, 42 20, 32 23 C26 25, 23 26, 22 26 Z" fill="#1e293b" />
        {/* Eyes & Smile */}
        <circle cx="33" cy="32" r="2.2" fill="#0a0a0a" />
        <circle cx="47" cy="32" r="2.2" fill="#0a0a0a" />
        <path d="M36 41 Q40 46 44 41" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
        {/* Blazer & Shirt */}
        <path d="M15 74 C15 56, 27 50, 40 50 C53 50, 65 56, 65 74" fill="#0f172a" stroke="#0a0a0a" strokeWidth="2.5" />
        <polygon points="34,50 40,64 46,50" fill="#00b4d8" />
        <circle cx="30" cy="62" r="3" fill="#38bdf8" />
      </svg>
    ),
    para: 'Both Vinodhan and Hari Dev are true professionals with unmatched creative technical talent. They took our concept, optimized every single mobile interaction, and delivered well beyond our expectations.'
  },
  {
    id: 3,
    heading: 'The n8n food ordering automation saves our operations 4+ hours every single day',
    name: 'Pravin R.',
    designation: 'Operations Lead, Cloud Kitchens',
    avatar: (
      <svg viewBox="0 0 80 80" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="40" fill="#ecfdf5" />
        <circle cx="40" cy="32" r="18" fill="#fed7aa" stroke="#0a0a0a" strokeWidth="2.5" />
        {/* Modern styled hair */}
        <path d="M22 24 C26 12, 44 10, 52 14 C59 17, 58 26, 56 30 C50 24, 40 22, 30 25 C25 27, 23 28, 22 24 Z" fill="#0a0a0a" />
        {/* Eyes & Smile */}
        <circle cx="34" cy="32" r="2.2" fill="#0a0a0a" />
        <circle cx="46" cy="32" r="2.2" fill="#0a0a0a" />
        <path d="M36 41 Q40 45 44 41" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
        {/* Smart Casual Hoodie / Operations Jacket */}
        <path d="M15 74 C15 56, 26 50, 40 50 C54 50, 65 56, 65 74" fill="#047857" stroke="#0a0a0a" strokeWidth="2.5" />
        <path d="M33 50 L40 62 L47 50" stroke="#a7f3d0" strokeWidth="2.5" fill="none" />
      </svg>
    ),
    para: 'Instant Telegram bot notifications, automatic Google Sheets sync, zero order drops. Our staff and customers love it. Getting complex automations done with VHX is effortless.'
  }
];

export default function TestimonialsStack() {
  const bodyBgRef = useRef(null);
  const cardsRef = useRef([]);
  const arrowRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimatingRef = useRef(false);

  const anglePalette = [-6.5, 5.5, -4.8];

  useEffect(() => {
    const bodyBg = bodyBgRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const arrow = arrowRef.current;
    if (!bodyBg || !cards.length) return;

    // Apply Initial Stack Positions
    cards.forEach((card, i) => {
      const order = (i - currentIndex + testimonials.length) % testimonials.length;
      card.style.zIndex = testimonials.length - order;
      gsap.set(card, {
        x: 0,
        y: 0,
        rotation: i === currentIndex ? 0 : anglePalette[i % anglePalette.length],
        scale: 1,
        force3D: true,
        transformOrigin: 'center center'
      });
    });

    // Custom Navigation Cursor Arrow
    const isTouch = matchMedia('(pointer: coarse)').matches || window.innerWidth < 992;
    if (arrow && !isTouch) {
      gsap.set(arrow, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });

      const setArrowX = gsap.quickTo(arrow, 'x', { duration: 0.15, ease: 'power2.out' });
      const setArrowY = gsap.quickTo(arrow, 'y', { duration: 0.15, ease: 'power2.out' });
      let currentDir = 0;

      const onEnter = (e) => {
        const rect = bodyBg.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        gsap.set(arrow, { x: mx, y: my });
        currentDir = my < rect.height / 2 ? 0 : 180;
        gsap.set(arrow, { rotation: currentDir });
        gsap.to(arrow, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' });
      };

      const onMove = (e) => {
        const rect = bodyBg.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        setArrowX(mx);
        setArrowY(my);

        const targetDir = my < rect.height / 2 ? 0 : 180;
        if (currentDir !== targetDir) {
          currentDir = targetDir;
          gsap.to(arrow, { rotation: targetDir, duration: 0.25, ease: 'power2.out' });
        }
      };

      const onLeave = () => {
        gsap.to(arrow, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.in' });
      };

      bodyBg.addEventListener('mouseenter', onEnter);
      bodyBg.addEventListener('mousemove', onMove);
      bodyBg.addEventListener('mouseleave', onLeave);

      return () => {
        bodyBg.removeEventListener('mouseenter', onEnter);
        bodyBg.removeEventListener('mousemove', onMove);
        bodyBg.removeEventListener('mouseleave', onLeave);
      };
    }
  }, [currentIndex]);

  const goToNextCard = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const cards = cardsRef.current.filter(Boolean);
    const total = testimonials.length;
    const outgoing = cards[currentIndex];
    const nextIdx = (currentIndex + 1) % total;
    const incoming = cards[nextIdx];

    gsap.to(incoming, { rotation: 0, duration: 0.35, ease: 'power2.out' });

    gsap.to(outgoing, {
      yPercent: -135,
      rotation: anglePalette[currentIndex % anglePalette.length] + 8,
      duration: 0.38,
      ease: 'power2.inOut',
      onComplete: () => {
        setCurrentIndex(nextIdx);
        gsap.set(outgoing, { yPercent: 0, rotation: anglePalette[currentIndex % anglePalette.length] });
        isAnimatingRef.current = false;
      }
    });
  };

  const goToPrevCard = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const cards = cardsRef.current.filter(Boolean);
    const total = testimonials.length;
    const prevIdx = (currentIndex - 1 + total) % total;
    const incoming = cards[prevIdx];

    incoming.style.zIndex = total + 1;

    gsap.fromTo(
      incoming,
      { yPercent: -135, rotation: 8 },
      {
        yPercent: 0,
        rotation: 0,
        duration: 0.45,
        ease: 'back.out(1.15)',
        onComplete: () => {
          setCurrentIndex(prevIdx);
          isAnimatingRef.current = false;
        }
      }
    );
  };

  const handleDeckClick = (e) => {
    const rect = bodyBgRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    if (clickY < rect.height / 2) {
      goToNextCard();
    } else {
      goToPrevCard();
    }
  };

  return (
    <section className="section-testimonials" id="testimonials">
      <div className="section-testimonials-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3.5em' }}>
          <div className="section-about-text">CLIENT VOICES</div>
          <div className="section-heading-wrapper">
            <h2 className="section-heading">APPARENTLY, THEY LIKE US</h2>
            <h2 className="section-heading accent-offset" aria-hidden="true">
              APPARENTLY, THEY LIKE US
            </h2>
          </div>
        </div>

        <div className="section-testimonials-body">
          <div ref={bodyBgRef} className="testimonials-body-bg" onClick={handleDeckClick}>
            <div className="testimonial-list-wrapper">
              <div className="testimonial-list">
                {testimonials.map((item, idx) => (
                  <div
                    key={item.id}
                    ref={(el) => (cardsRef.current[idx] = el)}
                    className="testimonial-item"
                  >
                    <div className="testimonial-card">
                      <div className="testimonial-heading">"{item.heading}"</div>
                      <div className="testimonial-card-btm">
                        <div className="testimonial-card-pfp">
                          <div className="testimonial-img-wrap" style={{ overflow: 'hidden', padding: 0 }}>
                            {item.avatar}
                          </div>
                          <div>
                            <div className="testimonial-pfp-name">{item.name}</div>
                            <div className="testimonial-pfp-designation">{item.designation}</div>
                          </div>
                        </div>
                        <p className="testimonial-card-para">{item.para}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Sidebar Ticks */}
            <div className="side-bar">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className="sidebar-tick"
                  style={{
                    width: i === currentIndex ? 34 : 14,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: i === currentIndex ? 'var(--accent)' : 'rgba(255, 255, 255, 0.3)'
                  }}
                />
              ))}
            </div>

            {/* Custom Interactive Floating Cursor Arrow */}
            <div ref={arrowRef} className="nav-arrow">
              <svg width="16" height="18" viewBox="0 0 15 18" fill="none">
                <path
                  d="M7.17 16.17L7.17 1.17M1.17 6.8L7.17 1.17L13.17 6.8"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
