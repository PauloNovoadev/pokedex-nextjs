import Link from "next/link"
import { notFound } from "next/navigation"
import { nameFmt } from "../../../utilidades/namefmt"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

const BASE_URL = "https://pokeapi.co/api/v2"

async function getBerry(name: string) {
  const r = await fetch(`${BASE_URL}/berry/${name}`, {
    cache: "no-store",
    next: { revalidate: 0 },
  })

  if (r.status === 404) notFound()
  if (!r.ok) throw new Error("Falha ao carregar berry.")

  return await r.json()
}

async function getBerryItem(itemName: string) {
  const r = await fetch(`${BASE_URL}/item/${itemName}`, {
    cache: "no-store",
    next: { revalidate: 0 },
  })

  if (!r.ok) return null
  return r.json()
}

export default async function BerryDetailPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params

 const berry = await getBerry(name)
const berryItem = await getBerryItem(berry.item.name)

  const description =
    berryItem?.effect_entries?.find((e: any) => e.language?.name === "en")
      ?.short_effect ?? "Sem descrição."
         
  const flavorColors: Record<string, string> = {
  spicy: "bg-red-500 text-white",
  dry: "bg-yellow-400 text-black",
  sweet: "bg-pink-500 text-white",
  bitter: "bg-green-600 text-white",
  sour: "bg-blue-500 text-white",
};
   return (
    <div className="min-h-screen px-4 py-8">
      
      <div className="mx-auto max-w-5xl rounded-2xl border-8 border-blue-300 bg-gradient-to-r from-blue-50 to-yellow-50 dark:bg-gradient-to-r dark:from-sky-950 dark:to-yellow-950   p-6 shadow-xl">
        <h1 className="mb-8 text-center text-4xl font-black text-zinc-900 dark:text-white">
          <nav className="mt-4 flex w-full items-center justify-between">
          {berry.id > 1 && (
       <Link 
    href={`/berries/${berry.id - 1}`}
    className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-gradient-to-r from-green-800 to-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-green-900 hover:to-emerald-700"
  >
    <ArrowLeftIcon className="h-4 w-4" />
    Anterior
  </Link>)}
  <Link 
    href={`/berries/${berry.id + 1}`} 
    className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-gradient-to-r from-green-800 to-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-green-900 hover:to-emerald-700"
  >
    Próximo
    <ArrowRightIcon className="h-4 w-4" />
  </Link>
</nav>
          {nameFmt(berry.name)}
        </h1>
        <div className="border-t border-zinc-300 my-4" />

        <div className="grid gap-6 md:grid-cols-[320px_1fr]">
          <div className="flex items-start justify-center">
            {berryItem?.sprites?.default && (
              <img
                src={berryItem.sprites.default}
                alt={berry.name}
                className="h-40 w-40 object-contain"
              />
            )}
            
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-high text-zinc-700 font-bold dark:text-white">Berry info</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm text-zinc-700 dark:text-white">
              <div>
                <p className="font-medium text-zinc-500 dark:text-white">Descrição</p>
                <p className="mt-1 text-zinc-900 dark:text-white">{description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-zinc-500 dark:text-white">Growth time</p>
                  <p className="text-zinc-900 dark:text-white">{berry.growth_time}</p>
                </div>

                <div>
                  <p className="font-medium text-zinc-500 dark:text-white">Max harvest</p>
                  <p className="text-zinc-900 dark:text-white">{berry.max_harvest}</p>
                </div>

                <div>
                  <p className="font-medium text-zinc-500 dark:text-white">Size</p>
                  <p className="text-zinc-900 dark:text-white">{berry.size}</p>
                </div>

                <div>
                  <p className="font-medium text-zinc-500 dark:text-white">Smoothness</p>
                  <p className="text-zinc-900 dark:text-white">{berry.smoothness}</p>
                </div>

                <div>
                  <p className="font-medium text-zinc-500 dark:text-white">Soil dryness</p>
                  <p className="text-zinc-900 dark:text-white">{berry.soil_dryness}</p>
                </div>

                <div>
                  <p className="font-medium text-zinc-500 dark:text-white">Firmness</p>
                  <p className="text-zinc-900 dark:text-white">
                    {nameFmt(berry.firmness?.name ?? "")}
                  </p>
                </div>
              </div>

              <div>
              <p className="font-medium text-zinc-500">Flavors</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
              {(berry.flavors ?? []).map((flavor: any) => {
              const flavorName = flavor.flavor.name
              return (
              <div
              key={flavorName}
              className={`border-4 border-zinc-500 rounded-md px-3 py-2 ${
              flavorColors[flavorName] ?? "bg-zinc-200 text-zinc-800"
              }`}
              >
          <p className="text-xs font-medium opacity-80">
            {nameFmt(flavorName)}
          </p>
          <p className="text-sm font-semibold">
            {flavor.potency}
          </p>
        </div>
      )
    })}
  </div>
</div>
            </CardContent>
          </Card>
        </div>
      </div>
      <nav className="mt-6 flex w-full items-center justify-center gap-4">
        <Link
            href={`/berries?`}
            className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Voltar
          </Link>
      </nav>
    </div>
  )
}