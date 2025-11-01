import { CategoryType, Transition } from '@/data/transitions';
import { TransitionCard } from './transition-card';

interface CategorySectionProps {
  category: CategoryType;
  transitions: Transition[];
  title: string;
  description?: string;
  icon: React.ReactNode;
  color: string;
}

export function CategorySection({
  category,
  transitions,
  title,
  description,
  icon,
  color,
}: CategorySectionProps) {
  if (transitions.length === 0) return null;

  return (
    <section id={`category-${category}`} className="mb-16 scroll-mt-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className={color}>{icon}</div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <div className="bg-muted text-muted-foreground flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-medium">
            {transitions.length}
          </div>
        </div>
        {description && (
          <p className="text-muted-foreground ml-8 text-sm">{description}</p>
        )}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {transitions.map((transition, index) => (
          <TransitionCard
            key={transition.id}
            transition={transition}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
