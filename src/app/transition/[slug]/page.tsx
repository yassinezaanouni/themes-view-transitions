import { readFile } from 'fs/promises';
import { notFound } from 'next/navigation';
import { join } from 'path';

import { TransitionDetail } from '@/components/transition-detail';
import { transitions } from '@/data/transitions';

interface TransitionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return transitions.map((transition) => ({
    slug: transition.slug,
  }));
}

export default async function TransitionPage({ params }: TransitionPageProps) {
  const { slug } = await params;
  const transition = transitions.find((t) => t.slug === slug);

  if (!transition) {
    notFound();
  }

  // Read CSS and component files from filesystem
  const cssFilePath = join(process.cwd(), 'src', 'styles', 'transitions', transition.cssFile);
  const componentFilePath = join(process.cwd(), 'src', 'components', transition.componentFile);

  const transitionCss = await readFile(cssFilePath, 'utf-8');
  const componentCode = await readFile(componentFilePath, 'utf-8');

  // Check if the CSS uses expo timing functions
  const usesExpoIn = transitionCss.includes('var(--expo-in)');
  const usesExpoOut = transitionCss.includes('var(--expo-out)');
  const needsTimingFunctions = usesExpoIn || usesExpoOut;

  // Only prepend timing functions if they're actually used
  let globalCss = transitionCss;

  if (needsTimingFunctions) {
    const timingFunctionsNeeded = [];

    if (usesExpoIn) {
      timingFunctionsNeeded.push(`  --expo-in: linear(
    0 0%, 0.0085 31.26%, 0.0167 40.94%,
    0.0289 48.86%, 0.0471 55.92%,
    0.0717 61.99%, 0.1038 67.32%,
    0.1443 72.07%, 0.1989 76.7%,
    0.2659 80.89%, 0.3465 84.71%,
    0.4419 88.22%, 0.554 91.48%,
    0.6835 94.51%, 0.8316 97.34%, 1 100%
  );`);
    }

    if (usesExpoOut) {
      timingFunctionsNeeded.push(`  --expo-out: linear(
    0 0%, 0.1684 2.66%, 0.3165 5.49%,
    0.446 8.52%, 0.5581 11.78%,
    0.6535 15.29%, 0.7341 19.11%,
    0.8011 23.3%, 0.8557 27.93%,
    0.8962 32.68%, 0.9283 38.01%,
    0.9529 44.08%, 0.9711 51.14%,
    0.9833 59.06%, 0.9915 68.74%, 1 100%
  );`);
    }

    const timingFunctions = `/* Animation Timing Functions */
:root {
${timingFunctionsNeeded.join('\n')}
}

`;

    globalCss = timingFunctions + transitionCss;
  }

  return <TransitionDetail transition={transition} globalCss={globalCss} componentCode={componentCode} />;
}

