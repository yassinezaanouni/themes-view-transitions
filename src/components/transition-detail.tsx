'use client';

import { useState } from 'react';
import { motion as m } from 'motion/react';
import { Transition } from '@/data/transitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/code-block';
import { ViewTransitionLink } from '@/components/view-transition-link';
import { ArrowLeft, Play } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

interface TransitionDetailProps {
  transition: Transition;
}

export function TransitionDetail({ transition }: TransitionDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const replayTransition = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1000);
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <ViewTransitionLink href="/">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to all transitions
        </Button>
      </ViewTransitionLink>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tight">
            {transition.title}
          </h1>
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary">
            {transition.category}
          </span>
        </div>
        <p className="text-lg text-muted-foreground">
          {transition.description}
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demo Section */}
        <Card className="lg:sticky lg:top-24 h-fit">
          <CardHeader>
            <CardTitle>Live Demo</CardTitle>
            <CardDescription>
              Interact with the transition in real-time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-video rounded-lg border border-border bg-muted/30 flex items-center justify-center overflow-hidden">
              <m.div
                key={isPlaying ? 'playing' : 'idle'}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center"
              >
                <ThemeToggle />
              </m.div>
              
              {/* Decorative elements */}
              <div className="absolute inset-0 pointer-events-none">
                <m.div
                  className="absolute top-4 left-4 h-12 w-12 rounded-full bg-chart-1/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <m.div
                  className="absolute bottom-4 right-4 h-16 w-16 rounded-full bg-chart-2/20"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </div>
            </div>

            <Button
              onClick={replayTransition}
              className="w-full gap-2"
              variant="outline"
            >
              <Play className="h-4 w-4" />
              Replay Transition
            </Button>

            <div className="rounded-lg bg-muted/50 p-4 space-y-2">
              <p className="text-sm font-medium">How it works:</p>
              <p className="text-sm text-muted-foreground">
                Click the theme toggle button to see the circular reveal animation in action. 
                The transition uses the View Transition API to create a smooth, animated 
                theme switch that originates from the button's position.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Code Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Implementation</CardTitle>
              <CardDescription>
                Copy the code to use this transition in your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="css" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="css">Global CSS</TabsTrigger>
                  <TabsTrigger value="component">Component</TabsTrigger>
                </TabsList>
                <TabsContent value="css" className="mt-4">
                  <CodeBlock code={transition.globalCss} language="css" />
                </TabsContent>
                <TabsContent value="component" className="mt-4">
                  <CodeBlock code={transition.componentCode} language="tsx" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Browser Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Chrome</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  ✓ Supported (111+)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Edge</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  ✓ Supported (111+)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Safari</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  ✓ Supported (18+)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Firefox</span>
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  ⚠ In Development
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

