'use client';

import { useTheme } from 'next-themes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { CopyButton } from '@/components/ui/copy-button';

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const { theme } = useTheme();

  return (
    <div className="relative group">
      <CopyButton
        text={code}
        className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <div className="rounded-lg overflow-hidden border border-border">
        <SyntaxHighlighter
          language={language}
          style={theme === 'dark' ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            background: theme === 'dark' ? 'oklch(0.205 0 0)' : 'oklch(0.985 0 0)',
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

