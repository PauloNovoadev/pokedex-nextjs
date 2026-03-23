import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";

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
    <html lang="en">
      <body className="antialiased">
        <main className="relative min-h-screen overflow-visible bg-zinc-100">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-repeat opacity-20 [background-size:420px]"
              style={{ backgroundImage: "url('/pokeballsbg.png')" }}
            />
            <div className="absolute inset-0 bg-white/10" />
          </div>

          <div className="relative z-10">
            <Header />
            <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}