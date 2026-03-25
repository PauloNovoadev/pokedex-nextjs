import Link from "next/link";
import SearchBar from "../../app/search/SearchBar";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="relative z-50 mx-auto mt-6 w-[95%] max-w-4x4 rounded-2xl border border-white/30 bg-red-500/95 px-6 py-5 text-white shadow-lg backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Link
          href="/"
          className="poke-title text-5xl font-black tracking-widest tracking-[0.2em] transition hover:scale-[1.02]"
        >
          POKEDEX
        </Link>

        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          <nav>
            <ul className="flex items-center gap-2 text-sm font-extrabold md:text-base">

              <li>
                <Button asChild variant="default" size="sm">
                  <Link href="/items">ITEMS</Link>
                </Button>
              </li>

              <li>
                <Button asChild variant="default" size="sm">
                  <Link href="/berries">BERRIES</Link>
                </Button>
              </li>

              <li>
                <Button asChild variant="default" size="sm">
                  <Link href="/moves">MOVES</Link>
                </Button>
              </li>

            </ul>
          </nav>

          <div className="w-full max-w-xs md:max-w-sm">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}