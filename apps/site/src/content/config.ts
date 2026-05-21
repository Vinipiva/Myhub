import { defineCollection, z } from "astro:content";

const profile = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    fullName: z.string(),
    role: z.string(),
    tagline: z.string(),
    summary: z.string(),
    impactStatement: z.string(),
    impactUsers: z.string(),
    impactRevenue: z.string(),
    email: z.string(),
    emailAlt: z.string(),
    linkedin: z.string(),
    site: z.string(),
    phone: z.string(),
    languages: z.array(z.string()),
    availability: z.string(),
    about: z.array(z.string()).optional(),
  }),
});

const experience = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    location: z.string(),
    type: z.string(),
    summary: z.string(),
    order: z.number(),
    bullets: z.array(z.string()),
    tags: z.array(z.string()),
  }),
});

const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
  color: z.string().optional(),
  colorFrom: z.string().optional(),
  colorTo: z.string().optional(),
  suffix: z.string().optional(),
});

const teamSchema = z.object({
  name: z.string(),
  description: z.string(),
  bullets: z.array(
    z.object({
      label: z.string().nullable(),
      text: z.string(),
    })
  ),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    type: z.string(),
    summary: z.string(),
    order: z.number(),
    metrics: z.array(metricSchema).optional(),
    tags: z.array(z.string()),
    // Realtor / PepsiCo
    teams: z.array(teamSchema).optional(),
    // Avail
    paragraphs: z.array(z.string()).optional(),
    // FanFest
    sections: z
      .array(z.object({ title: z.string(), text: z.string() }))
      .optional(),
    logos: z.array(z.string()).optional(),
    screens: z
      .array(z.object({ src: z.string(), alt: z.string() }))
      .optional(),
    // PepsiCo
    kpiCards: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          trend: z.string(),
        })
      )
      .optional(),
  }),
});

const cases = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    company: z.string(),
    role: z.string(),
    period: z.string(),
    order: z.number(),
    problem: z.string(),
    approach: z.string(),
    tradeoffs: z.string(),
    outcome: z.string(),
    retrospective: z.string().optional(),
    metrics: z.array(metricSchema).optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { profile, experience, projects, cases };
