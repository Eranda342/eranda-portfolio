import { Reveal } from '../ui/Reveal';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, GraduationCap, Briefcase, Download, Phone } from 'lucide-react';
import { Container } from '../ui/Container';
import { socialLinks } from '../../config/navigation';

const socials = [
  { icon: Github, label: 'GitHub', handle: '@Eranda342', href: socialLinks.github },
  { icon: Linkedin, label: 'LinkedIn', handle: 'in/eranda-buddhika342', href: socialLinks.linkedin },
  { icon: Phone, label: 'Phone', handle: '+94 70 314 3229', href: `tel:${socialLinks.phone}` },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#00E5FF]/10 blur-[160px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#00E5FF]/12 blur-[140px]" />
      </div>

      <Container className="relative max-w-6xl">
        <Reveal>
          <div className="flex flex-col items-center mb-8">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00E5FF]/30 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="text-xs font-mono text-white tracking-wider">Available for Internships • 2026</span>
             </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-center text-gradient">
            Open to
          </h2>
          <h2 className="font-serif italic text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-center text-gradient-accent mt-2">
            Opportunities.
          </h2>
        </Reveal>
        
        <Reveal delay={0.15}>
          <p className="mt-8 text-lg text-[var(--ink-2)] text-center max-w-2xl mx-auto leading-relaxed">
            Final-year Computer Science student seeking internship and graduate software engineering opportunities. Open to collaborations, innovative projects, and conversations about technology.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="glass p-5 rounded-2xl flex items-start gap-4 border border-white/5 hover:border-[#00E5FF]/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#00E5FF]" />
              </div>
              <div className="flex flex-col">
                 <span className="text-sm font-semibold text-white">Location</span>
                 <span className="text-xs text-slate-400 mt-1">Colombo, Sri Lanka</span>
              </div>
            </div>
            
            <div className="glass p-5 rounded-2xl flex items-start gap-4 border border-white/5 hover:border-[#00E5FF]/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-[#00E5FF]" />
              </div>
              <div className="flex flex-col">
                 <span className="text-sm font-semibold text-white">Education</span>
                 <span className="text-xs text-slate-400 mt-1 leading-relaxed">BSc (Hons) Computer Science<br/>University of Plymouth</span>
              </div>
            </div>

            <div className="glass p-5 rounded-2xl flex items-start gap-4 border border-white/5 hover:border-[#00E5FF]/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-[#00E5FF]" />
              </div>
              <div className="flex flex-col">
                 <span className="text-sm font-semibold text-white">Status</span>
                 <span className="text-xs text-slate-400 mt-1 leading-relaxed">Seeking Internship<br/>Opportunities</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-2xl mx-auto">
            <a
              href={socialLinks.email}
              className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full glass-strong border border-white/10 hover:border-[#00E5FF]/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all duration-300 w-full sm:w-1/2 justify-center"
            >
              <Mail className="h-5 w-5 text-[#00E5FF]" />
              <span className="font-semibold text-base sm:text-lg text-white">Email Me</span>
              <ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            <a
              href="/resume.pdf"
              download
              className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 w-full sm:w-1/2 justify-center"
            >
              <Download className="h-5 w-5 text-[#00E5FF]" />
              <span className="font-semibold text-base sm:text-lg text-white">Download Resume</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-16 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="group glass p-5 flex items-center justify-between hover-lift rounded-2xl border border-white/5 hover:border-[#00E5FF]/30 transition-all">
                  <div className="flex items-center gap-4">
                    <Icon className="h-5 w-5 text-[var(--ink-2)] group-hover:text-[#00E5FF] transition-colors" />
                    <div>
                      <div className="text-sm font-semibold text-white">{s.label}</div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">{s.handle}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[var(--ink-3)] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
