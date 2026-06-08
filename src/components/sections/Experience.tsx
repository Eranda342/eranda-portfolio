import { Reveal } from '../ui/Reveal';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../ui/Container';
import { experienceItems } from '../../data/experience';
import type { ExperienceItem } from '../../types';

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" style={{ position: 'relative' }} className="relative py-20">
      <Container>
        <SectionHeading 
          label="Journey" 
          title="Four years of compounding craft." 
        />

        <div ref={ref} className="relative grid lg:grid-cols-12 gap-x-8 gap-y-16" style={{ position: 'relative', minHeight: '100px' }}>
          {/* Static track line — full height of the grid */}
          <div className="absolute left-[7px] sm:left-[11px] lg:left-[calc(33.333%-1px)] top-0 bottom-0 w-px bg-[var(--line)]" style={{ position: 'absolute' }} />
          {/* Animated fill line driven by scroll progress */}
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: 'top', position: 'absolute' }}
            className="absolute left-[7px] sm:left-[11px] lg:left-[calc(33.333%-1px)] top-0 bottom-0 w-px bg-gradient-to-b from-[#5eead4] via-[#7dd3fc] to-transparent"
          />

          {experienceItems.map((it, i) => (
            <TimelineItem key={it.role} it={it} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TimelineItem({ it, index }: { it: ExperienceItem; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const inView = useInView(itemRef, { once: true, margin: '-30% 0px -30% 0px' });
  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.0, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-12 grid lg:grid-cols-12 gap-x-8 items-start pl-8 sm:pl-10 lg:pl-0 pb-12 last:pb-0"
      style={{ position: 'relative' }}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0.5 }}
        animate={inView ? { scale: 1.15, opacity: 1, boxShadow: '0 0 24px rgba(167,139,250,0.85)' } : {}}
        transition={{ duration: 0.7, delay: index * 0.06 + 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-1.5 lg:left-[calc(33.333%-7px)] h-3.5 w-3.5 rounded-full bg-[var(--bg-0)] border-2 border-[var(--accent)]"
      />
      <div className="lg:col-span-4 lg:text-right lg:pr-12">
        <p className="font-mono text-xs text-[var(--ink-3)]">{it.period}</p>
      </div>
      <div className="lg:col-span-8 lg:pl-12">
        <h3 className="font-serif text-2xl sm:text-3xl text-[var(--ink-0)]">{it.role}</h3>
        <p className="mt-1 text-sm text-[var(--accent)]">{it.org}</p>
        <p className="mt-4 text-[var(--ink-2)] leading-relaxed max-w-2xl">{it.blurb}</p>
      </div>
    </motion.div>
  );
}
