import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
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

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothMx = useSpring(mx, { stiffness: 40, damping: 25, mass: 0.5 });
  const smoothMy = useSpring(my, { stiffness: 40, damping: 25, mass: 0.5 });

  const photoX = useTransform(smoothMx, [-1, 1], [3, -3]);
  const photoY = useTransform(smoothMy, [-1, 1], [3, -3]);
  const particlesX = useTransform(smoothMx, [-1, 1], [8, -8]);
  const particlesY = useTransform(smoothMy, [-1, 1], [8, -8]);
  const glowX = useTransform(smoothMx, [-1, 1], [15, -15]);
  const glowY = useTransform(smoothMy, [-1, 1], [15, -15]);

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <section ref={ref} id="top" style={{ position: 'relative' }} className="relative min-h-[90svh] w-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'var(--grad-hero)' }} />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="noise" />

      {/* Particle network (Lazy Loaded) */}
      <motion.div style={{ x: particlesX, y: particlesY }} className="absolute inset-0 pointer-events-none z-0">
        <Suspense fallback={null}>
          <ParticleNetwork className="h-full w-full" />
        </Suspense>
      </motion.div>
      <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[5%] top-[20%] h-[40vh] w-[40vh] rounded-full bg-[#00E5FF]/10 blur-[140px]" />
        <div className="absolute left-[-5%] bottom-[10%] h-[35vh] w-[35vh] rounded-full bg-[#38BDF8]/10 blur-[140px]" />
      </motion.div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 pt-40 sm:pt-48 pb-24 flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-[var(--ink-2)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
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
            {lastName}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
          className="mt-7 max-w-xl text-[17px] sm:text-lg leading-relaxed"
          style={{ color: '#E2E8F0' }}
        >
          {siteConfig.role}. Building scalable web applications, AI-powered systems,
          and modern digital experiences. Final-year CS student at the University of Plymouth.
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
              <span className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] via-[#38BDF8] to-[#22D3EE] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
          <motion.div
            style={{ x: photoX, y: photoY }}
            className="relative h-[580px] w-[450px] lg:h-[710px] lg:w-[550px]"
          >
            <div style={{ background: 'transparent' }} className="absolute inset-0">
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
                background: 'radial-gradient(ellipse at 50% 40%, rgba(34, 211, 238, 0.18) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 75%)',
                mixBlendMode: 'color',
                maskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 100%)',
              }}
            />
            </div>
          </motion.div>
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
