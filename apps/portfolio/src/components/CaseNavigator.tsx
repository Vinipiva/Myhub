import { useState } from "react";
import type { ContentProject } from "../lib/types";

const ff = "'Red Hat Display', 'Inter', sans-serif";
const fm = "'Red Hat Text', 'Inter', sans-serif";
const mono = "monospace";

const BRAND_GRAD = "linear-gradient(90deg, #7c3aed, #ec4899, #f59e0b)";

/** Solid accent per project — no glass, no translucency */
const CARD_ACCENTS: Record<string, { accent: string; image: string }> = {
  "realtor-com": { accent: "#DC2626", image: "/images/cases/rdc.png" },
  "avail-co":    { accent: "#2563EB", image: "/images/cases/avail-screens.png" },
  "fanfest-io":  { accent: "#7C3AED", image: "/images/cases/fanfest-a.png" },
};
const DEFAULT_CARD = { accent: "#7C3AED", image: "" };

interface Props {
  projects: ContentProject[];
  accent: string;
  foreground: string;
  background: string;
}

export default function CaseNavigator({ projects }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 56,
      left: 0,
      right: 0,
      bottom: 0,
      padding: "48px 100px 80px",
      display: "flex",
      flexDirection: "column",
      fontFamily: fm,
      boxSizing: "border-box",
      background: "#ffffff",
      overflow: "hidden",
    }}>
      {/* Header */}
      <header style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 36,
      }}>
        <div>
          <h1 style={{
            fontFamily: ff,
            fontSize: 52,
            fontWeight: 900,
            letterSpacing: "-0.035em",
            lineHeight: 1,
            color: "#0f0f12",
          }}>
            Case Studies
          </h1>
          <p style={{
            fontSize: 13,
            color: "rgba(0,0,0,0.35)",
            fontFamily: mono,
            letterSpacing: "0.06em",
            marginTop: 8,
          }}>
            Selected work · Proptech, Entertainment & Consumer
          </p>
        </div>
        <span style={{
          fontSize: 11,
          fontFamily: mono,
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          background: BRAND_GRAD,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 4,
        }}>
          {projects.length} projects
        </span>
      </header>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        flex: 1,
        minHeight: 0,
      }}>
        {projects.map((project) => {
          const { accent, image } = CARD_ACCENTS[project.slug] ?? DEFAULT_CARD;
          const isHov = hovered === project.slug;

          return (
            <a
              key={project.slug}
              href={`/cases/${project.slug}`}
              onMouseEnter={() => setHovered(project.slug)}
              onMouseLeave={() => setHovered(null)}
              style={{
                textDecoration: "none",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.09)",
                borderLeft: `4px solid ${accent}`,
                boxShadow: isHov
                  ? "0 8px 32px rgba(0,0,0,0.10)"
                  : "0 2px 8px rgba(0,0,0,0.05)",
                transition: "box-shadow 0.2s, transform 0.2s",
                transform: isHov ? "translateY(-3px)" : "none",
                cursor: "pointer",
              }}
            >
              {/* Image */}
              {image && (
                <div style={{
                  height: 200,
                  overflow: "hidden",
                  position: "relative",
                  background: "#f3f4f6",
                  flexShrink: 0,
                }}>
                  <img
                    src={image}
                    alt={project.company}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top center",
                      transition: "transform 0.4s ease",
                      transform: isHov ? "scale(1.05)" : "scale(1)",
                    }}
                  />

                  {/* Top metric chip — flat, no glass */}
                  {project.metrics?.[0] && (
                    <div style={{
                      position: "absolute",
                      top: 12, right: 12,
                      background: "#ffffff",
                      border: `1px solid rgba(0,0,0,0.10)`,
                      borderRadius: 6,
                      padding: "5px 10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}>
                      <span style={{
                        fontSize: 17,
                        fontWeight: 900,
                        fontFamily: ff,
                        letterSpacing: "-0.02em",
                        color: accent,
                        lineHeight: 1,
                      }}>
                        {project.metrics[0].value}
                      </span>
                      <span style={{
                        fontSize: 9,
                        fontFamily: mono,
                        color: "rgba(0,0,0,0.38)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase" as const,
                        marginTop: 2,
                      }}>
                        {project.metrics[0].label}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div style={{
                flex: 1,
                padding: "20px 22px 18px",
                display: "flex",
                flexDirection: "column",
              }}>
                {/* Type badge */}
                <p style={{
                  fontSize: 10,
                  fontFamily: mono,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.12em",
                  color: accent,
                  marginBottom: 7,
                }}>
                  {project.type}
                </p>

                <h2 style={{
                  fontFamily: ff,
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  marginBottom: 4,
                  color: "#0f0f12",
                }}>
                  {project.company}
                </h2>

                <p style={{
                  fontSize: 13,
                  color: "rgba(0,0,0,0.42)",
                  fontFamily: fm,
                  marginBottom: 14,
                }}>
                  {project.role} · {project.period}
                </p>

                {/* Tags + arrow */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "auto",
                }}>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const }}>
                    {project.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} style={{
                        fontSize: 9,
                        fontFamily: mono,
                        color: "rgba(0,0,0,0.38)",
                        border: "1px solid rgba(0,0,0,0.10)",
                        borderRadius: 3,
                        padding: "2px 8px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase" as const,
                        background: "#ffffff",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div style={{
                    width: 30,
                    height: 30,
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    flexShrink: 0,
                    background: isHov ? accent : "rgba(0,0,0,0.06)",
                    color: isHov ? "#ffffff" : "rgba(0,0,0,0.32)",
                    transition: "background 0.2s, color 0.2s",
                  }}>
                    →
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
