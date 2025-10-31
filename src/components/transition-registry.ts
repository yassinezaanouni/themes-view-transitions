import { DashboardLiftDemo, DashboardLiftPreview } from "@/components/demos/dashboard-lift-demo";
import { PaletteSwitcherDemo, PaletteSwitcherPreview } from "@/components/demos/palette-switcher-demo";
import { ThemeToggleDemo, ThemeTogglePreview } from "@/components/demos/theme-toggle-demo";

export const transitionPreviews = {
  "theme-toggle": ThemeTogglePreview,
  "dashboard-lift": DashboardLiftPreview,
  "palette-switcher": PaletteSwitcherPreview,
} as const;

export const transitionDemos = {
  "theme-toggle": ThemeToggleDemo,
  "dashboard-lift": DashboardLiftDemo,
  "palette-switcher": PaletteSwitcherDemo,
} as const;

export type TransitionSlug = keyof typeof transitionPreviews;

export function getPreviewBySlug(slug: string) {
  return transitionPreviews[slug as TransitionSlug];
}

export function getDemoBySlug(slug: string) {
  return transitionDemos[slug as TransitionSlug];
}
