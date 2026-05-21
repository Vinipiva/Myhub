import type {
  DeckConfig,
  Project,
  ProfileFrontmatter,
  ExperienceFrontmatter,
  ContentProject,
  ContentProjectFrontmatter,
  Presentation,
} from "./types";

// ── Legacy JSON deck (existing routes) ──────────────────────────────────────

const projectFiles = import.meta.glob<Project>("/../../data/projects/*.json", {
  eager: true,
});

const deckConfigFile = import.meta.glob<DeckConfig>(
  "/../../data/portfolio/deck.config.json",
  { eager: true }
);

export function getDeckConfig(): DeckConfig {
  const key = Object.keys(deckConfigFile)[0];
  return deckConfigFile[key] as DeckConfig;
}

export function getAllProjects(): Project[] {
  return Object.values(projectFiles) as Project[];
}

export function getProjectById(id: string): Project | undefined {
  return getAllProjects().find((p) => p.id === id);
}

export function getDeckProjects(): Project[] {
  const config = getDeckConfig();
  return config.cases
    .map((id) => getProjectById(id))
    .filter((p): p is Project => p !== undefined);
}

// ── Content .md readers (new presentation system) ────────────────────────────

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
  return Object.entries(contentProjectGlob).map(([filePath, m]) => {
    const slug = filePath.split("/").pop()!.replace(".md", "");
    return { slug, ...m.frontmatter };
  });
}

export function getContentProjectBySlug(slug: string): ContentProject | undefined {
  return getContentProjects().find((p) => p.slug === slug);
}

// ── Presentations (data/portfolio/presentations/*.json) ──────────────────────

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
