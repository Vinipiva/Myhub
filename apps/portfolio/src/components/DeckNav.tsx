"use client";
import { useState, useEffect } from "react";

export interface NavCase {
  slug: string;
  company: string;
}

interface Props {
  section: "cover" | "cases" | "process" | "timeline" | "education";
  caseSlug?: string;
  cases: NavCase[];
  accent: string;
  fg: string;
}

const NAV_ITEMS = [
  { id: "cover",     label: "Home",      href: "/" },
  { id: "cases",     label: "Cases",     href: "/cases" },
  { id: "process",   label: "Process",   href: "/process" },
  { id: "timeline",  label: "Timeline",  href: "/timeline" },
  { id: "education", label: "Education", href: "/education" },
] as const;

const BRAND_GRAD = "linear-gradient(90deg, #7c3aed, #ec4899, #f59e0b)";
const fm = "'Red Hat Text', sans-serif";
const mono = "monospace";

export default function DeckNav({ section, caseSlug, cases }: Props) {
  const [casesOpen, setCasesOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") window.location.href = "/";
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Init sky theme from localStorage
  useEffect(() => {
    const light = localStorage.getItem("sky-theme") === "light";
    setIsLight(light);
    document.documentElement.classList.toggle("sky--light", light);
    document.querySelector(".cover")?.classList.toggle("sky--light", light);
  }, []);

  const handleSkyToggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("sky--light", next);
    document.querySelector(".cover")?.classList.toggle("sky--light", next);
    localStorage.setItem("sky-theme", next ? "light" : "dark");
  };

  const isActive = (id: string) => section === id;
  const dark = true; // always dark-glass nav for consistency across all pages

  return (
    <nav
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 56,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 64px",
        background: dark ? "rgba(4, 3, 18, 0.42)" : "#ffffff",
        backdropFilter: dark ? "blur(20px) saturate(120%)" : "none",
        WebkitBackdropFilter: dark ? "blur(20px) saturate(120%)" : "none",
        borderBottom: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.08)",
        boxSizing: "border-box",
        fontFamily: fm,
        overflow: "visible",
      }}
    >
      {/* Top brand accent line — 2px solid, 100% width */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 2,
        background: BRAND_GRAD,
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <a
        href="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <span style={{
          fontFamily: "monospace",
          fontWeight: 800,
          fontSize: 15,
          letterSpacing: "0.04em",
          background: BRAND_GRAD,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          VP
        </span>
        <span style={{ width: 1, height: 14, background: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.10)", display: "block" }} />
        <span style={{
          color: dark ? "rgba(255,255,255,0.82)" : "#374151",
          fontSize: 13,
          fontFamily: fm,
          letterSpacing: "0.01em",
        }}>
          Vinícius Piva
        </span>
      </a>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.id);
          const hov = hovered === item.id;

          if (item.id === "cases") {
            return (
              <div
                key="cases"
                style={{ position: "relative" }}
                onMouseEnter={() => { setCasesOpen(true); setHovered("cases"); }}
                onMouseLeave={() => { setCasesOpen(false); setHovered(null); }}
              >
                <a
                  href={item.href}
                  style={{
                    position: "relative",
                    color: dark
                      ? (active ? "#ffffff" : hov ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.52)")
                      : (active ? "#111827" : hov ? "#374151" : "#6B7280"),
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    textDecoration: "none",
                    padding: "6px 14px",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    background: active ? (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)") : "transparent",
                    transition: "color 0.15s, background 0.15s",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  Cases
                  <span style={{ fontSize: 9, opacity: 0.5 }}>▾</span>
                  {active && (
                    <span style={{
                      position: "absolute",
                      bottom: 0, left: 8, right: 8,
                      height: 2, borderRadius: 1,
                      background: BRAND_GRAD,
                    }} />
                  )}
                </a>

                {casesOpen && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.10)",
                    borderRadius: 8,
                    padding: "6px",
                    minWidth: 200,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                    zIndex: 300,
                  }}>
                    <div style={{ height: 1, background: BRAND_GRAD, opacity: 0.5, borderRadius: "8px 8px 0 0", marginBottom: 6 }} />
                    {cases.map((c) => (
                      <a
                        key={c.slug}
                        href={`/cases/${c.slug}`}
                        style={{
                          display: "block",
                          padding: "9px 14px",
                          color: caseSlug === c.slug ? "#111827" : "#6B7280",
                          fontFamily: mono,
                          fontSize: 11,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase" as const,
                          textDecoration: "none",
                          borderRadius: 8,
                          background: caseSlug === c.slug ? "rgba(124,58,237,0.07)" : "transparent",
                          fontWeight: caseSlug === c.slug ? 600 : 400,
                          position: "relative",
                          transition: "background 0.12s, color 0.12s",
                        }}
                      >
                        {caseSlug === c.slug && (
                          <span style={{
                            position: "absolute",
                            left: 0, top: 4, bottom: 4,
                            width: 2, borderRadius: 1,
                            background: BRAND_GRAD,
                          }} />
                        )}
                        <span style={{ marginLeft: caseSlug === c.slug ? 8 : 0 }}>{c.company}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <a
              key={item.id}
              href={item.href}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative",
                color: dark
                  ? (active ? "#ffffff" : hov ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.52)")
                  : (active ? "#111827" : hov ? "#374151" : "#6B7280"),
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: 6,
                background: active ? (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)") : "transparent",
                transition: "color 0.15s, background 0.15s",
                fontWeight: active ? 600 : 400,
              }}
            >
              {item.label}
              {active && (
                <span style={{
                  position: "absolute",
                  bottom: 0, left: 8, right: 8,
                  height: 2, borderRadius: 1,
                  background: BRAND_GRAD,
                }} />
              )}
            </a>
          );
        })}
      </div>

      {/* Right: slide counter placeholder keeps layout balanced */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <button
          onClick={handleSkyToggle}
          title={isLight ? "Switch to night" : "Switch to day"}
          style={{
            width: 28, height: 28,
            borderRadius: 6,
            background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)"}`,
            color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.40)",
            fontSize: 13,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.15s",
          }}
        >
          {isLight ? "☽" : "☀"}
        </button>
        <span style={{ color: dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)", fontFamily: mono, fontSize: 10, letterSpacing: "0.08em" }}>
          viniciuspiva.com
        </span>
      </div>
    </nav>
  );
}
