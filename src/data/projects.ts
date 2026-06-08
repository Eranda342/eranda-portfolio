import { Project } from '../types';

export const projects: Project[] = [
  {
    title: 'Nebula Analytics',
    tag: 'Realtime · Web',
    year: '2026',
    stack: ['React', 'TypeScript', 'WebSockets', 'PostgreSQL'],
    impact: [
      'Reduced p95 dashboard latency from 1.8s to 240ms via streaming pipelines',
      'Adopted by 3 internal teams; handles 8M events/day',
    ],
    gradient: 'from-[#a78bfa]/35 via-[#818cf8]/25 to-[#0a0c10]',
    accent: '#a78bfa',
    github: '#',
    demo: '#',
    span: 'lg:col-span-2 lg:row-span-2',
    matrix: true,
  },
  {
    title: 'Mira Research',
    tag: 'Thesis · ML',
    year: '2024',
    stack: ['Python', 'PyTorch', 'FastAPI'],
    impact: [
      'Multimodal retrieval — 92% benchmark relevance',
      'Cut paper-discovery time by ~60% in user study',
    ],
    gradient: 'from-[#c4b5fd]/30 via-[#a78bfa]/15 to-[#0a0c10]',
    accent: '#c4b5fd',
    github: '#',
    demo: '#',
  },
  {
    title: 'Halcyon CMS',
    tag: 'Open Source',
    year: '2025',
    stack: ['Node', 'GraphQL', 'tRPC', 'Docker'],
    impact: [
      'Headless CMS — 2.4k GitHub stars',
      'Zero-config deploys via custom CLI',
    ],
    gradient: 'from-[#818cf8]/30 via-[#a78bfa]/15 to-[#0a0c10]',
    accent: '#818cf8',
    github: '#',
    demo: '#',
  },
  {
    title: 'Aurora Studio',
    tag: 'Brand · 3D',
    year: '2025',
    stack: ['Three.js', 'Motion', 'Lenis'],
    impact: [
      'Awwwards SOTD shortlist',
      'Maintains 60fps on mid-tier mobile via GPU-bound shaders',
    ],
    gradient: 'from-[#a78bfa]/30 via-[#c4b5fd]/15 to-[#0a0c10]',
    accent: '#a78bfa',
    github: '#',
    demo: '#',
    span: 'lg:col-span-2',
  },
];
