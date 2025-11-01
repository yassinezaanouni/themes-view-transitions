import {
  Box,
  Droplets,
  Move,
  PartyPopper,
  Shapes,
  Sparkles,
} from 'lucide-react';

import { CategorySection } from '@/components/category-section';
import { CategoryType, transitions } from '@/data/transitions';
import { EXTERNAL_LINKS } from '@/lib/constants';

export default function Home() {
  // Group transitions by category
  const transitionsByCategory = transitions.reduce(
    (acc, transition) => {
      if (!acc[transition.category]) {
        acc[transition.category] = [];
      }
      acc[transition.category].push(transition);
      return acc;
    },
    {} as Record<CategoryType, typeof transitions>,
  );

  // Get featured transitions
  const featuredTransitions = transitions.filter((t) => t.featured);

  // Define category metadata
  const categories: Array<{
    key: CategoryType;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
  }> = [
    {
      key: 'geometric',
      title: 'Geometric Shapes',
      description:
        'Circular, polygonal, and geometric patterns that create structured, modern transitions',
      icon: <Shapes className="size-8" />,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      key: 'wipes',
      title: 'Directional Wipes',
      description:
        'Clean, directional transitions that sweep across the screen in various patterns',
      icon: <Move className="size-8" />,
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      key: '3d',
      title: '3D Effects',
      description:
        'Immersive transitions with depth, perspective, and three-dimensional movement',
      icon: <Box className="size-8" />,
      color: 'text-rose-600 dark:text-rose-400',
    },
    {
      key: 'organic',
      title: 'Organic & Fluid',
      description:
        'Natural, flowing transitions with smooth, organic motion and effects',
      icon: <Droplets className="size-8" />,
      color: 'text-teal-600 dark:text-teal-400',
    },
    {
      key: 'fun',
      title: 'Fun & Playful',
      description:
        'Whimsical, animated transitions that add personality and joy to your experience',
      icon: <PartyPopper className="size-8" />,
      color: 'text-pink-600 dark:text-pink-400',
    },
  ];

  return (
    <div className="space-y-20">
      {/* Header */}
      <header className="relative space-y-6 border-b pb-12 text-center">
        <div className="from-primary/5 to-chart-1/5 pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-linear-to-br via-transparent" />

        <div className="relative space-y-4">
          <div className="space-y-3">
            <h1 className="text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
              <span className="from-foreground via-foreground to-muted-foreground bg-linear-to-br bg-clip-text text-transparent">
                Transition{' '}
              </span>
              <span className="from-primary to-chart-1 bg-linear-to-tr bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            <a
              href={EXTERNAL_LINKS.X_URL}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-base transition-colors"
            >
              <span className="text-foreground/60">by</span>
              <span className="font-medium">{EXTERNAL_LINKS.X_HANDLE}</span>
            </a>
          </div>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl font-light md:text-2xl">
            Explore {transitions.length} beautiful theme transitions powered by
            the <br className="hidden md:block" />
            <a
              href={EXTERNAL_LINKS.VIEW_TRANSITIONS_API_DOCS}
              target="_blank"
              rel="noreferrer"
              className="text-foreground font-medium hover:underline"
            >
              View Transition API
            </a>
          </p>
        </div>
      </header>

      {/* Featured Section */}
      {featuredTransitions.length > 0 && (
        <CategorySection
          category="featured"
          transitions={featuredTransitions}
          title="Featured Transitions"
          description="Our handpicked selection of the most impressive and popular transitions"
          icon={<Sparkles className="size-8" />}
          color="text-amber-600 dark:text-amber-400"
        />
      )}

      {/* Category Sections */}
      {categories.map((category, index) => (
        <CategorySection
          key={index}
          category={category.key}
          transitions={transitionsByCategory[category.key] || []}
          title={category.title}
          description={category.description}
          icon={category.icon}
          color={category.color}
        />
      ))}
    </div>
  );
}
