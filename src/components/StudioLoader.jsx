import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function StudioLoader({ onComplete }) {
  const loaderRef = useRef(null);
  const pathAccentRef = useRef(null);
  const pathSoftRef = useRef(null);
  const ribbonRef = useRef(null);
  const logoSvgRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (loaderRef.current) loaderRef.current.style.display = 'none';
      window.__studioLoaderDone = true;
      document.dispatchEvent(new CustomEvent('studio:loaderComplete'));
      if (onComplete) onComplete();
      return;
    }

    const pathAccent = pathAccentRef.current;
    const pathSoft = pathSoftRef.current;
    const ribbon = ribbonRef.current;
    const logoSvg = logoSvgRef.current;
    const letters = lettersRef.current.filter(Boolean);

    // Initial state: Background strokes solidly cover viewport
    const BG_START = 3200;
    const BG_END = 1100;

    [pathAccent, pathSoft].forEach((path) => {
      if (path) {
        const len = path.getTotalLength ? path.getTotalLength() : 3000;
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = '0';
        gsap.set(path, { strokeWidth: BG_START, x: 0, y: 0 });
      }
    });

    // Initial logo letters state
    if (logoSvg) logoSvg.style.visibility = 'visible';

    letters.forEach((letter) => {
      if (letter) {
        const randomAngle = gsap.utils.random(-20, 20);
        gsap.set(letter, {
          scale: 0,
          rotation: randomAngle,
          transformOrigin: 'center center'
        });
      }
    });

    // Ribbon underline setup
    if (ribbon) {
      const rLen = ribbon.getTotalLength ? ribbon.getTotalLength() : 1200;
      ribbon.style.strokeDasharray = `${rLen}`;
      ribbon.style.strokeDashoffset = `${rLen}`;
      gsap.set(ribbon, { strokeWidth: 10, opacity: 0 });
    }

    // Build Loader Reveal Timeline
    const tl = gsap.timeline({ delay: 0.15 });

    if (ribbon) {
      tl.to(ribbon, { opacity: 1, duration: 0.2 }, 0)
        .to(ribbon, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out' }, 0.1);
    }

    // Kinetic bouncy letter pop-in
    if (letters.length) {
      tl.to(
        letters,
        {
          scale: 1,
          rotation: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'back.out(2.8)'
        },
        '-=0.5'
      );
    }

    // Exit Sequence: Slither out
    const SWEEP_DURATION = 0.65;
    const exitTl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        if (loaderRef.current) {
          loaderRef.current.style.display = 'none';
          loaderRef.current.style.pointerEvents = 'none';
        }
        window.__studioLoaderDone = true;
        document.body.setAttribute('data-loader-done', 'true');
        document.dispatchEvent(new CustomEvent('studio:loaderComplete'));
        if (onComplete) onComplete();
      }
    });

    // Soft stroke sweeps down & right
    if (pathSoft) {
      const len1 = pathSoft.getTotalLength ? pathSoft.getTotalLength() : 3000;
      exitTl.to(
        pathSoft,
        {
          strokeDashoffset: -len1 * 0.5,
          strokeWidth: BG_END,
          y: 1800,
          x: 900,
          duration: SWEEP_DURATION,
          ease: 'power2.inOut'
        },
        'start'
      );
    }

    // Logo fades smoothly
    if (logoSvg) {
      exitTl.to(
        logoSvg,
        { opacity: 0, duration: 0.2, ease: 'power1.out' },
        'start+=' + SWEEP_DURATION * 0.2
      );
    }

    // Accent stroke sweeps down & left
    if (pathAccent) {
      const len0 = pathAccent.getTotalLength ? pathAccent.getTotalLength() : 3000;
      exitTl.to(
        pathAccent,
        {
          strokeDashoffset: -len0 * 0.5,
          strokeWidth: BG_END,
          y: 1800,
          x: -900,
          duration: SWEEP_DURATION,
          ease: 'power2.inOut'
        },
        'start+=' + SWEEP_DURATION * 0.22
      );
    }

    tl.add(exitTl);

    // Hard safety timeout: never lock user out
    const safety = setTimeout(() => {
      if (loaderRef.current && loaderRef.current.style.display !== 'none') {
        loaderRef.current.style.display = 'none';
        window.__studioLoaderDone = true;
        document.dispatchEvent(new CustomEvent('studio:loaderComplete'));
        if (onComplete) onComplete();
      }
    }, 4500);

    return () => {
      clearTimeout(safety);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="studio-loader" ref={loaderRef} aria-hidden="true">
      {/* Background SVG wipe paths */}
      <div className="svg-bg-stroke">
        <svg viewBox="0 0 1500 1093" fill="none" preserveAspectRatio="none">
          <path
            ref={pathAccentRef}
            d="M1500 0C687.437 32.0206 767.477 1069.1 0 1093"
            stroke="var(--accent)"
            strokeWidth="3000"
            strokeLinecap="round"
          />
          <path
            ref={pathSoftRef}
            d="M0 0C812.563 32.0206 732.523 1069.1 1500 1093"
            stroke="var(--accent-soft)"
            strokeWidth="3000"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Kinetic Studio Wordmark / Logo Reveal */}
      <div className="loader-inner">
        <svg
          ref={logoSvgRef}
          className="loader-logo-svg"
          viewBox="0 0 1200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Elegant Kinetic Underline Swoop - strictly below text, zero glyph overlap */}
          <path
            ref={ribbonRef}
            d="M 80 290 C 320 320, 600 275, 840 305 C 980 318, 1060 295, 1120 285"
            stroke="var(--accent)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Styled Letters for "SYNC • AURA" (Positioned cleanly above underline) */}
          <g fill="var(--accent)">
            {['S', 'Y', 'N', 'C', '•', 'A', 'U', 'R', 'A'].map((char, index) => {
              const xPositions = [120, 240, 360, 480, 600, 720, 840, 960, 1080];
              return (
                <text
                  key={index}
                  ref={(el) => (lettersRef.current[index] = el)}
                  x={xPositions[index]}
                  y="210"
                  textAnchor="middle"
                  fontFamily="var(--font-heading)"
                  fontSize={char === '•' ? '48' : '105'}
                  fontWeight="900"
                  fill="var(--accent)"
                >
                  {char}
                </text>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
