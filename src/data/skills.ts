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
  { icon: Code2, title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion'], shape: 'cube', color: '#00E5FF' },
  { icon: Boxes, title: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'Authentication (JWT)', 'API Integration'], shape: 'torus', color: '#38BDF8' },
  { icon: Server, title: 'Database & Cloud', items: ['MongoDB', 'Microsoft Azure', 'Firebase', 'Cloud Deployment'], shape: 'octa', color: '#22D3EE' },
  { icon: Zap, title: 'Real-Time Systems', items: ['WebSockets', 'Socket.IO', 'Event-Driven Communication', 'Live Data Streaming'], shape: 'prism', color: '#00E5FF' },
  { icon: Layers, title: 'Tools & DevOps', items: ['Git', 'GitHub', 'Docker', 'Vercel', 'VS Code'], shape: 'pyramid', color: '#38BDF8' },
  { icon: Palette, title: 'UI / UX Design', items: ['Figma', 'Responsive Design', 'Glassmorphism', 'Accessibility', 'Mobile-First Design'], shape: 'sphere', color: '#22D3EE' },
];
