import { config, collection, singleton, fields } from "@keystatic/core";

const body = (label = "Body") =>
  fields.markdoc({
    label,
    extension: "md",
  });

const metricFields = fields.object({
  value: fields.text({ label: "Value (e.g. +70%)" }),
  label: fields.text({ label: "Label (e.g. Conversion rate)" }),
  color: fields.text({ label: "Gradient class (e.g. from-red-400 to-red-500)" }),
  colorFrom: fields.text({ label: "Color from (hex, for inline gradient)" }),
  colorTo: fields.text({ label: "Color to (hex, for inline gradient)" }),
  suffix: fields.text({ label: "Suffix (e.g. /mo)" }),
});

const bulletFields = fields.object({
  label: fields.text({ label: "Bold label (leave empty if none)" }),
  text: fields.text({ label: "Text", multiline: true }),
});

const teamFields = fields.object({
  name: fields.text({ label: "Team name" }),
  description: fields.text({ label: "Description", multiline: true }),
  bullets: fields.array(bulletFields, {
    label: "Bullets",
    itemLabel: (props) => props.fields.label.value || props.fields.text.value?.slice(0, 50) || "Bullet",
  }),
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
        about: fields.array(fields.text({ label: "Paragraph", multiline: true }), {
          label: "About paragraphs",
          itemLabel: (props) => props.value?.slice(0, 60) || "Paragraph",
        }),
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
        metrics: fields.array(metricFields, {
          label: "Metrics",
          itemLabel: (props) =>
            props.fields.value.value
              ? `${props.fields.value.value} — ${props.fields.label.value}`
              : "Metric",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        // Realtor / PepsiCo
        teams: fields.array(teamFields, {
          label: "Teams",
          itemLabel: (props) => props.fields.name.value || "Team",
        }),
        // Avail
        paragraphs: fields.array(fields.text({ label: "Paragraph (HTML allowed)", multiline: true }), {
          label: "Body paragraphs",
          itemLabel: (props) => props.value?.slice(0, 60) || "Paragraph",
        }),
        // FanFest
        sections: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            text: fields.text({ label: "Text", multiline: true }),
          }),
          {
            label: "Sections",
            itemLabel: (props) => props.fields.title.value || "Section",
          }
        ),
        logos: fields.array(fields.text({ label: "Filename (e.g. psg.png)" }), {
          label: "Logo filenames",
          itemLabel: (props) => props.value || "Logo",
        }),
        screens: fields.array(
          fields.object({
            src: fields.text({ label: "Image path (e.g. images/cases/fanfest-a.png)" }),
            alt: fields.text({ label: "Alt text" }),
          }),
          {
            label: "Screens",
            itemLabel: (props) => props.fields.alt.value || "Screen",
          }
        ),
        // PepsiCo
        kpiCards: fields.array(
          fields.object({
            label: fields.text({ label: "KPI label" }),
            value: fields.text({ label: "Value (e.g. 2.4M)" }),
            trend: fields.text({ label: "Trend (e.g. +12%)" }),
          }),
          {
            label: "KPI cards",
            itemLabel: (props) => props.fields.label.value || "KPI",
          }
        ),
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
        metrics: fields.array(metricFields, {
          label: "Metrics",
          itemLabel: (props) =>
            props.fields.value.value
              ? `${props.fields.value.value} — ${props.fields.label.value}`
              : "Metric",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        body: body("Full case narrative"),
      },
    }),
  },
});
