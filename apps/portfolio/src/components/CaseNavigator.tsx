import { useState } from "react";
import type { Project } from "../lib/types";

interface Props {
  projects: Project[];
  accent: string;
  foreground: string;
}

export default function CaseNavigator({ projects, accent, foreground }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "80px 120px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
          <a
            href="/"
            style={{
              color: foreground,
              opacity: 0.35,
              textDecoration: "none",
              fontSize: 18,
              fontFamily: "monospace",
            }}
          >
            ← Back
          </a>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: foreground,
              letterSpacing: "-0.02em",
            }}
          >
            Cases
          </h1>
        </div>
        <span
          style={{
            fontSize: 18,
            fontFamily: "monospace",
            color: accent,
            opacity: 0.6,
          }}
        >
          {projects.length} projects
        </span>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
          flex: 1,
        }}
      >
        {projects.map((project) => (
          <a
            key={project.id}
            href={`/cases/${project.id}`}
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              textDecoration: "none",
              border: `1px solid ${
                hovered === project.id
                  ? accent
                  : "rgba(255,255,255,0.08)"
              }`,
              borderRadius: 8,
              padding: "48px 56px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background:
                hovered === project.id
                  ? "rgba(99,102,241,0.05)"
                  : "rgba(255,255,255,0.02)",
              transition: "border-color 0.2s, background 0.2s",
              cursor: "pointer",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: accent,
                  opacity: 0.7,
                  marginBottom: 16,
                }}
              >
                {project.type}
              </p>
              <h2
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: foreground,
                  letterSpacing: "-0.02em",
                  marginBottom: 8,
                }}
              >
                {project.company}
              </h2>
              <p
                style={{
                  fontSize: 20,
                  color: foreground,
                  opacity: 0.5,
                  marginBottom: 24,
                }}
              >
                {project.role} · {project.period}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: 32,
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 13,
                      fontFamily: "monospace",
                      color: foreground,
                      opacity: 0.3,
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 4,
                      padding: "4px 10px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.metrics[0] && (
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p
                    style={{
                      fontSize: 36,
                      fontWeight: 700,
                      color: accent,
                      lineHeight: 1,
                    }}
                  >
                    {project.metrics[0].value}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: foreground,
                      opacity: 0.4,
                      marginTop: 4,
                    }}
                  >
                    {project.metrics[0].label}
                  </p>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
