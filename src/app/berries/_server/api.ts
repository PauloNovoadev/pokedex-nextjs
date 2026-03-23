const BASE_URL = process.env.POKEAPI_BASE_URL ?? "https://pokeapi.co/api/v2"
const CACHE_OPTIONS = { next: { revalidate: 86400 } } as const

export async function getBerries(limit = 30, offset = 0) {
  const r = await fetch(
    `${BASE_URL}/berry?limit=${limit}&offset=${offset}`,
    CACHE_OPTIONS
  )

  if (!r.ok) {
    throw new Error(`Erro ao carregar lista. Status: ${r.status}`)
  }

  const data = await r.json()

  if (!Array.isArray(data.results)) {
    throw new Error("Resposta inesperada da PokéAPI: results ausente.")
  }

  const berries = await Promise.all(
    data.results.map(async (berry: { name: string; url: string }) => {
      const detailResponse = await fetch(berry.url, CACHE_OPTIONS)

      if (!detailResponse.ok) {
        throw new Error(
          `Erro ao carregar detalhes de ${berry.name}. Status: ${detailResponse.status}`
        )
      }

      const details = await detailResponse.json()

      let image: string | null = null

      if (details.item?.name) {
        const itemResponse = await fetch(
          `${BASE_URL}/item/${details.item.name}`,
          CACHE_OPTIONS
        )

        if (itemResponse.ok) {
          const itemDetails = await itemResponse.json()
          image = itemDetails.sprites?.default ?? null
        }
      }

      return {
        name: details.name as string,
        id: details.id as number,
        image,
      }
    })
  )

  return {
    berries,
    next: data.next ?? null,
    previous: data.previous ?? null,
  }
}