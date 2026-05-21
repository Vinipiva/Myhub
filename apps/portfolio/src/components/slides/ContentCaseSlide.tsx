import type { ContentProject } from "../../lib/types";

type SectionType = "intro" | "summary" | "metrics";

interface Props {
  project: ContentProject;
  section: SectionType;
  accent: string;
  foreground: string;
}

export default function ContentCaseSlide({ project, section, accent, foreground }: Props) {
  if (section === "intro") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "80px 120px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: 14,
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: accent,
            opacity: 0.7,
            marginBottom: 40,
          }}
        >
          {project.type} · {project.period}
        </p>
        <h1
          style={{
            fontSize: 100,
            fontWeight: 700,
            color: foreground,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: 28,
          }}
        >
          {project.company}
        </h1>
        <p
          style={{
            fontSize: 32,
            color: foreground,
            opacity: 0.55,
            marginBottom: 48,
          }}
        >
          {project.role}
        </p>
        {project.tags && project.tags.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 13,
                  fontFamily: "monospace",
                  color: foreground,
                  opacity: 0.3,
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 4,
                  padding: "6px 14px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (section === "summary" && project.summary) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "80px 120px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 1200,
        }}
      >
        <p
          style={{
            fontSize: 14,
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: accent,
            opacity: 0.5,
            marginBottom: 40,
          }}
        >
          {project.company} · Overview
        </p>
        <p
          style={{
            fontSize: 36,
            color: foreground,
            opacity: 0.75,
            lineHeight: 1.55,
            maxWidth: 1100,
          }}
        >
          {project.summary}
        </p>
      </div>
    );
  }

  if (section === "metrics" && project.metrics && project.metrics.length > 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "80px 120px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: 14,
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: accent,
            opacity: 0.7,
            marginBottom: 64,
          }}
        >
          {project.company} · Impact
        </p>
        <div style={{ display: "flex", gap: 80, flexWrap: "wrap" }}>
          {project.metrics.map((m) => (
            <div key={m.label}>
              <p
                style={{
                  fontSize: 80,
                  fontWeight: 700,
                  color: accent,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {m.value}
              </p>
              <p
                style={{
                  fontSize: 18,
                  color: foreground,
                  opacity: 0.4,
                  marginTop: 12,
                }}
              >
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
