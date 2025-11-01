import { CategoryType, Transition } from '@/data/transitions';
import { cn } from '@/lib/utils';

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
    <section id={`category-${category}`} className="scroll-mt-8">
      <header className="mb-8 space-y-3">
        <div className="flex items-center gap-3">
          <div className={cn(color)}>{icon}</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          <div className="bg-muted text-muted-foreground flex h-7 min-w-7 items-center justify-center rounded-full px-2.5 text-sm font-medium">
            {transitions.length}
          </div>
        </div>
        {description && (
          <p className="text-muted-foreground ml-11 max-w-3xl text-base md:text-lg">
            {description}
          </p>
        )}
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {transitions.map((transition, index) => (
          <TransitionCard
            key={index}
            transition={transition}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
