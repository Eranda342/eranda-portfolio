export type Project = {
  title: string;
  description: string;
  screenshot: string;
  githubUrl: string;
  liveUrl: string;
  techStack: string[];
  featured?: boolean;
  category?: "featured" | "fullstack" | "frontend" | "backend" | "ai";
  
  // Deep Case Study fields (for Featured/Tier 1)
  problem?: string;
  solution?: string;
  architecture?: string;
  features?: string[];
  outcome?: string;
  metrics?: {
    users?: string;
    performanceGain?: string;
    duration?: string;
    role?: string;
    teamSize?: string;
  };
  // Legacy styling (optional)
  span?: string;
  gradient?: string;
  accent?: string;
  matrix?: boolean;
};

export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  blurb: string;
};

export type SkillCategory = {
  title: string;
  skills: string[];
};
