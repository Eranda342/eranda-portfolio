import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef, lazy, Suspense } from 'react';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { siteConfig } from '../../config/site';
import { socialLinks } from '../../config/navigation';
import { Button } from '../ui/Button';
import photo from '../../imports/Me.png';

const ParticleNetwork = lazy(() => import('../webgl/ParticleNetwork').then(m => ({ default: m.ParticleNetwork })));

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const [firstName, lastName] = siteConfig.name.split(' ');

  return (
    <section ref={ref} id="top" style={{ position: 'relative' }} className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'var(--grad-hero)' }} />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="noise" />

      {/* Particle network (Lazy Loaded) */}
      <Suspense fallback={null}>
        <ParticleNetwork className="absolute inset-0 h-full w-full" />
      </Suspense>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[5%] top-[20%] h-[40vh] w-[40vh] rounded-full bg-[#a78bfa]/10 blur-[140px]" />
        <div className="absolute left-[-5%] bottom-[10%] h-[35vh] w-[35vh] rounded-full bg-[#818cf8]/10 blur-[140px]" />
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 pt-40 sm:pt-48 pb-24 flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-[var(--ink-2)]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
          </span>
          Available for opportunities · 2026
        </motion.div>

        <h1 className="mt-8 font-serif tracking-tight leading-[0.95] max-w-4xl" style={{ fontSize: 'var(--text-h1)' }}>
          <motion.span
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="block text-gradient"
          >
            {firstName}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="block italic text-gradient-accent"
          >
            {lastName}.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
          className="mt-7 max-w-xl text-[17px] sm:text-lg leading-relaxed"
          style={{ color: '#E2E8F0' }}
        >
          {siteConfig.role} specializing in Full-Stack Development. Final-year CS student
          at the University of Plymouth, crafting calm, cinematic, production-grade interfaces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Button asChild variant="primary" className="group relative overflow-hidden hover-lift h-12 px-6">
            <a href="#work">
              <span className="relative z-10">View My Work</span>
              <ArrowDownRight className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              <span className="absolute inset-0 bg-gradient-to-r from-[#a78bfa] via-[#818cf8] to-[#c4b5fd] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </Button>
          <Button asChild variant="glass" className="h-12 px-5">
            <a href={socialLinks.github} target="_blank" rel="noreferrer">
              <Sparkles className="mr-2 h-4 w-4 text-[var(--accent)]" />
              GitHub
            </a>
          </Button>
          <Button asChild variant="glass" className="h-12 px-5">
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </Button>
        </motion.div>

        {/* Floating headshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 lg:right-16"
        >
          <div
            className="relative h-[504px] w-[392px] lg:h-[616px] lg:w-[476px]"
            style={{ background: 'transparent' }}
          >
            <ImageWithFallback
              src={photo}
              alt={`${siteConfig.name} — portrait`}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="absolute inset-0 h-full w-full object-cover object-top"
              style={{
                mixBlendMode: 'lighten',
                display: 'block',
                filter: 'grayscale(100%) contrast(1.1) brightness(1.05)',
                maskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(170deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.10) 60%, rgba(99,102,241,0.07) 100%)',
                mixBlendMode: 'color',
                maskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.4 }}
          className="absolute bottom-10 left-6 sm:left-10 hidden sm:flex items-center gap-3 text-xs font-mono text-[var(--ink-3)]"
        >
          <div className="h-px w-10 bg-[var(--ink-3)]" />
          <span>scroll to explore</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
