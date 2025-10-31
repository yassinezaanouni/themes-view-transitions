"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-11 items-center justify-center rounded-[calc(var(--radius-lg))] border border-border/60 bg-[color-mix(in_oklch,var(--color-muted)_92%,transparent)] p-1 text-[13px] text-[color-mix(in_oklch,var(--color-muted-foreground)_92%,transparent)]",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex min-w-[140px] items-center justify-center whitespace-nowrap rounded-[calc(var(--radius-lg)-4px)] px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 data-[state=active]:bg-[var(--color-card)] data-[state=active]:text-[var(--color-card-foreground)] data-[state=active]:shadow-[0px_12px_32px_-24px_color-mix(in_oklch,var(--color-ring)_55%,transparent)] data-[state=inactive]:text-[color-mix(in_oklch,var(--color-muted-foreground)_86%,transparent)]",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-6 rounded-[calc(var(--radius-xl))] border border-border/50 bg-[var(--color-card)] p-6 shadow-[0px_24px_60px_-48px_color-mix(in_oklch,var(--color-ring)_45%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
