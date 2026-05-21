import type { ProfileFrontmatter } from "../../lib/types";

interface Props {
  profile: ProfileFrontmatter;
  accent: string;
  foreground: string;
}

export default function AboutMeSlide({ profile, accent, foreground }: Props) {
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
          fontSize: 14,
          fontFamily: "monospace",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: accent,
          opacity: 0.7,
          marginBottom: 40,
        }}
      >
        About me
      </p>

      <h1
        style={{
          fontSize: 80,
          fontWeight: 700,
          color: foreground,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          marginBottom: 24,
        }}
      >
        {profile.name}
      </h1>

      <p
        style={{
          fontSize: 28,
          color: foreground,
          opacity: 0.6,
          marginBottom: 48,
          fontWeight: 400,
        }}
      >
        {profile.role}
      </p>

      {profile.tagline && (
        <p
          style={{
            fontSize: 22,
            color: foreground,
            opacity: 0.5,
            maxWidth: 840,
            lineHeight: 1.5,
            marginBottom: 64,
          }}
        >
          {profile.tagline}
        </p>
      )}

      <div style={{ display: "flex", gap: 64 }}>
        {profile.impactUsers && (
          <div>
            <p style={{ fontSize: 56, fontWeight: 700, color: accent, lineHeight: 1, letterSpacing: "-0.02em" }}>
              {profile.impactUsers}
            </p>
            <p style={{ fontSize: 16, color: foreground, opacity: 0.4, marginTop: 8 }}>Users reached</p>
          </div>
        )}
        {profile.impactRevenue && (
          <div>
            <p style={{ fontSize: 56, fontWeight: 700, color: accent, lineHeight: 1, letterSpacing: "-0.02em" }}>
              {profile.impactRevenue}
            </p>
            <p style={{ fontSize: 16, color: foreground, opacity: 0.4, marginTop: 8 }}>Revenue impact</p>
          </div>
        )}
        {profile.availability && (
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <p
              style={{
                fontSize: 14,
                fontFamily: "monospace",
                color: accent,
                opacity: 0.6,
                letterSpacing: "0.04em",
                maxWidth: 320,
                lineHeight: 1.6,
              }}
            >
              {profile.availability}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
