import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function ExperienceCard({ exp, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative pl-6 sm:pl-12 py-4 sm:py-6 group"
    >
      {/* Timeline Line & Dot */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-black/5 group-last:bg-transparent">
        <div className="absolute top-8 left-[-4px] w-2 h-2 rounded-full bg-[var(--color-accent-dark)] shadow-[0_0_10px_var(--color-accent-light)] transition-all duration-500 group-hover:scale-150" />
      </div>

      <div className="minimal-card p-4 sm:p-6 md:p-8 relative overflow-hidden preserve-3d transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-[var(--color-text)]">{exp.role}</h3>
            <div className="text-[var(--color-accent-dark)] font-mono text-xs sm:text-sm font-semibold tracking-wider">
              {exp.company}
            </div>
          </div>
          <div className="text-[var(--color-muted)] font-mono text-xs uppercase tracking-widest bg-[var(--color-bg)] px-3 py-1 rounded-full border border-black/5 self-start sm:self-auto">
            {exp.period}
          </div>
        </div>
        
        <div className="text-[var(--color-muted)] font-medium leading-relaxed mb-6 space-y-2">
          {Array.isArray(exp.description) ? (
            exp.description.map((line, i) => <p key={i}>{line}</p>)
          ) : (
            <p>{exp.description}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {exp.skills && exp.skills.map((tech) => (
            <span 
              key={tech} 
              className="text-[10px] font-mono tracking-wider px-2 py-1 rounded bg-[var(--color-bg)] text-[var(--color-text)] border border-black/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience({ experiences }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="py-24 px-4 sm:px-8 relative bg-[var(--color-bg)]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div style={{ y: y1 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-[var(--color-accent-dark)]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-dark)]">
              04 / Journey
            </span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text)] tracking-tight">
            WORK <span className="text-gradient">EXPERIENCE.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
