import { useState } from "react";
import type { ContentProject } from "../lib/types";

interface Props {
  projects: ContentProject[];
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
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 64,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 28 }}>
          <a
            href="/"
            style={{
              color: foreground,
              opacity: 0.3,
              textDecoration: "none",
              fontSize: 16,
              fontFamily: "monospace",
              letterSpacing: "0.03em",
            }}
          >
            ← Back
          </a>
          <h1
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: foreground,
              letterSpacing: "-0.025em",
            }}
          >
            Cases
          </h1>
        </div>
        <span
          style={{
            fontSize: 16,
            fontFamily: "monospace",
            color: accent,
            opacity: 0.6,
            letterSpacing: "0.05em",
          }}
        >
          {projects.length} projects
        </span>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          flex: 1,
        }}
      >
        {projects.map((project) => (
          <a
            key={project.slug}
            href={`/cases/${project.slug}`}
            onMouseEnter={() => setHovered(project.slug)}
            onMouseLeave={() => setHovered(null)}
            style={{
              textDecoration: "none",
              border: `1px solid ${
                hovered === project.slug ? accent : "rgba(255,255,255,0.08)"
              }`,
              borderRadius: 10,
              padding: "44px 52px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background:
                hovered === project.slug
                  ? "rgba(250,204,21,0.04)"
                  : "rgba(255,255,255,0.02)",
              transition: "border-color 0.2s, background 0.2s",
              cursor: "pointer",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: accent,
                  opacity: 0.7,
                  marginBottom: 14,
                }}
              >
                {project.type}
              </p>
              <h2
                style={{
                  fontSize: 38,
                  fontWeight: 800,
                  color: foreground,
                  letterSpacing: "-0.02em",
                  marginBottom: 8,
                }}
              >
                {project.company}
              </h2>
              <p
                style={{
                  fontSize: 18,
                  color: foreground,
                  opacity: 0.45,
                  marginBottom: 0,
                }}
              >
                {project.role} · {project.period}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: 24,
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginTop: 32,
              }}
            >
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {project.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 12,
                      fontFamily: "monospace",
                      color: foreground,
                      opacity: 0.3,
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 4,
                      padding: "4px 10px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.metrics?.[0] && (
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p
                    style={{
                      fontSize: 34,
                      fontWeight: 800,
                      color: accent,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {project.metrics[0].value}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: foreground,
                      opacity: 0.4,
                      marginTop: 4,
                      fontFamily: "monospace",
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
