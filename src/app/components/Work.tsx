import { Reveal } from './Reveal';
import { Tilt3D } from './Tilt3D';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { MatrixRain } from './MatrixRain';
import { useInViewMount } from './useInViewMount';

type Project = {
  title: string;
  tag: string;
  year: string;
  stack: string[];
  impact: string[];
  gradient: string;
  accent: string;
  github: string;
  demo: string;
  span?: string;
  matrix?: boolean;
};

const projects: Project[] = [
  {
    title: 'Nebula Analytics',
    tag: 'Realtime · Web',
    year: '2026',
    stack: ['React', 'TypeScript', 'WebSockets', 'PostgreSQL'],
    impact: [
      'Reduced p95 dashboard latency from 1.8s to 240ms via streaming pipelines',
      'Adopted by 3 internal teams; handles 8M events/day',
    ],
    gradient: 'from-[#a78bfa]/35 via-[#818cf8]/25 to-[#0a0c10]',
    accent: '#a78bfa',
    github: '#',
    demo: '#',
    span: 'lg:col-span-2 lg:row-span-2',
    matrix: true,
  },
  {
    title: 'Mira Research',
    tag: 'Thesis · ML',
    year: '2024',
    stack: ['Python', 'PyTorch', 'FastAPI'],
    impact: [
      'Multimodal retrieval — 92% benchmark relevance',
      'Cut paper-discovery time by ~60% in user study',
    ],
    gradient: 'from-[#c4b5fd]/30 via-[#a78bfa]/15 to-[#0a0c10]',
    accent: '#c4b5fd',
    github: '#',
    demo: '#',
  },
  {
    title: 'Halcyon CMS',
    tag: 'Open Source',
    year: '2025',
    stack: ['Node', 'GraphQL', 'tRPC', 'Docker'],
    impact: [
      'Headless CMS — 2.4k GitHub stars',
      'Zero-config deploys via custom CLI',
    ],
    gradient: 'from-[#818cf8]/30 via-[#a78bfa]/15 to-[#0a0c10]',
    accent: '#818cf8',
    github: '#',
    demo: '#',
  },
  {
    title: 'Aurora Studio',
    tag: 'Brand · 3D',
    year: '2025',
    stack: ['Three.js', 'Motion', 'Lenis'],
    impact: [
      'Awwwards SOTD shortlist',
      'Maintains 60fps on mid-tier mobile via GPU-bound shaders',
    ],
    gradient: 'from-[#a78bfa]/30 via-[#c4b5fd]/15 to-[#0a0c10]',
    accent: '#a78bfa',
    github: '#',
    demo: '#',
    span: 'lg:col-span-2',
  },
];

export function Work() {
  return (
    <section id="work" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <Reveal>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--ink-3)] mb-4">— Projects</p>
              <h2 className="font-serif text-4xl sm:text-6xl leading-tight max-w-2xl text-gradient">
                Things I've made, recently.
              </h2>
            </div>
          </Reveal>
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
      </div>
    </section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const { ref, active } = useInViewMount<HTMLDivElement>();
  return (
    <Tilt3D intensity={4} className="h-full">
      <motion.div
        ref={ref as any}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="group relative h-full glass-strong glow-ring overflow-hidden p-6 sm:p-7 flex flex-col"
        style={{ borderRadius: 22 }}
      >
        {p.matrix && active && (
          <MatrixRain className="absolute inset-0 h-full w-full opacity-50 pointer-events-none" />
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`} />
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-30 transition-opacity duration-700 group-hover:opacity-80 pointer-events-none" style={{ background: p.accent }} />

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
      </motion.div>
    </Tilt3D>
  );
}
