import React, { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import SmoothScroll from './components/SmoothScroll';
import CursorGlow from './components/CursorGlow';

import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import AISection from './sections/AISection';
import Experience from './sections/Experience';
import Achievements from './sections/Achievements';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

import {
  personalInfo,
  skills,
  projects,
  experiences,
  education,
  certificates,
  achievements
} from './data/portfolioData';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Cursor-following green gradient glow */}
      <CursorGlow />
      {/* Light Mode Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Smooth Scroll Container powered by Lenis + GSAP */}
      <SmoothScroll>
        <div className={`relative z-10 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Navbar personalInfo={personalInfo} />
          
          <main>
            <Hero personalInfo={personalInfo} />
            <About personalInfo={personalInfo} />
            <Skills skills={skills} />
            <Projects projects={projects} />
            <AISection />
            <Experience experiences={experiences} />
            <Achievements achievements={achievements} />
            <Education education={education} certificates={certificates} />
            <Contact personalInfo={personalInfo} />
          </main>

          <Footer personalInfo={personalInfo} />
        </div>
      </SmoothScroll>
    </div>
  );
}
