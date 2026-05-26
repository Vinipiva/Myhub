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

  // ── Horizontal career timeline data ──────────────────────────────────────
  const TL_START = 2008;
  const TL_END   = 2026;
  const TL_SPAN  = TL_END - TL_START; // 18 years

  const pct  = (yr: number) => `${((yr - TL_START) / TL_SPAN * 100).toFixed(3)}%`;
  const wPct = (from: number, to: number) => `${((to - from) / TL_SPAN * 100).toFixed(3)}%`;

  const track1Segs = [
    { from: 2008, to: 2009, label: "Designer",           color: "#6B7280" },
    { from: 2009, to: 2013, label: "Marketing Designer", color: "#3B82F6" },
    { from: 2014, to: 2018, label: "Corollarium",        color: "#7C3AED" },
    { from: 2018, to: 2021, label: "Oi Telecom",         color: "#D97706" },
    { from: 2021, to: 2023, label: "Avail",              color: "#2563EB" },
    { from: 2023, to: 2025, label: "Realtor.com",        color: "#DC2626" },
  ];

  const track2Segs = [
    { from: 2021, to: 2025, label: "FanFest", color: "#9333EA" },
  ];

  const yearTicks = [2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024, 2026];
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: fm,
        position: "relative",
        background: "transparent",
        overflow: "hidden",
      }}
    >
      {/* Subtle vertical divider between columns */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
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
          padding: "40px 80px 136px",
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

      {/* ── Bottom: Career Timeline + Legend ── */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 80,
          right: 80,
          zIndex: 2,
        }}
      >
        {/* Horizontal career timeline */}
        <div style={{ marginBottom: 10 }}>
          {/* Track 1 — primary career */}
          <div
            style={{
              position: "relative",
              height: 16,
              borderRadius: 3,
              background: "rgba(0,0,0,0.06)",
              marginBottom: 4,
              overflow: "hidden",
            }}
          >
            {track1Segs.map((seg) => (
              <div
                key={seg.label}
                style={{
                  position: "absolute",
                  left: pct(seg.from),
                  width: wPct(seg.from, seg.to),
                  height: "100%",
                  background: seg.color,
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                  borderRadius: 2,
                }}
                title={`${seg.label} (${seg.from}–${seg.to})`}
              >
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 8,
                    color: "#ffffff",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase" as const,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: "0 5px",
                    lineHeight: 1,
                  }}
                >
                  {seg.label}
                </span>
              </div>
            ))}
          </div>

          {/* Track 2 — concurrent role (FanFest) */}
          <div
            style={{
              position: "relative",
              height: 10,
              borderRadius: 3,
              background: "rgba(0,0,0,0.04)",
              marginBottom: 5,
              overflow: "hidden",
            }}
          >
            {track2Segs.map((seg) => (
              <div
                key={seg.label}
                style={{
                  position: "absolute",
                  left: pct(seg.from),
                  width: wPct(seg.from, seg.to),
                  height: "100%",
                  background: seg.color,
                  opacity: 0.82,
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                  borderRadius: 2,
                }}
                title={`${seg.label} (${seg.from}–${seg.to})`}
              >
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 8,
                    color: "#ffffff",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase" as const,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: "0 5px",
                    lineHeight: 1,
                  }}
                >
                  {seg.label}
                </span>
              </div>
            ))}
          </div>

          {/* Year tick marks */}
          <div style={{ position: "relative", height: 13 }}>
            {yearTicks.map((yr) => (
              <span
                key={yr}
                style={{
                  position: "absolute",
                  left: pct(yr),
                  transform: "translateX(-50%)",
                  fontFamily: mono,
                  fontSize: 9,
                  color: foreground,
                  opacity: 0.28,
                  letterSpacing: "0.03em",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                {yr}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(0,0,0,0.07)", marginBottom: 10 }} />

        {/* Type legend + Process link */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
    </div>
  );
}
