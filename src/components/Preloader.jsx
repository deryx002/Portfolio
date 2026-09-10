import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const textRef = useRef(null);
  const preloaderRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const obj = { value: 0 };
    let hasCompleted = false;

    const finish = () => {
      if (hasCompleted) return;
      hasCompleted = true;
      if (onCompleteRef.current) onCompleteRef.current();
      if (preloaderRef.current) {
        preloaderRef.current.style.display = "none";
      }
    };

    const tl = gsap.timeline({
      onComplete: () => {
        // Curtain Split Reveal Animation
        gsap.timeline({
          onComplete: () => {
            finish();
          }
        })
        .to(textRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power3.in"
        })
        .to(leftPanelRef.current, {
          xPercent: -100,
          duration: 0.7,
          ease: "expo.inOut"
        }, "-=0.1")
        .to(rightPanelRef.current, {
          xPercent: 100,
          duration: 0.7,
          ease: "expo.inOut"
        }, "<")
        .to(preloaderRef.current, {
          display: "none",
          duration: 0.1
        });
      }
    });

    tl.to(obj, {
      value: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setCounter(Math.floor(obj.value));
      }
    });

    // Safety fallback: guarantee reveal after 2.5 seconds regardless of animation delays
    const fallbackTimer = setTimeout(finish, 2500);

    return () => {
      clearTimeout(fallbackTimer);
      tl.kill();
    };
  }, []);

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[var(--color-bg)]">
      {/* Left split curtain */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[var(--color-bg)] border-r border-black/5 z-10"
      />
      {/* Right split curtain */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-bg)] border-l border-black/5 z-10"
      />

      {/* Loading Content */}
      <div ref={textRef} className="relative z-20 flex flex-col items-center justify-center text-center px-4">
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-[var(--color-accent-light)] border-t-[var(--color-accent-dark)] animate-spin opacity-50" />
          <span className="font-heading font-extrabold text-2xl text-[var(--color-text)]">
            {counter}%
          </span>
        </div>

        <h2 className="font-heading font-black text-xl sm:text-2xl tracking-widest text-[var(--color-text)] uppercase mb-2">
          Dharun Ananth S
        </h2>
        <p className="font-mono text-xs text-[var(--color-muted)] tracking-widest uppercase mb-4">
          INITIALIZING EXPERIENCE...
        </p>

        {/* Progress Bar Line */}
        <div className="w-64 h-1 bg-black/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-accent-dark)] to-[var(--color-accent-light)] transition-all duration-100 ease-out"
            style={{ width: `${counter}%` }}
          />
        </div>
      </div>
    </div>
  );
}
