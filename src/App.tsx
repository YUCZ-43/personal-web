/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { GlobalMotionProvider } from './context/GlobalMotionContext';
import { CosmicScene } from './components/CosmicScene';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { Expertise } from './components/Expertise';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import type { ProjectEntry } from './data/portfolioData';

function PortfolioContent() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [projectNote, setProjectNote] = useState<string | undefined>(undefined);
  const { lang } = useLanguage();

  const handleDiscussProject = (project: ProjectEntry) => {
    const mappedService =
      project.previewType === 'env-checker' ? 'Automation' : 'AI Product';

    setSelectedServices((prev) =>
      prev.includes(mappedService) ? prev : [...prev, mappedService]
    );
    setProjectNote(
      lang === 'zh-CN'
        ? `希望探讨关于「${project.title}」的系统架构与相关合作可能。`
        : `I'd love to discuss "${project.title}" and explore a related build.`
    );

    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0B071C] text-[#F4F0FF] font-sans selection:bg-[#854DFF]/40 selection:text-[#F4F0FF] antialiased overflow-x-clip">
      {/* Real-Time Three.js Andromeda Galaxy & Multi-Layer Particle Universe */}
      <CosmicScene />

      {/* Thin Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Fixed Cosmic Portfolio Navigation */}
      <Navbar />

      {/* Continuous Atmospheric Portfolio Sections */}
      <main id="main-content" className="relative z-10">
        {/* Section 01 — HERO (Breathing 3D Digital Human & Editorial Typography) */}
        <Hero />

        {/* Section 02 — SELECTED WORK */}
        <SelectedWork onSelectProjectInquiry={handleDiscussProject} />

        {/* Section 03 — EXPERTISE */}
        <Expertise />

        {/* Section 04 — ABOUT */}
        <About />

        {/* Section 05 — CONTACT */}
        <Contact
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          projectNote={projectNote}
        />
      </main>

      {/* Portfolio Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <GlobalMotionProvider>
        <PortfolioContent />
      </GlobalMotionProvider>
    </LanguageProvider>
  );
}
