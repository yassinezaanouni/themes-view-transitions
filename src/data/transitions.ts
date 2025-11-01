export type TransitionType = 'theme-toggle' | 'vertical-wipe' | 'diagonal-slide';

export interface Transition {
  id: string;
  title: string;
  slug: TransitionType;
  description: string;
  cssFile: string; // Path to CSS file relative to src/styles/transitions/
  componentFile: string; // Path to component file relative to src/components/
}

export const transitions: Transition[] = [
  {
    id: '1',
    title: 'Circular Reveal Theme',
    slug: 'theme-toggle',
    description: 'Circular reveal animation for theme switching',
    cssFile: 'theme-toggle.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '3',
    title: 'Vertical Wipe Theme',
    slug: 'vertical-wipe',
    description: 'Vertical wipe animation for theme transitions',
    cssFile: 'vertical-wipe.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '5',
    title: 'Diagonal Slide Theme',
    slug: 'diagonal-slide',
    description: 'Diagonal sliding animation for theme changes',
    cssFile: 'diagonal-slide.css',
    componentFile: 'theme-toggle.tsx',
  },
];

export function getTransitionBySlug(slug: string): Transition | undefined {
  return transitions.find((transition) => transition.slug === slug);
}
