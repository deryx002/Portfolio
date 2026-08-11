import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

function ProjectCard({ project, index, onClick, className }) {
  const cardRef = useRef(null);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`group relative cursor-pointer ${className || ''}`}
      onClick={() => onClick(project)}
    >
      <div 
        ref={cardRef}
        className="minimal-card overflow-hidden h-[300px] sm:h-[400px] flex flex-col relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent z-10 pointer-events-none" />

        {project.type === "TEAM PROJECT" && (
          <div className="absolute top-4 right-4 z-30 bg-[var(--color-text)] text-[var(--color-bg)] text-[10px] font-mono font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5 opacity-90">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-bg)] animate-pulse" />
            Team Project
          </div>
        )}
        
        {/* Abstract Pattern / Image Placeholder */}
        <div className="w-full h-full bg-[var(--color-card)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-accent-dark)_0%,_transparent_70%)] group-hover:scale-150 transition-transform duration-700 ease-out" />
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-heading font-black text-6xl text-black/5">
              {project.title.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
          <h3 className="font-heading font-black text-2xl text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent-dark)] transition-colors">
            {project.title}
          </h3>
          <p className="text-[var(--color-muted)] text-sm line-clamp-2 mb-4 font-medium">
            {project.description}
          </p>
          
          <div className="flex gap-2 flex-wrap">
            {project.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech} 
                className="text-[10px] font-mono tracking-wider px-2 py-1 rounded bg-[var(--color-bg)] text-[var(--color-accent-dark)] border border-[var(--color-accent-light)]/30"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[10px] font-mono tracking-wider px-2 py-1 rounded bg-[var(--color-bg)] text-[var(--color-muted)] border border-black/5">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      >
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="minimal-card relative w-full max-w-4xl max-h-[85vh] overflow-y-auto flex flex-col z-10"
        >
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 bg-[var(--color-bg)] text-[var(--color-text)] rounded-full hover:bg-[var(--color-accent-light)] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="h-64 sm:h-80 w-full relative bg-[var(--color-bg)] flex-shrink-0">
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-accent-dark)] to-[var(--color-accent-light)]">
                <span className="font-heading font-black text-6xl text-white/50">
                  {project.title.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)] to-transparent" />
          </div>

          <div className="p-6 sm:p-10 flex-1 bg-[var(--color-card)] -mt-20 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
              <div>
                <h2 className="font-heading font-black text-4xl sm:text-5xl text-[var(--color-text)] mb-2">
                  {project.title}
                </h2>
                <div className="font-mono text-[var(--color-accent-dark)] tracking-wider text-sm font-semibold">
                  {project.date}
                </div>
              </div>
              <div className="flex gap-3">
                {project.github && (
                  <MagneticButton>
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[var(--color-text)] text-[var(--color-bg)] rounded-lg font-bold text-sm hover:bg-[var(--color-accent-dark)] transition-colors shadow-lg">
                      <Github className="w-4 h-4" /> Code
                    </a>
                  </MagneticButton>
                )}
                {project.live && project.live !== "#" && (
                  <MagneticButton>
                    <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-dark)] text-white rounded-lg font-bold text-sm hover:bg-[var(--color-accent-light)] transition-colors shadow-lg">
                      <ExternalLink className="w-4 h-4" /> Live
                    </a>
                  </MagneticButton>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="font-mono text-sm font-bold tracking-widest text-[var(--color-muted)] uppercase mb-3">Overview</h3>
                  <p className="text-[var(--color-text)] leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>
                {project.highlights && (
                  <div>
                    <h3 className="font-mono text-sm font-bold tracking-widest text-[var(--color-muted)] uppercase mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[var(--color-text)]">
                          <span className="text-[var(--color-accent-dark)] mt-1">▹</span>
                          <span className="font-medium">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-mono text-sm font-bold tracking-widest text-[var(--color-muted)] uppercase mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech}
                      className="px-3 py-1.5 text-xs font-mono font-semibold rounded bg-[var(--color-bg)] text-[var(--color-accent-dark)] border border-black/5 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="py-24 px-4 sm:px-8 relative bg-[var(--color-bg)]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div style={{ y: y1 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-[var(--color-accent-dark)]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-dark)]">
              03 / Work
            </span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text)] tracking-tight">
            SELECTED <span className="text-gradient">PROJECTS.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id || project.title} 
              project={project} 
              index={index} 
              onClick={setSelectedProject}
              className={index === 3 ? "lg:col-start-2" : ""}
            />
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
