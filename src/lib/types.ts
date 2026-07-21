import type { ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  icon: "code" | "cms" | "bolt";
}

export interface ExperienceItem {
  period: string;
  role: string;
  org: string;
  location: string;
  points: string[];
}

export interface SkillGroup {
  title: string;
  icon: "code" | "database" | "tools";
  tags: string[];
}

export interface Project {
  role: string;
  name: string;
  sub: string;
  description: string;
  tags: string[];
  href: string;
}

export interface EducationItem {
  date: string;
  name: string;
  org: string;
}

export interface WorkflowStep {
  no: string;
  title: string;
  points: string[];
}

export interface Review {
  stars: number;
  quote: string;
  name: string;
  avatar: string;
}

export interface Post {
  slug: string;
  title: string;
  titleLines: string[];
  categories: string[];
  moreCategory?: string;
  categoryTokens: string;
  author: string;
  date: string;
  dateDisplay: string;
  image: string;
  readTime: string;
  excerpt: string;
}

export interface AnimHeadLine {
  content: ReactNode;
}
