import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ContactModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const transitionPathRef = useRef(null);
  const contentRef = useRef(null);
  const logoRef = useRef(null);
  const closeBtnRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    const modal = modalRef.current;
    const path = transitionPathRef.current;
    const content = contentRef.current;
    const logo = logoRef.current;
    const closeBtn = closeBtnRef.current;

    if (!modal) return;

    // Handle ESC key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (isOpen) {
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline();

      // Step 1: SVG Transition Wipe (0 to 1600px strokeWidth)
      if (path) {
        const totalLen = path.getTotalLength ? path.getTotalLength() : 3000;
        tl.fromTo(
          path,
          { strokeDashoffset: totalLen, strokeWidth: '0px' },
          { strokeDashoffset: 0, strokeWidth: '1600px', duration: 0.85, ease: 'power2.inOut' },
          0
        );
      }

      // Step 2: Navbar Logo & Close Button
      if (logo) {
        tl.fromTo(
          logo,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2.2)' },
          0.35
        );
      }

      if (closeBtn) {
        tl.fromTo(
          closeBtn,
          { scale: 0.4, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(2.2)' },
          0.4
        );
      }

      // Step 3: Content fade in
      if (content) {
        tl.fromTo(
          content,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          0.45
        );
      }

      // Step 4: Kinetic character pop on headings
      const headingChars = modal.querySelectorAll('.contact-heading-char');
      headingChars.forEach((char, idx) => {
        const randomTilt = gsap.utils.random(-6, 6);
        tl.fromTo(
          char,
          { opacity: 0, scale: 0.5, rotation: randomTilt },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(2)' },
          0.45 + idx * 0.015
        );
      });
    } else {
      // Close timeline
      if (modal.classList.contains('is-active')) {
        const closeTl = gsap.timeline({
          onComplete: () => {
            modal.classList.remove('is-active');
            document.body.style.overflow = '';
          }
        });

        closeTl.to(content, { opacity: 0, y: -15, duration: 0.25, ease: 'power2.in' }, 0);

        if (path) {
          const totalLen = path.getTotalLength ? path.getTotalLength() : 3000;
          closeTl.to(
            path,
            { strokeDashoffset: totalLen, strokeWidth: '0px', duration: 0.4, ease: 'power2.in' },
            0.05
          );
        }
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Kinetic hover for email links
  const handleEmailHover = (e) => {
    const chars = e.currentTarget.querySelectorAll('.contact-email-char');
    chars.forEach((char, idx) => {
      const randomTilt = gsap.utils.random(-8, 8);
      gsap.to(char, {
        scale: 1.15,
        rotation: randomTilt,
        duration: 0.35,
        delay: idx * 0.02,
        ease: 'back.out(2)',
        onComplete: () => {
          gsap.to(char, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' });
        }
      });
    });
  };

  const renderKineticText = (text, className = 'contact-heading-char') => {
    return text.split('').map((char, index) => (
      <span key={index} className={className}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div ref={modalRef} className="contact-page">
      {/* SVG Transition Layer */}
      <div className="contact-transition">
        <svg viewBox="0 0 998 901" fill="none" preserveAspectRatio="none">
          <path
            ref={transitionPathRef}
            d="M372.5 886C372.5 886 879.181 886 855 766.5C801.982 504.5 19.5 1042.52 19.5 646.5C19.5 316.5 952.535 583.56 978 318.5C1000 89.5 193.6 431.263 111 221C34.6544 26.6589 565 19 565 19"
            stroke="var(--accent)"
            strokeWidth="0"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Top Bar */}
      <div className="contact-navbar">
        <div ref={logoRef} className="navbar-logo-contact">
          <span>SYNC AURA</span>
          <span style={{ color: 'var(--accent)' }}>✦</span>
        </div>
        <button ref={closeBtnRef} className="close-btn" onClick={onClose} aria-label="Close Contact Modal">
          <svg width="12" height="12" viewBox="0 0 8 8" fill="none">
            <path d="M7 1L1 7M7 7L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>Close</span>
        </button>
      </div>

      {/* Content Grid */}
      <div ref={contentRef} className="contact-content">
        <div className="contact-left">
          <h2 className="contact-heading">
            <div>{renderKineticText('WANT TO')}</div>
            <div>{renderKineticText('START')}</div>
            <div style={{ color: 'var(--accent)' }}>{renderKineticText('A NEW PROJECT?')}</div>
          </h2>
          <p className="contact-para">or just drop in to say hello!</p>
        </div>

        <div className="contact-right">
          <div className="contact-email-wrap">
            <div className="email-heading">Client Inquiries &amp; Projects</div>
            <a
              href="mailto:vinovb21@gmail.com?subject=New%20Project%20Inquiry%20-%20Sync%20Aura"
              className="email-link"
              onMouseEnter={handleEmailHover}
            >
              {renderKineticText('vinovb21@gmail.com', 'contact-email-char')}
            </a>
          </div>

          <div className="contact-email-wrap">
            <div className="email-heading">Technical Architecture &amp; Automations</div>
            <a
              href="mailto:haridevvinothkumar@outlook.com?subject=Automation%20%26%20Engineering%20Inquiry"
              className="email-link"
              onMouseEnter={handleEmailHover}
            >
              {renderKineticText('haridevvinothkumar@outlook.com', 'contact-email-char')}
            </a>
          </div>

          <div className="contact-email-wrap">
            <div className="email-heading">Direct Inquiry &amp; Fast Response</div>
            <a
              href="https://wa.me/919566697301?text=Hi%20Vinodhan,%20I'm%20interested%20in%20working%20with%20Sync%20Aura!"
              target="_blank"
              rel="noreferrer"
              className="contact-whatsapp-btn"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Request WhatsApp Message ↗</span>
            </a>
          </div>

          <div className="contact-social-bar">
            <a href="https://linkedin.com/company/sync-aura" target="_blank" rel="noreferrer" className="contact-social">
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/vinodhan07" target="_blank" rel="noreferrer" className="contact-social">
              <span>GitHub</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="contact-social">
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: '1em', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.8em', position: 'relative', zIndex: 2 }}>
        Salem, Tamil Nadu, India • Available for Global Projects
      </div>
    </div>
  );
}
