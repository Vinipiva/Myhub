export type AspectRatio = "16:9" | "9:16";

export interface ProfileFrontmatter {
  name: string;
  fullName?: string;
  role: string;
  tagline?: string;
  summary?: string;
  impactStatement?: string;
  impactUsers?: string;
  impactRevenue?: string;
  email?: string;
  linkedin?: string;
  site?: string;
  availability?: string;
  languages?: string[];
}

export interface ExperienceFrontmatter {
  company: string;
  role: string;
  period: string;
  location?: string;
  type?: string;
  summary?: string;
  order?: number;
  bullets?: string[];
  tags?: string[];
}

export interface ProjectMetric {
  value: string;
  label: string;
  color?: string;
  colorFrom?: string;
  colorTo?: string;
  suffix?: string;
}

export interface TeamBullet {
  label: string | null;
  text: string;
}

export interface ProjectTeam {
  name: string;
  description: string;
  bullets: TeamBullet[];
}

export interface KpiCard {
  label: string;
  value: string;
  trend: string;
}

export interface ProjectScreen {
  src: string;
  alt: string;
}

export interface ContentProjectFrontmatter {
  company: string;
  role: string;
  period: string;
  type?: string;
  summary?: string;
  order?: number;
  metrics?: ProjectMetric[];
  tags?: string[];
  // Realtor / PepsiCo
  teams?: ProjectTeam[];
  // Avail
  paragraphs?: string[];
  // FanFest
  sections?: Array<{ title: string; text: string }>;
  logos?: string[];
  screens?: ProjectScreen[];
  // PepsiCo
  kpiCards?: KpiCard[];
}

export interface ContentProject extends ContentProjectFrontmatter {
  slug: string;
}

// --- Presentation config ---

export type SlideConfig =
  | { type: "about-me" }
  | { type: "timeline" }
  | { type: "skills" }
  | { type: "company-bio" }
  | { type: "case"; slug: string };

export interface Presentation {
  slug: string;
  name: string;
  theme: {
    accent: string;
    background: string;
    foreground: string;
  };
  slides: SlideConfig[];
  createdAt: string;
}

export interface DeckConfig {
  aspectRatio: AspectRatio;
  theme: {
    accent: string;
    background: string;
    foreground: string;
  };
  cover: {
    headline: string;
    subheadline: string;
    tagline: string;
    availableFor?: string;
  };
  cases: string[];
}

// ── Case story (from apps/site/src/content/cases/*.md) ───────────────────────

export interface CaseFrontmatter {
  title?: string;
  company?: string;
  role?: string;
  period?: string;
  order?: number;
  problem?: string;
  approach?: string;
  tradeoffs?: string;
  outcome?: string;
  retrospective?: string;
  metrics?: ProjectMetric[];
  tags?: string[];
}

export interface CaseStory extends CaseFrontmatter {
  slug: string;
}

export interface ProjectSection {
  title: string;
  text: string;
}

export interface Project {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  sections: ProjectSection[];
  metrics: ProjectMetric[];
  logos?: string[];
  screens?: ProjectScreen[];
  tags: string[];
}
