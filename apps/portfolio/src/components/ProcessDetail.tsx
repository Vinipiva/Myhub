import { useState, useEffect } from "react";

interface Props {
  accent: string;
  foreground: string;
  background: string;
}

// Content derived exclusively from profile.md and experience/*.md
const SLIDES = [
  {
    index: "01",
    label: "Discovery",
    title: "Understand before you design",
    body: "Every project starts with a clear-eyed diagnosis. I use heuristic reviews, user interviews, and stakeholder alignment to map where the real friction lives — not just the surface symptoms.",
    evidence: "Realtor.com · 2023–2025",
    evidenceNote: "Conducted research across three teams — Rentals, Online Store, and UpNest CRM — before proposing any design direction.",
    image: "/images/process-1.jpg",
  },
  {
    index: "02",
    label: "Systems",
    title: "Design systems, not screens",
    body: "Building from scratch or restructuring from chaos, I create the foundation that scales. A component library built right means the product team ships faster, the brand stays consistent, and design debt doesn't compound.",
    evidence: "FanFest.io · 2021–2025",
    evidenceNote: "Established the full design system and UX/UI direction from zero — before a single PSG or ManCity contract existed.",
    image: "/images/process-3.jpg",
  },
  {
    index: "03",
    label: "Collaboration",
    title: "Design with, not for",
    body: "I embed into cross-functional teams — product, engineering, data, and business — working directly with decision-makers. I've co-crafted investor decks with CEOs and redesigned CRM workflows alongside sales ops teams.",
    evidence: "FanFest.io + Avail.co · 2021–2025",
    evidenceNote: "Worked directly with CEO on product vision and investor strategy at FanFest; owned the full marketing squad at Avail.",
    image: "/images/process-2.jpg",
  },
  {
    index: "04",
    label: "Delivery",
    title: "Ship and measure",
    body: "Design is only as good as its impact. I track what ships, measure how it performs, and iterate on real data. From +70% conversion to 40–60% faster task completion — the metrics are always the goal, not the output.",
    evidence: "Avail.co + Realtor.com",
    evidenceNote: "Marketing team updates 84% faster without engineering. Rental unique lead submissions up +12.5%. Mobile drop-off cut from ~90% to under 10%.",
    image: "/images/process-4.jpg",
  },
  {
    index: "05",
    label: "AI & Emerging Tech",
    title: "Designing for the AI era",
    body: "I've integrated AI into products before it was the default. From NLP-powered chatbots that saved $7M/year to conversational rental search MVPs and fan personalization engines — I build with emerging tech as a design material, not an afterthought.",
    evidence: "Oi Telecom · 2019 · FanFest.io · Realtor.com",
    evidenceNote: "Led UX for Joice (2019 AI chatbot), FanFest gamification AI, and Realtor.com conversational AI search — across three different domains.",
    image: "/images/process-5.jpg",
  },
] as const;

export default function ProcessDetail({ accent, foreground }: Props) {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];
  const total = SLIDES.length;

  const ff = "'Red Hat Display', 'Inter', sans-serif";
  const fm = "'Red Hat Text', 'Inter', sans-serif";
  const mono = "monospace";

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        setCurrent((c) => Math.min(c + 1, total - 1));
      }
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        setCurrent((c) => Math.max(c - 1, 0));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        fontFamily: fm,
      }}
    >
      {/* Decorative sketch image */}
      <img
        src="/images/sketch-plane.png"
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          right: slide.image ? "52%" : 80,
          bottom: -20,
          width: 320,
          opacity: 0.04,
          transform: "rotate(5deg)",
          pointerEvents: "none",
          transition: "opacity 0.4s",
          zIndex: 0,
        }}
      />

      <div
        key={current}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "64px 120px 120px",
          gap: 80,
          animation: "fadeSlide 0.32s ease",
        }}
      >
        {/* Left: content */}
        <div
          style={{
            flex: slide.image ? "0 0 820px" : 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Label row */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
            <span
              style={{
                fontFamily: mono,
                fontSize: 11,
                color: accent,
                opacity: 0.65,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Process · {slide.index}/{String(total).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: mono,
                fontSize: 11,
                color: foreground,
                opacity: 0.2,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {slide.label}
            </span>
          </div>

          {/* Accent bar */}
          <div
            style={{
              width: 56,
              height: 3,
              background: accent,
              borderRadius: 2,
              marginBottom: 36,
              opacity: 0.75,
            }}
          />

          <h2
            style={{
              fontFamily: ff,
              fontSize: 64,
              fontWeight: 900,
              color: foreground,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              marginBottom: 32,
              maxWidth: 760,
            }}
          >
            {slide.title}
          </h2>

          <p
            style={{
              fontSize: 22,
              fontFamily: fm,
              color: foreground,
              opacity: 0.62,
              lineHeight: 1.68,
              maxWidth: 720,
              fontWeight: 300,
              marginBottom: 48,
            }}
          >
            {slide.body}
          </p>

          {/* Evidence block */}
          <div
            style={{
              borderLeft: `2px solid ${accent}`,
              paddingLeft: 20,
            }}
          >
            <p
              style={{
                fontFamily: mono,
                fontSize: 11,
                color: accent,
                opacity: 0.65,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {slide.evidence}
            </p>
            <p
              style={{
                fontSize: 16,
                color: foreground,
                opacity: 0.4,
                lineHeight: 1.6,
                fontFamily: fm,
              }}
            >
              {slide.evidenceNote}
            </p>
          </div>
        </div>

        {/* Right: image */}
        {slide.image && (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                maxHeight: 680,
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.14)",
              }}
            >
              <img
                src={slide.image}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
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
          href="/timeline"
          style={{
            color: foreground,
            opacity: 0.28,
            textDecoration: "none",
            fontSize: 13,
            fontFamily: mono,
            letterSpacing: "0.04em",
          }}
        >
          ← Timeline
        </a>

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 28 : 8,
                height: 8,
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

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
            disabled={current === 0}
            style={{
              background: "transparent",
              border: `1px solid rgba(0,0,0,${current === 0 ? "0.06" : "0.10"})`,
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
            onClick={() => setCurrent((c) => Math.min(c + 1, total - 1))}
            disabled={current === total - 1}
            style={{
              background: current === total - 1 ? "transparent" : accent,
              border: current === total - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
              color: current === total - 1 ? "rgba(0,0,0,0.35)" : "#ffffff",
              opacity: current === total - 1 ? 0.2 : 1,
              width: 48,
              height: 48,
              borderRadius: 6,
              cursor: current === total - 1 ? "default" : "pointer",
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
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
