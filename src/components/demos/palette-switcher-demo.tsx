"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

const palettes = {
  aurora: {
    label: "Aurora",
    swatches: ["#7DD3FC", "#38BDF8", "#2563EB", "#1D4ED8"],
  },
  ember: {
    label: "Ember",
    swatches: ["#F59E0B", "#EA580C", "#C2410C", "#E11D48"],
  },
};

type PaletteKey = keyof typeof palettes;

export function PaletteSwitcherDemo() {
  const [mode, setMode] = useState<PaletteKey>("aurora");

  const swap = () => {
    const action = () => setMode((value) => (value === "aurora" ? "ember" : "aurora"));
    if (typeof document.startViewTransition === "function") {
      document.documentElement.classList.add("page-transition");
      const vt = document.startViewTransition(action);
      vt.finished.finally(() => document.documentElement.classList.remove("page-transition"));
      return;
    }
    action();
  };

  const next = mode === "aurora" ? "ember" : "aurora";

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[color-mix(in_oklch,var(--color-muted-foreground)_68%,transparent)]">
            Active palette
          </p>
          <h3 className="text-2xl font-semibold text-[var(--color-card-foreground)]">
            {palettes[mode].label}
          </h3>
        </div>
        <Button onClick={swap} variant="secondary">
          Switch to {palettes[next].label}
        </Button>
      </header>
      <div
        className="palette-stage"
        data-mode={mode === "aurora" ? "base" : "alt"}
      >
        {palettes[mode].swatches.map((swatch, index) => (
          <div
            key={`${mode}-${swatch}`}
            style={{
              background: swatch,
              viewTransitionName: `palette-swatch-${index}`,
            }}
            className="palette-swatch flex aspect-[4/3] items-end rounded-[calc(var(--radius-lg))] border border-white/20 p-4 text-sm font-semibold text-white shadow-[0_16px_36px_-24px_rgba(0,0,0,0.35)]"
          >
            {swatch}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PaletteSwitcherPreview() {
  const [mode, setMode] = useState<PaletteKey>("aurora");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMode((value) => (value === "aurora" ? "ember" : "aurora"));
    }, 3400);
    return () => window.clearInterval(interval);
  }, []);

  const previewSwatches = useMemo(() => palettes[mode].swatches.slice(0, 3), [mode]);

  return (
    <div
      className={cn(
        "relative flex h-48 flex-col justify-between overflow-hidden rounded-[calc(var(--radius-xl))] border border-border/35 bg-[color-mix(in_oklch,var(--color-card)_92%,transparent)] p-5 transition-colors duration-500",
        mode === "ember" && "bg-[color-mix(in_oklch,var(--color-card)_88%,transparent)]",
      )}
    >
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-[color-mix(in_oklch,var(--color-muted-foreground)_65%,transparent)]">
          Palette
        </span>
        <span className="text-[var(--color-card-foreground)]">{palettes[mode].label}</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {previewSwatches.map((swatch, index) => (
          <div
            key={`${mode}-preview-${swatch}`}
            style={{
              background: swatch,
              viewTransitionName: `palette-preview-${index}`,
            }}
            className="h-20 rounded-[calc(var(--radius-lg))] border border-white/20 shadow-[0_16px_40px_-36px_rgba(0,0,0,0.45)]"
          />
        ))}
      </div>
      <div className="flex justify-between text-[11px] uppercase tracking-[0.22em] text-[color-mix(in_oklch,var(--color-muted-foreground)_55%,transparent)]">
        <span>Cascade</span>
        <span>View Transition</span>
      </div>
    </div>
  );
}
