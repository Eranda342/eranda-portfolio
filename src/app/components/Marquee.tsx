const items = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Three.js',
  'TailwindCSS', 'Docker', 'AWS', 'Figma', 'GraphQL', 'Motion', 'Rust',
];

export function Marquee() {
  return (
    <section className="relative py-16 border-y border-[var(--line)] overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg-0)] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-0)] to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-3 font-serif italic text-3xl sm:text-4xl text-[var(--ink-2)] hover:text-[var(--ink-0)] transition-colors">
            {item}
            <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
          </span>
        ))}
      </div>
    </section>
  );
}
