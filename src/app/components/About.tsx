import { Reveal } from './Reveal';
import { Tilt3D } from './Tilt3D';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { WaveBackground } from './WaveBackground';
import { useInViewMount } from './useInViewMount';
import photo from '../../imports/Me.png';

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const { ref: waveRef, active: waveActive } = useInViewMount<HTMLDivElement>();

  return (
    <section id="about" ref={ref} style={{ position: 'relative' }} className="relative py-20">
      <div ref={waveRef} className="absolute inset-0 pointer-events-none">
        {waveActive && <WaveBackground className="absolute inset-0 h-full w-full" />}
      </div>
      <motion.div style={{ y }} className="absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-[#a78bfa]/10 blur-[120px]" />
      <motion.div style={{ y }} className="absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[#818cf8]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-16 items-start">

          {/* ── LEFT COLUMN: label + heading + identity badge ── */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--ink-3)]">— About</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif text-4xl sm:text-5xl leading-tight text-gradient">
                A quiet builder,<br />focused on craft.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex items-center gap-3 mt-2">
                <div className="h-2 w-2 rounded-full bg-[var(--accent)] glow-accent flex-shrink-0" />
                <div>
                  <div className="font-mono text-xs text-[var(--ink-3)] uppercase tracking-widest">Colombo, Sri Lanka</div>
                  <div className="font-serif italic text-lg text-[var(--ink-0)]">Eranda Buddhika</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT COLUMN: paragraphs + metric cards ── */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Reveal delay={0.05}>
              <p className="text-xl sm:text-2xl leading-[1.55] text-[var(--ink-1)] font-serif max-w-[600px]">
                Final-year Computer Science student at the{' '}
                <em className="text-[var(--accent)]">University of Colombo</em>,
                graduating 2026. Specializing in{' '}
                <em className="text-[var(--accent-2)]">AI/ML and Full-Stack Development</em>.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base sm:text-lg leading-[1.8] text-[var(--ink-2)] max-w-[600px]">
                For the past four years I've shipped full-stack systems, motion-led marketing
                sites, and the occasional ML experiment. My favorite work sits in the
                overlap of performance, accessibility, and detail — the kind of polish you
                feel before you notice.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { k: '20+', v: 'Projects shipped' },
                  { k: '4 yrs', v: 'Building on the web' },
                  { k: '3.8', v: 'CGPA' },
                ].map((s) => (
                  <div
                    key={s.v}
                    className="glass rounded-2xl p-5"
                    style={{ border: '1px solid rgba(99,102,241,0.20)' }}
                  >
                    <div
                      className="font-serif text-3xl sm:text-4xl"
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
              <Tilt3D intensity={6}>
                <div
                  className="relative w-[260px] xl:w-[300px]"
                  style={{ background: 'transparent' }}
                >
                  <div className="relative aspect-[3/4]">
                    <ImageWithFallback
                      src={photo}
                      alt="Eranda Buddhika"
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
              </Tilt3D>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
