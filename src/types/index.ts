import type { LucideIcon } from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
}

export interface Differential {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface EducationLevel {
  id: string;
  title: string;
  ageRange: string;
  description: string;
  highlights: string[];
  icon: LucideIcon;
}

export interface MethodologyStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface StatItem {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  initials: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
