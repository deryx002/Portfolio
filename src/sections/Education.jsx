import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, ExternalLink } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

export default function Education({ education, certificates }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section 
      id="education" 
      ref={containerRef}
      className="py-24 px-4 sm:px-8 relative bg-[var(--color-bg)]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div style={{ y: y1 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-[var(--color-accent-dark)]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-dark)]">
              06 / Foundation
            </span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text)] tracking-tight">
            EDUCATION & <span className="text-gradient">CERTIFICATIONS.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Education Timeline */}
          <div>
            <h3 className="font-mono text-sm font-bold tracking-widest text-[var(--color-muted)] uppercase mb-8 border-b border-black/5 pb-2">
              Academic Background
            </h3>
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-card)] border border-black/5 flex items-center justify-center flex-shrink-0 text-[var(--color-text)]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xl text-[var(--color-text)] mb-1">{education.degree}</h4>
                  <div className="text-[var(--color-accent-dark)] font-mono text-sm mb-2">{education.institution}</div>
                  <div className="text-[var(--color-muted)] font-mono text-xs uppercase tracking-widest mb-3">
                    {education.period} | {education.cgpa}
                  </div>
                  {education.highlights && (
                    <ul className="text-sm text-[var(--color-text)] leading-relaxed space-y-2 list-disc list-inside">
                      {education.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-mono text-sm font-bold tracking-widest text-[var(--color-muted)] uppercase mb-8 border-b border-black/5 pb-2">
              Professional Certifications
            </h3>
            <div className="space-y-4">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="minimal-card p-4 sm:p-5 group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0"
                >
                  <div>
                    <h4 className="font-heading font-bold text-lg text-[var(--color-text)] mb-1">{cert.title}</h4>
                    <div className="text-[var(--color-muted)] font-mono text-xs uppercase tracking-widest">
                      {cert.issuer} • {cert.category}
                    </div>
                  </div>
                  {cert.link && (
                    <MagneticButton>
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] border border-black/5 hover:text-[var(--color-accent-dark)] hover:border-[var(--color-accent-light)] transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </MagneticButton>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
