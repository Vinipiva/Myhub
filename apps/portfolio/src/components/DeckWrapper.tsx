import { useEffect, useRef, useState } from "react";
import type { AspectRatio } from "../lib/types";

const DECK_DIMENSIONS: Record<AspectRatio, { w: number; h: number }> = {
  "16:9": { w: 1920, h: 1080 },
  "9:16": { w: 1080, h: 1920 },
};

interface Props {
  aspectRatio: AspectRatio;
  accent: string;
  background: string;
  foreground: string;
  children: React.ReactNode;
}

export default function DeckWrapper({
  aspectRatio,
  accent,
  background,
  foreground,
  children,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const { w, h } = DECK_DIMENSIONS[aspectRatio];

  useEffect(() => {
    function recalculate() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const s = Math.min(vw / w, vh / h);
      setScale(s);
      setOffset({
        x: (vw - w * s) / 2,
        y: (vh - h * s) / 2,
      });
    }

    recalculate();
    window.addEventListener("resize", recalculate);
    return () => window.removeEventListener("resize", recalculate);
  }, [w, h]);

  return (
    <div
      ref={containerRef}
      style={{ background, color: foreground, overflow: "hidden" }}
      className="fixed inset-0"
    >
      <div
        style={{
          width: w,
          height: h,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          left: offset.x,
          top: offset.y,
          // CSS custom property for children to access accent color
          "--accent": accent,
          "--foreground": foreground,
          "--background": background,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
