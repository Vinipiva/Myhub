interface Props {
  accent: string;
  foreground: string;
  background: string;
}

const ENTRIES = [
  {
    period: "2015 – 2016",
    type: "Postgraduate",
    degree: "Communication: Contemporary Culture & New Media Studies",
    institution: "NOVA University Lisbon",
    location: "Lisbon, Portugal",
  },
  {
    period: "2011 – 2012",
    type: "Undergraduate Exchange · Sandwich Program",
    degree: "Design & Visual Communications",
    institution: "University of Lisbon",
    location: "Lisbon, Portugal",
  },
  {
    period: "2009 – 2013",
    type: "Bachelor's",
    degree: "Communication, Marketing & Advertising",
    institution: "UNIP – Universidade Paulista",
    location: "São Paulo, Brazil",
  },
];

const LANGUAGES = [
  { lang: "English", level: "Fluent" },
  { lang: "Portuguese", level: "Native" },
  { lang: "Spanish", level: "Conversational" },
];

export default function EducationDetail({ accent, foreground }: Props) {
  const ff = "'Red Hat Display', 'Inter', sans-serif";
  const fm = "'Red Hat Text', 'Inter', sans-serif";
  const mono = "monospace";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "64px 120px 72px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 52 }}>
        <p
          style={{
            fontFamily: mono,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: accent,
            marginBottom: 18,
          }}
        >
          Education
        </p>
        <div
          style={{
            width: 52,
            height: 3,
            background: accent,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Education entries */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
        {ENTRIES.map((entry, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 0,
              paddingBottom: i < ENTRIES.length - 1 ? 36 : 0,
              borderBottom: i < ENTRIES.length - 1
                ? `1px solid rgba(${foreground === "#ffffff" ? "255,255,255" : "0,0,0"},0.07)`
                : "none",
              marginBottom: i < ENTRIES.length - 1 ? 36 : 0,
            }}
          >
            {/* Year column */}
            <div style={{ flex: "0 0 180px", paddingTop: 6 }}>
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 12,
                  color: accent,
                  letterSpacing: "0.08em",
                  opacity: 0.85,
                }}
              >
                {entry.period}
              </span>
            </div>

            {/* Content column */}
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontFamily: mono,
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: foreground,
                  opacity: 0.38,
                  marginBottom: 8,
                }}
              >
                {entry.type}
              </p>
              <h3
                style={{
                  fontFamily: ff,
                  fontSize: 34,
                  fontWeight: 800,
                  color: foreground,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  marginBottom: 10,
                  opacity: 0.92,
                }}
              >
                {entry.degree}
              </h3>
              <p
                style={{
                  fontFamily: fm,
                  fontSize: 16,
                  color: foreground,
                  opacity: 0.48,
                  letterSpacing: "0",
                }}
              >
                {entry.institution} · {entry.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Languages row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          marginTop: 44,
          paddingTop: 32,
          borderTop: `1px solid rgba(${foreground === "#ffffff" ? "255,255,255" : "0,0,0"},0.08)`,
        }}
      >
        <span
          style={{
            fontFamily: mono,
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: foreground,
            opacity: 0.30,
            flex: "0 0 180px",
          }}
        >
          Languages
        </span>
        <div style={{ display: "flex", gap: 24 }}>
          {LANGUAGES.map(({ lang, level }) => (
            <div key={lang} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontFamily: ff,
                  fontSize: 18,
                  fontWeight: 700,
                  color: foreground,
                  opacity: 0.82,
                  letterSpacing: "-0.01em",
                }}
              >
                {lang}
              </span>
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.10em",
                  color: foreground,
                  opacity: 0.32,
                  border: `1px solid rgba(${foreground === "#ffffff" ? "255,255,255" : "0,0,0"},0.15)`,
                  borderRadius: 3,
                  padding: "2px 8px",
                }}
              >
                {level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: 120,
          right: 120,
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <a
          href="/process"
          style={{
            color: foreground,
            opacity: 0.28,
            textDecoration: "none",
            fontFamily: mono,
            fontSize: 13,
            letterSpacing: "0.04em",
          }}
        >
          ← Process
        </a>
      </div>
    </div>
  );
}
