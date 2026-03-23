const BASE_URL = process.env.POKEAPI_BASE_URL ?? "https://pokeapi.co/api/v2"
const CACHE_OPTIONS = { next: { revalidate: 86400 } } as const

export async function getMoves(limit = 30, offset = 0) {
  const r = await fetch(
    `${BASE_URL}/move?limit=${limit}&offset=${offset}`,
    CACHE_OPTIONS
  )

  if (!r.ok) {
    throw new Error(`Erro ao carregar lista. Status: ${r.status}`)
  }

  const data = await r.json()

  if (!Array.isArray(data.results)) {
    throw new Error("Resposta inesperada da PokéAPI: results ausente.")
  }

  const moves = await Promise.all(
    data.results.map(async (move: { name: string; url: string }) => {
      const detailResponse = await fetch(move.url, CACHE_OPTIONS)

      if (!detailResponse.ok) {
        throw new Error(
          `Erro ao carregar detalhes de ${move.name}. Status: ${detailResponse.status}`
        )
      }

      const details = await detailResponse.json()

      return {
        name: details.name as string,
        id: details.id as number,
        type: details.type?.name ?? "",
        damageClass: details.damage_class?.name ?? "",
        power: details.power ?? null,
        accuracy: details.accuracy ?? null,
        pp: details.pp ?? null,
      }
    })
  )

  return {
    moves,
    next: data.next ?? null,
    previous: data.previous ?? null,
  }
}