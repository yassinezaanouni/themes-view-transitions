import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-8 text-center">
      <div className="space-y-4">
        <div className="relative">
          <h1 className="text-9xl font-bold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl bg-chart-1/20 -z-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>

      <Button asChild size="lg">
        <Link href="/" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
