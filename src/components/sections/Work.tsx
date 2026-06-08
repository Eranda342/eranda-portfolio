import { lazy, Suspense } from 'react';
import { Reveal } from '../ui/Reveal';
import { TiltCard } from '../ui/TiltCard';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../ui/Container';
import { GlassCard } from '../ui/GlassCard';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { useInViewMount } from '../../hooks/useInViewMount';
import { projects } from '../../data/projects';
import type { Project } from '../../types';

const MatrixRain = lazy(() => import('../webgl/MatrixRain').then(m => ({ default: m.MatrixRain })));

export function Work() {
  return (
    <section id="work" className="relative py-20">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <SectionHeading 
            label="Projects" 
            title="Things I've made, recently." 
            className="mb-0" 
          />
          <Reveal delay={0.1}>
            <a href="#contact" className="inline-flex items-center gap-2 text-sm text-[var(--ink-2)] link-underline">
              Full archive <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 auto-rows-fr gap-5 sm:gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className={p.span ?? ''}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const { ref, active } = useInViewMount<HTMLDivElement>();
  return (
    <TiltCard intensity={4} className="h-full">
      <GlassCard
        ref={ref as any}
        glowIntensity="high"
        accentColor={p.accent}
        className="group h-full p-6 sm:p-7 flex flex-col transition-transform duration-500 ease-out hover:-translate-y-1.5"
      >
        {p.matrix && active && (
          <Suspense fallback={null}>
            <MatrixRain className="absolute inset-0 h-full w-full opacity-50 pointer-events-none" />
          </Suspense>
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`} />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-[var(--ink-3)]">{p.tag}</p>
            <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-[var(--ink-0)] leading-tight">{p.title}</h3>
          </div>
          <div className="font-mono text-xs text-[var(--ink-3)]">{p.year}</div>
        </div>

        <ul className="relative mt-6 space-y-2">
          {p.impact.map((line) => (
            <li key={line} className="text-sm text-[var(--ink-1)] leading-relaxed flex gap-2">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--accent)]" />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="relative mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="px-2.5 py-1 text-xs rounded-full glass text-[var(--ink-2)]">{s}</span>
          ))}
        </div>

        <div className="relative mt-auto pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href={p.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="h-9 w-9 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a href={p.demo} target="_blank" rel="noreferrer" aria-label="Live demo" className="h-9 w-9 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <span className="h-10 w-10 rounded-full glass flex items-center justify-center transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </GlassCard>
    </TiltCard>
  );
}
