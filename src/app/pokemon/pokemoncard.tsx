import { ClickableCard } from "@/components/cards/clickcard"
import { nameFmt } from "@/utilidades/namefmt"
import { pokemonTypeTheme } from "@/utilidades/pokemontypecolor"

type PokemonCardProps = {
  name: string
  id: number
  image: string
  types?: string[]
}

const fallbackTheme = {
  card: "ring-zinc-200",
  imageBg: "bg-zinc-100",
  badge: "bg-zinc-200 text-zinc-800",
}

export function PokemonCard({
  name,
  id,
  image,
  types = [],
}: PokemonCardProps) {
  const normalizedTypes = types.map((type) =>
    String(type).trim().toLowerCase()
  )

  const mainType = normalizedTypes[0]
  const mainTheme = pokemonTypeTheme[mainType] ?? fallbackTheme

  return (
    <ClickableCard
      href={`/pokemon/${name}`}
      image={image}
      imageAlt={name}
      title={nameFmt(name)}
      className={mainTheme.card}
      imageClassName={mainTheme.imageBg}
    >
      <div className="absolute right-3 top-3 z-20 rounded-full bg-white/90 px-2 py-1 text-xs font-extrabold text-zinc-700 shadow-sm">
        #{String(id).padStart(3, "0")}
      </div>

      {normalizedTypes.length > 0 && (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 justify-center gap-1 px-2 whitespace-nowrap">
          {normalizedTypes.map((type) => {
            const theme = pokemonTypeTheme[type] ?? fallbackTheme

            return (
              <span
                key={type}
                className={`inline-flex min-w-[64px] min-h-[18px] items-center justify-center rounded-sm px-2 py-0.5 text-[10px] font-extrabold leading-none shadow-sm ${theme.badge}`}
              >
                {nameFmt(type).toUpperCase()}
              </span>
            )
          })}
        </div>
      )}
    </ClickableCard>
  )
}