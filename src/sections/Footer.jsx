import React from 'react';
import { ArrowUp } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

export default function Footer({ personalInfo }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[var(--color-bg)] border-t border-black/5 py-12 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-heading font-black text-2xl tracking-widest text-[var(--color-text)]">
            DHARUN
          </div>
          <div className="font-mono text-xs text-[var(--color-muted)]">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>

        <MagneticButton>
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-[var(--color-card)] border border-black/5 flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-accent-dark)] hover:text-white transition-all shadow-sm"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </MagneticButton>
        
      </div>
    </footer>
  );
}
