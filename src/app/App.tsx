import { MotionConfig } from 'motion/react';
import { SmoothScroll } from '../components/sections/SmoothScroll';
import { Nav } from '../components/sections/Nav';
import { Hero } from '../components/sections/Hero';
import { Marquee } from '../components/sections/Marquee';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Work } from '../components/sections/Work';
import { EngineeringHighlights } from '../components/sections/EngineeringHighlights';
import { EngineeringProcess } from '../components/sections/EngineeringProcess';
import { Experience } from '../components/sections/Experience';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/sections/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative w-full overflow-x-clip bg-[var(--bg-0)] text-[var(--ink-0)]"
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-[var(--bg-0)] focus:text-[var(--accent)] glass-strong">
          Skip to main content
        </a>
        <SmoothScroll />
        <Nav />

        <main id="main-content" role="main">
          <div className="relative" style={{ zIndex: 1 }}>
            <Hero />
          </div>

          <div className="relative" style={{ zIndex: 1 }}>
            <Marquee />
          </div>

          <div className="relative" style={{ zIndex: 1, marginTop: '140px' }}>
            <About />
          </div>

          <div className="relative" style={{ zIndex: 1, marginTop: '140px' }}>
            <Skills />
          </div>

          <div className="relative" style={{ zIndex: 1, marginTop: '140px' }}>
            <Work />
          </div>

          <div className="relative" style={{ zIndex: 1 }}>
            <EngineeringHighlights />
          </div>

          <div className="relative" style={{ zIndex: 1, marginTop: '140px' }}>
            <EngineeringProcess />
          </div>

          <div className="relative" style={{ zIndex: 1, marginTop: '140px' }}>
            <Experience />
          </div>

          <div className="relative" style={{ zIndex: 1, marginTop: '140px' }}>
            <Contact />
            <Footer />
          </div>
        </main>
      </div>
    </MotionConfig>
  );
}
