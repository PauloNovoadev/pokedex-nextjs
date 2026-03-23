const BASE_URL = process.env.POKEAPI_BASE_URL ?? "https://pokeapi.co/api/v2"
const CACHE_OPTIONS = { next: { revalidate: 86400 } } as const

export async function getPokemons(limit = 30, offset = 0) {
  const r = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    CACHE_OPTIONS
  )

  if (!r.ok) {
    throw new Error(`Erro ao carregar lista. Status: ${r.status}`)
  }

  const data = await r.json()

  if (!Array.isArray(data.results)) {
    throw new Error("Resposta inesperada da PokéAPI: results ausente.")
  }

  const pokemons = await Promise.all(
    data.results.map(async (pokemon: { name: string; url: string }) => {
      const detailResponse = await fetch(pokemon.url, CACHE_OPTIONS)

      if (!detailResponse.ok) {
        throw new Error(
          `Erro ao carregar detalhes de ${pokemon.name}. Status: ${detailResponse.status}`
        )
      }

      const details = await detailResponse.json()

      return {
        name: details.name as string,
        id: details.id as number,
        image:
          details.sprites?.other?.["official-artwork"]?.front_default ??
          details.sprites?.front_default ??
          null,
        types: (details.types as { slot: number; type: { name: string } }[])
          .map((t) => t.type.name),
      }
    })
  )

  return {
    pokemons,
    next: data.next ?? null,
    previous: data.previous ?? null,
  }
}