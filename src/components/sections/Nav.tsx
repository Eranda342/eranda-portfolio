import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navigation, socialLinks } from '../../config/navigation';
import { Button } from '../ui/Button';

export function Nav() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [0, 1]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        role="banner"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl"
      >
        <motion.div style={{ opacity }} className="absolute inset-0 glass-nav rounded-full" />
        <div className="relative flex items-center justify-between px-5 sm:px-7 py-3 rounded-full glass-nav">
          <a href="#top" className="flex items-center gap-2 group">
            <div className="relative h-7 w-7 rounded-full bg-gradient-to-br from-[#22D3EE] via-[#38BDF8] to-[#22D3EE] glow-accent">
              <div className="absolute inset-[2px] rounded-full bg-[#0A1029]" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#38BDF8] opacity-40 blur-md group-hover:opacity-75 transition-opacity" />
            </div>
            <span className="font-mono text-sm tracking-tight text-[var(--ink-0)]">EB</span>
          </a>

          <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-7 text-sm text-[var(--ink-2)]">
            {navigation.map((l) => (
              <a key={l.href} href={l.href} className="link-underline hover:text-[var(--ink-0)] transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="glass" className="hidden md:inline-flex">
              <a href={socialLinks.resume} download>Resume</a>
            </Button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors"
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
