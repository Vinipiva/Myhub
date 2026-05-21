import { useState, useEffect } from "react";
import type { ContentProject, CaseStory, ProjectTeam, ProjectMetric, KpiCard, ProjectScreen } from "../lib/types";

type Slide =
  | { kind: "intro" }
  | { kind: "team"; index: number }
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
    project.teams.forEach((_, i) => slides.push({ kind: "team", index: i }));
  }
  if (project.paragraphs?.length) {
    slides.push({ kind: "paragraphs" });
  }
  if (project.sections?.length) {
    project.sections.forEach((_, i) => slides.push({ kind: "section", index: i }));
  }
  if (project.kpiCards?.length) {
    slides.push({ kind: "kpi" });
  }
  if (project.logos?.length) {
    slides.push({ kind: "logos" });
  }
  if (project.metrics?.length) {
    slides.push({ kind: "impact" });
  }
  if (project.screens?.length) {
    slides.push({ kind: "screens" });
  }
  // Story slides — appear when a matching case is written in Keystatic
  if (caseStory?.problem) slides.push({ kind: "problem" });
  if (caseStory?.approach) slides.push({ kind: "approach" });
  if (caseStory?.tradeoffs) slides.push({ kind: "tradeoffs" });
  if (caseStory?.outcome) slides.push({ kind: "outcome" });
  if (caseStory?.retrospective) slides.push({ kind: "retrospective" });
  return slides;
}

interface Props {
  project: ContentProject;
  caseStory?: CaseStory | null;
  accent: string;
  foreground: string;
  background: string;
}

export default function CaseDetail({ project, caseStory, accent, foreground, background }: Props) {
  const slides = buildSlides(project, caseStory);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        setCurrent((c) => Math.min(c + 1, slides.length - 1));
      }
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        setCurrent((c) => Math.max(c - 1, 0));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Slide content */}
      <div
        key={`${current}-${slide.kind}`}
        style={{ width: "100%", height: "100%", animation: "fadeSlide 0.3s ease" }}
      >
        {slide.kind === "intro" && (
          <IntroSlide project={project} accent={accent} fg={foreground} />
        )}
        {slide.kind === "team" && project.teams && (
          <TeamSlide
            team={project.teams[slide.index]}
            index={slide.index}
            total={project.teams.length}
            accent={accent}
            fg={foreground}
          />
        )}
        {slide.kind === "paragraphs" && project.paragraphs && (
          <ParagraphsSlide
            project={project}
            paragraphs={project.paragraphs}
            accent={accent}
            fg={foreground}
          />
        )}
        {slide.kind === "section" && project.sections && (
          <SectionSlide
            section={project.sections[slide.index]}
            index={slide.index}
            total={project.sections.length}
            accent={accent}
            fg={foreground}
          />
        )}
        {slide.kind === "kpi" && project.kpiCards && (
          <KpiSlide
            project={project}
            kpiCards={project.kpiCards}
            accent={accent}
            fg={foreground}
          />
        )}
        {slide.kind === "logos" && project.logos && (
          <LogosSlide
            project={project}
            logos={project.logos}
            accent={accent}
            fg={foreground}
          />
        )}
        {slide.kind === "impact" && project.metrics && (
          <ImpactSlide
            project={project}
            metrics={project.metrics}
            accent={accent}
            fg={foreground}
          />
        )}
        {slide.kind === "screens" && project.screens && (
          <ScreensSlide
            project={project}
            screens={project.screens}
            accent={accent}
            fg={foreground}
          />
        )}
        {slide.kind === "problem" && caseStory?.problem && (
          <StorySlide
            label="Problem"
            hint="Who was hurting and how badly."
            text={caseStory.problem}
            accent={accent}
            fg={foreground}
          />
        )}
        {slide.kind === "approach" && caseStory?.approach && (
          <StorySlide
            label="Approach"
            hint="What you tried. What you cut."
            text={caseStory.approach}
            accent={accent}
            fg={foreground}
          />
        )}
        {slide.kind === "tradeoffs" && caseStory?.tradeoffs && (
          <StorySlide
            label="Tradeoffs"
            hint="What you said no to and why."
            text={caseStory.tradeoffs}
            accent={accent}
            fg={foreground}
          />
        )}
        {slide.kind === "outcome" && caseStory?.outcome && (
          <StorySlide
            label="Outcome"
            hint="What shipped. What you learned."
            text={caseStory.outcome}
            accent={accent}
            fg={foreground}
          />
        )}
        {slide.kind === "retrospective" && caseStory?.retrospective && (
          <StorySlide
            label="What I'd change"
            hint="Self-awareness and growth."
            text={caseStory.retrospective}
            accent={accent}
            fg={foreground}
          />
        )}
      </div>

      {/* Navigation bar */}
      <nav
        style={{
          position: "absolute",
          bottom: 44,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 120px",
        }}
      >
        <a
          href="/cases"
          style={{
            color: foreground,
            opacity: 0.28,
            textDecoration: "none",
            fontSize: 14,
            fontFamily: "monospace",
            letterSpacing: "0.04em",
          }}
        >
          ← All Cases
        </a>

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                borderRadius: 4,
                border: "none",
                background: i === current ? accent : "rgba(255,255,255,0.16)",
                cursor: "pointer",
                transition: "width 0.25s ease, background 0.25s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
            disabled={current === 0}
            style={{
              background: "transparent",
              border: `1px solid rgba(255,255,255,${current === 0 ? "0.05" : "0.14"})`,
              color: foreground,
              opacity: current === 0 ? 0.2 : 0.8,
              width: 48,
              height: 48,
              borderRadius: 6,
              cursor: current === 0 ? "default" : "pointer",
              fontSize: 18,
              transition: "opacity 0.2s",
            }}
          >
            ←
          </button>
          <button
            onClick={() => setCurrent((c) => Math.min(c + 1, slides.length - 1))}
            disabled={current === slides.length - 1}
            style={{
              background: current === slides.length - 1 ? "transparent" : accent,
              border:
                current === slides.length - 1
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
              color: current === slides.length - 1 ? foreground : "#09090b",
              opacity: current === slides.length - 1 ? 0.2 : 1,
              width: 48,
              height: 48,
              borderRadius: 6,
              cursor: current === slides.length - 1 ? "default" : "pointer",
              fontSize: 18,
              fontWeight: 700,
              transition: "background 0.2s, opacity 0.2s",
            }}
          >
            →
          </button>
        </div>
      </nav>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .para-slide strong {
          color: ${accent};
          font-weight: 700;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

// ─── Slide components ─────────────────────────────────────────────────────────

function Label({ text, accent }: { text: string; accent: string }) {
  return (
    <p
      style={{
        fontSize: 12,
        fontFamily: "monospace",
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        color: accent,
        opacity: 0.6,
        marginBottom: 56,
      }}
    >
      {text}
    </p>
  );
}

function IntroSlide({
  project,
  accent,
  fg,
}: {
  project: ContentProject;
  accent: string;
  fg: string;
}) {
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
          fontSize: 13,
          fontFamily: "monospace",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: accent,
          opacity: 0.65,
          marginBottom: 44,
        }}
      >
        {project.type} · {project.period}
      </p>

      <h1
        style={{
          fontSize: 108,
          fontWeight: 900,
          color: fg,
          letterSpacing: "-0.035em",
          lineHeight: 1,
          marginBottom: 24,
        }}
      >
        {project.company}
      </h1>

      <p
        style={{
          fontSize: 34,
          color: fg,
          opacity: 0.48,
          marginBottom: project.summary ? 44 : 60,
          fontWeight: 400,
          letterSpacing: "-0.01em",
        }}
      >
        {project.role}
      </p>

      {project.summary && (
        <p
          style={{
            fontSize: 22,
            color: fg,
            opacity: 0.58,
            lineHeight: 1.6,
            maxWidth: 960,
            marginBottom: 56,
          }}
        >
          {project.summary}
        </p>
      )}

      {project.tags && project.tags.length > 0 && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 12,
                fontFamily: "monospace",
                color: fg,
                opacity: 0.32,
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4,
                padding: "6px 14px",
                letterSpacing: "0.06em",
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

function TeamSlide({
  team,
  index,
  total,
  accent,
  fg,
}: {
  team: ProjectTeam;
  index: number;
  total: number;
  accent: string;
  fg: string;
}) {
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
      <Label
        text={`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")} · ${team.name}`}
        accent={accent}
      />

      <div style={{ display: "flex", gap: 72, alignItems: "flex-start" }}>
        {/* Left: name + description */}
        <div style={{ flex: "0 0 460px" }}>
          <h2
            style={{
              fontSize: 58,
              fontWeight: 800,
              color: fg,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: 28,
            }}
          >
            {team.name}
          </h2>
          <p
            style={{
              fontSize: 21,
              color: fg,
              opacity: 0.48,
              lineHeight: 1.6,
            }}
          >
            {team.description}
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            alignSelf: "stretch",
            background: "rgba(255,255,255,0.07)",
            flexShrink: 0,
          }}
        />

        {/* Right: bullets */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {team.bullets.map((bullet, i) => (
            <div
              key={i}
              style={{
                paddingLeft: 26,
                borderLeft: `2px solid ${accent}`,
              }}
            >
              {bullet.label && (
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: fg,
                    marginBottom: 8,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {bullet.label}
                </p>
              )}
              <p
                style={{
                  fontSize: 20,
                  color: fg,
                  opacity: bullet.label ? 0.52 : 0.68,
                  lineHeight: 1.55,
                }}
              >
                {bullet.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ParagraphsSlide({
  project,
  paragraphs,
  accent,
  fg,
}: {
  project: ContentProject;
  paragraphs: string[];
  accent: string;
  fg: string;
}) {
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
      <Label text={`${project.company} · Overview`} accent={accent} />

      <div className="para-slide" style={{ display: "flex", flexDirection: "column" }}>
        {paragraphs.map((para, i) => (
          <div key={i}>
            {i > 0 && (
              <div
                style={{
                  width: "100%",
                  height: 1,
                  background: "rgba(255,255,255,0.06)",
                  margin: "32px 0",
                }}
              />
            )}
            <p
              style={{
                fontSize: 23,
                color: fg,
                opacity: 0.7,
                lineHeight: 1.65,
                maxWidth: 1240,
              }}
              dangerouslySetInnerHTML={{ __html: para }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionSlide({
  section,
  index,
  total,
  accent,
  fg,
}: {
  section: { title: string; text: string };
  index: number;
  total: number;
  accent: string;
  fg: string;
}) {
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
      <Label
        text={`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
        accent={accent}
      />

      <h2
        style={{
          fontSize: 68,
          fontWeight: 800,
          color: fg,
          letterSpacing: "-0.025em",
          lineHeight: 1.08,
          marginBottom: 40,
          maxWidth: 1200,
        }}
      >
        {section.title}
      </h2>

      <p
        style={{
          fontSize: 26,
          color: fg,
          opacity: 0.58,
          lineHeight: 1.65,
          maxWidth: 1100,
        }}
      >
        {section.text}
      </p>
    </div>
  );
}

function KpiSlide({
  project,
  kpiCards,
  accent,
  fg,
}: {
  project: ContentProject;
  kpiCards: KpiCard[];
  accent: string;
  fg: string;
}) {
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
      <Label text={`${project.company} · Dashboard KPIs`} accent={accent} />

      <div style={{ display: "flex", gap: 28 }}>
        {kpiCards.map((card, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              padding: "44px 36px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              background: "rgba(255,255,255,0.025)",
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: fg,
                opacity: 0.38,
                marginBottom: 20,
              }}
            >
              {card.label}
            </p>
            <p
              style={{
                fontSize: 60,
                fontWeight: 900,
                color: fg,
                letterSpacing: "-0.025em",
                lineHeight: 1,
                marginBottom: 16,
              }}
            >
              {card.value}
            </p>
            <p
              style={{
                fontSize: 16,
                fontFamily: "monospace",
                fontWeight: 600,
                color: accent,
                letterSpacing: "0.04em",
              }}
            >
              {card.trend}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LogosSlide({
  project,
  logos,
  accent,
  fg,
}: {
  project: ContentProject;
  logos: string[];
  accent: string;
  fg: string;
}) {
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
      <Label text={`${project.company} · Clients & Partners`} accent={accent} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignContent: "center",
        }}
      >
        {logos.map((logo, i) => (
          <div
            key={i}
            style={{
              width: 128,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 8,
              background: "rgba(255,255,255,0.03)",
              padding: 16,
            }}
          >
            <img
              src={`/images/cases/fanfest-logos/${logo}`}
              alt={logo.replace(".png", "").replace(/-/g, " ")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "grayscale(100%) brightness(2)",
                opacity: 0.55,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ImpactSlide({
  project,
  metrics,
  accent,
  fg,
}: {
  project: ContentProject;
  metrics: ProjectMetric[];
  accent: string;
  fg: string;
}) {
  const fontSize = metrics.length > 3 ? 68 : metrics.length === 3 ? 80 : 96;

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
      <Label text={`${project.company} · Impact`} accent={accent} />

      <div
        style={{
          display: "flex",
          gap: 80,
          flexWrap: "wrap",
          alignItems: "flex-end",
        }}
      >
        {metrics.map((m, i) => (
          <div key={i}>
            <p
              style={{
                fontSize,
                fontWeight: 900,
                color: accent,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              {m.value}
            </p>
            <p
              style={{
                fontSize: 17,
                color: fg,
                opacity: 0.42,
                marginTop: 14,
                fontWeight: 400,
                maxWidth: 200,
                lineHeight: 1.4,
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

function ScreensSlide({
  project,
  screens,
  accent,
  fg,
}: {
  project: ContentProject;
  screens: ProjectScreen[];
  accent: string;
  fg: string;
}) {
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
      <Label text={`${project.company} · Screens`} accent={accent} />

      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 20,
          overflow: "hidden",
        }}
      >
        {screens.slice(0, 3).map((screen, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <img
              src={`/${screen.src}`}
              alt={screen.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function StorySlide({
  label,
  hint,
  text,
  accent,
  fg,
}: {
  label: string;
  hint: string;
  text: string;
  accent: string;
  fg: string;
}) {
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
      {/* Section label */}
      <p
        style={{
          fontSize: 12,
          fontFamily: "monospace",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: accent,
          opacity: 0.65,
          marginBottom: 20,
        }}
      >
        {label}
      </p>

      {/* Hint line */}
      <p
        style={{
          fontSize: 14,
          fontFamily: "monospace",
          color: fg,
          opacity: 0.22,
          letterSpacing: "0.06em",
          marginBottom: 64,
          textTransform: "uppercase",
        }}
      >
        {hint}
      </p>

      {/* Accent bar */}
      <div
        style={{
          width: 48,
          height: 3,
          background: accent,
          borderRadius: 2,
          marginBottom: 48,
          opacity: 0.7,
        }}
      />

      {/* Body text */}
      <p
        style={{
          fontSize: 30,
          color: fg,
          opacity: 0.82,
          lineHeight: 1.72,
          maxWidth: 1080,
          fontWeight: 300,
          letterSpacing: "-0.01em",
        }}
      >
        {text}
      </p>
    </div>
  );
}
