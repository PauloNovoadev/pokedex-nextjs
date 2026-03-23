import Link from "next/link"
import { Suspense } from "react"
import { getBerries } from "./_server/api"
import { BerryCard } from "./berrycard"
import GridSkeleton from "../loading"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

export const revalidate = 86400

const POKEMON_PAGE_SIZE = 30
const POKEMON_MAX_PAGE = 44

async function PokemonList({ page }: { page: number }) {
  const offset = (page - 1) * POKEMON_PAGE_SIZE

  const { berries, next, previous } = await getBerries(
    POKEMON_PAGE_SIZE,
    offset
  ).catch((err) => {
    console.error("[PokemonList] Falha ao buscar pokémons:", err)
    throw new Error("Falha ao buscar pokémons.")
  })

  return (
    <div>
      <nav className="mb-6 flex w-full items-center justify-between gap-4">
        {previous ? (
          <Link
            href={`/berries?page=${page - 1}`}
            className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Anterior
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/berries?page=${page + 1}`}
            className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Próxima
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </nav>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {berries.map((berry: any) => (
          <BerryCard
            key={berry.name}
            name={berry.name}
            image={berry.image}
          />
        ))}
      </div>
    </div>
  )
}

export default async function Pokemons({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageStr } = await searchParams

  const page = Math.min(
    Math.max(1, Number(pageStr ?? "1") || 1),
    POKEMON_MAX_PAGE
  )

  return (
    <Suspense key={page} fallback={<GridSkeleton count={POKEMON_PAGE_SIZE} />}>
      <PokemonList page={page} />
    </Suspense>
  )
}