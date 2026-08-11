import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineShowcase() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handleResize = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <section className="py-24 px-4 sm:px-8 relative z-10 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* Spline Container */}
        <div className="w-full lg:w-1/2 h-[400px] sm:h-[500px] relative glass-panel rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
          {!isMobile ? (
            <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
          ) : (
            <div className="text-center p-8">
              <span className="font-mono text-cyan-400 text-xs block mb-2">3D EXPERIMENT DISABLED</span>
              <p className="text-slate-400 text-sm">Interactive WebGL Spline scene disabled on mobile devices to preserve battery and performance.</p>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-purple-400" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-purple-400">
              08 / 3D EXPERIMENTS
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mb-6">
            EMBEDDED <span className="text-gradient-purple">SPLINE SCENES</span>
          </h2>
          
          <p className="text-slate-300 leading-relaxed mb-6">
            In addition to procedural Three.js environments, I leverage <strong>Spline</strong> for integrating art-directed 3D interactive assets. This allows for complex material setups, embedded animations, and drag-and-drop 3D scenes integrated directly into React.
          </p>
          
          <ul className="space-y-3 font-mono text-xs text-slate-400">
            <li className="flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 block" />
              <span>@splinetool/react-spline integration</span>
            </li>
            <li className="flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 block" />
              <span>Optimized conditional loading on Desktop</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
