"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

type ThemeValue = "light" | "dark";

function resolveTheme(theme?: string | null) {
  if (theme === "light" || theme === "dark") return theme;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function ThemeToggleDemo() {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [busy, setBusy] = useState(false);

  const runTransition = useCallback(
    (nextTheme: ThemeValue, origin?: DOMRect) => {
      const doc = document.documentElement;
      if (origin) {
        const x = (origin.left + origin.right) / 2;
        const y = (origin.top + origin.bottom) / 2;
        doc.style.setProperty("--x", `${(x / window.innerWidth) * 100}%`);
        doc.style.setProperty("--y", `${(y / window.innerHeight) * 100}%`);
      }

      if (typeof document.startViewTransition !== "function") {
        setTheme(nextTheme);
        return;
      }

      doc.classList.remove("page-transition");
      doc.classList.add("theme-transition");

      const transition = document.startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.finished
        .catch(() => void 0)
        .finally(() => {
          window.setTimeout(() => {
            doc.classList.remove("theme-transition");
          }, 600);
        });
    },
    [setTheme],
  );

  const handleToggle = useCallback(() => {
    if (busy) return;
    const current = resolveTheme(theme) as ThemeValue;
    const next: ThemeValue = current === "dark" ? "light" : "dark";
    const origin = buttonRef.current?.getBoundingClientRect();
    runTransition(next, origin);
  }, [busy, runTransition, theme]);

  const handleReplay = useCallback(() => {
    if (busy) return;
    const current = resolveTheme(theme) as ThemeValue;
    const next: ThemeValue = current === "dark" ? "light" : "dark";
    setBusy(true);
    runTransition(next);
    window.setTimeout(() => {
      runTransition(current);
      window.setTimeout(() => setBusy(false), 700);
    }, 720);
  }, [runTransition, theme, busy]);

  const current = resolveTheme(theme) as ThemeValue;

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in_oklch,var(--color-muted-foreground)_70%,transparent)]">
            Global theme
          </p>
          <h3 className="text-2xl font-semibold text-[var(--color-card-foreground)]">
            {current === "dark" ? "Dark" : "Light"} mode
          </h3>
        </div>
        <div className="flex gap-3">
          <Button
            ref={buttonRef}
            variant="outline"
            size="lg"
            onClick={handleToggle}
            disabled={busy}
            className="relative overflow-hidden rounded-full border border-border/70 bg-[color-mix(in_oklch,var(--color-card)_94%,transparent)] px-6 py-5 text-base font-medium"
          >
            <span className="relative z-[1] flex items-center gap-3">
              <span
                className={cn(
                  "size-9 rounded-full border border-border/70 transition-colors",
                  current === "dark"
                    ? "bg-[color-mix(in_oklch,var(--color-chart-1)_70%,transparent)]"
                    : "bg-[color-mix(in_oklch,var(--color-chart-5)_80%,transparent)]",
                )}
              />
              Toggle theme
            </span>
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 opacity-0 transition-opacity duration-500",
                busy && "opacity-100",
              )}
              style={{
                background:
                  current === "dark"
                    ? "radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--color-chart-1) 45%, transparent), transparent)"
                    : "radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--color-chart-5) 45%, transparent), transparent)",
              }}
            />
          </Button>
          <Button variant="secondary" onClick={handleReplay} disabled={busy}>
            Replay transition
          </Button>
        </div>
      </header>
      <div className="relative overflow-hidden rounded-[calc(var(--radius-xl))] border border-border/60 bg-[color-mix(in_oklch,var(--color-card)_92%,transparent)] p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-[color-mix(in_oklch,var(--color-muted-foreground)_62%,transparent)]">
              View Transition API
            </p>
            <h4 className="text-3xl font-semibold leading-tight text-[var(--color-card-foreground)]">
              Radial mask reveals new semantic tokens
            </h4>
          </div>
          <div className="relative grid grid-cols-2 gap-3">
            {["Surface", "Accent", "Outline", "Copy"].map((label, index) => (
              <div
                key={label}
                style={{ viewTransitionName: `theme-swatch-${index}` }}
                className={cn(
                  "flex h-24 w-24 flex-col justify-between rounded-[calc(var(--radius-lg))] border border-border/50 p-4 text-sm font-medium text-[var(--color-card-foreground)] shadow-[0px_16px_40px_-36px_color-mix(in_oklch,var(--color-ring)_35%,transparent)]",
                  index % 2 === 0
                    ? "bg-[color-mix(in_oklch,var(--color-secondary)_90%,transparent)]"
                    : "bg-[color-mix(in_oklch,var(--color-accent)_90%,transparent)]",
                )}
              >
                <span>{label}</span>
                <span className="text-xs text-[color-mix(in_oklch,var(--color-muted-foreground)_75%,transparent)]">
                  {current === "dark" ? "Dark" : "Light"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ThemeTogglePreview() {
  const [mode, setMode] = useState<ThemeValue>("light");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMode((prev) => (prev === "light" ? "dark" : "light"));
    }, 3200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "relative flex h-48 w-full flex-col justify-between overflow-hidden rounded-[calc(var(--radius-xl))] border border-border/40 bg-[color-mix(in_oklch,var(--color-card)_92%,transparent)] p-5 transition-all duration-500",
        mode === "dark" && "bg-[color-mix(in_oklch,var(--color-card)_86%,transparent)]",
      )}
    >
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-[color-mix(in_oklch,var(--color-muted-foreground)_65%,transparent)]">
          Theme Toggle
        </span>
        <span className="text-[var(--color-card-foreground)]">{mode === "dark" ? "Dark" : "Light"}</span>
      </div>
      <div className="relative mt-2 flex flex-1 items-center justify-center">
        <div
          className={cn(
            "relative size-28 rounded-full border border-border/60 transition-all duration-700",
            mode === "dark"
              ? "bg-[color-mix(in_oklch,var(--color-chart-1)_75%,transparent)] shadow-[0px_20px_50px_-30px_color-mix(in_oklch,var(--color-chart-1)_55%,transparent)]"
              : "bg-[color-mix(in_oklch,var(--color-chart-5)_80%,transparent)] shadow-[0px_20px_50px_-30px_color-mix(in_oklch,var(--color-chart-5)_55%,transparent)]",
          )}
          style={{ viewTransitionName: "theme-toggle-preview" }}
        >
          <div className="absolute inset-1 rounded-full border border-white/10 blur-[1px] opacity-60" />
          <div
            className="absolute inset-0 rounded-full border border-border/30"
            style={{
              maskImage:
                mode === "dark"
                  ? "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0) 70%)"
                  : "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0) 70%)",
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
        <span className="text-[color-mix(in_oklch,var(--color-muted-foreground)_65%,transparent)]">
          Masked reveal
        </span>
        <span className="text-[color-mix(in_oklch,var(--color-muted-foreground)_45%,transparent)]">
          View Transition
        </span>
      </div>
    </div>
  );
}
