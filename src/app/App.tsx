import { MotionConfig } from 'motion/react';
import { SmoothScroll } from '../components/sections/SmoothScroll';
import { Nav } from '../components/sections/Nav';
import { Hero } from '../components/sections/Hero';
import { Marquee } from '../components/sections/Marquee';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Work } from '../components/sections/Work';
import { Experience } from '../components/sections/Experience';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/sections/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative w-full bg-[var(--bg-0)] text-[var(--ink-0)]"
        style={{ overflowX: 'clip' }}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-[var(--bg-0)] focus:text-[var(--accent)] glass-strong">
          Skip to main content
        </a>
        <SmoothScroll />
        <Nav />

        <main id="main-content" role="main">
          {/* ── Section 1: Hero ── full viewport height, own stacking context */}
          <div className="relative" style={{ zIndex: 1 }}>
            <Hero />
          </div>

          {/* Marquee ticker — sits immediately below Hero */}
          <div className="relative" style={{ zIndex: 1 }}>
            <Marquee />
          </div>

          {/* ── Section 2: About ── */}
          <div className="relative" style={{ zIndex: 1, marginTop: '140px' }}>
            <About />
          </div>

          {/* ── Section 3: Technical Skills ── */}
          <div className="relative" style={{ zIndex: 1, marginTop: '140px' }}>
            <Skills />
          </div>

          {/* ── Section 4: Selected Projects ── */}
          <div className="relative" style={{ zIndex: 1, marginTop: '140px' }}>
            <Work />
          </div>

          {/* ── Section 5: Journey / Experience Timeline ── */}
          <div className="relative" style={{ zIndex: 1, marginTop: '140px' }}>
            <Experience />
          </div>

          {/* ── Section 6: Contact & Footer ── */}
          <div className="relative" style={{ zIndex: 1, marginTop: '140px' }}>
            <Contact />
            <Footer />
          </div>
        </main>
      </div>
    </MotionConfig>
  );
}
