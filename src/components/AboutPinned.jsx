import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPinned({ onNavigate }) {
  const sectionRef = useRef(null);
  const paraRef = useRef(null);
  const pill1Ref = useRef(null);
  const pill2Ref = useRef(null);
  const pill3Ref = useRef(null);

  const fullText =
    "We believe creative work needs focus. That's why we keep our team tight and our involvement high, so every project gets our full attention. We build brands from scratch, automate what's slow, and engineer digital platforms that look suspiciously good.";

  useEffect(() => {
    const section = sectionRef.current;
    const para = paraRef.current;
    if (!section || !para) return;

    const ctx = gsap.context(() => {
      const chars = para.querySelectorAll('.about-char');
      const pills = [pill1Ref.current, pill2Ref.current, pill3Ref.current].filter(Boolean);

      // Initial character styling: faint readable unread state
      gsap.set(chars, {
        color: 'rgba(37, 99, 235, 0.28)',
        scale: 1,
        rotation: 0,
        display: 'inline-block',
        transformOrigin: 'center center',
        willChange: 'transform, color, text-shadow'
      });

      pills.forEach((pill) => {
        gsap.set(pill, { opacity: 0, scale: 0.5, y: 25 });
      });

      const getPinDistance = () => {
        const w = window.innerWidth;
        if (w < 480) return 1150;
        if (w < 992) return 1550;
        return 2200;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getPinDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: window.innerWidth < 992 ? 0.6 : 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      const totalChars = chars.length;
      const letterAnimSpan = 85;

      chars.forEach((char, i) => {
        const startTime = (i / totalChars) * letterAnimSpan;

        // Stage 1: Active glowing illumination with Two26 bold stroke & subtle organic tilt
        tl.to(
          char,
          {
            color: 'var(--accent)',
            scale: 1.14,
            rotation: () => gsap.utils.random(-3.5, 3.5),
            textShadow: '0.8px 0.8px 0 var(--accent), -0.8px -0.8px 0 var(--accent), 0.8px -0.8px 0 var(--accent), -0.8px 0.8px 0 var(--accent), 0 0 14px var(--accent-glow)',
            duration: 3.2,
            ease: 'power1.out'
          },
          startTime
        );

        // Stage 2: Settle to crisp dark readable state
        tl.to(
          char,
          {
            color: '#0a0a0a',
            scale: 1,
            rotation: 0,
            textShadow: 'none',
            duration: 3.2,
            ease: 'power1.inOut'
          },
          startTime + 3.2
        );
      });

      // Pop-in pills at milestones matching Two26 exact rhythm
      if (pills[0]) {
        tl.to(pills[0], { opacity: 1, scale: 1, y: 0, duration: 4.5, ease: 'back.out(2.2)' }, 24);
      }
      if (pills[1]) {
        tl.to(pills[1], { opacity: 1, scale: 1, y: 0, duration: 4.5, ease: 'back.out(2.2)' }, 52);
      }
      if (pills[2]) {
        tl.to(pills[2], { opacity: 1, scale: 1, y: 0, duration: 4.5, ease: 'back.out(2.2)' }, 74);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-about" id="about">
      <div className="section-about-wrapper">
        <div className="about-pinned">
          <div className="about-text">A BIT ABOUT US</div>

          <p ref={paraRef} className="about-para">
            {fullText.split(' ').map((word, wIdx) => (
              <span key={wIdx} className="about-word" style={{ display: 'inline-block', marginRight: '0.28em' }}>
                {word.split('').map((c, cIdx) => (
                  <span key={cIdx} className="about-char">
                    {c}
                  </span>
                ))}
              </span>
            ))}
          </p>

          <div ref={pill1Ref} className="about-pill pill-one">
            <span className="about-pill-text">Professional overthinkers</span>
          </div>
          <div ref={pill2Ref} className="about-pill pill-two">
            <span className="about-pill-text">Nerding out on design</span>
          </div>
          <div ref={pill3Ref} className="about-pill pill-third">
            <span className="about-pill-text">Allergic to generic</span>
          </div>
        </div>
      </div>
    </section>
  );
}
