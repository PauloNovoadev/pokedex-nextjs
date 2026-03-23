import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          gap: 16,
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        <li>
          <Link href="/">Pokémon</Link>
        </li>
        <li>
          <Link href="/items">Items</Link>
        </li>
        <li>
          <Link href="/moves">Moves</Link>
        </li>
        <li>
          <Link href="/berries">Berries</Link>
        </li>
      </ul>
    </nav>
  );
}