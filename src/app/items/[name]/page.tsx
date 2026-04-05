import Link from "next/link";
import { notFound } from "next/navigation";
import { nameFmt } from "../../../utilidades/namefmt";
import { CardTitle } from "@/components/ui/card";
import { Card, CardHeader, CardContent } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const BASE_URL = "https://pokeapi.co/api/v2";

async function getItem(name: string) {
  const r = await fetch(`${BASE_URL}/item/${name}`, {
    cache: "no-store",
    next: { revalidate: 0 },
  })

  if (r.status === 404) notFound()
  if (!r.ok) throw new Error("Falha ao carregar item.")

  const item = await r.json()

  const effectEntry = item.effect_entries?.find(
    (e: any) => e.language?.name === "en"
  )

  const flavorEntry = item.flavor_text_entries?.find(
    (e: any) => e.language?.name === "en"
  )

  const description =
    flavorEntry?.text?.replace(/\f|\n|\r/g, " ") ??
    effectEntry?.short_effect ??
    "Sem descrição."

  const effect =
    effectEntry?.effect?.replace(/\f|\n|\r/g, " ") ??
    effectEntry?.short_effect ??
    "Sem efeito informado."

  return {
    ...item,
    description,
    effect,
  }
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const item = await getItem(name);

  return (
    <div className="min-h-screen px-4 py-8">
      
      <div className="mx-auto max-w-5xl rounded-2xl border-8 border-blue-300 bg-gradient-to-r from-blue-50 to-yellow-50 dark:bg-gradient-to-r dark:from-sky-950 dark:to-yellow-950 p-6 shadow-xl">
        <h1 className="mb-8 text-center text-4xl font-black text-zinc-900 dark:text-white">
          <nav className="mt-4 flex w-full items-center justify-between">
          {item.id > 1 && (
       <Link 
    href={`/items/${item.id - 1}`}
    className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-gradient-to-r from-green-800 to-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-green-900 hover:to-emerald-700"
  >
    <ArrowLeftIcon className="h-4 w-4" />
    Anterior
  </Link>)}
  <Link 
    href={`/items/${item.id + 1}`} 
    className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-gradient-to-r from-green-800 to-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-green-900 hover:to-emerald-700"
  >
    Próximo
    <ArrowRightIcon className="h-4 w-4" />
  </Link>
</nav>
          {nameFmt(item.name)}
        </h1>
        <div className="border-t border-zinc-300 my-4" />

        <div className="grid gap-6 md:grid-cols-[320px_1fr]">
          <div className="flex items-start justify-center">
            {item?.sprites?.default && (
              <img
                src={item.sprites.default}
                alt={item.name}
                className="h-40 w-40 object-contain"
              />
            )}
          </div>

          <Card className="border-2 border-yellow-300 bg-zinc-200 dark:bg-gray-700">
            <CardHeader>
            </CardHeader>
            <CardTitle className="flex items-center justify-center font-extrabold dark:text-white"> Item data </CardTitle>

            <CardContent className="space-y-4 text-sm text-zinc-700 dark:text-white">
              <div>
                <p className="font-medium text-zinc-500 dark:text-white">Descrição</p>
                <p className="mt-1 text-zinc-900 dark:text-white">{item.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-zinc-500 dark:text-white">Cost</p>
                  <p className="text-zinc-900 dark:text-white">{item.cost ?? "—"}</p>
                </div>

                <div>
                  <p className="font-medium text-zinc-500 dark:text-white">Categoria</p>
                  <p className="text-zinc-900 dark:text-white">
                    {item.category?.name ? nameFmt(item.category.name) : "—"}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="font-medium text-zinc-500 dark:text-white">Effect</p>
                  <p className="text-zinc-900 dark:text-white">{item.effect}</p>
                </div>              
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <nav className="mt-6 flex w-full items-center justify-center gap-4">
        <Link
          href="/items"
          className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Voltar
        </Link>
      </nav>
    </div>
  )
}