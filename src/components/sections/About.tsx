import { useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Reveal } from '../ui/Reveal';
import { TiltCard } from '../ui/TiltCard';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useInViewMount } from '../../hooks/useInViewMount';
import { aboutData } from '../../data/about';
import { siteConfig } from '../../config/site';
import { Container } from '../ui/Container';
import photo from '../../imports/Me.png';

const WaveBackground = lazy(() => import('../webgl/WaveBackground').then(m => ({ default: m.WaveBackground })));

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const { ref: waveRef, active: waveActive } = useInViewMount<HTMLDivElement>();

  return (
    <section id="about" ref={ref} style={{ position: 'relative' }} className="relative py-20">
      <div ref={waveRef} className="absolute inset-0 pointer-events-none">
        {waveActive && (
          <Suspense fallback={null}>
            <WaveBackground className="absolute inset-0 h-full w-full" />
          </Suspense>
        )}
      </div>
      <motion.div style={{ y }} className="absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-[#00E5FF]/10 blur-[120px]" />
      <motion.div style={{ y }} className="absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[#38BDF8]/10 blur-[120px]" />

      <Container className="relative">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-16 items-start">
          
          {/* ── LEFT COLUMN: label + heading + identity badge ── */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--ink-3)]">— About</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif leading-tight text-gradient whitespace-pre-line" style={{ fontSize: 'var(--text-h2)' }}>
                {aboutData.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex items-center gap-3 mt-2">
                <div className="h-2 w-2 rounded-full bg-[var(--accent)] glow-accent flex-shrink-0" />
                <div>
                  <div className="font-mono text-xs text-[var(--ink-3)] uppercase tracking-widest">{siteConfig.location}</div>
                  <div className="font-serif italic text-lg text-[var(--ink-0)]">{siteConfig.name}</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT COLUMN: paragraphs + metric cards ── */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Reveal delay={0.05}>
              <p className="text-xl sm:text-2xl leading-[1.55] text-[var(--ink-1)] font-serif max-w-[600px]" dangerouslySetInnerHTML={{ __html: aboutData.bioPrimary.replace('University of Plymouth', '<em className="text-[var(--accent)]">University of Plymouth</em>').replace('full-stack development', '<em className="text-[var(--accent-2)]">full-stack development</em>') }} />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base sm:text-lg leading-[1.8] text-[var(--ink-2)] max-w-[600px]">
                {aboutData.bioSecondary}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="grid grid-cols-3 gap-4 pt-2">
                {aboutData.metrics.map((s) => (
                  <div
                    key={s.v}
                    className="glass rounded-2xl p-5 flex flex-col justify-center"
                    style={{ border: '1px solid rgba(99,102,241,0.20)' }}
                  >
                    <div
                      className="font-serif text-xl sm:text-2xl leading-tight"
                      style={{ color: '#ffffff', fontWeight: 700 }}
                    >
                      {s.k}
                    </div>
                    <div className="mt-2 text-xs" style={{ color: '#94A3B8' }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── PHOTO COLUMN: floats right, no text collision ── */}
          <div className="hidden lg:flex lg:col-span-3 justify-center items-start">
            <Reveal delay={0.1}>
              <TiltCard intensity={6}>
                <div
                  className="relative w-[260px] xl:w-[300px]"
                  style={{ background: 'transparent' }}
                >
                  <div className="relative aspect-[3/4]">
                    <ImageWithFallback
                      src={photo}
                      alt={siteConfig.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                      style={{
                        mixBlendMode: 'lighten',
                        display: 'block',
                        filter: 'grayscale(100%) contrast(1.1) brightness(1.05)',
                        maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
                      }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(170deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.10) 60%, rgba(99,102,241,0.07) 100%)',
                        mixBlendMode: 'color',
                        maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
                      }}
                    />
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>

        </div>
      </Container>
    </section>
  );
}

