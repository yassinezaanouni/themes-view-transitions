export type TransitionType =
  | 'theme-toggle'
  | 'vertical-wipe'
  | 'circle-with-blur'
  | 'circle-blur-top-left'
  | 'polygon'
  | 'gif-dance'
  | 'gif-love'
  | 'horizontal-wipe'
  | 'slide-from-bottom'
  | 'hexagon-reveal'
  | 'clock-wipe'
  | 'blinds'
  | 'morph-circle-square'
  | 'liquid-swipe'
  | 'zoom-blur'
  | 'pixelate-dissolve'
  | 'wave-reveal'
  | 'perspective-travel'
  | 'diagonal-wipe'
  | 'flip-3d'
  | 'columns-slide'
  | 'spiral-wipe'
  | 'iris-reveal'
  | 'skew-slide';

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
    cssFile: 'circular-reveal.css',
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
  {
    id: '12',
    title: 'Horizontal Wipe',
    slug: 'horizontal-wipe',
    description: 'Smooth horizontal wipe from left to right',
    cssFile: 'horizontal-wipe.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '13',
    title: 'Slide from Bottom',
    slug: 'slide-from-bottom',
    description: 'New page slides up from the bottom',
    cssFile: 'slide-from-bottom.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '15',
    title: 'Hexagon Reveal',
    slug: 'hexagon-reveal',
    description: 'Hexagonal shape expanding from center',
    cssFile: 'hexagon-reveal.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '16',
    title: 'Clock Wipe',
    slug: 'clock-wipe',
    description: 'Clock hand sweeping reveal animation',
    cssFile: 'clock-wipe.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '17',
    title: 'Blinds Effect',
    slug: 'blinds',
    description: 'Venetian blinds opening transition',
    cssFile: 'blinds.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '18',
    title: 'Morph Circle to Square',
    slug: 'morph-circle-square',
    description: 'Smooth morphing from circle to square with blur',
    cssFile: 'morph-circle-square.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '19',
    title: 'Liquid Swipe',
    slug: 'liquid-swipe',
    description: 'Fluid organic wave reveal animation',
    cssFile: 'liquid-swipe.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '20',
    title: 'Zoom Blur',
    slug: 'zoom-blur',
    description: 'Radial zoom with depth blur effect',
    cssFile: 'zoom-blur.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '22',
    title: 'Pixelate Dissolve',
    slug: 'pixelate-dissolve',
    description: 'Modern pixelation crossfade effect',
    cssFile: 'pixelate-dissolve.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '23',
    title: 'Wave Reveal',
    slug: 'wave-reveal',
    description: 'Organic wave sweeping across screen',
    cssFile: 'wave-reveal.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '27',
    title: 'Perspective Travel',
    slug: 'perspective-travel',
    description: '3D perspective travel with depth and rotation',
    cssFile: 'perspective-travel.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '28',
    title: 'Diagonal Wipe',
    slug: 'diagonal-wipe',
    description: 'Dynamic diagonal sweep from corner to corner',
    cssFile: 'diagonal-wipe.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '30',
    title: 'Flip 3D',
    slug: 'flip-3d',
    description: '3D card flip with perspective and depth',
    cssFile: 'flip-3d.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '32',
    title: 'Columns Slide',
    slug: 'columns-slide',
    description: 'Staggered columns sliding down with wave effect',
    cssFile: 'columns-slide.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '33',
    title: 'Spiral Wipe',
    slug: 'spiral-wipe',
    description: 'Rotating spiral expanding from center outward',
    cssFile: 'spiral-wipe.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '34',
    title: 'Iris Reveal',
    slug: 'iris-reveal',
    description: 'Camera iris diaphragm opening from center',
    cssFile: 'iris-reveal.css',
    componentFile: 'theme-toggle.tsx',
  },
  {
    id: '35',
    title: 'Skew Slide',
    slug: 'skew-slide',
    description: 'Dynamic skewed sliding transition',
    cssFile: 'skew-slide.css',
    componentFile: 'theme-toggle.tsx',
  },
];

export function getTransitionBySlug(slug: string): Transition | undefined {
  return transitions.find((transition) => transition.slug === slug);
}
