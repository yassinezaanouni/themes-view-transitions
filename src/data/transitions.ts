const decodeRaw = (value: string) =>
  value.replace(/__BACKTICK__/g, "`").replace(/__DOLLAR__/g, "${");

const themeToggleGlobalCode = String.raw`/* Toggle Theme View Transitions */

@keyframes theme-mask {
  0% {
    clip-path: circle(0% at var(--x, 50%) var(--y, 50%));
  }

  100% {
    clip-path: circle(150% at var(--x, 50%) var(--y, 50%));
  }
}

html.theme-transition::view-transition-old(root),
html.theme-transition::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

html.theme-transition::view-transition-old(root) {
  z-index: 1;
}

html.theme-transition::view-transition-new(root) {
  z-index: 2;
  animation: theme-mask 0.5s ease-in forwards;
}

/* Handle reduced motion preference globally */
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .motion-safe-only {
    display: none !important;
  }
}`;

const themeToggleComponentCode = decodeRaw(String.raw`'use client';

import { motion as m } from 'motion/react';
import { useTheme } from 'next-themes';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shineVariant = {
    hidden: {
      opacity: 0,
      scale: 2,
      strokeDasharray: '20, 1000',
      strokeDashoffset: 0,
      filter: 'blur(0px)',
    },
    visible: {
      opacity: [0, 1, 0],
      strokeDashoffset: [0, -50, -100],
      filter: ['blur(2px)', 'blur(2px)', 'blur(0px)'],
      transition: {
        duration: 0.75,
      },
    },
  };
  const raysVariants = {
    hidden: {
      strokeOpacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      strokeOpacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  const rayVariant = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      // Start from center of the circle
      scale: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        // Customize timing for each property
        pathLength: { duration: 0.3 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    },
  };
  const toggleTheme = () => {
    if (document.startViewTransition) {
      // Get the button's position using ref
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        // Calculate position relative to viewport
        const x = (rect.left + rect.right) / 2;
        const y = (rect.top + rect.bottom) / 2;
        // Set the CSS variables for the animation
        document.documentElement.style.setProperty(
          '--x',
          '__DOLLAR__(x / window.innerWidth) * 100}%',
        );
        document.documentElement.style.setProperty(
          '--y',
          '__DOLLAR__(y / window.innerHeight) * 100}%',
        );
      }
      // Remove page-transition class to avoid conflicts
      document.documentElement.classList.remove('page-transition');
      // Add theme-transition class
      document.documentElement.classList.add('theme-transition');
      document.startViewTransition(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        // Clean up theme-transition class after animation completes
        setTimeout(() => {
          document.documentElement.classList.remove('theme-transition');
        }, 600);
      });
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };
  const sunPath =
    'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z';
  const moonPath =
    'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z';
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      data-theme-toggle
      ref={buttonRef}
    >
      <m.svg
        strokeWidth="4"
        strokeLinecap="round"
        width={100}
        height={100}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
      >
        <m.path
          variants={shineVariant}
          d={moonPath}
          className={'stroke-chart-1 absolute top-0 left-0'}
          initial="hidden"
          animate={theme === 'dark' ? 'visible' : 'hidden'}
        />
        <m.g
          variants={raysVariants}
          initial="hidden"
          animate={theme === 'light' ? 'visible' : 'hidden'}
          className="stroke-chart-1 stroke-6"
          style={{ strokeLinecap: 'round' }}
        >
          <m.path
            className="origin-center"
            variants={rayVariant}
            d="M50 2V11"
          />
          <m.path variants={rayVariant} d="M85 15L78 22" />
          <m.path variants={rayVariant} d="M98 50H89" />
          <m.path variants={rayVariant} d="M85 85L78 78" />
          <m.path variants={rayVariant} d="M50 98V89" />
          <m.path variants={rayVariant} d="M23 78L16 84" />
          <m.path variants={rayVariant} d="M11 50H2" />
          <m.path variants={rayVariant} d="M23 23L16 16" />
        </m.g>
        <m.path
          d={sunPath}
          fill="transparent"
          transition={{ duration: 1, type: 'spring' }}
          initial={{ fillOpacity: 0, strokeOpacity: 0, d: sunPath }}
          animate={{
            d: theme === 'dark' ? moonPath : sunPath,
            rotate: theme === 'dark' ? -360 : 0,
            scale: theme === 'dark' ? 2 : 1,
            stroke:
              theme === 'dark'
                ? 'var(--color-chart-1)'
                : 'var(--color-chart-1)',
            fill:
              theme === 'dark'
                ? 'var(--color-chart-1)'
                : 'var(--color-chart-1)',
            fillOpacity: 0.35,
            strokeOpacity: 1,
            transition: { delay: 0.1 },
          }}
        />
      </m.svg>
    </Button>
  );
}
`);

const dashboardLiftGlobalCode = String.raw`:root {
  --panel-surface: color-mix(in oklch, var(--color-card) 92%, transparent);
  --panel-highlight: color-mix(in oklch, var(--color-chart-4) 22%, transparent);
}

.metric-tile {
  view-transition-name: dashboard-tile;
  transition: transform 320ms var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1));
}

.dashboard-grid.reordered .metric-tile {
  transform: translateY(-12px);
  box-shadow: 0 32px 80px -48px color-mix(in oklch, var(--color-ring) 30%, transparent);
}

.dashboard-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
`;

const dashboardLiftComponentCode = decodeRaw(String.raw`'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function DashboardLiftDemo() {
  const [lifted, setLifted] = useState(false);

  const trigger = () => {
    const action = () => setLifted((state) => !state);
    if (document.startViewTransition) {
      document.documentElement.classList.add('page-transition');
      const vt = document.startViewTransition(action);
      vt.finished.finally(() => document.documentElement.classList.remove('page-transition'));
      return;
    }
    action();
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        className={__BACKTICK__dashboard-grid __DOLLAR__lifted ? 'reordered' : ''__BACKTICK__}
        data-view-state={lifted ? 'reordered' : 'default'}
      >
        {["Conversion", "Retention", "Sessions", "Revenue"].map((metric, index) => (
          <article
            key={metric}
            style={{ viewTransitionName: __BACKTICK__dashboard-tile-__DOLLAR__index__BACKTICK__ }}
            className="metric-tile rounded-[calc(var(--radius-xl))] border border-border/40 bg-[var(--panel-surface)] p-4 backdrop-blur-xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in_oklch,var(--color-muted-foreground)_70%,transparent)]">
              {metric}
            </p>
            <p className="mt-4 text-3xl font-semibold text-[var(--color-card-foreground)]">
              {lifted ? ['68%', '42%', '941', '$36k'][index] : ['64%', '38%', '812', '$29k'][index]}
            </p>
            <p className="mt-2 text-sm text-[color-mix(in_oklch,var(--color-muted-foreground)_80%,transparent)]">
              {lifted ? 'Now Trending' : 'Weekly baseline'}
            </p>
          </article>
        ))}
      </div>
      <div className="flex gap-3">
        <Button onClick={trigger} variant="secondary">
          Replay Transition
        </Button>
      </div>
    </div>
  );
}
`);

const paletteSwitcherGlobalCode = String.raw`.palette-swatch {
  view-transition-name: palette-swatch;
  transition: transform 320ms ease, filter 320ms ease;
}

.palette-stage[data-mode='alt'] .palette-swatch {
  filter: saturate(125%) contrast(110%);
  transform: translateY(-8px);
}

.palette-stage {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
}
`;

const paletteSwitcherComponentCode = decodeRaw(String.raw`'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

const palettes = {
  aurora: {
    label: 'Aurora',
    swatches: ['#7DD3FC', '#38BDF8', '#2563EB', '#1D4ED8'],
  },
  ember: {
    label: 'Ember',
    swatches: ['#F59E0B', '#EA580C', '#C2410C', '#E11D48'],
  },
};

type PaletteKey = keyof typeof palettes;

export function PaletteSwitcherDemo() {
  const [mode, setMode] = useState<PaletteKey>('aurora');
  const nextMode = useMemo(() => (mode === 'aurora' ? 'ember' : 'aurora'), [mode]);

  const swap = () => {
    const action = () => setMode((value) => (value === 'aurora' ? 'ember' : 'aurora'));
    if (document.startViewTransition) {
      document.documentElement.classList.add('page-transition');
      const vt = document.startViewTransition(action);
      vt.finished.finally(() => document.documentElement.classList.remove('page-transition'));
      return;
    }
    action();
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in_oklch,var(--color-muted-foreground)_70%,transparent)]">
            Active palette
          </p>
          <h3 className="text-2xl font-semibold text-[var(--color-card-foreground)]">
            {palettes[mode].label}
          </h3>
        </div>
        <Button onClick={swap} variant="secondary">
          Switch to {palettes[nextMode].label}
        </Button>
      </header>
      <div className="palette-stage" data-mode={mode === 'aurora' ? 'base' : 'alt'}>
        {palettes[mode].swatches.map((swatch, index) => (
          <div
            key={swatch}
            style={{
              viewTransitionName: __BACKTICK__palette-swatch-__DOLLAR__index__BACKTICK__,
              background: swatch,
            }}
            className="palette-swatch rounded-[calc(var(--radius-lg))] border border-white/10 p-4 text-lg font-medium text-white drop-shadow-lg"
          >
            {swatch}
          </div>
        ))}
      </div>
    </div>
  );
}
`);

export interface TransitionMeta {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  tags: string[];
  accent: string;
  previewVariant: "mask" | "cascade" | "switcher";
  code: {
    global: string;
    component: string;
  };
}

export const transitions: TransitionMeta[] = [
  {
    slug: "theme-toggle",
    title: "Radial Mask Theme Toggle",
    tagline: "Use the View Transition API to reveal dark mode with a precise mask tied to the toggle location.",
    summary:
      "A theme switcher that captures the toggle position, expands a radial mask, and coordinates View Transition layers for a buttery swap between light and dark semantic tokens.",
    tags: ["Themes", "Masking", "Accessibility"],
    accent: "var(--color-chart-1)",
    previewVariant: "mask",
    code: {
      global: themeToggleGlobalCode,
      component: themeToggleComponentCode,
    },
  },
  {
    slug: "dashboard-lift",
    title: "Dashboard Panel Lift",
    tagline: "Slide, blur, and lift cards while view transitions keep layers crisp and anchored.",
    summary:
      "A glassmorphism dashboard reorganizes itself with staggered card motion. View transition names keep the key metrics locked in place while backgrounds glide behind them.",
    tags: ["Dashboards", "Cards", "Micro-interactions"],
    accent: "var(--color-chart-4)",
    previewVariant: "cascade",
    code: {
      global: dashboardLiftGlobalCode,
      component: dashboardLiftComponentCode,
    },
  },
  {
    slug: "palette-switcher",
    title: "Palette Cascade Switcher",
    tagline: "Blend gradients and typography with a cascading color palette swap.",
    summary:
      "A hero palette morphs between brand presets, cascading gradients across swatches with view transition-name hooks to keep continuity across frames.",
    tags: ["Brand", "Typography", "Gradients"],
    accent: "var(--color-chart-2)",
    previewVariant: "switcher",
    code: {
      global: paletteSwitcherGlobalCode,
      component: paletteSwitcherComponentCode,
    },
  },
];

export function getTransitionBySlug(slug: string) {
  return transitions.find((transition) => transition.slug === slug);
}
