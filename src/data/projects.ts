import { Project } from '../types';

export const projects: Project[] = [
  {
    featured: true,
    category: 'featured',
    title: 'AgroBridge – Smart Paddy Stock & Supply Management System',
    description: 'A full-stack agricultural marketplace connecting verified farmers and mill owners through a centralized digital platform.',
    screenshot: '/projects/agrobridge.jpeg',
    githubUrl: 'https://github.com/Eranda342/agrobridge',
    liveUrl: '#',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT', 'Cloudinary', 'Microsoft Azure'],
    problem: 'Traditional paddy trading relies on manual communication, creating inefficiencies and limited visibility.',
    solution: 'Built a web platform that enables secure trading, real-time negotiations, stock management, and supply chain coordination.',
    features: ['Real-time bidding', 'Role-based access control', 'Transport management', 'PDF & Excel exports', 'Responsive dashboard'],
    metrics: [
      'Academic Project',
      '4 Months Development',
      'Full-Stack Developer',
      'MERN Stack',
    ],
    gradient: 'from-[#00E5FF]/35 via-[#38BDF8]/25 to-[#0A1029]',
    accent: '#00E5FF',
    matrix: true,
  },
  {
    title: 'Smart Laundry System',
    category: 'backend',
    description: 'A full-stack web application for laundry management. Implemented authentication, booking workflows, and database integration.',
    screenshot: '/projects/mira.svg',
    githubUrl: 'https://github.com/Eranda342/smart-laundry',
    liveUrl: '#',
    techStack: ['PHP', 'MySQL', 'Laravel', 'React'],
    gradient: 'from-[#22D3EE]/30 via-[#00E5FF]/15 to-[#0A1029]',
    accent: '#22D3EE',
  },
  {
    title: 'Developer Portfolio',
    category: 'frontend',
    description: 'A fast, modern developer portfolio showcasing university projects and personal work, featuring highly interactive UI components.',
    screenshot: '/projects/halcyon.svg',
    githubUrl: 'https://github.com/Eranda342/portfolio',
    liveUrl: '#',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    gradient: 'from-[#38BDF8]/30 via-[#00E5FF]/15 to-[#0A1029]',
    accent: '#38BDF8',
  }
];
