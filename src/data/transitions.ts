export interface Transition {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  globalCss: string;
  componentCode: string;
}

export const transitions: Transition[] = [
  {
    id: '1',
    title: 'Circular Reveal Theme',
    slug: 'theme-toggle',
    description: 'Circular reveal animation for theme switching',
    category: 'Theme',
    globalCss: `/* Toggle Theme View Transitions */

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
}`,
    componentCode: `'use client';

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
      scale: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        pathLength: { duration: 0.3 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    },
  };

  const toggleTheme = () => {
    if (document.startViewTransition) {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (rect.left + rect.right) / 2;
        const y = (rect.top + rect.bottom) / 2;

        document.documentElement.style.setProperty(
          '--x',
          \`\${(x / window.innerWidth) * 100}%\`,
        );
        document.documentElement.style.setProperty(
          '--y',
          \`\${(y / window.innerHeight) * 100}%\`,
        );
      }

      document.documentElement.classList.remove('page-transition');
      document.documentElement.classList.add('theme-transition');

      document.startViewTransition(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
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
}`,
  },
  {
    id: '2',
    title: 'Fade & Slide Navigation',
    slug: 'fade-slide',
    description: 'Smooth fade and slide effect for page navigation',
    category: 'Navigation',
    globalCss: `/* Page Transitions */
@keyframes fade-in {
  from {
    opacity: 0;
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}

@keyframes slide-from-right {
  from {
    transform: translateX(30px);
  }
}

@keyframes slide-to-left {
  to {
    transform: translateX(-30px);
  }
}

html.page-transition::view-transition-old(root) {
  animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

html.page-transition::view-transition-new(root) {
  animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}`,
    componentCode: `'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function NavigationLink({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.documentElement.classList.add('page-transition');

      (document as any).startViewTransition(() => {
        router.push(href);
        setTimeout(() => {
          document.documentElement.classList.remove('page-transition');
        }, 600);
      });
    } else {
      router.push(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}`,
  },
  {
    id: '3',
    title: 'Vertical Wipe Theme',
    slug: 'vertical-wipe',
    description: 'Vertical wipe animation for theme transitions',
    category: 'Theme',
    globalCss: `/* Vertical Wipe Theme Transition */
@keyframes vertical-wipe {
  0% {
    clip-path: inset(0 0 100% 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}

html.vertical-wipe-transition::view-transition-old(root),
html.vertical-wipe-transition::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

html.vertical-wipe-transition::view-transition-old(root) {
  z-index: 1;
}

html.vertical-wipe-transition::view-transition-new(root) {
  z-index: 2;
  animation: vertical-wipe 0.6s ease-in-out forwards;
}`,
    componentCode: `'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function VerticalWipeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.documentElement.classList.add('vertical-wipe-transition');

      (document as any).startViewTransition(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        setTimeout(() => {
          document.documentElement.classList.remove('vertical-wipe-transition');
        }, 600);
      });
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <Button onClick={toggleTheme} variant="outline" size="icon">
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}`,
  },
  {
    id: '4',
    title: 'Scale & Fade',
    slug: 'scale-fade',
    description: 'Scale and fade effect for smooth page transitions',
    category: 'Navigation',
    globalCss: `/* Scale & Fade Transition */
@keyframes scale-fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
}

@keyframes scale-fade-out {
  to {
    opacity: 0;
    transform: scale(1.05);
  }
}

html.scale-fade-transition::view-transition-old(root) {
  animation: 300ms cubic-bezier(0.4, 0, 1, 1) both scale-fade-out;
}

html.scale-fade-transition::view-transition-new(root) {
  animation: 300ms cubic-bezier(0, 0, 0.2, 1) both scale-fade-in;
}`,
    componentCode: `'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function ScaleFadeLink({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.documentElement.classList.add('scale-fade-transition');

      (document as any).startViewTransition(() => {
        router.push(href);
        setTimeout(() => {
          document.documentElement.classList.remove('scale-fade-transition');
        }, 600);
      });
    } else {
      router.push(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}`,
  },
  {
    id: '5',
    title: 'Diagonal Slide Theme',
    slug: 'diagonal-slide',
    description: 'Diagonal sliding animation for theme changes',
    category: 'Theme',
    globalCss: `/* Diagonal Slide Theme Transition */
@keyframes diagonal-slide {
  0% {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

html.diagonal-slide-transition::view-transition-old(root),
html.diagonal-slide-transition::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

html.diagonal-slide-transition::view-transition-old(root) {
  z-index: 1;
}

html.diagonal-slide-transition::view-transition-new(root) {
  z-index: 2;
  animation: diagonal-slide 0.5s ease-in-out forwards;
}`,
    componentCode: `'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function DiagonalSlideToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.documentElement.classList.add('diagonal-slide-transition');

      (document as any).startViewTransition(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        setTimeout(() => {
          document.documentElement.classList.remove('diagonal-slide-transition');
        }, 500);
      });
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <Button onClick={toggleTheme} variant="outline">
      Toggle Theme
    </Button>
  );
}`,
  },
  {
    id: '6',
    title: 'Rotate & Zoom',
    slug: 'rotate-zoom',
    description: 'Rotating zoom effect for dramatic page transitions',
    category: 'Navigation',
    globalCss: `/* Rotate & Zoom Transition */
@keyframes rotate-zoom-in {
  from {
    opacity: 0;
    transform: scale(0.8) rotate(-5deg);
  }
}

@keyframes rotate-zoom-out {
  to {
    opacity: 0;
    transform: scale(1.2) rotate(5deg);
  }
}

html.rotate-zoom-transition::view-transition-old(root) {
  animation: 400ms cubic-bezier(0.4, 0, 1, 1) both rotate-zoom-out;
}

html.rotate-zoom-transition::view-transition-new(root) {
  animation: 400ms cubic-bezier(0, 0, 0.2, 1) both rotate-zoom-in;
}`,
    componentCode: `'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function RotateZoomLink({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.documentElement.classList.add('rotate-zoom-transition');

      (document as any).startViewTransition(() => {
        router.push(href);
        setTimeout(() => {
          document.documentElement.classList.remove('rotate-zoom-transition');
        }, 800);
      });
    } else {
      router.push(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}`,
  },
];

export function getTransitionBySlug(slug: string): Transition | undefined {
  return transitions.find((transition) => transition.slug === slug);
}

