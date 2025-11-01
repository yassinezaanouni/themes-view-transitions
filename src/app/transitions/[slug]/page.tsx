import Link from "next/link";
import { notFound } from "next/navigation";

import { CodeTabs } from "@/components/code-tabs";
import {
  transitionDemos,
  type TransitionSlug,
} from "@/components/transition-registry";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTransitionBySlug, transitions } from "@/data/transitions";

interface TransitionPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return transitions.map((transition) => ({ slug: transition.slug }));
}

export async function generateMetadata({ params }: TransitionPageProps) {
  const { slug } = params;
  const transition = getTransitionBySlug(slug);
  if (!transition) {
    return {
      title: "Transition not found",
    };
  }
  return {
    title: `${transition.title} — View Transition Playground`,
    description: transition.description,
  };
}

export default async function TransitionPage({ params }: TransitionPageProps) {
  const { slug } = params;
  const transition = getTransitionBySlug(slug);

  if (!transition) {
    notFound();
  }

  if (!(slug in transitionDemos)) {
    notFound();
  }

  const Demo = transitionDemos[slug as TransitionSlug];

  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklch,var(--color-chart-2)_16%,transparent),transparent_55%),radial-gradient(circle_at_bottom_right,color-mix(in_oklch,var(--color-chart-4)_18%,transparent),transparent_60%)]"
      />
      <div className="relative z-[1] mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 pb-24 pt-16 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-8">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-3 rounded-full border border-border/60 bg-[color-mix(in_oklch,var(--color-card)_94%,transparent)] px-5 py-2 text-xs uppercase tracking-[0.24em] text-[color-mix(in_oklch,var(--color-muted-foreground)_70%,transparent)] shadow-[0px_18px_42px_-36px_color-mix(in_oklch,var(--color-ring)_35%,transparent)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            ← Back to all transitions
          </Link>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-5">
              <Badge variant="solid" className="uppercase tracking-[0.28em]">
                {transition.category}
              </Badge>
              <div className="space-y-4">
                <h1 className="text-5xl font-semibold leading-tight text-[var(--color-foreground)]">
                  {transition.title}
                </h1>
                <p className="text-lg text-[color-mix(in_oklch,var(--color-muted-foreground)_82%,transparent)]">
                  {transition.description}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                asChild
                variant="secondary"
                className="rounded-full px-6 py-6"
              >
                <a
                  href="https://www.w3.org/TR/css-view-transitions-1/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Spec
                </a>
              </Button>
              <Button asChild className="rounded-full px-6 py-6">
                <a
                  href="https://developer.chrome.com/docs/web-platform/view-transitions/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Docs
                </a>
              </Button>
            </div>
          </div>
        </div>
        <section className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] xl:gap-14">
          <div className="flex flex-col gap-8">
            <div className="rounded-[calc(var(--radius-xl))] border border-border/60 bg-[color-mix(in_oklch,var(--color-card)_94%,transparent)] p-8 shadow-[0px_32px_80px_-56px_color-mix(in_oklch,var(--color-ring)_45%,transparent)]">
              <Demo />
            </div>
            <div className="rounded-[calc(var(--radius-xl))] border border-border/60 bg-[color-mix(in_oklch,var(--color-card)_94%,transparent)] p-8 shadow-[0px_24px_60px_-48px_color-mix(in_oklch,var(--color-ring)_38%,transparent)]">
              <h2 className="text-xl font-semibold text-[var(--color-card-foreground)]">
                Implementation notes
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[color-mix(in_oklch,var(--color-muted-foreground)_80%,transparent)]">
                Use view-transition-name on the surfaces that should keep their
                identity across frames. For theme transitions, batch DOM updates
                inside document.startViewTransition and always honour reduced
                motion preferences by short-circuiting to simple state updates.
              </p>
            </div>
          </div>
          <aside className="flex flex-col gap-6">
            <CodeTabs
              globalCss={transition.globalCss}
              componentCode={transition.componentCode}
            />
            <div className="rounded-[calc(var(--radius-xl))] border border-border/60 bg-[color-mix(in_oklch,var(--color-card)_94%,transparent)] p-6 text-sm text-[color-mix(in_oklch,var(--color-muted-foreground)_78%,transparent)] shadow-[0px_24px_60px_-48px_color-mix(in_oklch,var(--color-ring)_35%,transparent)]">
              <h3 className="text-base font-semibold text-card-foreground">
                Replay tips
              </h3>
              <ul className="mt-3 space-y-2 text-[13px] leading-relaxed">
                <li>
                  • Batch DOM updates inside document.startViewTransition to
                  keep paints atomic.
                </li>
                <li>
                  • Populate semantic tokens before animations so tokens
                  interpolate without flashes.
                </li>
                <li>
                  • Respect prefers-reduced-motion and provide shortcuts for
                  keyboard-triggered toggles.
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
