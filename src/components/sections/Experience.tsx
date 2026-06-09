import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../ui/Container';
import { TiltCard } from '../ui/TiltCard';
import { GlassCard } from '../ui/GlassCard';
import { GraduationCap, Code2, Target } from 'lucide-react';

const journeyData = [
  {
    title: 'Education',
    icon: GraduationCap,
    accent: '#00E5FF',
    content: (
      <>
        <h4 className="text-lg font-semibold text-[var(--ink-0)] mb-1">BSc (Hons) Computer Science</h4>
        <p className="text-sm text-[var(--ink-2)] mb-4">NSBM Green University<br/>Degree awarded by University of Plymouth (UK)</p>
        <p className="text-sm font-mono text-[var(--accent)] mb-6">Expected Graduation: 2026</p>
        <h5 className="text-sm font-semibold text-[var(--ink-1)] mb-3">Relevant Areas:</h5>
        <ul className="space-y-2">
          {['Software Engineering', 'Web Development', 'Database Systems', 'Cloud Computing', 'Human Computer Interaction'].map(item => (
            <li key={item} className="text-sm text-[var(--ink-2)] flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]/60 mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    )
  },
  {
    title: 'Current Focus',
    icon: Code2,
    accent: '#38BDF8',
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-[15px] font-semibold text-[var(--ink-0)] mb-1">AgroBridge</h4>
          <p className="text-sm text-[var(--ink-2)] leading-relaxed">Smart Paddy Stock & Supply Management System</p>
        </div>
        <div>
          <h4 className="text-[15px] font-semibold text-[var(--ink-0)] mb-1">FurnitureViz</h4>
          <p className="text-sm text-[var(--ink-2)] leading-relaxed">2D & 3D Interior Design Visualization Tool</p>
        </div>
        <div>
          <h4 className="text-[15px] font-semibold text-[var(--ink-0)] mb-1">Portfolio Development</h4>
          <p className="text-sm text-[var(--ink-2)] leading-relaxed">Production-grade developer portfolio built with React, TypeScript, Tailwind CSS, and modern frontend architecture.</p>
        </div>
      </div>
    )
  },
  {
    title: 'Career Goals',
    icon: Target,
    accent: '#22D3EE',
    content: (
      <div className="space-y-6">
        <ul className="space-y-3">
          {[
            'Seeking Software Engineering Internship opportunities',
            'Expanding Full-Stack Development expertise',
            'Building scalable web applications',
            'Learning modern backend and cloud technologies',
            'Growing into a professional Software Engineer'
          ].map(item => (
            <li key={item} className="text-sm text-[var(--ink-2)] flex items-start gap-2.5 leading-relaxed">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]/60 mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        
        <div className="pt-5 border-t border-white/5">
          <h4 className="text-[15px] font-semibold text-[var(--ink-0)] mb-3">Current Learning Focus</h4>
          <div className="flex flex-wrap gap-2">
            {[
              'Next.js',
              'Docker & Containerization',
              'Microsoft Azure',
              'MongoDB',
              'Express.js',
              'WebSockets & Socket.IO',
              'Advanced React Patterns'
            ].map(tech => (
              <span key={tech} className="px-2.5 py-1.5 text-[11px] rounded-full glass text-[var(--ink-1)] border border-white/5 bg-white/5">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }
];

export function Experience() {
  return (
    <section id="experience" className="relative py-20">
      <Container>
        <SectionHeading 
          label="EDUCATION" 
          title="My Journey So Far" 
        />
        <div className="max-w-3xl mb-12 -mt-8">
          <p className="text-lg text-[var(--ink-2)] leading-relaxed">
            Final-year Computer Science student focused on full-stack development, real-world software projects, and continuous learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {journeyData.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={i * 0.1}>
                <TiltCard intensity={3} className="h-full">
                  <GlassCard glowIntensity="medium" accentColor={card.accent} className="p-8 h-full flex flex-col relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-20 transition-opacity duration-700 group-hover:opacity-40 pointer-events-none" style={{ background: card.accent }} />
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-12 w-12 rounded-xl glass flex items-center justify-center border border-[var(--accent)]/20 shadow-[0_0_15px_rgba(0,229,255,0.1)] group-hover:scale-110 transition-transform duration-500" style={{ '--accent': card.accent } as React.CSSProperties}>
                        <Icon className="h-6 w-6 text-[var(--accent)]" />
                      </div>
                      <h3 className="font-serif text-2xl text-[var(--ink-0)]">{card.title}</h3>
                    </div>
                    <div className="flex-1">
                      {card.content}
                    </div>
                  </GlassCard>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
