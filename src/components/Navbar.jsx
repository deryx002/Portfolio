import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ personalInfo }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'py-2 sm:py-4' : 'py-3 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-8">
        <div 
          className={`flex items-center justify-between rounded-full transition-all duration-500 min-h-[38px] sm:min-h-[48px] ${
            isScrolled 
              ? 'bg-[var(--color-bg)]/85 backdrop-blur-md shadow-md border border-black/10 px-3.5 py-1.5 sm:px-6 sm:py-2.5' 
              : 'bg-transparent px-2 py-1'
          }`}
        >
          <a href="#home" className="font-heading font-black text-base sm:text-xl tracking-widest text-[var(--color-text)] flex items-center leading-none my-auto">
            DHARUN<span className="text-[var(--color-accent-dark)]">.</span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-widest text-[var(--color-text)] font-semibold hover:text-[var(--color-accent-dark)] transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[var(--color-accent-dark)] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Resume Button (Desktop) */}
          <a 
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[var(--color-text)] text-[var(--color-bg)] font-bold text-xs tracking-widest uppercase hover:bg-[var(--color-accent-dark)] transition-colors shadow-sm"
          >
            Resume
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[var(--color-text)] p-1 sm:p-2 my-auto flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[var(--color-bg)] flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-black/5">
              <span className="font-heading font-black text-xl tracking-widest text-[var(--color-text)]">
                MENU
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-[var(--color-card)] rounded-full text-[var(--color-text)]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="font-heading font-black text-4xl text-[var(--color-text)] hover:text-[var(--color-accent-dark)] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="p-6 border-t border-black/5">
              <a 
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center px-6 py-4 rounded-xl bg-[var(--color-text)] text-[var(--color-bg)] font-bold text-sm tracking-widest uppercase"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
