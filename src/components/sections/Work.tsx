import { lazy, Suspense, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reveal } from '../ui/Reveal';
import { TiltCard } from '../ui/TiltCard';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../ui/Container';
import { GlassCard } from '../ui/GlassCard';
import { ExternalLink, Github, CheckCircle2, Users, Timer, Activity, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../types';
import { ProjectImage } from '../ui/ProjectImage';

const MatrixRain = lazy(() => import('../webgl/MatrixRain').then(m => ({ default: m.MatrixRain })));

export function Work() {
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);
  
  const displayedSupporting = otherProjects.slice(0, 2);
  const hiddenSupporting = otherProjects.slice(2);
  const hasMore = hiddenSupporting.length > 0;

  const handleToggle = () => {
    if (expanded && scrollRef.current) {
      const y = scrollRef.current.getBoundingClientRect().bottom + window.scrollY - window.innerHeight + 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setExpanded(!expanded);
  };

  return (
    <section id="work" className="relative py-20">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <SectionHeading 
            label="Case Studies" 
            title="Selected Engineering Work" 
            className="mb-0" 
          />
        </div>

        {/* Tier 1: Featured Project */}
        {featuredProject && (
          <div className="mb-20">
            <Reveal>
              <FeaturedProjectCard p={featuredProject} />
            </Reveal>
          </div>
        )}

        {/* Tier 2: Supporting Projects (Always Visible) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" ref={scrollRef}>
          {displayedSupporting.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>

        {/* Expandable Projects */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 pt-4">
                {hiddenSupporting.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                  >
                    <ProjectCard p={p} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <Reveal>
              <button 
                onClick={handleToggle}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass hover:bg-white/10 transition-colors text-[var(--ink-0)] font-medium text-sm border border-[var(--accent)]/30 shadow-[0_0_20px_rgba(0,229,255,0.05)] hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] group"
              >
                {expanded ? (
                  <>
                    Show Less
                    <ChevronUp className="h-4 w-4 text-[var(--accent)] group-hover:-translate-y-0.5 transition-transform" />
                  </>
                ) : (
                  <>
                    Show All Projects
                    <ChevronDown className="h-4 w-4 text-[var(--accent)] group-hover:translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </Reveal>
          </div>
        )}
      </Container>
    </section>
  );
}

export function FeaturedProjectCard({ p }: { p: Project }) {
  return (
    <TiltCard intensity={2} className="h-full">
      <GlassCard glowIntensity="high" accentColor={p.accent} className="group flex flex-col lg:flex-row overflow-hidden">
        {/* Viewport Left */}
        <div className="lg:w-[55%] relative border-b lg:border-b-0 lg:border-r border-white/5 bg-[#050816]/50 p-6 lg:p-8 flex items-center justify-center isolate">
          {p.matrix && (
            <Suspense fallback={null}>
              <MatrixRain className="absolute inset-0 h-full w-full opacity-30 pointer-events-none" />
            </Suspense>
          )}
          <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-30`} />
          
          <div 
            className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#0A1029] shadow-[0_20px_50px_rgba(0,229,255,0.1)] group/window isolate transition-transform duration-500 md:group-hover:scale-[1.02]"
            style={{ containerType: 'size' }}
          >
            {/* Mac window dots */}
            <div className="absolute top-0 left-0 w-full h-8 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 flex items-center px-4 gap-2 z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <ProjectImage 
              src={p.screenshot}
              alt={p.title}
              className="absolute top-8 left-0 w-full h-auto transition-transform ease-in-out will-change-transform md:group-hover/window:-translate-y-[calc(100%-100cqh+2rem)] z-10"
              style={{ transitionDuration: '10s' }}
            />
          </div>
        </div>

        {/* Case Study Right */}
        <div className="lg:w-[45%] p-8 lg:p-10 flex flex-col relative bg-[#050816]/30">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-4 rounded-full glass text-[11px] font-mono text-[var(--accent)] border border-[var(--accent)]/20 shadow-[0_0_10px_rgba(0,229,255,0.1)]">
                <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" /></span>
                Featured Project
              </div>
              <h3 className="font-serif text-3xl text-[var(--ink-0)] leading-tight">{p.title}</h3>
            </div>
          </div>

          <p className="text-[var(--ink-1)] text-lg leading-relaxed mb-8">{p.description}</p>

          {/* Metrics Row */}
          {p.metrics && (
            <div className="grid grid-cols-2 gap-3 mb-8">
              {Array.isArray(p.metrics) ? (
                p.metrics.map((metric, i) => (
                  <div key={i} className="p-3 rounded-lg glass border border-[var(--accent)]/10 bg-[var(--accent)]/5 flex flex-col justify-center items-center text-center h-[72px]">
                    <div className="text-sm font-medium text-[var(--ink-0)]">{metric}</div>
                  </div>
                ))
              ) : (
                <>
                  {p.metrics.users && (
                    <div className="p-3 rounded-lg glass border border-white/5 flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[var(--ink-3)] font-mono"><Users className="h-3 w-3" /> Users</div>
                      <div className="text-sm font-semibold text-[var(--ink-0)]">{p.metrics.users}</div>
                    </div>
                  )}
                  {p.metrics.performanceGain && (
                    <div className="p-3 rounded-lg glass border border-[var(--accent)]/10 bg-[var(--accent)]/5 flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[var(--accent)] font-mono"><Activity className="h-3 w-3" /> Performance</div>
                      <div className="text-sm font-semibold text-[var(--ink-0)]">{p.metrics.performanceGain}</div>
                    </div>
                  )}
                  {p.metrics.duration && (
                    <div className="p-3 rounded-lg glass border border-white/5 flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[var(--ink-3)] font-mono"><Timer className="h-3 w-3" /> Duration</div>
                      <div className="text-sm font-semibold text-[var(--ink-0)]">{p.metrics.duration}</div>
                    </div>
                  )}
                  {p.metrics.role && (
                    <div className="p-3 rounded-lg glass border border-white/5 flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[var(--ink-3)] font-mono"><Award className="h-3 w-3" /> Role</div>
                      <div className="text-sm font-semibold text-[var(--ink-0)]">{p.metrics.role}</div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <div className="space-y-6 mb-8 flex-1">
            {p.problem && (
              <div>
                <h4 className="text-sm font-semibold text-[var(--ink-0)] mb-1 flex items-center gap-2">Problem</h4>
                <p className="text-sm text-[var(--ink-2)] leading-relaxed">{p.problem}</p>
              </div>
            )}
            {p.solution && (
              <div>
                <h4 className="text-sm font-semibold text-[var(--ink-0)] mb-1 flex items-center gap-2">Solution</h4>
                <p className="text-sm text-[var(--ink-2)] leading-relaxed">{p.solution}</p>
              </div>
            )}
            
            {p.features && p.features.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-[var(--ink-0)] mb-2 flex items-center gap-2">Key Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {p.features.map(f => (
                    <li key={f} className="text-sm text-[var(--ink-2)] flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-auto space-y-6">
            <div className="flex flex-wrap gap-2">
              {p.techStack.map((s) => (
                <span key={s} className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 text-[var(--ink-1)]">{s}</span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-white/5">
              {p.githubUrl && p.githubUrl !== '#' && (
                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full glass text-sm font-medium text-[var(--ink-1)] hover:bg-white/10 hover:text-white transition-colors w-full sm:w-auto">
                  <Github className="h-4 w-4" /> View Source
                </a>
              )}
              {p.liveUrl && p.liveUrl !== '#' && (
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[#050816] text-sm font-medium hover:bg-[var(--accent-highlight)] transition-colors shadow-[0_0_20px_rgba(0,229,255,0.3)] w-full sm:w-auto">
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </TiltCard>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <TiltCard intensity={2} className="h-full">
      <GlassCard glowIntensity="medium" accentColor={p.accent} className="group flex flex-col h-full overflow-hidden">
        {/* Viewport Top */}
        <div className="relative w-full aspect-[16/10] bg-[#050816]/50 border-b border-white/5 p-4 sm:p-6 flex items-center justify-center isolate">
          <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-30`} />
          
          <div 
            className="relative w-full h-full overflow-hidden rounded-lg border border-white/10 bg-[#0A1029] shadow-xl group/window isolate transition-transform duration-500 md:group-hover:scale-[1.02]"
            style={{ containerType: 'size' }}
          >
            {/* Mac window dots */}
            <div className="absolute top-0 left-0 w-full h-6 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 flex items-center px-3 gap-1.5 z-20">
              <div className="w-2 h-2 rounded-full bg-red-500/80" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <div className="w-2 h-2 rounded-full bg-green-500/80" />
            </div>
            <ProjectImage 
              src={p.screenshot}
              alt={p.title}
              className="absolute top-6 left-0 w-full h-auto transition-transform ease-in-out will-change-transform md:group-hover/window:-translate-y-[calc(100%-100cqh+1.5rem)] z-10"
              style={{ transitionDuration: '8s' }}
            />
          </div>
        </div>

        {/* Info Bottom */}
        <div className="p-6 sm:p-8 flex flex-col flex-1 relative bg-[#050816]/30">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="font-serif text-2xl text-[var(--ink-0)] leading-tight">{p.title}</h3>
            <div className="flex items-center gap-2">
              {p.githubUrl && p.githubUrl !== '#' && (
                <a href={p.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="h-8 w-8 rounded-full glass flex items-center justify-center hover:bg-white/10 text-[var(--ink-2)] hover:text-white transition-colors">
                  <Github className="h-4 w-4" />
                </a>
              )}
              {p.liveUrl && p.liveUrl !== '#' && (
                <a href={p.liveUrl} target="_blank" rel="noreferrer" aria-label="Live demo" className="h-8 w-8 rounded-full glass flex items-center justify-center hover:bg-white/10 text-[var(--ink-2)] hover:text-white transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <p className="text-[var(--ink-2)] text-sm leading-relaxed mb-6">{p.description}</p>

          <div className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-white/5">
            {p.techStack.map((s) => (
              <span key={s} className="px-2.5 py-1 text-[11px] rounded-full glass text-[var(--ink-2)]">{s}</span>
            ))}
          </div>
        </div>
      </GlassCard>
    </TiltCard>
  );
}
