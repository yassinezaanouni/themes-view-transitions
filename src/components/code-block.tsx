'use client';

import { useTheme } from 'next-themes';
import { startTransition, useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

import { CopyButton } from '@/components/ui/copy-button';

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  return (
    <div className="group relative">
      <CopyButton text={code} className="absolute top-2 right-2 z-10" />
      <div className="border-border overflow-hidden rounded-lg border">
        {!mounted ? (
          // Loading skeleton that works in both themes
          <div className="bg-muted animate-pulse space-y-3 p-6 lg:min-h-[800px]">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`bg-muted-foreground/20 h-4 w-${['3/4', 'full', '5/6', '4/5', 'full', '2/3', '4/5', '3/4', 'full', '2/3'][i % 10]} rounded`}
              />
            ))}
          </div>
        ) : (
          <SyntaxHighlighter
            language={language}
            style={theme === 'dark' ? oneDark : oneLight}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.875rem',
            }}
            showLineNumbers
          >
            {code}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}
