import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "View Transitions Playground",
  description: "Explore beautiful theme transitions using the View Transition API",
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
          <div className="flex min-h-screen flex-col bg-background">
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">View Transitions</h1>
                </Link>
                <ThemeToggle />
              </div>
            </header>
            <main className="container flex-1 py-8">
              {children}
            </main>
            <footer className="border-t border-border">
              <div className="container flex h-16 items-center justify-center gap-1">
                <p className="text-sm text-muted-foreground">
                  Built with View Transitions API by
                </p>
                <a
                  href="https://x.com/YassineZaanouni"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-foreground hover:underline"
                >
                  @yassinezaanouni
                </a>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
