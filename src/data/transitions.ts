export type TransitionType =
  | 'theme-toggle'
  | 'vertical-wipe'
  | 'diagonal-slide'
  | 'circle'
  | 'circle-with-blur'
  | 'circle-blur-top-left'
  | 'polygon'
  | 'gif-dance'
  | 'gif-love';

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
  {
    id: '6',
    title: 'Circle Theme',
    slug: 'circle',
    description: 'Circular mask animation from center',
    cssFile: 'circle.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '7',
    title: 'Circle with Blur Theme',
    slug: 'circle-with-blur',
    description: 'Circular mask with blur effect',
    cssFile: 'circle-with-blur.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '8',
    title: 'Circle Blur Top Left',
    slug: 'circle-blur-top-left',
    description: 'Circular blur expanding from top left corner',
    cssFile: 'circle-blur-top-left.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '9',
    title: 'Polygon Theme',
    slug: 'polygon',
    description: 'Geometric polygon reveal animation',
    cssFile: 'polygon.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '10',
    title: 'Dance GIF Theme',
    slug: 'gif-dance',
    description: 'Fun dancing character transition effect',
    cssFile: 'gif-dance.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '11',
    title: 'Love GIF Theme',
    slug: 'gif-love',
    description: 'Love-themed animated transition',
    cssFile: 'gif-love.css',
    componentFile: 'theme-toggle.tsx',
  },
];

export function getTransitionBySlug(slug: string): Transition | undefined {
  return transitions.find((transition) => transition.slug === slug);
}
