'use client';

import { ArrowRight, Play, Star } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

import { ThemeToggle, ThemeToggleRef } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Transition } from '@/data/transitions';

interface TransitionCardProps {
  transition: Transition;
  index: number;
}

export function TransitionCard({ transition }: TransitionCardProps) {
  const themeToggleRef = useRef<ThemeToggleRef>(null);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    themeToggleRef.current?.triggerTransition();
  };
  return (
    <Link href={`/transition/${transition.slug}`}>
      <div>
        <Card className="group hover:shadow-primary/5 relative cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="from-primary/5 to-chart-1/5 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="group-hover:text-primary text-xl transition-colors">
                    {transition.title}
                  </CardTitle>
                  {transition.featured && (
                    <Badge
                      variant="secondary"
                      className="gap-1 border border-amber-500/30 bg-linear-to-r from-amber-500/10 to-orange-500/10 text-amber-700 dark:text-amber-400"
                    >
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </Badge>
                  )}
                </div>
                <CardDescription>{transition.description}</CardDescription>
              </div>
              <ArrowRight className="text-muted-foreground group-hover:text-primary h-5 w-5 shrink-0 transition-all group-hover:translate-x-1" />
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="bg-muted/50 border-border relative h-32 overflow-hidden rounded-md border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <ThemeToggle
                    ref={themeToggleRef}
                    transitionType={transition.slug}
                  />
                </div>
              </div>
            </div>
            <Button
              type="button"
              onClick={handlePlayClick}
              variant="outline"
              className="w-full gap-2"
            >
              <Play className="h-3 w-3" />
              Play Transition
            </Button>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
