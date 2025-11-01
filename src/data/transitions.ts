export type TransitionType =
  | 'theme-toggle'
  | 'vertical-wipe'
  | 'circle-with-blur'
  | 'circle-blur-top-left'
  | 'polygon'
  | 'gif-dance'
  | 'gif-love'
  | 'gif-heart'
  | 'gif-letter'
  | 'gif-loveyou'
  | 'gif-fire'
  | 'gif-punch'
  | 'gif-explosion'
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
  | 'skew-slide'
  | 'the-premium-fade';

export type CategoryType =
  | 'featured'
  | 'geometric'
  | 'wipes'
  | '3d'
  | 'organic'
  | 'fun';

export type ComplexityLevel = 'simple' | 'intermediate' | 'advanced';

export interface Transition {
  title: string;
  slug: TransitionType;
  description: string;
  cssFile: string; // Path to CSS file relative to src/styles/transitions/
  componentFile: string; // Path to component file relative to src/components/
  category: CategoryType;
  tags: string[];
  featured: boolean;
  complexity: ComplexityLevel;
}

export const transitions: Transition[] = [
  {
    title: 'Circular Reveal Theme',
    slug: 'theme-toggle',
    description: 'Circular reveal animation for theme switching',
    cssFile: 'circular-reveal.css',
    componentFile: 'theme-toggle.tsx',
    category: 'geometric',
    tags: ['Professional', 'Clean', 'Modern'],
    featured: true,
    complexity: 'simple',
  },
  {
    title: 'Columns Slide',
    slug: 'columns-slide',
    description: 'Staggered columns sliding down with wave effect',
    cssFile: 'columns-slide.css',
    componentFile: 'theme-toggle.tsx',
    category: 'wipes',
    tags: ['Creative', 'Structured', 'Dynamic'],
    featured: true,
    complexity: 'intermediate',
  },
  {
    title: 'Vertical Wipe Theme',
    slug: 'vertical-wipe',
    description: 'Vertical wipe animation for theme transitions',
    cssFile: 'vertical-wipe.css',
    componentFile: 'theme-toggle.tsx',
    category: 'wipes',
    tags: ['Professional', 'Minimal', 'Smooth'],
    featured: true,
    complexity: 'simple',
  },
  {
    title: 'Circle with Blur Theme',
    slug: 'circle-with-blur',
    description: 'Circular mask with blur effect',
    cssFile: 'circle-with-blur.css',
    componentFile: 'theme-toggle.tsx',
    category: 'geometric',
    tags: ['Modern', 'Smooth', 'Creative'],
    featured: false,
    complexity: 'intermediate',
  },
  {
    title: 'Circle Blur Top Left',
    slug: 'circle-blur-top-left',
    description: 'Circular blur expanding from top left corner',
    cssFile: 'circle-blur-top-left.css',
    componentFile: 'theme-toggle.tsx',
    category: 'geometric',
    tags: ['Creative', 'Dynamic', 'Modern'],
    featured: false,
    complexity: 'intermediate',
  },
  {
    title: 'Polygon Theme',
    slug: 'polygon',
    description: 'Geometric polygon reveal animation',
    cssFile: 'polygon.css',
    componentFile: 'theme-toggle.tsx',
    category: 'geometric',
    tags: ['Bold', 'Angular', 'Modern'],
    featured: false,
    complexity: 'intermediate',
  },
  {
    title: 'Dance GIF Theme',
    slug: 'gif-dance',
    description: 'Fun dancing character transition effect',
    cssFile: 'gif-dance.css',
    componentFile: 'theme-toggle.tsx',
    category: 'fun',
    tags: ['Playful', 'Fun', 'Unique'],
    featured: false,
    complexity: 'simple',
  },
  {
    title: 'Love GIF Theme',
    slug: 'gif-love',
    description: 'Love-themed animated transition',
    cssFile: 'gif-love.css',
    componentFile: 'theme-toggle.tsx',
    category: 'fun',
    tags: ['Playful', 'Romantic', 'Fun'],
    featured: false,
    complexity: 'simple',
  },
  {
    title: 'Heart GIF Theme',
    slug: 'gif-heart',
    description: 'Heart love animated transition',
    cssFile: 'gif-heart.css',
    componentFile: 'theme-toggle.tsx',
    category: 'fun',
    tags: ['Playful', 'Romantic', 'Fun'],
    featured: false,
    complexity: 'simple',
  },
  {
    title: 'Love Letter GIF Theme',
    slug: 'gif-letter',
    description: 'Love letter animated transition',
    cssFile: 'gif-letter.css',
    componentFile: 'theme-toggle.tsx',
    category: 'fun',
    tags: ['Playful', 'Romantic', 'Fun'],
    featured: false,
    complexity: 'simple',
  },
  {
    title: 'Love You GIF Theme',
    slug: 'gif-loveyou',
    description: 'Love you animated transition',
    cssFile: 'gif-loveyou.css',
    componentFile: 'theme-toggle.tsx',
    category: 'fun',
    tags: ['Playful', 'Romantic', 'Fun'],
    featured: true,
    complexity: 'simple',
  },
  {
    title: 'Fire GIF Theme',
    slug: 'gif-fire',
    description: 'Fire flame animated transition',
    cssFile: 'gif-fire.css',
    componentFile: 'theme-toggle.tsx',
    category: 'fun',
    tags: ['Playful', 'Dynamic', 'Fun'],
    featured: false,
    complexity: 'simple',
  },
  {
    title: 'Punch GIF Theme',
    slug: 'gif-punch',
    description: 'Punch animated transition',
    cssFile: 'gif-punch.css',
    componentFile: 'theme-toggle.tsx',
    category: 'fun',
    tags: ['Playful', 'Dynamic', 'Fun'],
    featured: false,
    complexity: 'simple',
  },
  {
    title: 'Explosion GIF Theme',
    slug: 'gif-explosion',
    description: 'Explosion animated transition',
    cssFile: 'gif-explosion.css',
    componentFile: 'theme-toggle.tsx',
    category: 'fun',
    tags: ['Playful', 'Dramatic', 'Fun'],
    featured: false,
    complexity: 'simple',
  },
  {
    title: 'Horizontal Wipe',
    slug: 'horizontal-wipe',
    description: 'Smooth horizontal wipe from left to right',
    cssFile: 'horizontal-wipe.css',
    componentFile: 'theme-toggle.tsx',
    category: 'wipes',
    tags: ['Professional', 'Minimal', 'Smooth'],
    featured: false,
    complexity: 'simple',
  },
  {
    title: 'Slide from Bottom',
    slug: 'slide-from-bottom',
    description: 'New page slides up from the bottom',
    cssFile: 'slide-from-bottom.css',
    componentFile: 'theme-toggle.tsx',
    category: 'fun',
    tags: ['Playful', 'Simple', 'Dynamic'],
    featured: false,
    complexity: 'simple',
  },
  {
    title: 'Hexagon Reveal',
    slug: 'hexagon-reveal',
    description: 'Hexagonal shape expanding from center',
    cssFile: 'hexagon-reveal.css',
    componentFile: 'theme-toggle.tsx',
    category: 'geometric',
    tags: ['Bold', 'Angular', 'Modern'],
    featured: false,
    complexity: 'intermediate',
  },
  {
    title: 'Clock Wipe',
    slug: 'clock-wipe',
    description: 'Clock hand sweeping reveal animation',
    cssFile: 'clock-wipe.css',
    componentFile: 'theme-toggle.tsx',
    category: 'wipes',
    tags: ['Creative', 'Unique', 'Smooth'],
    featured: true,
    complexity: 'intermediate',
  },
  {
    title: 'Blinds Effect',
    slug: 'blinds',
    description: 'Venetian blinds opening transition',
    cssFile: 'blinds.css',
    componentFile: 'theme-toggle.tsx',
    category: 'wipes',
    tags: ['Classic', 'Structured', 'Professional'],
    featured: false,
    complexity: 'intermediate',
  },
  {
    title: 'Morph Circle to Square',
    slug: 'morph-circle-square',
    description: 'Smooth morphing from circle to square with blur',
    cssFile: 'morph-circle-square.css',
    componentFile: 'theme-toggle.tsx',
    category: 'geometric',
    tags: ['Creative', 'Smooth', 'Dynamic'],
    featured: false,
    complexity: 'advanced',
  },
  {
    title: 'Liquid Swipe',
    slug: 'liquid-swipe',
    description: 'Fluid organic wave reveal animation',
    cssFile: 'liquid-swipe.css',
    componentFile: 'theme-toggle.tsx',
    category: 'organic',
    tags: ['Creative', 'Smooth', 'Modern'],
    featured: false,
    complexity: 'advanced',
  },
  {
    title: 'Zoom Blur',
    slug: 'zoom-blur',
    description: 'Radial zoom with depth blur effect',
    cssFile: 'zoom-blur.css',
    componentFile: 'theme-toggle.tsx',
    category: 'organic',
    tags: ['Dynamic', 'Cinematic', 'Bold'],
    featured: false,
    complexity: 'intermediate',
  },
  {
    title: 'Pixelate Dissolve',
    slug: 'pixelate-dissolve',
    description: 'Modern pixelation crossfade effect',
    cssFile: 'pixelate-dissolve.css',
    componentFile: 'theme-toggle.tsx',
    category: 'organic',
    tags: ['Creative', 'Digital', 'Modern'],
    featured: false,
    complexity: 'intermediate',
  },
  {
    title: 'Wave Reveal',
    slug: 'wave-reveal',
    description: 'Organic wave sweeping across screen',
    cssFile: 'wave-reveal.css',
    componentFile: 'theme-toggle.tsx',
    category: 'organic',
    tags: ['Smooth', 'Natural', 'Creative'],
    featured: false,
    complexity: 'intermediate',
  },
  {
    title: 'Perspective Travel',
    slug: 'perspective-travel',
    description: '3D perspective travel with depth and rotation',
    cssFile: 'perspective-travel.css',
    componentFile: 'theme-toggle.tsx',
    category: '3d',
    tags: ['Cinematic', 'Bold', 'Immersive'],
    featured: true,
    complexity: 'advanced',
  },
  {
    title: 'Diagonal Wipe',
    slug: 'diagonal-wipe',
    description: 'Dynamic diagonal sweep from corner to corner',
    cssFile: 'diagonal-wipe.css',
    componentFile: 'theme-toggle.tsx',
    category: 'wipes',
    tags: ['Dynamic', 'Modern', 'Bold'],
    featured: false,
    complexity: 'simple',
  },
  {
    title: 'Flip 3D',
    slug: 'flip-3d',
    description: '3D card flip with perspective and depth',
    cssFile: 'flip-3d.css',
    componentFile: 'theme-toggle.tsx',
    category: '3d',
    tags: ['Cinematic', 'Immersive', 'Bold'],
    featured: false,
    complexity: 'advanced',
  },

  {
    title: 'Spiral Wipe',
    slug: 'spiral-wipe',
    description: 'Rotating spiral expanding from center outward',
    cssFile: 'spiral-wipe.css',
    componentFile: 'theme-toggle.tsx',
    category: 'geometric',
    tags: ['Creative', 'Dynamic', 'Unique'],
    featured: false,
    complexity: 'advanced',
  },
  {
    title: 'Iris Reveal',
    slug: 'iris-reveal',
    description: 'Camera iris diaphragm opening from center',
    cssFile: 'iris-reveal.css',
    componentFile: 'theme-toggle.tsx',
    category: 'geometric',
    tags: ['Cinematic', 'Professional', 'Smooth'],
    featured: false,
    complexity: 'advanced',
  },
  {
    title: 'Skew Slide',
    slug: 'skew-slide',
    description: 'Dynamic skewed sliding transition',
    cssFile: 'skew-slide.css',
    componentFile: 'theme-toggle.tsx',
    category: '3d',
    tags: ['Dynamic', 'Modern', 'Bold'],
    featured: false,
    complexity: 'intermediate',
  },
  {
    title: 'The Premium Fade',
    slug: 'the-premium-fade',
    description: 'Border sweep with grid pattern overlay and content fade',
    cssFile: 'the-premium-fade.css',
    componentFile: 'theme-toggle.tsx',
    category: 'wipes',
    tags: ['Professional', 'Structured', 'Smooth'],
    featured: true,
    complexity: 'intermediate',
  },
];

export function getTransitionBySlug(slug: string): Transition | undefined {
  return transitions.find((transition) => transition.slug === slug);
}
