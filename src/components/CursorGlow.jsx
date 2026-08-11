import React, { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    let animationId;
    const animate = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      glow.style.left = `${currentX - 300}px`;
      glow.style.top = `${currentY - 300}px`;
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed hidden md:block"
      style={{
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(63, 111, 82, 0.12) 0%, rgba(127, 175, 141, 0.08) 30%, transparent 65%)',
        borderRadius: '50%',
        zIndex: 50,
        mixBlendMode: 'multiply',
        willChange: 'left, top',
      }}
    />
  );
}
