import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import devCardImg from '../../assets/images/dev_card.png';

export default function About({ personalInfo }) {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  
  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-24 px-4 sm:px-8 relative bg-[var(--color-bg)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-24 items-center">
          
          <div className="w-full lg:w-1/2">
            <motion.div style={isDesktop ? { y: y1 } : {}}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-[var(--color-accent-dark)]" />
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-dark)]">
                  01 / Introduction
                </span>
              </div>
              <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text)] mb-8 tracking-tight">
                BEYOND THE <span className="text-gradient">CODE.</span>
              </h2>
              
              <div className="space-y-4 sm:space-y-6 text-[var(--color-muted)] text-base sm:text-lg leading-relaxed font-medium">
                <p>
                  Hello! I'm Dharun, a passionate Full Stack Developer with a knack for building robust, scalable applications. My journey in tech started with a curiosity about how things work on the internet, which quickly blossomed into a career focused on crafting elegant solutions to complex problems.
                </p>
                <p>
                  I specialize in modern JavaScript/TypeScript ecosystems, building responsive frontends with React and highly scalable backend architectures. I'm obsessed with performance, clean code, and creating intuitive user experiences.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 relative perspective-1000">
            <motion.div 
              style={isDesktop ? { y: y2 } : {}}
              className="relative w-full aspect-[4/3] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/10 preserve-3d"
            >
              {/* Image Container with 3D Tilt effect */}
              <motion.div 
                whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-full h-full bg-[var(--color-card)] relative border border-black/5"
              >
                {/* Decorative Elements overlay */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-[var(--color-accent-dark)] tracking-widest uppercase z-20">
                  Dharun_v1.0
                </div>
                <div className="absolute bottom-4 right-4 flex gap-1 z-20">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent-dark)]" />
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent-light)]" />
                </div>
                
                {/* The actual image */}
                <div className="absolute inset-0">
                  <img 
                    src={devCardImg} 
                    alt="Developer Card" 
                    className="w-full h-full object-cover z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent-dark)]/10 to-transparent mix-blend-multiply z-10 pointer-events-none" />
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
