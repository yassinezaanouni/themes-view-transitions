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
  
  const globalCss = await readFile(cssFilePath, 'utf-8');
  const componentCode = await readFile(componentFilePath, 'utf-8');

  return <TransitionDetail transition={transition} globalCss={globalCss} componentCode={componentCode} />;
}

