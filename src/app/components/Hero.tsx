import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import { ParticleNetwork } from './ParticleNetwork';
import { ImageWithFallback } from './figma/ImageWithFallback';
import photo from '../../imports/Me.png';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <section ref={ref} id="top" style={{ position: 'relative' }} className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'var(--grad-hero)' }} />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="noise" />

      {/* Particle network */}
      <ParticleNetwork className="absolute inset-0 h-full w-full" />
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

        <h1 className="mt-8 font-serif tracking-tight leading-[0.95] text-[clamp(2.8rem,9vw,7.5rem)] max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="block text-gradient"
          >
            Eranda
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="block italic text-gradient-accent"
          >
            Buddhika.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
          className="mt-7 max-w-xl text-[17px] sm:text-lg leading-relaxed"
          style={{ color: '#E2E8F0' }}
        >
          Aspiring Software Engineer · Building scalable web apps. Final-year CS student
          crafting calm, cinematic, production-grade interfaces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#work"
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black overflow-hidden hover-lift"
          >
            <span className="relative z-10">View My Work</span>
            <ArrowDownRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#a78bfa] via-[#818cf8] to-[#c4b5fd] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          <a
            href="https://github.com"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm hover:bg-white/5 transition-colors"
            style={{ color: '#E2E8F0', border: '1px solid #334155' }}
          >
            <Sparkles className="h-4 w-4 text-[var(--accent)]" />
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm hover:bg-white/5 transition-colors"
            style={{ color: '#E2E8F0', border: '1px solid #334155' }}
          >
            LinkedIn
          </a>
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
            {/* Grayscale portrait — lighten blends white areas into the dark canvas */}
            <ImageWithFallback
              src={photo}
              alt="Eranda Buddhika — portrait"
              className="absolute inset-0 h-full w-full object-cover object-top"
              style={{
                mixBlendMode: 'lighten',
                display: 'block',
                filter: 'grayscale(100%) contrast(1.1) brightness(1.05)',
                maskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
              }}
            />
            {/* Indigo/purple ambient tint — mix-blend-mode:color recolors gray midtones
                with violet atmosphere without touching luminosity values */}
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
