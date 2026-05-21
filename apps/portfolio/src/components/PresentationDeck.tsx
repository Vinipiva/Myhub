import { useState, useEffect } from "react";
import type {
  Presentation,
  ProfileFrontmatter,
  ExperienceFrontmatter,
  ContentProject,
} from "../lib/types";
import AboutMeSlide from "./slides/AboutMeSlide";
import TimelineSlide from "./slides/TimelineSlide";
import ContentCaseSlide from "./slides/ContentCaseSlide";

interface ResolvedSlide {
  key: string;
  component: () => JSX.Element | null;
}

interface Props {
  presentation: Presentation;
  profile: ProfileFrontmatter;
  experience: ExperienceFrontmatter[];
  projects: ContentProject[];
}

function buildSlides(
  presentation: Presentation,
  profile: ProfileFrontmatter,
  experience: ExperienceFrontmatter[],
  projects: ContentProject[],
  accent: string,
  foreground: string
): ResolvedSlide[] {
  const slides: ResolvedSlide[] = [];

  // Cover slide is always first
  slides.push({
    key: "cover",
    component: () => <CoverSlide presentation={presentation} accent={accent} foreground={foreground} />,
  });

  for (const s of presentation.slides) {
    if (s.type === "about-me") {
      slides.push({
        key: "about-me",
        component: () => <AboutMeSlide profile={profile} accent={accent} foreground={foreground} />,
      });
    } else if (s.type === "timeline") {
      slides.push({
        key: "timeline",
        component: () => <TimelineSlide experience={experience} accent={accent} foreground={foreground} />,
      });
    } else if (s.type === "case") {
      const project = projects.find((p) => p.slug === s.slug);
      if (!project) continue;
      slides.push({
        key: `case-${s.slug}-intro`,
        component: () => (
          <ContentCaseSlide project={project} section="intro" accent={accent} foreground={foreground} />
        ),
      });
      if (project.summary) {
        slides.push({
          key: `case-${s.slug}-summary`,
          component: () => (
            <ContentCaseSlide project={project} section="summary" accent={accent} foreground={foreground} />
          ),
        });
      }
      if (project.metrics && project.metrics.length > 0) {
        slides.push({
          key: `case-${s.slug}-metrics`,
          component: () => (
            <ContentCaseSlide project={project} section="metrics" accent={accent} foreground={foreground} />
          ),
        });
      }
    }
    // skills and company-bio reserved for future implementation
  }

  return slides;
}

function CoverSlide({
  presentation,
  accent,
  foreground,
}: {
  presentation: Presentation;
  accent: string;
  foreground: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <p
        style={{
          fontSize: 16,
          fontFamily: "monospace",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: accent,
          opacity: 0.7,
          marginBottom: 48,
        }}
      >
        Portfolio
      </p>
      <h1
        style={{
          fontSize: 110,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: foreground,
          marginBottom: 32,
        }}
      >
        {presentation.name}
      </h1>
      <p
        style={{
          fontSize: 24,
          color: foreground,
          opacity: 0.35,
          fontFamily: "monospace",
        }}
      >
        {new Date(presentation.createdAt).getFullYear()} · {presentation.slides.length} slides
      </p>
    </div>
  );
}

export default function PresentationDeck({ presentation, profile, experience, projects }: Props) {
  const { accent, foreground, background } = presentation.theme;

  const slides = buildSlides(presentation, profile, experience, projects, accent, foreground);
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
  const SlideComponent = slide.component;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background }}>
      <div
        key={slide.key}
        style={{ width: "100%", height: "100%", animation: "fadeIn 0.25s ease" }}
      >
        <SlideComponent />
      </div>

      {/* Navigation */}
      <nav
        style={{
          position: "absolute",
          bottom: 48,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 120px",
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontFamily: "monospace",
            color: foreground,
            opacity: 0.25,
          }}
        >
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>

        <div style={{ display: "flex", gap: 6 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 24 : 7,
                height: 7,
                borderRadius: 4,
                border: "none",
                background: i === current ? accent : "rgba(255,255,255,0.18)",
                cursor: "pointer",
                transition: "width 0.2s, background 0.2s",
                padding: 0,
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
            disabled={current === 0}
            style={{
              background: "transparent",
              border: `1px solid rgba(255,255,255,${current === 0 ? "0.05" : "0.15"})`,
              color: foreground,
              opacity: current === 0 ? 0.2 : 0.7,
              width: 44,
              height: 44,
              borderRadius: 4,
              cursor: current === 0 ? "default" : "pointer",
              fontSize: 18,
            }}
          >
            ←
          </button>
          <button
            onClick={() => setCurrent((c) => Math.min(c + 1, slides.length - 1))}
            disabled={current === slides.length - 1}
            style={{
              background: current === slides.length - 1 ? "transparent" : accent,
              border: "none",
              color: foreground,
              opacity: current === slides.length - 1 ? 0.2 : 1,
              width: 44,
              height: 44,
              borderRadius: 4,
              cursor: current === slides.length - 1 ? "default" : "pointer",
              fontSize: 18,
            }}
          >
            →
          </button>
        </div>
      </nav>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
