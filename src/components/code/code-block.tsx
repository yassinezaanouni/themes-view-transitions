"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Highlight, { defaultProps } from "prism-react-renderer";
import type { Language, PrismTheme } from "prism-react-renderer";
import { useCallback, useMemo, useState } from "react";

const semanticTheme: PrismTheme = {
  plain: {
    color: "var(--color-foreground)",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "color-mix(in oklch, var(--color-muted-foreground) 80%, transparent)",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "color-mix(in oklch, var(--color-muted-foreground) 70%, transparent)",
      },
    },
    {
      types: ["property", "tag", "constant", "symbol", "deleted"],
      style: {
        color: "color-mix(in oklch, var(--color-chart-3) 85%, transparent)",
      },
    },
    {
      types: ["boolean", "number"],
      style: {
        color: "color-mix(in oklch, var(--color-chart-1) 85%, transparent)",
      },
    },
    {
      types: ["attr-name", "builtin", "char", "inserted", "selector", "string"],
      style: {
        color: "color-mix(in oklch, var(--color-chart-2) 80%, transparent)",
      },
    },
    {
      types: ["operator", "entity", "url"],
      style: {
        color: "color-mix(in oklch, var(--color-chart-4) 80%, transparent)",
      },
    },
    {
      types: ["keyword", "atrule"],
      style: {
        color: "color-mix(in oklch, var(--color-chart-5) 85%, transparent)",
      },
    },
    {
      types: ["function", "class-name"],
      style: {
        color: "color-mix(in oklch, var(--color-chart-1) 90%, transparent)",
      },
    },
  ],
};

export interface CodeBlockProps {
  code: string;
  language?: Language;
  className?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "tsx", className, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error("Unable to copy snippet", error);
    }
  }, [code]);

  const snippet = useMemo(() => code.trim(), [code]);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[calc(var(--radius-xl))] border border-border/60 bg-[color-mix(in_oklch,var(--color-card)_94%,transparent)] shadow-[0px_24px_64px_-48px_color-mix(in_oklch,var(--color-ring)_35%,transparent)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 bg-[color-mix(in_oklch,var(--color-muted)_90%,transparent)] px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-[color-mix(in_oklch,var(--color-muted-foreground)_88%,transparent)]">
        <span className="font-semibold text-[color-mix(in_oklch,var(--color-muted-foreground)_95%,transparent)]">
          {filename ?? "snippet"}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCopy}
          className="h-8 gap-2 rounded-full px-3 text-[11px] text-[color-mix(in_oklch,var(--color-muted-foreground)_92%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-muted)_94%,transparent)]"
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <div className="relative overflow-auto">
        <Highlight {...defaultProps} code={snippet} language={language} theme={semanticTheme}>
          {({ className: innerClass, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cn(
                innerClass,
                "scrollbar-thin m-0 bg-transparent px-6 py-6 text-[13px] leading-relaxed text-[color-mix(in_oklch,var(--color-muted-foreground)_92%,transparent)]",
              )}
              style={style}
            >
              {tokens.map((line, i) => {
                if (i === tokens.length - 1 && line.length === 1 && line[0].empty) {
                  return null;
                }
                const lineNumber = i + 1;
                return (
                  <div
                    key={lineNumber}
                    {...getLineProps({ line, key: lineNumber })}
                    className="flex min-w-full tabular-nums"
                  >
                    <span className="select-none pr-6 text-right text-[11px] text-[color-mix(in_oklch,var(--color-muted-foreground)_55%,transparent)]">
                      {lineNumber}
                    </span>
                    <span className="flex-1">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
