import { Reveal } from './Reveal';
import { Tilt3D } from './Tilt3D';
import { Code2, Palette, Server, Boxes, Zap, Layers } from 'lucide-react';

type ShapeKind = 'cube' | 'torus' | 'octa' | 'pyramid' | 'sphere' | 'prism';

const groups: { icon: typeof Code2; title: string; items: string[]; shape: ShapeKind; color: string }[] = [
  { icon: Code2, title: 'Languages',     items: ['TypeScript', 'Python', 'Rust', 'Go'],                       shape: 'cube',    color: '#a78bfa' },
  { icon: Boxes, title: 'Frameworks',    items: ['React · Next.js', 'Three.js · R3F', 'FastAPI', 'PyTorch'],  shape: 'torus',   color: '#818cf8' },
  { icon: Server, title: 'Cloud · DB',   items: ['PostgreSQL · Redis', 'AWS · DigitalOcean', 'Prisma', 'Edge'], shape: 'octa',  color: '#c4b5fd' },
  { icon: Layers, title: 'Dev Tools',    items: ['Docker · Nginx', 'GitHub Actions', 'Vite · Turbo', 'Vercel'], shape: 'pyramid', color: '#a78bfa' },
  { icon: Palette, title: 'Design',      items: ['Figma', 'Design tokens', 'Motion · GSAP', 'Accessibility'], shape: 'sphere',  color: '#818cf8' },
  { icon: Zap, title: 'Performance',     items: ['Core Web Vitals', 'Lighthouse 95+', 'Edge caching', 'Profiling'], shape: 'prism', color: '#c4b5fd' },
];

function Shape3D({ kind, color }: { kind: ShapeKind; color: string }) {
  const common = "absolute inset-0 [transform-style:preserve-3d] [animation:spin3d_14s_linear_infinite] group-hover:[animation-duration:4s]";
  if (kind === 'torus') {
    return (
      <div className="relative h-14 w-14" style={{ perspective: 400 }}>
        <div className={common}>
          {[0, 30, 60, 90, 120, 150].map((a) => (
            <span key={a} className="absolute inset-0 rounded-full border" style={{ borderColor: color, opacity: 0.5, transform: `rotateX(70deg) rotateZ(${a}deg)` }} />
          ))}
        </div>
      </div>
    );
  }
  if (kind === 'sphere') {
    return (
      <div className="relative h-14 w-14" style={{ perspective: 400 }}>
        <div className={common}>
          {[0, 45, 90, 135].map((a) => (
            <span key={a} className="absolute inset-1 rounded-full border" style={{ borderColor: color, opacity: 0.55, transform: `rotateY(${a}deg)` }} />
          ))}
          {[0, 60, 120].map((a) => (
            <span key={`b${a}`} className="absolute inset-1 rounded-full border" style={{ borderColor: color, opacity: 0.35, transform: `rotateX(${a}deg)` }} />
          ))}
        </div>
      </div>
    );
  }
  // cube / octa / pyramid / prism — all cube-derived for crispness
  const faces = [
    { t: 'translateZ(28px)' },
    { t: 'rotateY(180deg) translateZ(28px)' },
    { t: 'rotateY(90deg) translateZ(28px)' },
    { t: 'rotateY(-90deg) translateZ(28px)' },
    { t: 'rotateX(90deg) translateZ(28px)' },
    { t: 'rotateX(-90deg) translateZ(28px)' },
  ];
  const tilt = kind === 'octa' ? 'rotateX(45deg) rotateZ(45deg)' : kind === 'pyramid' ? 'rotateX(30deg)' : kind === 'prism' ? 'rotateY(30deg) rotateZ(15deg)' : '';
  return (
    <div className="relative h-14 w-14" style={{ perspective: 400 }}>
      <div className={common} style={{ transform: tilt }}>
        {faces.map((f, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 border"
            style={{
              transform: f.t,
              borderColor: color,
              background: `linear-gradient(135deg, ${color}22, transparent)`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-20">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <style>{`@keyframes spin3d { from { transform: rotateX(0deg) rotateY(0deg); } to { transform: rotateX(360deg) rotateY(360deg); } }`}</style>
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--ink-3)] mb-4">— Capabilities</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-serif text-4xl sm:text-6xl leading-tight max-w-3xl text-gradient mb-16">
            A toolkit built around <em className="text-[var(--accent)]">production-grade</em> work.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.title} delay={i * 0.06}>
                <Tilt3D intensity={9} className="h-full">
                  <div className="group relative glass glow-ring p-6 h-full hover-lift overflow-hidden">
                    <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full blur-3xl opacity-30 transition-opacity duration-700 group-hover:opacity-70" style={{ background: g.color }} />
                    <div className="relative flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#a78bfa]/25 to-[#818cf8]/15 flex items-center justify-center border border-[var(--line)] group-hover:border-[var(--accent)]/50 transition-colors">
                          <Icon className="h-4 w-4 text-[var(--accent)]" />
                        </div>
                        <h3 className="font-serif text-xl text-[var(--ink-0)]">{g.title}</h3>
                      </div>
                      <Shape3D kind={g.shape} color={g.color} />
                    </div>
                    <ul className="relative space-y-2">
                      {g.items.map((item) => (
                        <li key={item} className="text-sm text-[var(--ink-2)] flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-[var(--accent)]/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tilt3D>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
