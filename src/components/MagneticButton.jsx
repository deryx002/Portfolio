import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = "", onClick, strength = 0.35, ...props }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    let rect = null;

    const handleMouseEnter = () => {
      rect = el.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      rect = null;
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div
      ref={buttonRef}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center transition-shadow duration-300 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
