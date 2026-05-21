import type {
  DeckConfig,
  ProfileFrontmatter,
  ExperienceFrontmatter,
  ContentProject,
  ContentProjectFrontmatter,
  CaseFrontmatter,
  CaseStory,
  Presentation,
} from "./types";

// ── Deck config (theme, cover, aspect ratio) ─────────────────────────────────

const deckConfigFile = import.meta.glob<DeckConfig>(
  "/../../data/portfolio/deck.config.json",
  { eager: true }
);

export function getDeckConfig(): DeckConfig {
  const key = Object.keys(deckConfigFile)[0];
  return deckConfigFile[key] as DeckConfig;
}

// ── Content .md readers ───────────────────────────────────────────────────────

const profileGlob = import.meta.glob<{ frontmatter: ProfileFrontmatter }>(
  "/../site/src/content/profile/*.md",
  { eager: true }
);

const experienceGlob = import.meta.glob<{ frontmatter: ExperienceFrontmatter }>(
  "/../site/src/content/experience/*.md",
  { eager: true }
);

const contentProjectGlob = import.meta.glob<{ frontmatter: ContentProjectFrontmatter }>(
  "/../site/src/content/projects/*.md",
  { eager: true }
);

export function getProfile(): ProfileFrontmatter | undefined {
  const key = Object.keys(profileGlob)[0];
  return profileGlob[key]?.frontmatter;
}

export function getExperience(): ExperienceFrontmatter[] {
  return Object.values(experienceGlob)
    .map((m) => m.frontmatter)
    .filter(Boolean)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getContentProjects(): ContentProject[] {
  return Object.entries(contentProjectGlob)
    .map(([filePath, m]) => {
      const slug = filePath.split("/").pop()!.replace(".md", "");
      return { slug, ...m.frontmatter } as ContentProject;
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getContentProjectBySlug(slug: string): ContentProject | undefined {
  return getContentProjects().find((p) => p.slug === slug);
}

// Alias used by CaseNavigator and cover page
export function getDeckProjects(): ContentProject[] {
  return getContentProjects();
}

// ── Case stories (Problem / Approach / Tradeoffs / Outcome) ──────────────────

const caseGlob = import.meta.glob<{ frontmatter: CaseFrontmatter }>(
  "/../site/src/content/cases/*.md",
  { eager: true }
);

export function getCases(): CaseStory[] {
  return Object.entries(caseGlob)
    .filter(([filePath]) => !filePath.endsWith(".gitkeep"))
    .map(([filePath, m]) => {
      const slug = filePath.split("/").pop()!.replace(".md", "");
      return { slug, ...m.frontmatter } as CaseStory;
    });
}

export function getCaseBySlug(slug: string): CaseStory | undefined {
  return getCases().find((c) => c.slug === slug);
}

// ── Presentations ─────────────────────────────────────────────────────────────

const presentationGlob = import.meta.glob<Presentation>(
  "/../../data/portfolio/presentations/*.json",
  { eager: true }
);

export function getPresentations(): Presentation[] {
  return Object.values(presentationGlob) as Presentation[];
}

export function getPresentation(slug: string): Presentation | undefined {
  return getPresentations().find((p) => p.slug === slug);
}
