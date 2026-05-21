import { useState, useEffect } from "react";

interface SlideOption {
  id: string;
  label: string;
  isCase?: boolean;
}

interface Presentation {
  slug: string;
  name: string;
  slides: Array<{ type: string; slug?: string }>;
  createdAt: string;
}

interface Props {
  availableProjects: { slug: string; name: string }[];
  initialPresentations: Presentation[];
}

const STATIC_SLIDES: SlideOption[] = [
  { id: "about-me", label: "AboutMe" },
  { id: "timeline", label: "Timeline" },
  { id: "skills", label: "Skills" },
  { id: "company-bio", label: "CompanyBIO" },
];

const PORTFOLIO_URL = "http://localhost:4321";

export default function PortfolioBuilder({ availableProjects, initialPresentations }: Props) {
  const [presentations, setPresentations] = useState<Presentation[]>(initialPresentations);
  const [selectedSlides, setSelectedSlides] = useState<string[]>([]);
  const [presentationName, setPresentationName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const caseSlides: SlideOption[] = availableProjects.map((p) => ({
    id: `case:${p.slug}`,
    label: p.name,
    isCase: true,
  }));

  const allSlides = [...STATIC_SLIDES, ...caseSlides];

  function toggleSlide(id: string) {
    setSelectedSlides((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function createPresentation() {
    if (!presentationName.trim()) {
      setError("Give the presentation a name.");
      return;
    }
    if (selectedSlides.length === 0) {
      setError("Select at least one slide.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/presentations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: presentationName, slides: selectedSlides }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const created = await res.json();
      setPresentations((prev) => [...prev, created]);
      setPresentationName("");
      setSelectedSlides([]);
    } catch {
      setError("Error saving presentation.");
    } finally {
      setSaving(false);
    }
  }

  async function deletePresentation(slug: string) {
    const res = await fetch("/api/presentations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    if (res.ok) {
      setPresentations((prev) => prev.filter((p) => p.slug !== slug));
    }
  }

  const chip = (label: string, color = "#dbeafe") => ({
    display: "inline-flex",
    alignItems: "center",
    background: color,
    color: "#1e3a5f",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
    padding: "3px 10px",
    borderRadius: 4,
    marginBottom: 12,
  });

  const panel: React.CSSProperties = {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 12,
    padding: 24,
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  };

  const slideChip = (id: string, label: string, selected: boolean): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    border: selected ? "2px solid #6366f1" : "2px solid #cbd5e1",
    background: selected ? "#eef2ff" : "#fff",
    color: selected ? "#4338ca" : "#475569",
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
    userSelect: "none",
  });

  const presentationCard: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  };

  return (
    <div style={{ padding: 32, fontFamily: "system-ui, sans-serif", maxWidth: 960, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 24 }}>
        {/* Left: Index */}
        <div style={panel}>
          <span style={chip("Index")}>Index</span>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {presentations.length === 0 && (
              <p style={{ fontSize: 13, color: "#94a3b8" }}>No presentations yet.</p>
            )}
            {presentations.map((p) => (
              <div key={p.slug} style={presentationCard}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", margin: 0 }}>{p.name}</p>
                  <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>
                    {p.slides.length} slides · {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <a
                    href={`${PORTFOLIO_URL}/p/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 12,
                      color: "#6366f1",
                      textDecoration: "none",
                      border: "1px solid #a5b4fc",
                      borderRadius: 6,
                      padding: "4px 10px",
                    }}
                  >
                    Preview →
                  </a>
                  <button
                    onClick={() => deletePresentation(p.slug)}
                    style={{
                      background: "none",
                      border: "1px solid #fca5a5",
                      color: "#ef4444",
                      borderRadius: 6,
                      padding: "4px 10px",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "auto" }}>
            Export PDF option for each presentation
          </p>
        </div>

        {/* Right: Generate new */}
        <div style={panel}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={chip("Generate new")}>Generate new</span>
            <button
              onClick={createPresentation}
              disabled={saving}
              style={{
                background: saving ? "#a5b4fc" : "#6366f1",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 20px",
                fontSize: 13,
                fontWeight: 600,
                cursor: saving ? "default" : "pointer",
              }}
            >
              {saving ? "Saving…" : "Save presentation"}
            </button>
          </div>

          <input
            type="text"
            placeholder="Presentation name (e.g. Stripe 2025)"
            value={presentationName}
            onChange={(e) => setPresentationName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createPresentation()}
            style={{
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 14,
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          />

          {error && <p style={{ fontSize: 13, color: "#ef4444", margin: 0 }}>{error}</p>}

          <div>
            <p style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Global slides
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {STATIC_SLIDES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleSlide(s.id)}
                  style={slideChip(s.id, s.label, selectedSlides.includes(s.id))}
                >
                  {selectedSlides.includes(s.id) && <span style={{ marginRight: 6 }}>✓</span>}
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Cases
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {caseSlides.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleSlide(s.id)}
                  style={slideChip(s.id, s.label, selectedSlides.includes(s.id))}
                >
                  {selectedSlides.includes(s.id) && <span style={{ marginRight: 6 }}>✓</span>}
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {selectedSlides.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <p style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>
                Selected ({selectedSlides.length}):
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {selectedSlides.map((id) => {
                  const label = allSlides.find((s) => s.id === id)?.label ?? id;
                  return (
                    <span
                      key={id}
                      style={{
                        background: "#eef2ff",
                        color: "#4338ca",
                        fontSize: 12,
                        borderRadius: 6,
                        padding: "4px 10px",
                        fontWeight: 500,
                      }}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
