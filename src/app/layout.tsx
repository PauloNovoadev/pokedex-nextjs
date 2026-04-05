import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Providers } from "@/components/dark theme/themeprovider";

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Pokedex built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <main className="site-background relative min-h-screen overflow-visible">
            <div className="pointer-events-none absolute inset-0 z-0 backdrop-blur-[2px]" />
            <div className="relative z-10">
              <Header />
              <div className="mx-auto max-w-7xl px-4 py-8">
                {children}
              </div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}