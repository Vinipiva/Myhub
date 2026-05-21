import { useState, useEffect } from "react";
import type { Project } from "../lib/types";

interface Slide {
  type: "intro" | "section" | "impact" | "visuals";
  index?: number;
}

function buildSlides(project: Project): Slide[] {
  const slides: Slide[] = [{ type: "intro" }];
  project.sections.forEach((_, i) => slides.push({ type: "section", index: i }));
  if (project.metrics.length > 0) slides.push({ type: "impact" });
  if (project.screens && project.screens.length > 0) slides.push({ type: "visuals" });
  return slides;
}

interface Props {
  project: Project;
  accent: string;
  foreground: string;
  background: string;
}

export default function CaseDetail({ project, accent, foreground, background }: Props) {
  const slides = buildSlides(project);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        setCurrent((c) => Math.min(c + 1, slides.length - 1));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrent((c) => Math.max(c - 1, 0));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      {/* Slide content */}
      <div
        key={current}
        style={{
          width: "100%",
          height: "100%",
          padding: "80px 120px",
          display: "flex",
          flexDirection: "column",
          animation: "fadeIn 0.3s ease",
        }}
      >
        {slide.type === "intro" && (
          <IntroSlide project={project} accent={accent} foreground={foreground} />
        )}
        {slide.type === "section" && slide.index !== undefined && (
          <SectionSlide
            section={project.sections[slide.index]}
            index={slide.index}
            total={project.sections.length}
            accent={accent}
            foreground={foreground}
          />
        )}
        {slide.type === "impact" && (
          <ImpactSlide project={project} accent={accent} foreground={foreground} />
        )}
        {slide.type === "visuals" && (
          <VisualsSlide project={project} accent={accent} foreground={foreground} />
        )}
      </div>

      {/* Navigation bar */}
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
        <a
          href="/cases"
          style={{
            color: foreground,
            opacity: 0.3,
            textDecoration: "none",
            fontSize: 16,
            fontFamily: "monospace",
          }}
        >
          ← All Cases
        </a>

        <div style={{ display: "flex", gap: 8 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: "none",
                background: i === current ? accent : "rgba(255,255,255,0.2)",
                cursor: "pointer",
                transition: "width 0.2s, background 0.2s",
                padding: 0,
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          <button
            onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
            disabled={current === 0}
            style={{
              background: "transparent",
              border: `1px solid rgba(255,255,255,${current === 0 ? "0.05" : "0.15"})`,
              color: foreground,
              opacity: current === 0 ? 0.2 : 0.7,
              width: 48,
              height: 48,
              borderRadius: 4,
              cursor: current === 0 ? "default" : "pointer",
              fontSize: 20,
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
              width: 48,
              height: 48,
              borderRadius: 4,
              cursor: current === slides.length - 1 ? "default" : "pointer",
              fontSize: 20,
            }}
          >
            →
          </button>
        </div>
      </nav>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function IntroSlide({
  project,
  accent,
  foreground,
}: {
  project: Project;
  accent: string;
  foreground: string;
}) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <p
        style={{
          fontSize: 16,
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
          marginBottom: 32,
        }}
      >
        {project.company}
      </h1>
      <p
        style={{
          fontSize: 36,
          color: foreground,
          opacity: 0.55,
          marginBottom: 64,
        }}
      >
        {project.role}
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 14,
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
    </div>
  );
}

function SectionSlide({
  section,
  index,
  total,
  accent,
  foreground,
}: {
  section: { title: string; text: string };
  index: number;
  total: number;
  accent: string;
  foreground: string;
}) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 1100 }}>
      <p
        style={{
          fontSize: 14,
          fontFamily: "monospace",
          color: accent,
          opacity: 0.5,
          marginBottom: 40,
          letterSpacing: "0.1em",
        }}
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
      <h2
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: foreground,
          letterSpacing: "-0.02em",
          marginBottom: 40,
          lineHeight: 1.1,
        }}
      >
        {section.title}
      </h2>
      <p
        style={{
          fontSize: 28,
          color: foreground,
          opacity: 0.6,
          lineHeight: 1.6,
        }}
      >
        {section.text}
      </p>
    </div>
  );
}

function ImpactSlide({
  project,
  accent,
  foreground,
}: {
  project: Project;
  accent: string;
  foreground: string;
}) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <p
        style={{
          fontSize: 16,
          fontFamily: "monospace",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: accent,
          opacity: 0.7,
          marginBottom: 64,
        }}
      >
        Impact
      </p>
      <div style={{ display: "flex", gap: 80 }}>
        {project.metrics.map((metric) => (
          <div key={metric.label}>
            <p
              style={{
                fontSize: 80,
                fontWeight: 700,
                color: accent,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {metric.value}
            </p>
            <p
              style={{
                fontSize: 20,
                color: foreground,
                opacity: 0.45,
                marginTop: 12,
              }}
            >
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualsSlide({
  project,
  accent,
  foreground,
}: {
  project: Project;
  accent: string;
  foreground: string;
}) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <p
        style={{
          fontSize: 16,
          fontFamily: "monospace",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: accent,
          opacity: 0.7,
          marginBottom: 48,
        }}
      >
        Screens
      </p>
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 24,
          overflow: "hidden",
        }}
      >
        {project.screens?.slice(0, 3).map((screen) => (
          <div
            key={screen.src}
            style={{
              flex: 1,
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.03)",
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
