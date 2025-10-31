import { TransitionCard } from "@/components/transition-card";
import { getPreviewBySlug } from "@/components/transition-registry";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { transitions } from "@/data/transitions";

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklch,var(--color-chart-2)_18%,transparent),transparent_55%),radial-gradient(circle_at_bottom_left,color-mix(in_oklch,var(--color-chart-3)_16%,transparent),transparent_60%)]"
      />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-24 sm:px-10 lg:px-16">
        <header className="relative z-[1] flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-6">
            <Badge variant="solid" className="uppercase tracking-[0.28em]">
              View Transition API
            </Badge>
            <div className="space-y-4">
              <h1 className="text-5xl font-semibold leading-tight text-[var(--color-foreground)] sm:text-6xl">
                Theme playground with immersive transitions
              </h1>
              <p className="max-w-2xl text-lg text-[color-mix(in_oklch,var(--color-muted-foreground)_85%,transparent)]">
                Explore a curated collection of theme and brand transitions powered by the View Transition API. Every demo is paired with live code, crafted with semantic tokens, and ready to slot into your design system.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-[color-mix(in_oklch,var(--color-muted-foreground)_70%,transparent)]">
              <span className="flex items-center gap-2 rounded-full border border-border/60 bg-[color-mix(in_oklch,var(--color-card)_96%,transparent)] px-4 py-2">
                <span className="size-2 rounded-full bg-[var(--color-chart-1)]" />
                Seamless navigation
              </span>
              <span className="flex items-center gap-2 rounded-full border border-border/60 bg-[color-mix(in_oklch,var(--color-card)_96%,transparent)] px-4 py-2">
                <span className="size-2 rounded-full bg-[var(--color-chart-3)]" />
                Semantic tokens first
              </span>
            </div>
          </div>
          <div className="relative z-[1] flex items-end gap-3">
            <Button asChild variant="outline" size="lg" className="rounded-full px-6 py-6">
              <a href="#gallery">Browse transitions</a>
            </Button>
            <Button asChild size="lg" className="rounded-full px-6 py-6">
              <a href="https://developer.chrome.com/docs/web-platform/view-transitions/" target="_blank" rel="noreferrer">
                API overview
              </a>
            </Button>
          </div>
        </header>
        <section id="gallery" className="relative z-[1] grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {transitions.map((transition) => {
            const Preview = getPreviewBySlug(transition.slug);
            if (!Preview) return null;
            return (
              <TransitionCard key={transition.slug} transition={transition} Preview={Preview} />
            );
          })}
        </section>
        <footer className="relative z-[1] mt-auto flex flex-col items-start gap-4 rounded-[calc(var(--radius-xl))] border border-border/60 bg-[color-mix(in_oklch,var(--color-card)_94%,transparent)] p-8 shadow-[0px_28px_80px_-56px_color-mix(in_oklch,var(--color-ring)_35%,transparent)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[color-mix(in_oklch,var(--color-muted-foreground)_70%,transparent)]">
              Need a custom transition?
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--color-card-foreground)]">
              Combine transitions to script product tours, mode toggles, and onboarding.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {transitions.slice(0, 3).map((transition) => (
              <span
                key={`${transition.slug}-tag`}
                className="rounded-full border border-border/60 px-4 py-2 text-sm text-[color-mix(in_oklch,var(--color-muted-foreground)_78%,transparent)]"
              >
                {transition.title}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
