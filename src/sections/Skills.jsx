import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { 
  Code2, Terminal, FileCode, Atom, Server, 
  Layout, Database, DatabaseZap, GitBranch, BarChart3 
} from 'lucide-react';
import BorderGlow from '../components/BorderGlow';
import LogoLoop from '../components/LogoLoop';
import Cubes from '../components/Cubes';

const iconMap = {
  Code2, Terminal, FileCode, Atom, Server,
  Layout, Database, DatabaseZap, GitBranch, BarChart3
};

function SkillCard({ skill, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const IconComponent = iconMap[skill.icon] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="perspective-1000 relative h-full"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 4 + (index % 3),
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2
        }}
        className="w-full h-full"
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ scale: 1.05, zIndex: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-full h-full"
        >
          <BorderGlow
            edgeSensitivity={50}
            glowColor="145 100 20"
            backgroundColor="var(--color-card)"
            borderRadius={24}
            glowRadius={40}
            glowIntensity={1.5}
            className="w-full h-full"
            animated={false}
            colors={['#064e3b', '#065f46', '#047857']}
          >
            <div className="relative group flex items-center gap-4 p-4 cursor-default w-full h-full">
              <div 
                className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center shadow-sm border border-black/5"
                style={{ backgroundColor: skill.color + '15', transform: "translateZ(30px)" }}
              >
                <IconComponent className="w-6 h-6" style={{ color: skill.color }} />
              </div>
              
              <div style={{ transform: "translateZ(20px)" }} className="flex-1">
                <h3 className="font-heading font-bold text-[var(--color-text)] mb-1 text-sm">{skill.name}</h3>
                <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills({ skills }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const techLogos = useMemo(() => {
    return skills.map(skill => {
      const IconComponent = iconMap[skill.icon] || Code2;
      return {
        // Render in B/W / Muted color
        node: <IconComponent className="w-6 h-6 text-[var(--color-muted)] opacity-70" />,
        title: skill.name,
      };
    });
  }, [skills]);

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="py-24 px-4 sm:px-8 relative overflow-hidden bg-[var(--color-bg)]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          <div className="w-full md:w-1/3 md:sticky md:top-32">
            <motion.div style={{ y: y1 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-[var(--color-accent-dark)]" />
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-dark)]">
                  02 / Arsenal
                </span>
              </div>
              <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text)] mb-3 tracking-tight">
                TECH <span className="text-gradient">STACK.</span>
              </h2>

              <div className="mb-8 w-full max-w-full overflow-hidden opacity-80">
                <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                  <LogoLoop
                    logos={techLogos}
                    speed={60}
                    direction="left"
                    logoHeight={24}
                    gap={32}
                    hoverSpeed={0}
                    scaleOnHover
                    fadeOut
                    fadeOutColor="var(--color-bg)"
                  />
                </div>
              </div>

              <p className="text-[var(--color-muted)] leading-relaxed mb-8">
                A robust toolkit for building modern full stack applications. I leverage these technologies to create scalable, performant, and accessible user experiences.
              </p>

              {/* Interactive 3D Cubes - Visible only on PC/Desktop (md screens and up) */}
              <div className="hidden md:block w-full max-w-[270px] aspect-[6/9] ml-8 lg:ml-16 mt-6 relative">
                <Cubes 
                  gridSize={6}
                  extraRows={3}
                  maxAngle={35}
                  radius={2.5}
                  cellGap={14}
                  borderStyle="1.5px dashed #3F6F52"
                  faceColor="#FFFFFF"
                  rippleColor="#7FAF8D"
                  rippleSpeed={1.5}
                  autoAnimate={true}
                  rippleOnClick={true}
                  shadow="0 2px 10px rgba(0, 0, 0, 0.05)"
                />
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-2/3">
            <motion.div style={{ y: y2 }} className="space-y-12">
              {Object.entries(categories).map(([category, items], catIdx) => (
                <div key={category}>
                  <h3 className="font-mono text-sm font-bold tracking-widest text-[var(--color-muted)] uppercase mb-6 border-b border-black/5 pb-2">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((skill, idx) => (
                      <SkillCard key={skill.name} skill={skill} index={idx + (catIdx * 3)} />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
