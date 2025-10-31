"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ViewTransitionLink } from "@/components/view-transition-link";
import type { TransitionMeta } from "@/data/transitions";
import { cn } from "@/lib/utils";

interface TransitionCardProps {
  transition: TransitionMeta;
  Preview: React.ComponentType;
}

export function TransitionCard({ transition, Preview }: TransitionCardProps) {
  return (
    <ViewTransitionLink
      href={`/transitions/${transition.slug}`}
      className="group focus-visible:outline-none"
    >
      <Card
        className={cn(
          "card-surface h-full w-full overflow-hidden border border-border/60 bg-[color-mix(in_oklch,var(--color-card)_94%,transparent)] p-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0px_32px_80px_-56px_color-mix(in_oklch,var(--color-ring)_45%,transparent)] focus-visible:ring-2 focus-visible:ring-ring/50",
        )}
      >
        <div className="relative px-6 pt-6">
          <Badge variant="outline" className="mb-4">
            {transition.tags[0]}
          </Badge>
          <h3 className="text-xl font-semibold text-[var(--color-card-foreground)]">
            {transition.title}
          </h3>
          <p className="mt-2 text-sm text-[color-mix(in_oklch,var(--color-muted-foreground)_82%,transparent)]">
            {transition.tagline}
          </p>
        </div>
        <CardContent className="relative mt-6 px-6 pb-6">
          <div className="relative overflow-hidden rounded-[calc(var(--radius-xl))] border border-border/40 bg-[color-mix(in_oklch,var(--color-card)_92%,transparent)]">
            <div className="pointer-events-none">
              <Preview />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[calc(var(--radius-xl))] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 20% -10%, color-mix(in oklch, var(--color-ring) 38%, transparent), transparent 60%)",
              }}
            />
          </div>
          <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[color-mix(in_oklch,var(--color-muted-foreground)_60%,transparent)]">
            <span>Tap to explore</span>
            <span className="text-[color-mix(in_oklch,var(--color-muted-foreground)_45%,transparent)]">
              View Transition
            </span>
          </div>
        </CardContent>
      </Card>
    </ViewTransitionLink>
  );
}
