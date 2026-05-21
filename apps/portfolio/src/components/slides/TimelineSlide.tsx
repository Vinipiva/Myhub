import type { ExperienceFrontmatter } from "../../lib/types";

interface Props {
  experience: ExperienceFrontmatter[];
  accent: string;
  foreground: string;
}

export default function TimelineSlide({ experience, accent, foreground }: Props) {
  const entries = [...experience].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "72px 120px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p
        style={{
          fontSize: 14,
          fontFamily: "monospace",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: accent,
          opacity: 0.7,
          marginBottom: 48,
        }}
      >
        Experience
      </p>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0,
          position: "relative",
        }}
      >
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 8,
            bottom: 8,
            width: 1,
            background: `rgba(255,255,255,0.08)`,
          }}
        />

        {entries.map((exp, i) => (
          <div
            key={`${exp.company}-${i}`}
            style={{
              display: "flex",
              gap: 32,
              paddingLeft: 24,
              paddingBottom: i < entries.length - 1 ? 32 : 0,
              position: "relative",
            }}
          >
            {/* Dot */}
            <div
              style={{
                position: "absolute",
                left: -4,
                top: 10,
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: i === 0 ? accent : `rgba(255,255,255,0.2)`,
                border: `1px solid ${i === 0 ? accent : "rgba(255,255,255,0.1)"}`,
              }}
            />

            {/* Period */}
            <div style={{ width: 180, flexShrink: 0 }}>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "monospace",
                  color: foreground,
                  opacity: 0.35,
                  lineHeight: 1.4,
                  paddingTop: 6,
                }}
              >
                {exp.period}
              </p>
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: foreground,
                  letterSpacing: "-0.01em",
                  marginBottom: 4,
                }}
              >
                {exp.company}
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: foreground,
                  opacity: 0.5,
                  marginBottom: exp.summary ? 10 : 0,
                }}
              >
                {exp.role}
                {exp.type ? ` · ${exp.type}` : ""}
              </p>
              {exp.summary && (
                <p
                  style={{
                    fontSize: 14,
                    color: foreground,
                    opacity: 0.4,
                    lineHeight: 1.5,
                    maxWidth: 640,
                  }}
                >
                  {exp.summary}
                </p>
              )}
              {exp.tags && exp.tags.length > 0 && (
                <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                  {exp.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 11,
                        fontFamily: "monospace",
                        color: foreground,
                        opacity: 0.25,
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 3,
                        padding: "2px 8px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
