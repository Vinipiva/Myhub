const profileGlob = import.meta.glob<{ frontmatter: Record<string, unknown> }>(
  "../content/profile/*.md",
  { eager: true }
);

const projectGlob = import.meta.glob<{ frontmatter: Record<string, unknown> }>(
  "../content/projects/*.md",
  { eager: true }
);

function getFrontmatter(
  glob: Record<string, { frontmatter: Record<string, unknown> }>,
  match: string
) {
  const key = Object.keys(glob).find((k) => k.includes(match));
  return key ? glob[key].frontmatter : {};
}

export const profileData = getFrontmatter(profileGlob, "main") as any;
export const realtorData = getFrontmatter(projectGlob, "realtor-com") as any;
export const fanfestData = getFrontmatter(projectGlob, "fanfest-io") as any;
export const availData = getFrontmatter(projectGlob, "avail-co") as any;
export const pepsicoData = getFrontmatter(projectGlob, "pepsico") as any;
