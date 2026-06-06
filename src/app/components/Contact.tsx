import { Reveal } from './Reveal';
import { Tilt3D } from './Tilt3D';
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from 'lucide-react';

const socials = [
  { icon: Github, label: 'GitHub', handle: '@erandabuddhika', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', handle: 'in/erandabuddhika', href: '#' },
  { icon: Twitter, label: 'Twitter', handle: '@erandabldhka', href: '#' },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#5eead4]/10 blur-[160px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#a78bfa]/12 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--ink-3)] mb-6 text-center">— Get in touch</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-center text-gradient">
            Have a project
          </h2>
          <h2 className="font-serif italic text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-center text-gradient-accent mt-2">
            in mind?
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-10 text-lg text-[var(--ink-2)] text-center max-w-xl mx-auto">
            I'm open to internships, freelance, and ambitious collaborations.
            Reach out — I read every message.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 flex justify-center">
            <Tilt3D intensity={6}>
              <a
                href="mailto:hello@erandabuddhika.com"
                className="group relative inline-flex items-center gap-4 pl-7 pr-3 py-3 rounded-full glass-strong glow-ring hover:bg-white/5 transition-colors"
              >
                <Mail className="h-5 w-5 text-[var(--accent)]" />
                <span className="font-serif text-xl sm:text-2xl">hello@erandabuddhika.com</span>
                <span className="h-11 w-11 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </a>
            </Tilt3D>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-20 grid sm:grid-cols-3 gap-4">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="group glass p-5 flex items-center justify-between hover-lift">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[var(--ink-2)] group-hover:text-[var(--accent)] transition-colors" />
                    <div>
                      <div className="text-sm text-[var(--ink-0)]">{s.label}</div>
                      <div className="text-xs text-[var(--ink-3)] font-mono">{s.handle}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[var(--ink-3)] group-hover:text-[var(--ink-0)] group-hover:rotate-45 transition-all" />
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
