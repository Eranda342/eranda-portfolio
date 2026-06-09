import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { TiltCard } from '../ui/TiltCard';
import { Server, Zap, Database, Layout } from 'lucide-react';

const highlights = [
  {
    title: 'Full-Stack Web Development',
    description: 'Building complete web applications using modern frontend and backend technologies.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    icon: Server,
    accent: '#00E5FF'
  },
  {
    title: 'Real-Time Applications',
    description: 'Developing interactive systems with live updates, realtime communication, and collaborative features.',
    tech: ['Socket.IO', 'WebSockets', 'JWT', 'REST APIs'],
    icon: Zap,
    accent: '#38BDF8'
  },
  {
    title: 'Database & Cloud',
    description: 'Designing secure databases and deploying scalable applications with cloud services.',
    tech: ['MongoDB', 'MySQL', 'Microsoft Azure', 'Cloudinary'],
    icon: Database,
    accent: '#22D3EE'
  },
  {
    title: 'UI / UX Development',
    description: 'Creating responsive and engaging user experiences with modern frontend technologies and motion design.',
    tech: ['Tailwind CSS', 'TypeScript', 'Framer Motion', 'Figma'],
    icon: Layout,
    accent: '#00E5FF'
  }
];

export function EngineeringHighlights() {
  return (
    <section className="relative py-20">
      <Container>
        <SectionHeading 
          label="Capabilities" 
          title="Engineering Highlights" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.1}>
              <TiltCard intensity={2} className="h-full">
                <GlassCard accentColor={h.accent} glowIntensity="low" className="p-8 h-full flex flex-col group hover:-translate-y-1 transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl glass flex items-center justify-center border border-[var(--accent)]/20 shadow-[0_0_15px_rgba(0,229,255,0.1)] group-hover:scale-110 transition-transform duration-500" style={{ '--accent': h.accent } as React.CSSProperties}>
                      <h.icon className="h-6 w-6 text-[var(--accent)]" />
                    </div>
                    <h3 className="font-serif text-2xl text-[var(--ink-0)]">{h.title}</h3>
                  </div>
                  <p className="text-[var(--ink-2)] leading-relaxed mb-8 flex-1">{h.description}</p>
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                    {h.tech.map(t => (
                      <span key={t} className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 text-[var(--ink-1)]">{t}</span>
                    ))}
                  </div>
                </GlassCard>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
