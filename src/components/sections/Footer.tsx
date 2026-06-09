import { siteConfig } from '../../config/site';

export function Footer() {
  return (
    <footer role="contentinfo" className="relative border-t border-[var(--line)] py-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#00E5FF] via-[#38BDF8] to-[#00E5FF]" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
             <span className="font-serif italic text-sm text-[var(--ink-2)]">© {new Date().getFullYear()} Eranda Buddhika</span>
             <span className="text-xs font-mono text-[var(--ink-3)] hidden sm:block">|</span>
             <span className="text-xs font-mono text-[var(--ink-3)]">Designed and developed by Eranda Buddhika.</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-[var(--ink-3)]">
          <a href="#top" className="link-underline text-[#00E5FF] hover:text-white transition-colors">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
