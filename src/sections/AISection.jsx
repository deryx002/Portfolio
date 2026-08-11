import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrainCircuit, Sparkles, Cpu } from 'lucide-react';

export default function AISection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="py-24 px-4 sm:px-8 relative bg-[var(--color-bg)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div style={{ y: y1 }} className="mb-16 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-light)]/20 border border-[var(--color-accent-dark)]/20 mb-8">
            <Sparkles className="w-4 h-4 text-[var(--color-accent-dark)]" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-accent-dark)]">
              Specialized Focus
            </span>
          </div>
          
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl text-[var(--color-text)] tracking-tight mb-6">
            AI & MACHINE <span className="text-gradient">LEARNING.</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-[var(--color-muted)] text-lg leading-relaxed font-medium">
            Bridging the gap between traditional full-stack development and modern artificial intelligence. I build intelligent applications that leverage the latest in machine learning models and data pipelines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 mt-12 sm:mt-20">
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="minimal-card p-6 sm:p-8 md:p-12 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-dark)]/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg)] border border-black/5 flex items-center justify-center mb-8 relative z-10 text-[var(--color-accent-dark)]">
              <BrainCircuit className="w-8 h-8" />
            </div>
            
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-[var(--color-text)] mb-4 relative z-10">Intelligent Systems</h3>
            <p className="text-[var(--color-muted)] font-medium leading-relaxed mb-6 relative z-10">
              Integrating LLMs (GPT-4, Claude) and custom machine learning models into production-ready web applications to automate workflows and enhance user experiences.
            </p>
            
            <ul className="space-y-3 relative z-10">
              {['Natural Language Processing', 'Retrieval-Augmented Generation (RAG)', 'AI Agents & Chatbots'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[var(--color-text)] font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-dark)]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="minimal-card p-6 sm:p-8 md:p-12 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-light)]/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg)] border border-black/5 flex items-center justify-center mb-8 relative z-10 text-[var(--color-accent-light)]">
              <Cpu className="w-8 h-8" />
            </div>
            
            <h3 className="font-heading font-black text-3xl text-[var(--color-text)] mb-4 relative z-10">Data Engineering</h3>
            <p className="text-[var(--color-muted)] font-medium leading-relaxed mb-6 relative z-10">
              Designing scalable data architectures and pipelines to process, analyze, and serve large datasets required for machine learning model training and inference.
            </p>
            
            <ul className="space-y-3 relative z-10">
              {['Python & TensorFlow/PyTorch', 'Data Pipelines (ETL)', 'Vector Databases (Pinecone, Weaviate)'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[var(--color-text)] font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-light)]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
