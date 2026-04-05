export type Option = {
  name: string;
  label: string;
};

const BASE_URL = "https://pokeapi.co/api/v2";

export function formatName(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function fetchPokemonOptions(): Promise<Option[]> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=2000&offset=0`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar a lista de pokémons.");
  }

  const data = await res.json();

  return (data.results ?? []).map((entry: { name: string }) => ({
    name: entry.name,
    label: formatName(entry.name),
  }));
}

export async function fetchItemOptions(): Promise<Option[]> {
  const [itemsRes, berriesRes] = await Promise.all([
    fetch(`${BASE_URL}/item?limit=3000&offset=0`, {
      next: { revalidate: 86400 },
    }),
    fetch(`${BASE_URL}/berry?limit=100&offset=0`, {
      next: { revalidate: 86400 },
    }),
  ]);

  if (!itemsRes.ok || !berriesRes.ok) {
    throw new Error("Erro ao carregar itens e berries.");
  }

  const [itemsData, berriesData] = await Promise.all([
    itemsRes.json(),
    berriesRes.json(),
  ]);

  const items: Option[] = (itemsData.results ?? []).map(
    (entry: { name: string }) => ({
      name: entry.name,
      label: formatName(entry.name),
    })
  );

  const berries: Option[] = (berriesData.results ?? []).map(
    (entry: { name: string }) => ({
      name: entry.name,
      label: formatName(entry.name),
    })
  );

  return [...items, ...berries].sort((a, b) => a.label.localeCompare(b.label));
}

export async function fetchPokemonDetails(name: string): Promise<{
  sprite: string;
  moves: Option[];
}> {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`);

  if (!res.ok) {
    throw new Error(`Erro ao carregar os detalhes do pokémon "${name}".`);
  }

  const data = await res.json();

  const officialArtwork =
    data.sprites?.other?.["official-artwork"]?.front_default;

  const defaultSprite = data.sprites?.front_default;

  const sprite = officialArtwork || defaultSprite || "/pokedefault.png";

  const moves: Option[] = (data.moves ?? [])
    .map((entry: { move: { name: string } }) => ({
      name: entry.move.name,
      label: formatName(entry.move.name),
    }))
    .sort((a: Option, b: Option) => a.label.localeCompare(b.label));

  return {
    sprite,
    moves,
  };
}