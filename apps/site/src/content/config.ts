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

const projects = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    type: z.string(),
    summary: z.string(),
    order: z.number(),
    metrics: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .optional(),
    tags: z.array(z.string()),
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
    metrics: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { profile, experience, projects, cases };
