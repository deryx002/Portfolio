import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Award } from 'lucide-react';

export default function Achievements({ achievements }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section 
      id="achievements" 
      ref={containerRef}
      className="py-24 px-4 sm:px-8 relative bg-[var(--color-bg)]"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div style={{ y: y1 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-[var(--color-accent-dark)]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-dark)]">
              05 / Recognition
            </span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text)] tracking-tight">
            AWARDS & <span className="text-gradient">MILESTONES.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="minimal-card p-4 sm:p-6 md:p-8 flex items-start gap-3 sm:gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg)] border border-black/5 flex items-center justify-center flex-shrink-0 text-[var(--color-accent-dark)] font-heading font-black text-xl">
                {achievement.value}
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-[var(--color-text)] mb-2">{achievement.label}</h3>
                <p className="text-[var(--color-muted)] font-medium text-sm leading-relaxed">
                  {achievement.subtext}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
