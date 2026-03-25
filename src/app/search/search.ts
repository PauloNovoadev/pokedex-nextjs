export type SearchItem = {
  name: string;
  type: "pokemon" | "move" | "item" | "berry";
  href: string;
};

const BASE_URL = "https://pokeapi.co/api/v2";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function buildHref(type: SearchItem["type"], name: string) {
  const routes = {
    pokemon: "/pokemon",
    move: "/moves",
    item: "/items",
    berry: "/berries",
  };

  return `${routes[type]}/${name}`;
}

async function fetchResource(
  endpoint: string,
  type: SearchItem["type"],
  limit: number
): Promise<SearchItem[]> {
  const res = await fetch(`${BASE_URL}/${endpoint}?limit=${limit}&offset=0`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error(`Erro ao carregar ${endpoint}`);
  }

  const data = await res.json();

  return (data.results ?? []).map((entry: { name: string }) => ({
    name: entry.name,
    type,
    href: buildHref(type, entry.name),
  }));
}

export async function searchAll(query: string): Promise<SearchItem[]> {
  const normalized = normalize(query);

  if (!normalized) return [];

  const [pokemons, moves, items, berries] = await Promise.all([
    fetchResource("pokemon", "pokemon", 1500),
    fetchResource("move", "move", 1200),
    fetchResource("item", "item", 2200),
    fetchResource("berry", "berry", 100),
  ]);

  return [...pokemons, ...moves, ...items, ...berries]
    .filter((item) => item.name.includes(normalized))
    .sort((a, b) => {
      const aStarts = a.name.startsWith(normalized);
      const bStarts = b.name.startsWith(normalized);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return a.name.localeCompare(b.name);
    })
    .slice(0, 20);
}