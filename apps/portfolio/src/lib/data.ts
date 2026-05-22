import matter from "gray-matter";
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

// ── Deck config ───────────────────────────────────────────────────────────────

const deckConfigFile = import.meta.glob<DeckConfig>(
  "/../../data/portfolio/deck.config.json",
  { eager: true }
);

export function getDeckConfig(): DeckConfig {
  const key = Object.keys(deckConfigFile)[0];
  return deckConfigFile[key] as DeckConfig;
}

// ── Raw .md readers — bypass Astro content-collection Zod schema ──────────────
// Using { as: 'raw' } + gray-matter ensures ALL frontmatter fields are preserved,
// including nested optional fields like team.problem / team.approach / team.outcome.

const profileRaw = import.meta.glob<string>(
  "/../site/src/content/profile/*.md",
  { eager: true, as: "raw" }
);

const experienceRaw = import.meta.glob<string>(
  "/../site/src/content/experience/*.md",
  { eager: true, as: "raw" }
);

const projectsRaw = import.meta.glob<string>(
  "/../site/src/content/projects/*.md",
  { eager: true, as: "raw" }
);

const casesRaw = import.meta.glob<string>(
  "/../site/src/content/cases/*.md",
  { eager: true, as: "raw" }
);

function parseFrontmatter<T>(raw: string): T {
  return matter(raw).data as T;
}

// ── Exports ───────────────────────────────────────────────────────────────────

export function getProfile(): ProfileFrontmatter | undefined {
  const key = Object.keys(profileRaw)[0];
  if (!key) return undefined;
  return parseFrontmatter<ProfileFrontmatter>(profileRaw[key]);
}

export function getExperience(): ExperienceFrontmatter[] {
  return Object.values(experienceRaw)
    .map((raw) => parseFrontmatter<ExperienceFrontmatter>(raw))
    .filter(Boolean)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getContentProjects(): ContentProject[] {
  return Object.entries(projectsRaw)
    .map(([filePath, raw]) => {
      const slug = filePath.split("/").pop()!.replace(".md", "");
      const fm = parseFrontmatter<ContentProjectFrontmatter>(raw);
      return { slug, ...fm } as ContentProject;
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getContentProjectBySlug(slug: string): ContentProject | undefined {
  return getContentProjects().find((p) => p.slug === slug);
}

export function getDeckProjects(): ContentProject[] {
  return getContentProjects();
}

export function getCases(): CaseStory[] {
  return Object.entries(casesRaw)
    .filter(([filePath]) => !filePath.endsWith(".gitkeep"))
    .map(([filePath, raw]) => {
      const slug = filePath.split("/").pop()!.replace(".md", "");
      const fm = parseFrontmatter<CaseFrontmatter>(raw);
      return { slug, ...fm } as CaseStory;
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
