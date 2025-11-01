import { TransitionCard } from '@/components/transition-card';
import { transitions } from '@/data/transitions';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Transition Gallery
        </h2>
        <p className="text-muted-foreground">
          Explore beautiful theme transitions powered by the View Transition API
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {transitions.map((transition, index) => (
          <TransitionCard
            key={transition.id}
            transition={transition}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
