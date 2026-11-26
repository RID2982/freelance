import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navbar({ onOpenContact, currentPage = 'home', onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const iconTimelineRef = useRef(null);
  const navTimelineRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const orangePathRef = useRef(null);
  const crossPathRef = useRef(null);
  const hamNavbarRef = useRef(null);
  const linksContainerRef = useRef(null);

  const handleNavClick = (page, sectionId = null) => {
    closeMenu();
    if (onNavigate) {
      onNavigate(page, sectionId);
    }
  };

  // Setup Morphing Toggle & Mobile Menu Animation
  useEffect(() => {
    const orangePath = orangePathRef.current;
    const crossPath = crossPathRef.current;
    const toggleBtn = toggleBtnRef.current;

    if (orangePath && crossPath) {
      const orangeTotalLen = orangePath.getTotalLength ? orangePath.getTotalLength() : 120;
      const crossTotalLen = crossPath.getTotalLength ? crossPath.getTotalLength() : 20;
      const horseshoeLen = orangeTotalLen * 0.44;
      const stemLen = 20.0;
      const finalOffset = -(orangeTotalLen - stemLen);

      // Initial SVG state
      orangePath.style.strokeDasharray = `${horseshoeLen} ${orangeTotalLen}`;
      orangePath.style.strokeDashoffset = '0';
      crossPath.style.strokeDasharray = `${crossTotalLen} ${crossTotalLen}`;
      crossPath.style.strokeDashoffset = `${crossTotalLen}`;
      gsap.set(crossPath, { strokeWidth: 0 });

      const iconTl = gsap.timeline({ paused: true });
      const dashObj = { len: horseshoeLen, offset: 0 };

      iconTl
        .to(
          dashObj,
          {
            len: stemLen,
            offset: finalOffset,
            duration: 0.85,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (orangePath) {
                orangePath.style.strokeDasharray = `${dashObj.len} ${orangeTotalLen}`;
                orangePath.style.strokeDashoffset = `${dashObj.offset}`;
              }
            }
          },
          0
        )
        .to(
          crossPath,
          {
            strokeWidth: 4,
            duration: 0.12,
            ease: 'back.out(2)'
          },
          0.1
        )
        .to(
          crossPath,
          {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: 'power2.out'
          },
          0.2
        )
        .to(
          toggleBtn?.querySelector('svg'),
          {
            rotation: 45,
            duration: 0.85,
            ease: 'power3.inOut'
          },
          0
        );

      iconTimelineRef.current = iconTl;
    }

    // Navbar Hover Buttons (SVG brush stroke drawing on hover)
    const navButtons = document.querySelectorAll('.navbar-link-btn');
    navButtons.forEach((btn) => {
      const path = btn.querySelector('.stroke-fill path');
      if (!path) return;

      const targetStrokeWidth = parseFloat(path.getAttribute('stroke-width')) || 24;
      const totalLen = path.getTotalLength ? path.getTotalLength() : 300;
      path.style.strokeDasharray = `${totalLen}`;
      path.style.strokeDashoffset = `${totalLen}`;
      gsap.set(path, { strokeWidth: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power1.inOut' } });
      tl.to(path, {
        strokeDashoffset: 0,
        strokeWidth: targetStrokeWidth,
        duration: 0.45
      });

      const onEnter = () => tl.timeScale(1).play();
      const onLeave = () => tl.timeScale(1.4).reverse();

      btn.addEventListener('mouseenter', onEnter);
      btn.addEventListener('mouseleave', onLeave);
    });

    // Magnetic CTA Button with 10x expanding circle & looping arrow bounce
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach((btn) => {
      const text = btn.querySelector('.cta-text');
      const arrow = btn.querySelector('.cta-btn-arrow');
      const fillHover = btn.querySelector('.cta-btn-fill-hover');
      let arrowLoop = null;

      const onEnter = () => {
        if (fillHover) {
          gsap.to(fillHover, { scale: 18, duration: 0.55, ease: 'power2.out', overwrite: 'auto' });
        }
        if (arrow) {
          gsap.set(arrow, { transformOrigin: 'center center' });
          if (arrowLoop) arrowLoop.kill();
          arrowLoop = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
          arrowLoop
            .to(arrow, { rotation: -25, duration: 0.22, ease: 'power2.out' })
            .to(arrow, { rotation: 0, duration: 0.4, ease: 'back.out(2.5)' });
        }
      };

      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const currentX = gsap.getProperty(btn, 'x') || 0;
        const currentY = gsap.getProperty(btn, 'y') || 0;
        const originCenterX = rect.left - currentX + rect.width / 2;
        const originCenterY = rect.top - currentY + rect.height / 2;
        const deltaX = e.clientX - originCenterX;
        const deltaY = e.clientY - originCenterY;

        gsap.to(btn, { x: deltaX * 0.35, y: deltaY * 0.35, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        if (text && arrow) {
          gsap.to([text, arrow], { x: deltaX * 0.15, y: deltaY * 0.15, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        }
      };

      const onLeave = () => {
        if (arrowLoop) {
          arrowLoop.kill();
          arrowLoop = null;
        }
        if (arrow) {
          gsap.to(arrow, { rotation: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        }
        gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1.1, 0.4)', overwrite: 'auto' });
        if (text && arrow) {
          gsap.to([text, arrow], { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1.1, 0.4)', overwrite: 'auto' });
        }
        if (fillHover) {
          gsap.to(fillHover, { scale: 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
        }
      };

      btn.addEventListener('mouseenter', onEnter);
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
    });
  }, []);

  // Menu Open/Close Logic
  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    if (iconTimelineRef.current) iconTimelineRef.current.play();

    const hamNavbar = hamNavbarRef.current;
    const links = linksContainerRef.current ? Array.from(linksContainerRef.current.children) : [];

    if (hamNavbar) {
      hamNavbar.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      if (navTimelineRef.current) navTimelineRef.current.kill();
      const tl = gsap.timeline();
      tl.fromTo(hamNavbar, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0);

      links.forEach((item, index) => {
        const randomTilt = gsap.utils.random(-8, 8);
        tl.fromTo(
          item,
          { opacity: 0, x: -30, y: 40, scale: 0.6, rotation: randomTilt },
          { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(2.2)' },
          0.12 + index * 0.08
        );
      });
      navTimelineRef.current = tl;
    }
  };

  const closeMenu = () => {
    if (iconTimelineRef.current) iconTimelineRef.current.reverse();

    const hamNavbar = hamNavbarRef.current;
    const links = linksContainerRef.current ? Array.from(linksContainerRef.current.children) : [];

    if (hamNavbar) {
      if (navTimelineRef.current) navTimelineRef.current.kill();
      const tl = gsap.timeline({
        onComplete: () => {
          hamNavbar.classList.remove('is-open');
          document.body.style.overflow = '';
          setIsMenuOpen(false);
        }
      });

      if (links.length) {
        tl.to(links, { opacity: 0, y: 20, scale: 0.8, duration: 0.2, stagger: 0.03, ease: 'power2.in' }, 0);
      }
      tl.to(hamNavbar, { opacity: 0, duration: 0.25, ease: 'power2.inOut' }, 0.1);
      navTimelineRef.current = tl;
    } else {
      setIsMenuOpen(false);
    }
  };

  const scrollToSection = (id) => {
    closeMenu();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="header">
        <nav className="navbar-wrap">
          {/* Left Navigation Links with Hover Stroke Brushes (Two26 Style) */}
          <div className="navbar-links">
            <a
              href="/work"
              className={`navbar-link-btn ${currentPage === 'work' ? 'w--current' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('work');
              }}
            >
              <span className="navlink-text" style={{ color: currentPage === 'work' ? 'var(--accent)' : 'inherit' }}>
                Work
              </span>
              <span className="stroke-fill">
                <svg viewBox="0 0 75 36" fill="none" preserveAspectRatio="none">
                  <path
                    d="M0 21.5C0 21.5 6.5 2.8 15.5 4.4C25.7 6.3 5.6 21.3 12.5 29.2C22.9 41.1 29.4 -7.9 42.5 1.1C53.3 8.6 27.2 26.8 37.7 34.7C50.8 44.7 58.1 -7.9 67.3 5.6C72.5 13.2 58 30.4 67.3 30.4C70.8 30.4 75 19.8 75 19.8"
                    stroke="currentColor"
                    strokeWidth="24"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </a>

            <a
              href="/products"
              className={`navbar-link-btn ${currentPage === 'products' ? 'w--current' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('products');
              }}
            >
              <span className="navlink-text" style={{ color: currentPage === 'products' ? 'var(--accent)' : 'inherit' }}>
                Products
              </span>
              <span className="stroke-fill">
                <svg viewBox="0 0 75 36" fill="none" preserveAspectRatio="none">
                  <path
                    d="M0 21.5C0 21.5 6.5 2.8 15.5 4.4C25.7 6.3 5.6 21.3 12.5 29.2C22.9 41.1 29.4 -7.9 42.5 1.1C53.3 8.6 27.2 26.8 37.7 34.7C50.8 44.7 58.1 -7.9 67.3 5.6C72.5 13.2 58 30.4 67.3 30.4C70.8 30.4 75 19.8 75 19.8"
                    stroke="currentColor"
                    strokeWidth="24"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </a>

            <a
              href="/services"
              className={`navbar-link-btn ${currentPage === 'services' ? 'w--current' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('services');
              }}
            >
              <span className="navlink-text" style={{ color: currentPage === 'services' ? 'var(--accent)' : 'inherit' }}>
                Services
              </span>
              <span className="stroke-fill">
                <svg viewBox="0 0 75 36" fill="none" preserveAspectRatio="none">
                  <path
                    d="M0 21.5C0 21.5 6.5 2.8 15.5 4.4C25.7 6.3 5.6 21.3 12.5 29.2C22.9 41.1 29.4 -7.9 42.5 1.1C53.3 8.6 27.2 26.8 37.7 34.7C50.8 44.7 58.1 -7.9 67.3 5.6C72.5 13.2 58 30.4 67.3 30.4C70.8 30.4 75 19.8 75 19.8"
                    stroke="currentColor"
                    strokeWidth="24"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </a>

            <a
              href="/about"
              className={`navbar-link-btn ${currentPage === 'about' ? 'w--current' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
            >
              <span className="navlink-text" style={{ color: currentPage === 'about' ? 'var(--accent)' : 'inherit' }}>
                About us
              </span>
              <span className="stroke-fill">
                <svg viewBox="0 0 75 36" fill="none" preserveAspectRatio="none">
                  <path
                    d="M0 21.5C0 21.5 6.5 2.8 15.5 4.4C25.7 6.3 5.6 21.3 12.5 29.2C22.9 41.1 29.4 -7.9 42.5 1.1C53.3 8.6 27.2 26.8 37.7 34.7C50.8 44.7 58.1 -7.9 67.3 5.6C72.5 13.2 58 30.4 67.3 30.4C70.8 30.4 75 19.8 75 19.8"
                    stroke="currentColor"
                    strokeWidth="24"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </a>
          </div>

          {/* Center Logo with Official VHX Brand Mark */}
          <a
            href="/"
            className={`navbar-logo ${currentPage === 'home' ? 'w--current' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6em',
              backgroundColor: '#0A0B0E',
              padding: '0.35em 0.9em',
              borderRadius: '999px'
            }}
          >
            <img src="/VHX_logo_4K.svg" alt="VHX" style={{ height: '24px', width: 'auto', objectFit: 'contain' }} />
          </a>

          {/* Right Controls */}
          <div className="navbar-right">
            <div className="navbar-timing">Mon–Sat 09:00 – 18:00 IST</div>

            {/* Magnetic CTA Button */}
            <div className="cta-wrap">
              <button
                className="cta-btn"
                onClick={() => {
                  if (onOpenContact) onOpenContact();
                }}
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

            {/* Two26 Morphing Hamburger-to-Cross Toggle Button */}
            <div
              ref={toggleBtnRef}
              className="two26-nav-toggle-btn"
              role="button"
              aria-label="Toggle Navigation"
              tabIndex="0"
              onClick={toggleMenu}
            >
              <svg className="two26-toggle-svg" viewBox="-2 6.52 36 36" fill="none">
                <path
                  ref={orangePathRef}
                  className="orange-path"
                  d="M7.01247 34.0204C7.01247 34.0204 10.1314 34.0204 20.8246 34.0204C31.5179 34.0204 31.2364 16.0204 20.8246 16.0205C10.4128 16.0205 9.00975 16.0196 9.00975 16.0196C5.0415 16.0196 2 12.8812 2 9.00979C2 5.13839 5.13839 2 9.00979 2C12.8679 2.01076 15.9893 5.1363 16 8.98937V34.5196"
                  stroke="var(--accent)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  ref={crossPathRef}
                  className="cross-path"
                  d="M6 24.52H26"
                  stroke="var(--accent)"
                  strokeWidth="0"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      <div ref={hamNavbarRef} className="ham-navbar">
        <div ref={linksContainerRef} className="hamburger-links">
          <a
            href="/"
            className={`navbar-link-btn ${currentPage === 'home' ? 'w--current' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            Home
          </a>
          <a
            href="/work"
            className={`navbar-link-btn ${currentPage === 'work' ? 'w--current' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('work');
            }}
          >
            Work
          </a>
          <a
            href="/products"
            className={`navbar-link-btn ${currentPage === 'products' ? 'w--current' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('products');
            }}
          >
            Products
          </a>
          <a
            href="/services"
            className={`navbar-link-btn ${currentPage === 'services' ? 'w--current' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('services');
            }}
          >
            Services
          </a>
          <a
            href="/about"
            className={`navbar-link-btn ${currentPage === 'about' ? 'w--current' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about');
            }}
          >
            About us
          </a>

          <div style={{ marginTop: '1em' }}>
            <button
              className="cta-btn"
              style={{ fontSize: '1.2em', padding: '0.8em 2em' }}
              onClick={() => {
                closeMenu();
                if (onOpenContact) onOpenContact();
              }}
            >
              <span className="cta-text">Let's Talk</span>
              <span className="cta-btn-arrow">
                <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
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
        </div>
      </div>
    </>
  );
}
