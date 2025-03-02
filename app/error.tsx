'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
      <h1 className="text-3xl font-bold mb-2">Er is iets misgegaan</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-md">
        Sorry, er is een onverwachte fout opgetreden. We werken eraan om dit zo snel mogelijk op te lossen.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={reset} className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          Probeer opnieuw
        </Button>
        <Button variant="outline" asChild>
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Terug naar home
          </Link>
        </Button>
      </div>
    </div>
  );
}