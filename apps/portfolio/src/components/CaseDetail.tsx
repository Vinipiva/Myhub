import React, { useState, useEffect } from "react";
import type { ContentProject, CaseStory, ProjectTeam, ProjectMetric, KpiCard, ProjectScreen } from "../lib/types";

// ── Per-project screen layout config ─────────────────────────────────────────
// skipHero: skip screens[0] since it's used as the intro hero
// flex: flex-grow ratio for each visible screen (in order)

const SCREEN_LAYOUTS: Record<string, { skipHero: boolean; flex: number[] }> = {
  "okamed":                { skipHero: true, flex: [2, 1] },
  "realtor-com":           { skipHero: true, flex: [2, 1] },
  "realtor-online-store":  { skipHero: true, flex: [2, 1, 1] },
  "fanfest-io":            { skipHero: true, flex: [1, 1, 1] },
};

// ── Per-project accent colors ─────────────────────────────────────────────────

const ACCENTS: Record<string, string> = {
  "okamed":               "#1D4ED8",
  "pepsico":              "#004B93",
  "realtor-com":          "#DC2626",
  "realtor-rentals":      "#DC2626",
  "realtor-online-store": "#DC2626",
  "realtor-upnest":       "#DC2626",
  "avail-co":             "#2563EB",
  "fanfest-io":           "#7C3AED",
};
const DEFAULT_ACCENT = "#7C3AED";

// ── Slide types ───────────────────────────────────────────────────────────────

type Slide =
  | { kind: "intro" }
  | { kind: "team"; index: number }
  | { kind: "team-story"; index: number }
  | { kind: "paragraphs" }
  | { kind: "section"; index: number }
  | { kind: "kpi" }
  | { kind: "logos" }
  | { kind: "impact" }
  | { kind: "screens" }
  | { kind: "problem" }
  | { kind: "approach" }
  | { kind: "tradeoffs" }
  | { kind: "outcome" }
  | { kind: "retrospective" };

function buildSlides(project: ContentProject, caseStory?: CaseStory | null): Slide[] {
  const slides: Slide[] = [{ kind: "intro" }];
  if (project.teams?.length) {
    project.teams.forEach((team, i) => {
      slides.push({ kind: "team", index: i });
      if (team.problem || team.approach || team.outcome) {
        slides.push({ kind: "team-story", index: i });
      }
    });
  }
  if (project.paragraphs?.length) slides.push({ kind: "paragraphs" });
  if (project.sections?.length) {
    project.sections.forEach((_, i) => slides.push({ kind: "section", index: i }));
  }
  if (project.kpiCards?.length)  slides.push({ kind: "kpi" });
  if (project.logos?.length)     slides.push({ kind: "logos" });
  if (project.metrics?.length)   slides.push({ kind: "impact" });
  if (project.screens?.length)   slides.push({ kind: "screens" });
  if (caseStory?.problem)        slides.push({ kind: "problem" });
  if (caseStory?.approach)       slides.push({ kind: "approach" });
  if (caseStory?.tradeoffs)      slides.push({ kind: "tradeoffs" });
  if (caseStory?.outcome)        slides.push({ kind: "outcome" });
  if (caseStory?.retrospective)  slides.push({ kind: "retrospective" });
  return slides;
}

// ── Shared helpers ────────────────────────────────────────────────────────────

/** Flat card — no blur, no translucency */
function card(extra?: React.CSSProperties): React.CSSProperties {
  return {
    background: "#f8f8f9",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 12,
    ...extra,
  };
}

function Label({ text, accent }: { text: string; accent: string }) {
  return (
    <p style={{
      fontSize: 12,
      fontFamily: "monospace",
      textTransform: "uppercase" as const,
      letterSpacing: "0.18em",
      color: accent,
      marginBottom: 40,
    }}>
      {text}
    </p>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  project: ContentProject;
  caseStory?: CaseStory | null;
  accent: string;
  foreground: string;
  background: string;
  prevSlug?: string | null;
  nextSlug?: string | null;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CaseDetail({ project, caseStory, foreground, prevSlug, nextSlug }: Props) {
  const accent = ACCENTS[project.slug] ?? DEFAULT_ACCENT;
  const slides = buildSlides(project, caseStory);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        if (current === slides.length - 1 && nextSlug) {
          window.location.href = `/cases/${nextSlug}`;
        } else {
          setCurrent((c) => Math.min(c + 1, slides.length - 1));
        }
      }
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        if (current === 0 && prevSlug) {
          window.location.href = `/cases/${prevSlug}`;
        } else {
          setCurrent((c) => Math.max(c - 1, 0));
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length, current, prevSlug, nextSlug]);

  const slide = slides[current];
  const fg = foreground;

  return (
    <div style={{
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "hidden",
      background: "transparent",
      fontFamily: "'Red Hat Text', sans-serif",
    }}>
      {/* Slide content */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        overflow: "hidden",
        zIndex: 1,
      }}>
        <div
          key={`${current}-${slide.kind}`}
          style={{ width: "100%", height: "100%", animation: "fadeUp 0.3s ease" }}
        >
          {slide.kind === "intro" && (
            <IntroSlide project={project} accent={accent} fg={fg} />
          )}
          {slide.kind === "team" && project.teams && (
            <TeamSlide
              team={project.teams[slide.index]}
              index={slide.index}
              total={project.teams.length}
              accent={accent}
              fg={fg}
            />
          )}
          {slide.kind === "team-story" && project.teams && (
            <TeamStorySlide team={project.teams[slide.index]} accent={accent} fg={fg} />
          )}
          {slide.kind === "paragraphs" && project.paragraphs && (
            <ParagraphsSlide project={project} paragraphs={project.paragraphs} accent={accent} fg={fg} />
          )}
          {slide.kind === "section" && project.sections && (
            <SectionSlide
              section={project.sections[slide.index]}
              index={slide.index}
              total={project.sections.length}
              accent={accent}
              fg={fg}
            />
          )}
          {slide.kind === "kpi" && project.kpiCards && (
            <KpiSlide project={project} kpiCards={project.kpiCards} accent={accent} fg={fg} />
          )}
          {slide.kind === "logos" && project.logos && (
            <LogosSlide project={project} logos={project.logos} accent={accent} fg={fg} />
          )}
          {slide.kind === "impact" && project.metrics && (
            <ImpactSlide project={project} metrics={project.metrics} accent={accent} fg={fg} />
          )}
          {slide.kind === "screens" && project.screens && (
            <ScreensSlide project={project} screens={project.screens} accent={accent} fg={fg} />
          )}
          {slide.kind === "problem" && caseStory?.problem && (
            <StorySlide label="Problem" hint="Who was hurting and how badly." text={caseStory.problem} accent={accent} fg={fg} />
          )}
          {slide.kind === "approach" && caseStory?.approach && (
            <StorySlide label="Approach" hint="What you tried. What you cut." text={caseStory.approach} accent={accent} fg={fg} />
          )}
          {slide.kind === "tradeoffs" && caseStory?.tradeoffs && (
            <StorySlide label="Tradeoffs" hint="What you said no to and why." text={caseStory.tradeoffs} accent={accent} fg={fg} />
          )}
          {slide.kind === "outcome" && caseStory?.outcome && (
            <StorySlide label="Outcome" hint="What shipped. What you learned." text={caseStory.outcome} accent={accent} fg={fg} />
          )}
          {slide.kind === "retrospective" && caseStory?.retrospective && (
            <StorySlide label="What I'd change" hint="Self-awareness and growth." text={caseStory.retrospective} accent={accent} fg={fg} />
          )}
        </div>
      </div>

      {/* Bottom navigation bar */}
      <nav style={{
        position: "absolute",
        bottom: 36, left: 0, right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 100px",
        zIndex: 10,
      }}>
        {/* Prev case */}
        {prevSlug ? (
          <a
            href={`/cases/${prevSlug}`}
            style={{
              color: fg,
              opacity: 0.55,
              textDecoration: "none",
              fontSize: 12,
              fontFamily: "monospace",
              letterSpacing: "0.08em",
            }}
          >
            ← Prev case
          </a>
        ) : (
          <span style={{ width: 80 }} />
        )}

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 28 : 7,
                height: 7,
                borderRadius: 4,
                border: "none",
                background: i === current ? accent : "rgba(0,0,0,0.15)",
                cursor: "pointer",
                transition: "width 0.25s ease, background 0.25s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {nextSlug && current === slides.length - 1 && (
            <a
              href={`/cases/${nextSlug}`}
              style={{
                color: fg,
                opacity: 0.55,
                textDecoration: "none",
                fontSize: 12,
                fontFamily: "monospace",
                letterSpacing: "0.08em",
                marginRight: 12,
              }}
            >
              Next case →
            </a>
          )}
          <button
            onClick={() => {
              if (current === 0 && prevSlug) window.location.href = `/cases/${prevSlug}`;
              else setCurrent((c) => Math.max(c - 1, 0));
            }}
            style={{
              background: "transparent",
              border: `1px solid rgba(0,0,0,${current === 0 && !prevSlug ? "0.06" : "0.10"})`,
              color: fg,
              opacity: current === 0 && !prevSlug ? 0.15 : 0.7,
              width: 44, height: 44,
              borderRadius: 8,
              cursor: current === 0 && !prevSlug ? "default" : "pointer",
              fontSize: 16,
              transition: "opacity 0.2s",
            }}
          >
            ←
          </button>
          <button
            onClick={() => {
              if (current === slides.length - 1 && nextSlug) window.location.href = `/cases/${nextSlug}`;
              else setCurrent((c) => Math.min(c + 1, slides.length - 1));
            }}
            style={{
              background: current < slides.length - 1 ? accent : "transparent",
              border: current < slides.length - 1 ? "none" : "1px solid rgba(0,0,0,0.06)",
              color: current < slides.length - 1 ? "#ffffff" : "rgba(0,0,0,0.25)",
              opacity: current === slides.length - 1 && !nextSlug ? 0.15 : 1,
              width: 44, height: 44,
              borderRadius: 8,
              cursor: current === slides.length - 1 && !nextSlug ? "default" : "pointer",
              fontSize: 16,
              fontWeight: 700,
              transition: "background 0.2s",
            }}
          >
            →
          </button>
        </div>
      </nav>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .para-slide strong { font-weight: 700; }
      `}</style>
    </div>
  );
}

// ── IntroSlide ────────────────────────────────────────────────────────────────

function IntroSlide({ project, accent, fg }: { project: ContentProject; accent: string; fg: string }) {
  const ff = "'Red Hat Display', sans-serif";
  const fm = "'Red Hat Text', sans-serif";
  const heroImage = project.screens?.[0];

  const textCol = (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      flex: heroImage ? "0 0 52%" : "1",
      paddingRight: heroImage ? 48 : 0,
    }}>
      {/* Eyebrow */}
      <p style={{
        fontSize: 11,
        fontFamily: "monospace",
        textTransform: "uppercase" as const,
        letterSpacing: "0.18em",
        color: accent,
        marginBottom: 24,
      }}>
        {project.type} · {project.period}
      </p>

      {/* Company name */}
      <h1 style={{
        fontFamily: ff,
        fontSize: heroImage ? 76 : 108,
        fontWeight: 900,
        letterSpacing: "-0.04em",
        lineHeight: 0.9,
        marginBottom: 18,
        color: accent,
      }}>
        {project.company}
      </h1>

      {/* Role */}
      <p style={{
        fontSize: heroImage ? 24 : 30,
        color: fg,
        opacity: 0.55,
        marginBottom: project.summary ? 32 : 0,
        fontWeight: 400,
        fontFamily: ff,
        letterSpacing: "-0.01em",
      }}>
        {project.role}
      </p>

      {/* Summary */}
      {project.summary && (
        <div style={{
          borderLeft: `3px solid ${accent}`,
          paddingLeft: 20,
          marginBottom: 28,
        }}>
          <p style={{
            fontFamily: fm,
            fontSize: heroImage ? 16 : 20,
            color: fg,
            opacity: 0.58,
            lineHeight: 1.68,
            fontWeight: 300,
          }}>
            {project.summary}
          </p>
        </div>
      )}

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" as const }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 10,
              fontFamily: "monospace",
              color: fg,
              opacity: 0.55,
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 3,
              padding: "4px 10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              background: "#ffffff",
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{
      width: "100%", height: "100%",
      padding: "56px 80px 56px 100px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 0,
    }}>
      {textCol}

      {/* Hero image — right column */}
      {heroImage && (
        <div style={{
          flex: "1",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
          {/* Subtle accent glow behind image */}
          <div style={{
            position: "absolute",
            inset: "10%",
            background: `radial-gradient(ellipse at center, ${accent}18 0%, transparent 70%)`,
            borderRadius: 24,
            pointerEvents: "none",
          }} />
          <img
            src={`/${heroImage.src}`}
            alt={heroImage.alt}
            style={{
              maxWidth: "100%",
              maxHeight: "88%",
              width: "auto",
              height: "auto",
              display: "block",
              position: "relative",
              filter: "drop-shadow(0 28px 56px rgba(0,0,0,0.14))",
            }}
          />
        </div>
      )}
    </div>
  );
}

// ── TeamSlide ─────────────────────────────────────────────────────────────────

function TeamSlide({ team, index, total, accent, fg }: {
  team: ProjectTeam; index: number; total: number; accent: string; fg: string;
}) {
  const ff = "'Red Hat Display', sans-serif";
  const fm = "'Red Hat Text', sans-serif";

  return (
    <div style={{
      width: "100%", height: "100%",
      padding: "64px 100px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <Label text={`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")} · ${team.name}`} accent={accent} />

      <div style={{ display: "flex", gap: 64, alignItems: "flex-start" }}>
        {/* Left: name + description */}
        <div style={{
          flex: "0 0 400px",
          borderLeft: `3px solid ${accent}`,
          paddingLeft: 28,
        }}>
          <h2 style={{
            fontFamily: ff,
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: "-0.025em",
            lineHeight: 1.08,
            marginBottom: 18,
            color: accent,
          }}>
            {team.name}
          </h2>
          <p style={{
            fontFamily: fm,
            fontSize: 18,
            color: fg,
            opacity: 0.65,
            lineHeight: 1.65,
            fontWeight: 300,
          }}>
            {team.description}
          </p>
        </div>

        {/* Divider */}
        <div style={{
          width: 1,
          alignSelf: "stretch",
          background: "rgba(0,0,0,0.07)",
          flexShrink: 0,
        }} />

        {/* Right: bullets */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 22 }}>
          {team.bullets.map((bullet, i) => (
            <div key={i} style={{
              paddingLeft: 20,
              borderLeft: `2px solid ${accent}`,
            }}>
              {bullet.label && (
                <p style={{
                  fontFamily: fm,
                  fontSize: 14,
                  fontWeight: 700,
                  color: fg,
                  marginBottom: 5,
                  letterSpacing: "-0.01em",
                }}>
                  {bullet.label}
                </p>
              )}
              <p style={{
                fontFamily: fm,
                fontSize: 18,
                color: fg,
                opacity: bullet.label ? 0.65 : 0.72,
                lineHeight: 1.55,
              }}>
                {bullet.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── TeamStorySlide ────────────────────────────────────────────────────────────

function TeamStorySlide({ team, accent, fg }: { team: ProjectTeam; accent: string; fg: string }) {
  const ff = "'Red Hat Display', sans-serif";
  const fm = "'Red Hat Text', sans-serif";

  return (
    <div style={{
      width: "100%", height: "100%",
      padding: "56px 100px",
      display: "flex",
      gap: 48,
      alignItems: "stretch",
    }}>
      {/* Left: Problem */}
      <div style={{
        flex: "0 0 480px",
        borderLeft: `4px solid ${accent}`,
        paddingLeft: 32,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        <p style={{
          fontFamily: "monospace",
          fontSize: 10,
          textTransform: "uppercase" as const,
          letterSpacing: "0.18em",
          color: accent,
          marginBottom: 20,
        }}>
          {team.name}
        </p>
        <p style={{
          fontFamily: ff,
          fontSize: 13,
          fontWeight: 600,
          color: "#767676",
          letterSpacing: "0.10em",
          textTransform: "uppercase" as const,
          marginBottom: 14,
        }}>
          Problem
        </p>
        <p style={{
          fontFamily: fm,
          fontSize: 20,
          color: fg,
          opacity: 0.70,
          lineHeight: 1.70,
          fontWeight: 300,
        }}>
          {team.problem ?? team.description}
        </p>
      </div>

      {/* Divider */}
      <div style={{ width: 1, background: "rgba(0,0,0,0.07)", flexShrink: 0, alignSelf: "stretch" }} />

      {/* Right: Approach + Outcome */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        justifyContent: "center",
      }}>
        {team.approach && (
          <div style={{ ...card({ padding: "28px 32px" }) }}>
            <p style={{
              fontFamily: ff,
              fontSize: 12,
              fontWeight: 600,
              color: "#767676",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              marginBottom: 10,
            }}>
              Approach
            </p>
            <p style={{
              fontFamily: fm,
              fontSize: 18,
              color: fg,
              opacity: 0.60,
              lineHeight: 1.65,
              fontWeight: 300,
            }}>
              {team.approach}
            </p>
          </div>
        )}

        {(team.outcome || team.bullets?.length > 0) && (
          <div style={{
            borderLeft: `3px solid ${accent}`,
            paddingLeft: 24,
          }}>
            <p style={{
              fontFamily: ff,
              fontSize: 12,
              fontWeight: 600,
              color: accent,
              letterSpacing: "0.10em",
              textTransform: "uppercase" as const,
              marginBottom: 10,
            }}>
              Outcome
            </p>
            {team.outcome ? (
              <p style={{
                fontFamily: fm,
                fontSize: 22,
                color: fg,
                opacity: 0.80,
                lineHeight: 1.55,
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}>
                {team.outcome}
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {team.bullets.map((b, i) => (
                  <div key={i}>
                    {b.label && <p style={{ fontFamily: fm, fontSize: 13, fontWeight: 700, color: fg, marginBottom: 3 }}>{b.label}</p>}
                    <p style={{ fontFamily: fm, fontSize: 16, color: fg, opacity: 0.55, lineHeight: 1.5 }}>{b.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── ParagraphsSlide ───────────────────────────────────────────────────────────

function ParagraphsSlide({ project, paragraphs, accent, fg }: {
  project: ContentProject; paragraphs: string[]; accent: string; fg: string;
}) {
  const fm = "'Red Hat Text', sans-serif";

  return (
    <div style={{ width: "100%", height: "100%", padding: "64px 100px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Label text={`${project.company} · Overview`} accent={accent} />
      <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 28, maxWidth: 1100 }}>
        {paragraphs.map((para, i) => (
          <div key={i}>
            {i > 0 && <div style={{ width: "100%", height: 1, background: "rgba(0,0,0,0.07)", margin: "24px 0" }} />}
            <p
              className="para-slide"
              style={{ fontFamily: fm, fontSize: 22, color: fg, opacity: 0.68, lineHeight: 1.72 }}
              dangerouslySetInnerHTML={{ __html: para }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SectionSlide ──────────────────────────────────────────────────────────────

function SectionSlide({ section, index, total, accent, fg }: {
  section: { title: string; text: string }; index: number; total: number; accent: string; fg: string;
}) {
  const ff = "'Red Hat Display', sans-serif";
  const fm = "'Red Hat Text', sans-serif";

  return (
    <div style={{ width: "100%", height: "100%", padding: "64px 100px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {/* Accent label — index */}
      <p style={{
        fontSize: 11,
        fontFamily: "monospace",
        textTransform: "uppercase" as const,
        letterSpacing: "0.18em",
        color: accent,
        marginBottom: 12,
      }}>
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>

      {/* Section title — gray uppercase hint style */}
      <p style={{
        fontFamily: ff,
        fontSize: 13,
        color: "#767676",
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        marginBottom: 48,
      }}>
        {section.title}
      </p>

      {/* Body text with left accent border */}
      <div style={{ borderLeft: `4px solid ${accent}`, paddingLeft: 36, maxWidth: 1060 }}>
        <div style={{ width: 32, height: 2, background: accent, borderRadius: 1, marginBottom: 28 }} />
        <p style={{
          fontFamily: fm,
          fontSize: 28,
          color: fg,
          opacity: 0.78,
          lineHeight: 1.75,
          fontWeight: 300,
          letterSpacing: "-0.01em",
        }}>
          {section.text}
        </p>
      </div>
    </div>
  );
}

// ── ImpactSlide ───────────────────────────────────────────────────────────────

function ImpactSlide({ project, metrics, accent, fg }: {
  project: ContentProject; metrics: ProjectMetric[]; accent: string; fg: string;
}) {
  const ff = "'Red Hat Display', sans-serif";
  const fm = "'Red Hat Text', sans-serif";
  const valueSize = metrics.length > 3 ? 64 : metrics.length === 3 ? 76 : 92;

  return (
    <div style={{ width: "100%", height: "100%", padding: "64px 100px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Label text={`${project.company} · Impact`} accent={accent} />

      <div style={{ display: "flex", gap: 1, alignItems: "stretch" }}>
        {metrics.map((m, i) => (
          <div key={i} style={{
            flex: "1 1 0",
            paddingLeft: 32,
            borderLeft: `3px solid ${i === 0 ? accent : "rgba(0,0,0,0.07)"}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <p style={{
              fontFamily: ff,
              fontSize: valueSize,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginBottom: 12,
              color: accent,
            }}>
              {m.value}
            </p>
            <p style={{
              fontFamily: fm,
              fontSize: 13,
              color: "#767676",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              lineHeight: 1.45,
              maxWidth: 200,
            }}>
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── KpiSlide ──────────────────────────────────────────────────────────────────

function KpiSlide({ project, kpiCards, accent, fg }: {
  project: ContentProject; kpiCards: KpiCard[]; accent: string; fg: string;
}) {
  const ff = "'Red Hat Display', sans-serif";
  const fm = "'Red Hat Text', sans-serif";

  return (
    <div style={{ width: "100%", height: "100%", padding: "64px 100px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Label text={`${project.company} · Dashboard KPIs`} accent={accent} />
      <div style={{ display: "flex", gap: 16 }}>
        {kpiCards.map((card, i) => (
          <div key={i} style={{
            flex: 1,
            borderLeft: `3px solid ${i === 0 ? accent : "rgba(0,0,0,0.08)"}`,
            paddingLeft: 24,
            paddingTop: 8,
            paddingBottom: 8,
          }}>
            <p style={{ fontFamily: fm, fontSize: 12, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#767676", marginBottom: 14 }}>
              {card.label}
            </p>
            <p style={{ fontFamily: ff, fontSize: 52, fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1, marginBottom: 12, color: accent }}>
              {card.value}
            </p>
            <p style={{ fontFamily: fm, fontSize: 14, fontWeight: 600, color: accent, letterSpacing: "0.04em" }}>
              {card.trend}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── LogosSlide ────────────────────────────────────────────────────────────────

function LogosSlide({ project, logos, accent, fg: _fg }: {
  project: ContentProject; logos: string[]; accent: string; fg: string;
}) {
  // logos can be bare filenames (old) or relative paths like "logos-fanfest/psg.jpeg"
  const cols = logos.length <= 9 ? 3 : logos.length <= 12 ? 4 : 6;

  return (
    <div style={{
      width: "100%", height: "100%",
      padding: "44px 100px 52px",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Label text={`${project.company} · Clients & Partners`} accent={accent} />
        <p style={{
          fontFamily: "monospace",
          fontSize: 12,
          color: "rgba(0,0,0,0.32)",
          letterSpacing: "0.06em",
          marginTop: 6,
        }}>
          {logos.length} brands · football, basketball, music & entertainment
        </p>
      </div>

      {/* Logo grid — fixed-size circles filling the slide */}
      <div style={{
        flex: 1,
        display: "flex",
        flexWrap: "wrap" as const,
        alignContent: "center",
        justifyContent: "center",
        gap: 24,
      }}>
        {logos.map((logo, i) => {
          const src = logo.includes("/")
            ? `/images/cases/${logo}`
            : `/images/cases/fanfest-logos/${logo}`;
          const name = logo.split("/").pop()!.replace(/\.(png|jpe?g)$/i, "").replace(/-/g, " ");
          return (
          <div key={i} style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
          }}>
            <img
              src={src}
              alt={name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
          );
        })}
      </div>
    </div>
  );
}

// ── ScreensSlide ──────────────────────────────────────────────────────────────

function ScreensSlide({ project, screens, accent, fg: _fg }: {
  project: ContentProject; screens: ProjectScreen[]; accent: string; fg: string;
}) {
  const layout  = SCREEN_LAYOUTS[project.slug];
  const source  = layout?.skipHero ? screens.slice(1) : screens;
  const visible = source.slice(0, 3);
  const count   = visible.length;
  const flexMap = layout?.flex ?? [];

  return (
    <div style={{ width: "100%", height: "100%", padding: "36px 72px 44px", display: "flex", flexDirection: "column" }}>
      <Label text={`${project.company} · Screens`} accent={accent} />

      <div style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}>
        {visible.map((screen, i) => {
          const flexVal = flexMap[i] ?? 1;
          return (
            <div
              key={i}
              style={{
                flex: `${flexVal} ${flexVal} 0`,
                minWidth: 0,
                minHeight: 0,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={`/${screen.src}`}
                alt={screen.alt}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  display: "block",
                  filter: "drop-shadow(0 20px 48px rgba(0,0,0,0.14))",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── StorySlide ────────────────────────────────────────────────────────────────

function StorySlide({ label, hint, text, accent, fg }: {
  label: string; hint: string; text: string; accent: string; fg: string;
}) {
  const ff = "'Red Hat Display', sans-serif";
  const fm = "'Red Hat Text', sans-serif";

  return (
    <div style={{
      width: "100%", height: "100%",
      padding: "64px 100px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      {/* Label */}
      <p style={{
        fontSize: 11, fontFamily: "monospace",
        textTransform: "uppercase" as const, letterSpacing: "0.18em",
        color: accent,
        marginBottom: 12,
      }}>
        {label}
      </p>

      {/* Hint */}
      <p style={{
        fontFamily: ff,
        fontSize: 13,
        color: "#767676",
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        marginBottom: 48,
      }}>
        {hint}
      </p>

      {/* Story text — left border flat card */}
      <div style={{
        borderLeft: `4px solid ${accent}`,
        paddingLeft: 36,
        maxWidth: 1060,
      }}>
        <div style={{
          width: 32, height: 2,
          background: accent,
          borderRadius: 1,
          marginBottom: 28,
        }} />
        <p style={{
          fontFamily: fm,
          fontSize: 28,
          color: fg,
          opacity: 0.78,
          lineHeight: 1.75,
          fontWeight: 300,
          letterSpacing: "-0.01em",
        }}>
          {text}
        </p>
      </div>
    </div>
  );
}
