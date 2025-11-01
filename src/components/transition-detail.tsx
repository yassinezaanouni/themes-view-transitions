'use client';

import { ChevronLeft, Play } from 'lucide-react';
import { motion as m } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';

import { CodeBlock } from '@/components/code-block';
import { ThemeToggle, ThemeToggleRef } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Transition } from '@/data/transitions';
import { EXTERNAL_LINKS } from '@/lib/constants';

interface TransitionDetailProps {
  transition: Transition;
  globalCss: string;
  componentCode: string;
}

export function TransitionDetail({
  transition,
  globalCss,
  componentCode,
}: TransitionDetailProps) {
  const themeToggleRef = useRef<ThemeToggleRef>(null);

  const replayTransition = () => {
    themeToggleRef.current?.triggerTransition();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="group">
                <ChevronLeft className="size-5 transition-transform group-hover:-translate-x-0.5" />
              </Button>
            </Link>
            <h1 className="text-4xl font-bold tracking-tight">
              {transition.title}
            </h1>
          </div>
          <Button asChild variant="outline">
            <a
              href={EXTERNAL_LINKS.VIEW_TRANSITIONS_API_DOCS}
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </a>
          </Button>
        </div>
        <p className="text-muted-foreground text-lg">
          {transition.description}
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Demo Section */}
        <div className="space-y-4">
          <Card className="h-fit lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle>Live Demo</CardTitle>
              <CardDescription>
                Interact with the transition in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-border bg-muted/30 relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border">
                <div className="flex items-center justify-center">
                  <ThemeToggle
                    ref={themeToggleRef}
                    transitionType={transition.slug}
                  />
                </div>

                {/* Decorative elements */}
                <div className="pointer-events-none absolute inset-0">
                  <m.div
                    className="bg-chart-1/20 absolute top-4 left-4 h-12 w-12 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <m.div
                    className="bg-chart-2/20 absolute right-4 bottom-4 h-16 w-16 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }}
                  />
                </div>
              </div>

              <Button
                onClick={replayTransition}
                className="w-full gap-2"
                variant="outline"
                size="lg"
              >
                <Play className="h-4 w-4" />
                Play Theme Transition
              </Button>
            </CardContent>
          </Card>
          <div className="bg-muted/50 space-y-2 rounded-lg p-4">
            <p className="text-sm font-medium">How it works:</p>
            <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
              <li>
                Click the theme toggle button to see the{' '}
                {transition.title + ' '} animation in action.
              </li>
              <li>
                The transition uses the View Transition API to create a smooth,
                animated theme switch.
              </li>
            </ul>
          </div>
        </div>

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
                  <CodeBlock code={globalCss} language="css" />
                </TabsContent>
                <TabsContent value="component" className="mt-4">
                  <CodeBlock code={componentCode} language="tsx" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
