import type { ExperienceFrontmatter } from "../lib/types";

interface Props {
  experience: ExperienceFrontmatter[];
  accent: string;
  foreground: string;
  background: string;
}

const TYPE_COLOR: Record<string, string> = {
  "Remote contractor":            "#D97706",
  "Outsourced remote contractor": "#DC2626",
  "Part-time contractor":         "#7C3AED",
  "Full-time employee":           "#16A34A",
};

const BRAND_GRAD = "linear-gradient(90deg, #7c3aed, #ec4899, #f59e0b)";

export default function TimelineDetail({ experience, foreground }: Props) {
  const ff = "'Red Hat Display', 'Inter', sans-serif";
  const fm = "'Red Hat Text', 'Inter', sans-serif";
  const mono = "monospace";

  const half = Math.ceil(experience.length / 2);
  const leftCol = experience.slice(0, half);   // recent: PepsiCo, Realtor, Fanfest…
  const rightCol = experience.slice(half);      // older: Avail, Oi, Corollarium…

  function Entry({ exp, index, total }: { exp: ExperienceFrontmatter; index: number; total: number }) {
    const dotColor = TYPE_COLOR[exp.type ?? ""] ?? "#7C3AED";
    const isFirst = index === 0;
    const opacity = isFirst ? 1 : 1 - (index / (total - 1)) * 0.22;

    return (
      <div
        style={{
          borderLeft: `3px solid ${dotColor}`,
          paddingLeft: 24,
          paddingBottom: index < total - 1 ? 36 : 0,
          opacity,
        }}
      >
        {/* Period */}
        <p
          style={{
            fontFamily: mono,
            fontSize: 12,
            letterSpacing: "0.10em",
            textTransform: "uppercase" as const,
            color: foreground,
            opacity: 0.50,
            marginBottom: 10,
            lineHeight: 1,
          }}
        >
          {exp.period}
        </p>

        {/* Company + badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" as const }}>
          <h3
            style={{
              fontFamily: ff,
              fontSize: 36,
              fontWeight: 800,
              color: "#0f0f12",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {exp.company}
          </h3>
          <span
            style={{
              fontFamily: mono,
              fontSize: 10,
              letterSpacing: "0.10em",
              textTransform: "uppercase" as const,
              color: "#ffffff",
              background: dotColor,
              padding: "4px 10px",
              borderRadius: 2,
              lineHeight: 1,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {exp.type}
          </span>
        </div>

        {/* Role + location */}
        <p
          style={{
            fontFamily: fm,
            fontSize: 16,
            color: foreground,
            opacity: 0.62,
            marginBottom: exp.bullets?.[0] ? 8 : 0,
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
          }}
        >
          {exp.role}
          {exp.location && (
            <span style={{ opacity: 0.65, marginLeft: 10, fontFamily: mono, fontSize: 12 }}>
              · {exp.location}
            </span>
          )}
        </p>

        {/* First bullet */}
        {exp.bullets?.[0] && (
          <p
            style={{
              fontFamily: fm,
              fontSize: 14,
              color: foreground,
              opacity: 0.48,
              lineHeight: 1.58,
              maxWidth: 420,
            }}
          >
            {exp.bullets[0]}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingTop: 56,
        display: "flex",
        flexDirection: "column",
        fontFamily: fm,
        position: "relative",
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Subtle vertical divider between columns */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 56,
          bottom: 0,
          width: 1,
          background: "rgba(0,0,0,0.06)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "52px 80px 80px",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 52, display: "flex", alignItems: "baseline", gap: 24 }}>
          <p
            style={{
              fontSize: 14,
              fontFamily: mono,
              textTransform: "uppercase" as const,
              letterSpacing: "0.18em",
              background: BRAND_GRAD,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 700,
            }}
          >
            Career Timeline
          </p>
          <span
            style={{
              color: foreground,
              opacity: 0.38,
              fontFamily: mono,
              fontSize: 13,
              letterSpacing: "0.06em",
            }}
          >
            {experience.length} positions · 10+ years
          </span>
        </div>

        {/* Two-column grid */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 80px",
            overflow: "hidden",
          }}
        >
          {/* Left column — recent */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p
              style={{
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: foreground,
                opacity: 0.40,
                marginBottom: 28,
              }}
            >
              Recent
            </p>
            {leftCol.map((exp, i) => (
              <Entry key={`${exp.company}-${i}`} exp={exp} index={i} total={leftCol.length} />
            ))}
          </div>

          {/* Right column — earlier */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p
              style={{
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: foreground,
                opacity: 0.40,
                marginBottom: 28,
              }}
            >
              Earlier
            </p>
            {rightCol.map((exp, i) => (
              <Entry key={`${exp.company}-${i}`} exp={exp} index={i} total={rightCol.length} />
            ))}
          </div>
        </div>
      </div>

      {/* Legend + bottom nav */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        {/* Type legend */}
        <div style={{ display: "flex", gap: 20 }}>
          {Object.entries(TYPE_COLOR).map(([type, color]) => (
            <div key={type} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 1,
                  background: color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 11,
                  color: foreground,
                  opacity: 0.45,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                }}
              >
                {type}
              </span>
            </div>
          ))}
        </div>

        {/* Process link */}
        <a
          href="/process"
          style={{
            color: foreground,
            opacity: 0.24,
            textDecoration: "none",
            fontFamily: mono,
            fontSize: 12,
            letterSpacing: "0.06em",
          }}
        >
          Process →
        </a>
      </div>
    </div>
  );
}
