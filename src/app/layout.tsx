import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';

import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { EXTERNAL_LINKS } from '@/lib/constants';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'View Transitions Playground',
  description:
    'Explore beautiful theme transitions using the View Transition API',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-background flex min-h-screen flex-col">
            <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
              <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">View Transitions</h1>
                </Link>
                <ThemeToggle />
              </div>
            </header>
            <main className="container flex-1 py-8">{children}</main>
            <footer className="border-border border-t">
              <div className="container flex h-16 items-center justify-center gap-1">
                <p className="text-muted-foreground text-sm">
                  Have feedback or suggestions contact me on X:
                </p>
                <a
                  href={EXTERNAL_LINKS.X_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground text-sm hover:underline"
                >
                  {EXTERNAL_LINKS.X_HANDLE}
                </a>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
