'use client';

import { motion as m } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ViewTransitionLink } from '@/components/view-transition-link';
import { Transition } from '@/data/transitions';
import { ArrowRight } from 'lucide-react';

interface TransitionCardProps {
  transition: Transition;
  index: number;
}

export function TransitionCard({ transition, index }: TransitionCardProps) {
  return (
    <ViewTransitionLink href={`/transition/${transition.slug}`}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-1/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {transition.title}
                </CardTitle>
                <CardDescription>{transition.description}</CardDescription>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="relative h-32 rounded-md bg-muted/50 border border-border overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {transition.category === 'Theme' ? (
                  <m.div
                    className="h-16 w-16 rounded-full bg-gradient-to-br from-chart-1 to-chart-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ) : (
                  <div className="flex gap-2">
                    <m.div
                      className="h-12 w-12 rounded-lg bg-gradient-to-br from-chart-3 to-chart-4"
                      animate={{
                        x: [-20, 20, -20],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <m.div
                      className="h-12 w-12 rounded-lg bg-gradient-to-br from-chart-5 to-chart-1"
                      animate={{
                        x: [20, -20, 20],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm border border-border">
                <span className="text-xs font-medium text-muted-foreground">
                  {transition.category}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </m.div>
    </ViewTransitionLink>
  );
}

