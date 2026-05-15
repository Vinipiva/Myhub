import { config, collection, singleton, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },

  singletons: {
    profile: singleton({
      label: "Profile",
      path: "apps/site/src/content/profile/main",
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
      },
    }),
  },

  collections: {
    experience: collection({
      label: "Experience",
      path: "apps/site/src/content/experience/*",
      slugField: "company",
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
      },
    }),

    projects: collection({
      label: "Projects",
      path: "apps/site/src/content/projects/*",
      slugField: "company",
      entryLayout: "content",
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
      },
    }),
  },
});
