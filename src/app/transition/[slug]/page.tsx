import { notFound } from 'next/navigation';

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

  return <TransitionDetail transition={transition} />;
}

