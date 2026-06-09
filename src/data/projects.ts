import { Project } from '../types';

export const projects: Project[] = [
  {
    featured: true,
    category: 'featured',
    title: 'AgroBridge – Smart Paddy Stock & Supply Management System',
    description: 'A full-stack agricultural marketplace connecting verified farmers and mill owners through a centralized digital platform.',
    screenshot: '/projects/agrobridge.jpeg',
    githubUrl: 'https://github.com/Eranda342/Smart-Paddy-Stock-Supply-Management-System.git',
    liveUrl: '#',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT', 'Cloudinary', 'Microsoft Azure'],
    problem: 'Traditional paddy trading relies on manual communication, creating inefficiencies and limited visibility.',
    solution: 'Built a web platform that enables secure trading, real-time negotiations, stock management, and supply chain coordination.',
    features: ['Real-time bidding', 'Role-based access control', 'Transport management', 'PDF & Excel exports', 'Responsive dashboard'],
    metrics: [
      'Jan 2026 – May 2026',
      'Academic Project',
      'Full-Stack Developer',
      'MERN Stack',
    ],
    gradient: 'from-[#00E5FF]/35 via-[#38BDF8]/25 to-[#0A1029]',
    accent: '#00E5FF',
    matrix: true,
  },
  {
    title: 'Eranda Portfolio',
    category: 'frontend',
    description: 'Production-grade developer portfolio featuring cinematic glassmorphism UI, responsive layouts, smooth scrolling, interactive animations, and modern frontend architecture built for performance and accessibility.',
    screenshot: '/projects/halcyon.svg',
    githubUrl: 'https://github.com/Eranda342/eranda-portfolio.git',
    liveUrl: 'https://eranda.tech',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    gradient: 'from-[#38BDF8]/30 via-[#00E5FF]/15 to-[#0A1029]',
    accent: '#38BDF8',
  },
  {
    title: 'FurnitureViz — Room Designer',
    category: 'frontend',
    description: 'A professional 2D and 3D furniture visualization platform for interior designers. Create room layouts on a 2D canvas, preview them in an interactive 3D environment, manage furniture catalogs, upload custom 3D models, and save or load complete design projects.',
    screenshot: '/projects/furnitureviz.png',
    githubUrl: 'https://github.com/Eranda342/FurnitureViz',
    liveUrl: '#',
    techStack: ['React', 'Three.js', 'Node.js', 'Express.js', 'MongoDB'],
    gradient: 'from-[#22D3EE]/30 via-[#00E5FF]/15 to-[#0A1029]',
    accent: '#22D3EE',
  }
];
