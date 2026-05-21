import { config, collection, singleton, fields } from "@keystatic/core";

const body = (label = "Body") =>
  fields.markdoc({
    label,
    extension: "md",
  });

export default config({
  storage: {
    kind: "local",
  },

  singletons: {
    profile: singleton({
      label: "Profile",
      path: "apps/site/src/content/profile/main",
      format: { contentField: "body" },
      schema: {
        name: fields.text({ label: "Name" }),
        fullName: fields.text({ label: "Full name" }),
        role: fields.text({ label: "Role" }),
        tagline: fields.text({ label: "Tagline" }),
        summary: fields.text({ label: "Summary", multiline: true }),
        impactStatement: fields.text({ label: "Impact statement", multiline: true }),
        impactUsers: fields.text({ label: "Impact — Users (e.g. 200M+)" }),
        impactRevenue: fields.text({ label: "Impact — Revenue (e.g. $50M+)" }),
        email: fields.text({ label: "Email" }),
        emailAlt: fields.text({ label: "Email (alt / public)" }),
        linkedin: fields.url({ label: "LinkedIn URL" }),
        site: fields.url({ label: "Website URL" }),
        phone: fields.text({ label: "Phone" }),
        languages: fields.array(fields.text({ label: "Language" }), {
          label: "Languages",
          itemLabel: (props) => props.value || "Language",
        }),
        availability: fields.text({ label: "Availability note" }),
        body: body("Long bio"),
      },
    }),
  },

  collections: {
    experience: collection({
      label: "Experience",
      path: "apps/site/src/content/experience/*",
      slugField: "company",
      format: { contentField: "body" },
      schema: {
        company: fields.slug({ name: { label: "Company" } }),
        role: fields.text({ label: "Role" }),
        period: fields.text({ label: "Period (e.g. Jan 2023 – Dec 2024)" }),
        location: fields.text({ label: "Location" }),
        type: fields.text({ label: "Employment type" }),
        summary: fields.text({ label: "Summary", multiline: true }),
        order: fields.number({ label: "Sort order" }),
        bullets: fields.array(fields.text({ label: "Bullet", multiline: true }), {
          label: "Bullets",
          itemLabel: (props) => props.value?.slice(0, 60) || "Bullet",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        body: body("Notes"),
      },
    }),

    projects: collection({
      label: "Projects",
      path: "apps/site/src/content/projects/*",
      slugField: "company",
      entryLayout: "content",
      format: { contentField: "body" },
      schema: {
        company: fields.slug({ name: { label: "Company" } }),
        role: fields.text({ label: "Role" }),
        period: fields.text({ label: "Period" }),
        type: fields.text({ label: "Type" }),
        summary: fields.text({ label: "Summary", multiline: true }),
        order: fields.number({ label: "Sort order" }),
        metrics: fields.array(
          fields.object({
            value: fields.text({ label: "Value (e.g. +70%)" }),
            label: fields.text({ label: "Label (e.g. Conversion rate)" }),
          }),
          {
            label: "Metrics",
            itemLabel: (props) =>
              props.fields.value.value
                ? `${props.fields.value.value} — ${props.fields.label.value}`
                : "Metric",
          }
        ),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        body: body("Project narrative"),
      },
    }),

    cases: collection({
      label: "Cases",
      path: "apps/site/src/content/cases/*",
      slugField: "title",
      entryLayout: "content",
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        company: fields.text({ label: "Company" }),
        role: fields.text({ label: "Your role (what you owned, not what the team did)" }),
        period: fields.text({ label: "Period (e.g. Q1 2024)" }),
        order: fields.number({ label: "Sort order" }),
        problem: fields.text({
          label: "Problem",
          description: "Who was hurting and how badly.",
          multiline: true,
        }),
        approach: fields.text({
          label: "Approach",
          description: "What you tried. What you cut.",
          multiline: true,
        }),
        tradeoffs: fields.text({
          label: "Tradeoffs",
          description: "What you said no to and why.",
          multiline: true,
        }),
        outcome: fields.text({
          label: "Outcome",
          description: "What shipped. What you learned.",
          multiline: true,
        }),
        retrospective: fields.text({
          label: "What you'd change",
          description: "Shows self-awareness and growth.",
          multiline: true,
        }),
        metrics: fields.array(
          fields.object({
            value: fields.text({ label: "Value (e.g. +27%)" }),
            label: fields.text({ label: "Label (e.g. Early user adoption)" }),
          }),
          {
            label: "Metrics",
            itemLabel: (props) =>
              props.fields.value.value
                ? `${props.fields.value.value} — ${props.fields.label.value}`
                : "Metric",
          }
        ),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        body: body("Full case narrative"),
      },
    }),
  },
});
