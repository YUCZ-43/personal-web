/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { Expertise } from './components/Expertise';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import type { ProjectEntry } from './data/portfolioData';

export default function App() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [projectNote, setProjectNote] = useState<string | undefined>(undefined);

  const handleDiscussProject = (project: ProjectEntry) => {
    const mappedService =
      project.previewType === 'env-checker' ? 'Automation' : 'AI Product';

    setSelectedServices((prev) =>
      prev.includes(mappedService) ? prev : [...prev, mappedService]
    );
    setProjectNote(`I'd love to discuss "${project.title}" and explore a related build.`);

    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFC] text-neutral-900 font-sans selection:bg-[#E0E7FF] selection:text-[#1E1B4B] antialiased overflow-x-clip">
      {/* Thin Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Sticky Portfolio Navigation */}
      <Navbar />

      {/* Scrollable Portfolio Sections */}
      <main id="main-content">
        {/* Section 01 — HERO (Preserves 3D Iridescent Human & Mouse Interaction) */}
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
