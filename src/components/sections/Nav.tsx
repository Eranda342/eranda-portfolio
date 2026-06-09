import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navigation, socialLinks } from '../../config/navigation';

export function Nav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        role="banner"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl"
      >
        <div className={`relative flex items-center justify-between px-5 sm:px-7 py-3 rounded-full glass-nav ${isScrolled ? 'scrolled' : ''}`}>
          <a href="#top" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center h-8 w-8 rounded-full border-2 border-[#22d3ee]/80 shadow-[0_0_10px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-shadow bg-[#060c18]">
              <span className="font-mono text-xs font-bold tracking-tight text-[#22d3ee]">EB</span>
            </div>
          </a>

          <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navigation.map((l) => (
              <a key={l.href} href={l.href} className="relative group text-white/75 hover:text-[#22d3ee] transition-colors py-1">
                {l.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#22d3ee] transition-all duration-300 group-hover:w-full opacity-50 group-hover:opacity-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href={socialLinks.resume} 
              download 
              className="hidden md:inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white/90 bg-white/5 border border-white/10 rounded-full backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_4px_20px_rgba(34,211,238,0.15)] hover:border-white/20 hover:text-white"
            >
              Resume
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors text-white/75 hover:text-white"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-[var(--bg-0)]/85 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative pt-28 px-8 flex flex-col gap-1"
            >
              {navigation.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-4xl py-3 border-b border-[var(--line)] text-[var(--ink-0)]"
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="flex items-center gap-4 mt-8">
                <a href={socialLinks.github} className="p-3 rounded-full glass"><Github className="h-5 w-5" /></a>
                <a href={socialLinks.linkedin} className="p-3 rounded-full glass"><Linkedin className="h-5 w-5" /></a>
                <a href={socialLinks.email} onClick={() => setOpen(false)} className="ml-auto inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black">
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
