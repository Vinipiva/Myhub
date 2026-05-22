interface Props {
  accent: string;
  foreground: string;
  background: string;
}

export default function EducationDetail({ accent, foreground }: Props) {
  const ff = "'Red Hat Display', 'Inter', sans-serif";
  const fm = "'Red Hat Text', 'Inter', sans-serif";
  const mono = "monospace";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingTop: 56,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "136px 120px 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative bg */}
      <img
        src="/images/sketch-pen.png"
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          right: 100,
          bottom: 60,
          width: 280,
          opacity: 0.04,
          transform: "rotate(8deg)",
          pointerEvents: "none",
        }}
      />

      <p
        style={{
          fontFamily: mono,
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: accent,
          opacity: 0.65,
          marginBottom: 48,
        }}
      >
        Education
      </p>

      <div
        style={{
          width: 56,
          height: 3,
          background: accent,
          borderRadius: 2,
          marginBottom: 40,
          opacity: 0.75,
        }}
      />

      {/* Placeholder content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 48,
          maxWidth: 900,
        }}
      >
        {/* Graphic Design background */}
        <div>
          <p
            style={{
              fontFamily: mono,
              fontSize: 11,
              color: foreground,
              opacity: 0.28,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            ~2004 · Formal education
          </p>
          <h3
            style={{
              fontFamily: ff,
              fontSize: 42,
              fontWeight: 700,
              color: foreground,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: 10,
              opacity: 0.3,
              fontStyle: "italic",
            }}
          >
            Content to be added
          </h3>
          <p
            style={{
              fontFamily: fm,
              fontSize: 18,
              color: foreground,
              opacity: 0.25,
              lineHeight: 1.6,
            }}
          >
            Add your degree, institution, and period via Keystatic → Education
          </p>
        </div>

        {/* Self-taught journey note */}
        <div
          style={{
            borderLeft: `2px solid ${accent}`,
            paddingLeft: 24,
          }}
        >
          <p
            style={{
              fontFamily: ff,
              fontSize: 26,
              fontWeight: 300,
              color: foreground,
              opacity: 0.55,
              lineHeight: 1.65,
              letterSpacing: "-0.01em",
            }}
          >
            Started as a graphic designer 20 years ago, then moved by a passion
            for creating experiences, became a product designer in 2013.
          </p>
          <p
            style={{
              fontFamily: mono,
              fontSize: 11,
              color: foreground,
              opacity: 0.25,
              marginTop: 12,
              letterSpacing: "0.08em",
            }}
          >
            — profile.md
          </p>
        </div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          position: "absolute",
          bottom: 44,
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
