export type Project = {
  title: string;
  tag: string;
  year: string;
  stack: string[];
  impact: string[];
  gradient: string;
  accent: string;
  github: string;
  demo: string;
  span?: string;
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
