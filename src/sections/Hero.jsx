import React, { useRef, useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import heroBg from '../../assets/images/hero-bg.jpg';

// Typewriter Effect Component for Static Text
const TypewriterText = ({ text, delayOffset = 0 }) => {
  const characters = text.split("");
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.08, delayChildren: delayOffset } },
        hidden: {},
      }}
      className="inline-block"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            visible: { opacity: 1, display: "inline-block" },
            hidden: { opacity: 0, display: "none" },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Looping Typewriter for Multiple Words
const RotatingTypewriter = ({ words, delayOffset = 0 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Initial delay before starting the loop
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), delayOffset * 1000);
    return () => clearTimeout(timer);
  }, [delayOffset]);

  useEffect(() => {
    if (!hasStarted) return;

    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2500;

    const currentWord = words[currentWordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentWord.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, hasStarted]);

  return <span>{currentText}</span>;
};

export default function Hero({ personalInfo }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const typingRoles = ["DEVELOPER.", "ENGINEER.", "DESIGNER.", "CREATOR."];

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 sm:pt-24 overflow-hidden bg-[var(--color-bg)]"
    >
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base animated gradient */}
        <div className="hero-gradient-bg absolute inset-0" />
        
        {/* Floating gradient orbs for depth */}
        <motion.div 
          animate={{ 
            x: [0, 120, -80, 0], 
            y: [0, -100, 80, 0],
            scale: [1, 1.3, 0.9, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-40"
          style={{ background: 'radial-gradient(circle, #7FAF8D, transparent)' }}
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 120, 0], 
            y: [0, 120, -60, 0],
            scale: [1, 1.4, 0.8, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[-10%] left-[-15%] w-[45%] h-[45%] rounded-full blur-[100px] opacity-30"
          style={{ background: 'radial-gradient(circle, #3F6F52, transparent)' }}
        />
        <motion.div 
          animate={{ 
            x: [0, 80, -120, 0], 
            y: [0, -80, 60, 0],
            scale: [1.2, 0.8, 1.1, 1.2]
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute top-[30%] left-[40%] w-[35%] h-[35%] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #E7E7E5, transparent)' }}
        />
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-20"
      >
        {/* Typography Content */}
        <motion.div 
          style={{ y: yText }}
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="font-mono text-sm font-semibold tracking-[0.2em] text-[var(--color-accent-dark)] uppercase">
              Hello, I'm Dharun
            </span>
          </motion.div>

          <div className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.9] tracking-tighter mb-8 uppercase w-full flex flex-col items-center lg:items-start min-h-[3em] lg:min-h-[2.8em]">
            <span className="hero-text-gradient">
              <TypewriterText text="Full" delayOffset={0.2} />
            </span>
            <span className="hero-text-gradient">
              <TypewriterText text="Stack" delayOffset={0.5} />
            </span>
            <div className="text-[var(--color-accent-dark)] flex items-center relative whitespace-nowrap overflow-hidden">
              {/* Invisible spacer to prevent layout shift while typing */}
              <span className="invisible select-none" aria-hidden="true">DEVELOPER.</span>
              <motion.span 
                className="invisible inline-block w-3 md:w-5 h-[0.8em] ml-2"
                aria-hidden="true"
              />
              
              {/* Actual typing content absolutely positioned */}
              <div className="absolute left-0 top-0 bottom-0 flex items-center w-full justify-center lg:justify-start">
                <RotatingTypewriter words={typingRoles} delayOffset={0.9} />
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-3 md:w-5 h-[0.8em] bg-[var(--color-accent-dark)] ml-2 translate-y-[0.05em]"
                />
              </div>
            </div>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-xl text-[var(--color-muted)] text-lg sm:text-xl font-medium leading-relaxed mb-12 px-2"
          >
            {personalInfo.title}. Specializing in building scalable architectures, intuitive interfaces, and robust backend systems with a minimalist approach.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap justify-center lg:justify-start items-center gap-6"
          >
            <MagneticButton>
              <a 
                href="#projects" 
                className="px-8 py-4 rounded-full bg-[var(--color-text)] text-[var(--color-bg)] font-bold tracking-wider text-sm hover:bg-[var(--color-accent-dark)] transition-colors shadow-lg shadow-black/10"
              >
                VIEW PROJECTS
              </a>
            </MagneticButton>
            
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: personalInfo.socials.github, label: "GitHub" },
                { icon: Linkedin, href: personalInfo.socials.linkedin, label: "LinkedIn" },
                { icon: Mail, href: personalInfo.socials.email, label: "Email" }
              ].map((social) => (
                <MagneticButton key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-card)] border border-black/5 text-[var(--color-text)] hover:text-[var(--color-accent-dark)] hover:border-[var(--color-accent-light)] transition-all shadow-sm hover:shadow-md"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Animated Image Container */}
        <motion.div 
          style={{ y: yImage }}
          className="flex-1 w-full max-w-[280px] sm:max-w-sm lg:max-w-none flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Animated rotating border ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 sm:-inset-4 rounded-2xl opacity-30"
              style={{
                background: 'conic-gradient(from 0deg, transparent, #3F6F52, transparent, #7FAF8D, transparent)',
              }}
            />
            
            {/* Pulsing glow behind image */}
            <motion.div
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-6 sm:-inset-8 rounded-3xl blur-xl"
              style={{ background: 'radial-gradient(circle, rgba(127, 175, 141, 0.3), transparent 70%)' }}
            />

            {/* Main image with float animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full aspect-square sm:aspect-square lg:aspect-[3/4] max-h-[600px] rounded-2xl overflow-hidden shadow-2xl"
              >
                <img 
                  src={heroBg} 
                  alt="Dharun" 
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 hover:scale-100"
                />
                
                {/* Animated gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-dark)]/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 z-10" />
                
                {/* Border */}
                <div className="absolute inset-0 border border-black/10 rounded-2xl z-20" />
              </motion.div>
            </motion.div>

            {/* Floating decorative dots */}
            <motion.div
              animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[var(--color-accent-dark)] shadow-lg z-30"
            />
            <motion.div
              animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[var(--color-accent-light)] shadow-lg z-30"
            />
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 -left-3 sm:-left-5 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[var(--color-muted)]/50 z-30"
            />
          </div>
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[var(--color-accent-dark)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
