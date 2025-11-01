"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const metrics = [
  { key: "conversion", label: "Conversion", base: "64%", lifted: "68%" },
  { key: "retention", label: "Retention", base: "38%", lifted: "42%" },
  { key: "sessions", label: "Sessions", base: "812", lifted: "941" },
  { key: "revenue", label: "Revenue", base: "$29k", lifted: "$36k" },
];

export function DashboardLiftDemo() {
  const [lifted, setLifted] = useState(false);

  const toggle = () => {
    const apply = () => setLifted((state) => !state);
    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(apply);
      return;
    }
    apply();
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        className={cn(
          "dashboard-grid",
          lifted && "reordered",
        )}
      >
        {metrics.map((metric, index) => (
          <article
            key={metric.key}
            style={{ viewTransitionName: `dashboard-tile-${index}` }}
            className="metric-tile rounded-[calc(var(--radius-xl))] border border-border/45 bg-[color-mix(in_oklch,var(--color-card)_94%,transparent)] p-5 shadow-[0px_24px_60px_-48px_color-mix(in_oklch,var(--color-ring)_35%,transparent)] backdrop-blur-xl transition-transform duration-300"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-[color-mix(in_oklch,var(--color-muted-foreground)_65%,transparent)]">
              {metric.label}
            </p>
            <p className="mt-4 text-3xl font-semibold text-[var(--color-card-foreground)]">
              {lifted ? metric.lifted : metric.base}
            </p>
            <p className="mt-2 text-sm text-[color-mix(in_oklch,var(--color-muted-foreground)_75%,transparent)]">
              {lifted ? "Now tracking" : "Weekly baseline"}
            </p>
          </article>
        ))}
      </div>
      <div className="flex gap-3">
        <Button onClick={toggle} variant="secondary">
          Replay transition
        </Button>
      </div>
    </div>
  );
}

export function DashboardLiftPreview() {
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLifted((prev) => !prev);
    }, 3600);
    return () => window.clearInterval(interval);
  }, []);

  const activeMetrics = useMemo(
    () => metrics.slice(0, 3),
    [],
  );

  return (
    <div
      className={cn(
        "relative flex h-48 flex-col justify-between rounded-[calc(var(--radius-xl))] border border-border/40 bg-[color-mix(in_oklch,var(--color-card)_94%,transparent)] p-5",
        lifted && "bg-[color-mix(in_oklch,var(--color-card)_90%,transparent)]",
      )}
    >
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-[color-mix(in_oklch,var(--color-muted-foreground)_70%,transparent)]">
          Dashboard
        </span>
        <span className="text-[var(--color-card-foreground)]">
          {lifted ? "Reordered" : "Live"}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {activeMetrics.map((metric, index) => (
          <div
            key={metric.key}
            style={{ viewTransitionName: `dashboard-preview-${index}` }}
            className="flex flex-col gap-1 rounded-[calc(var(--radius-lg))] border border-border/40 bg-[color-mix(in_oklch,var(--color-card)_96%,transparent)] p-3 text-xs"
          >
            <span className="uppercase tracking-[0.18em] text-[color-mix(in_oklch,var(--color-muted-foreground)_65%,transparent)]">
              {metric.label}
            </span>
            <span className="text-lg font-semibold text-[var(--color-card-foreground)]">
              {lifted ? metric.lifted : metric.base}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[11px] uppercase tracking-[0.22em] text-[color-mix(in_oklch,var(--color-muted-foreground)_55%,transparent)]">
        <span>Lift</span>
        <span>Animated cards</span>
      </div>
    </div>
  );
}
