import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "outline" | "solid";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const styles: Record<BadgeVariant, string> = {
  solid:
    "rounded-full bg-[color-mix(in_oklch,var(--color-secondary)_85%,transparent)] px-3 py-1 text-xs font-medium text-[var(--color-secondary-foreground)] shadow-[0_12px_24px_-20px_color-mix(in_oklch,var(--color-ring)_55%,transparent)]",
  outline:
    "rounded-full border border-border/70 bg-[color-mix(in_oklch,var(--color-card)_88%,transparent)] px-3 py-1 text-xs font-medium text-[color-mix(in_oklch,var(--color-muted-foreground)_92%,transparent)]",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "outline", ...props }, ref) => (
    <span ref={ref} className={cn(styles[variant], className)} {...props} />
  ),
);
Badge.displayName = "Badge";
