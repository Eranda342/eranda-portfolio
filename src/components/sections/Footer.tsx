import { siteConfig } from '../../config/site';

export function Footer() {
  return (
    <footer role="contentinfo" className="relative border-t border-[var(--line)] py-12">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#5eead4] via-[#7dd3fc] to-[#a78bfa]" />
          <span className="font-serif italic text-sm text-[var(--ink-2)]">{siteConfig.name} — {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono text-[var(--ink-3)]">
          <span>Built with care · Vite · R3F · Lenis</span>
          <a href="#top" className="link-underline text-[var(--ink-1)]">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
