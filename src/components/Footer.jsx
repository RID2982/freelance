import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ onOpenContact, onNavigate }) {
  const footerRef = useRef(null);
  const footerSvgRef = useRef(null);
  const headingLinesRef = useRef([]);

  useEffect(() => {
    const footer = footerRef.current;
    const footerSvg = footerSvgRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // 1. Line-by-Line Heading Entrance with mask reveal
      const lines = headingLinesRef.current.filter(Boolean);
      if (lines.length) {
        gsap.set(lines, { y: '115%', opacity: 0 });
        gsap.to(lines, {
          y: '0%',
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          }
        });
      }

      // 2. Two26 Wolff Olins Signature 3D Standing / Pop-Up Elastic Stretch & Settle
      if (footerSvg) {
        // Starts flat/compressed anchored at bottom with 3D perspective fold
        gsap.set(footerSvg, {
          scaleY: 0.15,
          rotationX: 55,
          transformOrigin: 'bottom center',
          transformPerspective: 1000,
          willChange: 'transform',
          force3D: true,
        });

        let hasBounced = false;

        ScrollTrigger.create({
          trigger: footer,
          start: 'top bottom', // Starts when footer top enters the viewport
          end: 'bottom bottom', // Ends when reaching absolute page bottom
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const vel = Math.abs(self.getVelocity() || 0);
            const velStretch = Math.min(vel / 1500, 0.25); // Velocity-reactive stretch boost

            if (self.progress >= 0.88) {
              // Reached bottom: release into juicy Wolff Olins elastic spring bounce
              if (!hasBounced) {
                hasBounced = true;
                gsap.killTweensOf(footerSvg);
                gsap.to(footerSvg, {
                  scaleY: 1,
                  rotationX: 0,
                  duration: 1.4,
                  ease: 'elastic.out(1.2, 0.35)',
                  overwrite: 'auto',
                });
              }
            } else {
              hasBounced = false;
              // Standing up smoothly as user scrolls into footer
              const baseTarget = self.direction === 1
                ? 0.15 + self.progress * 1.15 + velStretch
                : 0.15 + self.progress * 0.95;

              const targetScaleY = Math.max(0.15, Math.min(baseTarget, 1.35));
              const targetRotateX = Math.max(0, 55 * (1 - self.progress * 1.1));

              gsap.to(footerSvg, {
                scaleY: targetScaleY,
                rotationX: targetRotateX,
                duration: 0.12,
                ease: 'power1.out',
                overwrite: 'auto',
              });
            }
          },
          onLeave: () => {
            if (!hasBounced) {
              hasBounced = true;
              gsap.killTweensOf(footerSvg);
              gsap.to(footerSvg, {
                scaleY: 1,
                rotationX: 0,
                duration: 1.4,
                ease: 'elastic.out(1.2, 0.35)',
                overwrite: 'auto',
              });
            }
          },
          onLeaveBack: () => {
            hasBounced = false;
            gsap.killTweensOf(footerSvg);
            gsap.to(footerSvg, {
              scaleY: 0.15,
              rotationX: 55,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          },
        });
      }

      // 3. Two26 Kinetic Character Hover on Footer Links
      const footerLinks = footer.querySelectorAll('.footer-link');
      footerLinks.forEach((link) => {
        const chars = link.querySelectorAll('.footer-link-char');
        if (!chars.length) return;

        const onEnter = () => {
          chars.forEach((char, idx) => {
            const randomTilt = (idx % 2 === 0 ? -1 : 1) * 6;
            gsap.to(char, {
              scale: 1.15,
              rotation: randomTilt,
              color: 'var(--accent)',
              duration: 0.35,
              delay: idx * 0.025,
              ease: 'back.out(1.8)',
              overwrite: 'auto',
              onComplete: () => {
                gsap.to(char, {
                  scale: 1,
                  rotation: 0,
                  duration: 0.4,
                  ease: 'power2.out',
                });
              }
            });
          });
        };

        const onLeave = () => {
          gsap.to(chars, {
            scale: 1,
            rotation: 0,
            color: '#ffffff',
            duration: 0.3,
            stagger: 0.01,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        link.addEventListener('mouseenter', onEnter);
        link.addEventListener('mouseleave', onLeave);
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const renderKineticLink = (text) => {
    return text.split('').map((c, i) => (
      <span key={i} className="footer-link-char">
        {c === ' ' ? '\u00A0' : c}
      </span>
    ));
  };

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-wrapper">
        <div className="footer-top">
          {/* Top Left */}
          <div className="footer-top-left">
            <h2 className="footer-heading">
              <span className="footer-heading-line-mask">
                <span ref={(el) => (headingLinesRef.current[0] = el)} className="footer-heading-line">
                  OKAY, THAT'S
                </span>
              </span>
              <span className="footer-heading-line-mask">
                <span ref={(el) => (headingLinesRef.current[1] = el)} className="footer-heading-line">
                  ENOUGH WEBSITE.
                </span>
              </span>
            </h2>

            <div style={{ marginTop: '2em' }}>
              <button
                className="cta-btn"
                style={{ fontSize: '1.05em', padding: '0.8em 2em' }}
                onClick={onOpenContact}
              >
                <span className="cta-text">Let's Talk</span>
                <span className="cta-btn-arrow">
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1.464 8.536L8.535 1.465M3.055 1.288L8.535 1.465L8.712 6.945"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="cta-btn-fill-hover"></span>
              </button>
            </div>

            {/* Direct Line: ZERO phone numbers as commanded by user */}
            <div className="footer-links-block" style={{ marginTop: '3em' }}>
              <div className="footer-link-header">Direct Inquiry</div>
              <a href="mailto:vinovb21@gmail.com?subject=Project%20Inquiry" className="footer-link">
                {renderKineticLink('vinovb21@gmail.com')}
              </a>
              <button
                onClick={onOpenContact}
                className="footer-link"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: 'var(--accent-cyan)',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {renderKineticLink('Start Studio Scope ↗')}
              </button>
            </div>
          </div>

          {/* Top Right */}
          <div className="footer-top-right">
            <div className="footer-top-right-top">
              <div className="footer-links-block">
                <div className="footer-link-header">Navigation</div>
                <a
                  href="/work"
                  className="footer-link"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('work');
                    }
                  }}
                >
                  {renderKineticLink('Work')}
                </a>
                <a
                  href="/#services"
                  className="footer-link"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('home', 'services');
                    }
                  }}
                >
                  {renderKineticLink('Services')}
                </a>
                <a
                  href="/about"
                  className="footer-link"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('about');
                    }
                  }}
                >
                  {renderKineticLink('About us')}
                </a>
                <a
                  href="/work#pricing"
                  className="footer-link"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('work', 'pricing');
                    }
                  }}
                >
                  {renderKineticLink('Pricing')}
                </a>
                <a
                  href="/#faq"
                  className="footer-link"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('home', 'faq');
                    }
                  }}
                >
                  {renderKineticLink('FAQ')}
                </a>
              </div>

              <div className="footer-links-block">
                <div className="footer-link-header">Social & Code</div>
                <a href="https://linkedin.com/company/sync-aura" target="_blank" rel="noreferrer" className="footer-link">
                  {renderKineticLink('LinkedIn')} ↗
                </a>
                <a href="https://github.com/vinodhan07" target="_blank" rel="noreferrer" className="footer-link">
                  {renderKineticLink('GitHub')} ↗
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-link">
                  {renderKineticLink('Instagram')} ↗
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2em', flexWrap: 'wrap', marginTop: '2em' }}>
              <div>
                <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.8em', marginBottom: '0.4em' }}>STUDIO LOCATION</div>
                <div style={{ color: '#ffffff', fontWeight: 600 }}>Salem, Tamil Nadu, India</div>
              </div>

              <div>
                <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.8em', marginBottom: '0.4em' }}>AVAILABILITY</div>
                <div style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>● Open for High-Impact Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Giant Wolff Olins Full Bleed Elastic Stretch Logo */}
        <div className="footer-btm">
          <div className="footer-rights-text" style={{ padding: '0 4vw 0.8rem' }}>
            © 2026 Sync Aura Studio. All rights reserved. Hand-coded with zero templates.
          </div>

          <div className="footer-logo-wrap">
            <svg
              ref={footerSvgRef}
              className="footer-svg-logo"
              viewBox="0 0 1920 260"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                transformOrigin: 'bottom center'
              }}
            >
              <text
                x="0"
                y="215"
                textLength="1920"
                lengthAdjust="spacingAndGlyphs"
                fontFamily="var(--font-heading)"
                fontSize="240"
                fontWeight="900"
                fill="#ffffff"
              >
                SYNC AURA
              </text>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
