import { CategorySection } from '@/components/category-section';
import { CategoryType, transitions } from '@/data/transitions';
import {
  Shapes,
  Droplets,
  Sparkles,
  Move,
  Box,
  PartyPopper,
} from 'lucide-react';

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
    {} as Record<CategoryType, typeof transitions>
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
      icon: <Shapes className="h-5 w-5" />,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      key: 'wipes',
      title: 'Directional Wipes',
      description:
        'Clean, directional transitions that sweep across the screen in various patterns',
      icon: <Move className="h-5 w-5" />,
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      key: '3d',
      title: '3D Effects',
      description:
        'Immersive transitions with depth, perspective, and three-dimensional movement',
      icon: <Box className="h-5 w-5" />,
      color: 'text-rose-600 dark:text-rose-400',
    },
    {
      key: 'organic',
      title: 'Organic & Fluid',
      description:
        'Natural, flowing transitions with smooth, organic motion and effects',
      icon: <Droplets className="h-5 w-5" />,
      color: 'text-teal-600 dark:text-teal-400',
    },
    {
      key: 'fun',
      title: 'Fun & Playful',
      description:
        'Whimsical, animated transitions that add personality and joy to your experience',
      icon: <PartyPopper className="h-5 w-5" />,
      color: 'text-pink-600 dark:text-pink-400',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-3 mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Transition Gallery
        </h1>
        <p className="text-muted-foreground text-lg">
          Explore {transitions.length} beautiful theme transitions powered by
          the View Transition API
        </p>
      </div>

      {/* Featured Section */}
      {featuredTransitions.length > 0 && (
        <CategorySection
          category="featured"
          transitions={featuredTransitions}
          title="Featured Transitions"
          description="Our handpicked selection of the most impressive and popular transitions"
          icon={<Sparkles className="h-5 w-5" />}
          color="text-amber-600 dark:text-amber-400"
        />
      )}

      {/* Category Sections */}
      {categories.map((category) => (
        <CategorySection
          key={category.key}
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
