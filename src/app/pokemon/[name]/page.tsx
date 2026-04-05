import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatBar } from "@/utilidades/pokemonstatbar"
import { nameFmt } from "../../../utilidades/namefmt"
import { pokemonTypeTheme } from "@/utilidades/pokemontypecolor"

const BASE_URL = "https://pokeapi.co/api/v2"

async function getPokemon(name: string) {
  const r = await fetch(`${BASE_URL}/pokemon/${name}`, {
    cache: "no-store",
    next: { revalidate: 0 },
  })

  if (r.status === 404) notFound()
  if (!r.ok) throw new Error("Falha ao carregar pokemon.")

  return r.json()
}

async function getEvolutionChainFromPokemon(name: string) {
  const pokemon = await getPokemon(name)

  const speciesRes = await fetch(pokemon.species.url, {
    cache: "no-store",
    next: { revalidate: 0 },
  })
  if (!speciesRes.ok) throw new Error("Falha ao carregar species.")

  const speciesData = await speciesRes.json()

  const evoRes = await fetch(speciesData.evolution_chain.url, {
    cache: "no-store",
    next: { revalidate: 0 },
  })
  if (!evoRes.ok) throw new Error("Falha ao carregar evolution chain.")

  const evoData = await evoRes.json()

  const names: string[] = []

  function collectChain(node: any) {
    if (!node) return
    names.push(node.species.name)

    for (const next of node.evolves_to ?? []) {
      collectChain(next)
    }
  }

  collectChain(evoData.chain)

  const uniqueNames = [...new Set(names)]

  const evolutionChain = await Promise.all(
    uniqueNames.map(async (pokemonName) => {
      const res = await fetch(`${BASE_URL}/pokemon/${pokemonName}`, {
        cache: "no-store",
        next: { revalidate: 0 },
      })

      if (!res.ok) {
        return {
          name: pokemonName,
          image: "",
          id: null,
        }
      }

      const data = await res.json()

      return {
        name: data.name,
        id: data.id,
        image:
          data.sprites?.other?.["official-artwork"]?.front_default ??
          data.sprites?.front_default,
      }
    })
  )

  return evolutionChain
}

const fallbackTheme = {
  badge: "bg-zinc-500 text-white",
}

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params

  const pokemon = await getPokemon(name)

  const evolutionChain = await getEvolutionChainFromPokemon(name)

  const pokemonImage =
  pokemon.sprites?.other?.["official-artwork"]?.front_default ??
  pokemon.sprites?.front_default

  return (
    <div className="min-h-screen px-4 py-8">
       <nav className="flex w-full items-center justify-between">
      <Link
            href={`/?`}
            className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Voltar
          </Link>
          </nav>
      
      <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-300 bg-white dark:bg-gray-700 p-6 shadow-xl">
        <nav className="mt-4 flex w-full items-center justify-between">
          {pokemon.id > 1 && (
       <Link 
    href={`/pokemon/${pokemon.id - 1}`}
    className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-gradient-to-r from-green-800 to-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-green-900 hover:to-emerald-700"
  >
    <ArrowLeftIcon className="h-4 w-4" />
    Anterior
  </Link>)}
  <Link 
    href={`/pokemon/${pokemon.id + 1}`} 
    className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-gradient-to-r from-green-800 to-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-green-900 hover:to-emerald-700"
  >
    Próximo
    <ArrowRightIcon className="h-4 w-4" />
  </Link>
</nav>
        <h1 className="mb-8 text-center text-4xl font-black text-zinc-900 dark:text-white">
          {nameFmt(pokemon.name)}
        </h1>
         <div className="border-t border-zinc-300 my-2" />

        <div className="grid gap-6 md:grid-cols-[320px_1fr]">
          <div className="flex items-start justify-center">
            {pokemon.sprites?.front_default && (
              <img
                src={pokemonImage}
                alt={pokemon.name}
                className="h-56 w-56 object-contain"
              />
            )}
          </div>

          <Card className="dark:text-white">
            <CardHeader>
              <CardTitle>Pokédex data</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm text-zinc-700 dark:text-white">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-zinc-500 dark:text-white">ID</p>
                  <p className="text-zinc-900 dark:text-white">
                    #{String(pokemon.id).padStart(3, "0")}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-zinc-500 dark:text-white">Tipo</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {(pokemon.types ?? []).map((t: any) => {
                      const theme = pokemonTypeTheme[t.type.name] ?? fallbackTheme

                      return (
                        <span
                          key={t.type.name}
                          className={`rounded-sm px-3 py-1 text-xs font-bold uppercase tracking-wide ${theme.badge}`}
                        >
                          {nameFmt(t.type.name)}
                        </span>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-zinc-500 dark:text-white">Height</p>
                  <p className="text-zinc-900">{pokemon.height}</p>
                </div>
                <div>
                  <p className="font-medium text-zinc-500 dark:text-white">Weight</p>
                  <p className="text-zinc-900">{pokemon.weight}</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-zinc-500 dark:text-white">Abilities</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(pokemon.abilities ?? []).map((a: any) => (
                    <span
                      key={a.ability.name}
                      className="rounded-sm bg-gradient-to-r from-blue-100 to-yellow-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-gradient-to-r dark:from-sky-950 dark:to-yellow-950 dark:text-white"
                    >
                      {nameFmt(a.ability.name)}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
 <div className="border-t border-zinc-300 my-2" />
        <div className="mt-10">
          <h2 className="mb-4 text-center text-2xl font-black text-zinc-900 dark:text-white">
            Linha evolutiva
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {evolutionChain.map((poke, index) => (
              <div key={poke.name} className="flex items-center gap-3">
                <Card className="w-36">
                  <CardContent className="flex flex-col items-center p-4">
                    {poke.image ? (
                      <img
                        src={poke.image}
                        alt={poke.name}
                        className="h-20 w-20 object-contain"
                      />
                    ) : (
                      <div className="h-20 w-20" />
                    )}

                    <p className="mt-2 text-center text-sm font-semibold text-zinc-800 dark:text-white">
                      {nameFmt(poke.name)}
                    </p>

                    {poke.id ? (
                      <p className="text-xs text-zinc-500 dark:text-white">
                        #{String(poke.id).padStart(3, "0")}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>

                {index < evolutionChain.length - 1 && (
                  <ArrowRightIcon className="h-5 w-5 text-zinc-500" />
                )}
              </div>
            ))}
          </div>
        </div>
 <div className="border-t border-zinc-300 my-2" />
        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-black text-zinc-900 dark:text-white">
            Base stats
          </h2>

          <div className="space-y-3">
            {(pokemon.stats ?? []).map((s: any) => (
              <StatBar
                key={s.stat.name}
                label={nameFmt(s.stat.name)}
                value={s.base_stat}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}