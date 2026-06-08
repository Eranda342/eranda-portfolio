import { Code2, Palette, Server, Boxes, Zap, Layers, LucideIcon } from 'lucide-react';

export type ShapeKind = 'cube' | 'torus' | 'octa' | 'pyramid' | 'sphere' | 'prism';

export type SkillGroup = {
  icon: LucideIcon;
  title: string;
  items: string[];
  shape: ShapeKind;
  color: string;
};

export const skillsData: SkillGroup[] = [
  { icon: Code2, title: 'Languages',     items: ['TypeScript', 'Python', 'Rust', 'Go'],                       shape: 'cube',    color: '#00E5FF' },
  { icon: Boxes, title: 'Frameworks',    items: ['React · Next.js', 'Three.js · R3F', 'FastAPI', 'PyTorch'],  shape: 'torus',   color: '#38BDF8' },
  { icon: Server, title: 'Cloud · DB',   items: ['PostgreSQL · Redis', 'AWS · DigitalOcean', 'Prisma', 'Edge'], shape: 'octa',  color: '#22D3EE' },
  { icon: Layers, title: 'Dev Tools',    items: ['Docker · Nginx', 'GitHub Actions', 'Vite · Turbo', 'Vercel'], shape: 'pyramid', color: '#00E5FF' },
  { icon: Palette, title: 'Design',      items: ['Figma', 'Design tokens', 'Motion · GSAP', 'Accessibility'], shape: 'sphere',  color: '#38BDF8' },
  { icon: Zap, title: 'Performance',     items: ['Core Web Vitals', 'Lighthouse 95+', 'Edge caching', 'Profiling'], shape: 'prism', color: '#22D3EE' },
];
