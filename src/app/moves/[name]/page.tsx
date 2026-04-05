import Link from "next/link";
import { nameFmt } from "@/utilidades/namefmt";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { Card, CardContent } from "@mui/material";
import { pokemonTypeTheme } from "@/utilidades/pokemontypecolor";

const BASE_URL = "https://pokeapi.co/api/v2";

async function getMoveDetails(name: string) {
  const r = await fetch(
    `${BASE_URL}/move/${encodeURIComponent(name)}`,
    { cache: "no-store" }
  );

  if (r.status === 404) {
  notFound();
}

  if (!r.ok) {
    throw new Error(`Erro ao carregar move: ${name}`);
  }

  return await r.json();
}

export default async function MoveDetailsPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const move = await getMoveDetails(name);

  const effectEntry = move.effect_entries?.find(
    (entry: any) => entry.language?.name === "en");
  
  const flavor_text_entries = move.flavor_text_entries?.find(
    (entry: any) => entry.language?.name === "en"
  )
  const fallbackTheme = {
  badge: "bg-zinc-500 text-white",
}

function getDamageClassIcon(damageClass?: string) {
  switch (damageClass) {
    case "physical":
      return { src: "/move-physical.png", alt: "Físico" }
    case "special":
      return { src: "/move-special.png", alt: "Especial" }
    case "status":
      return { src: "/move-status.png", alt: "Status" }
    default:
      return null
  }
}

  return (
    <div className="min-h-screen px- py-8">
    <div className="mx-auto w-full max-w-6xl rounded-lg border-4 border-blue-700 bg-white dark:bg-gray-700 p-6">
      <nav className="mt-4 flex w-full items-center justify-between">
          {move.id > 1 && (
       <Link 
    href={`/moves/${move.id - 1}`}
    className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-gradient-to-r from-green-800 to-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-green-900 hover:to-emerald-700"
  >
    <ArrowLeftIcon className="h-4 w-4" />
    Anterior
  </Link>)}
  <Link 
    href={`/moves/${move.id + 1}`} 
    className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-gradient-to-r from-green-800 to-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-green-900 hover:to-emerald-700"
  >
    Próximo
    <ArrowRightIcon className="h-4 w-4" />
  </Link>
</nav>
      <div>
        <p className="flex items-center justify-center font-bold space-y-6 text-4xl text-zinc-900 dark:text-white">{nameFmt(move.name)}</p>
        <div className="border-t border-zinc-300 my-4" />
        <div className="text-zinc-900 dark:text-white">
        <p>{flavor_text_entries?.flavor_text ?? "Sem descrição disponível."}</p>
  </div>
      </div>
      <div className="mt-4">
        <Card className="w-full border-4 border-yellow-500 dark:bg-gray-700">    
      <CardContent className="space-y-6 text-sm text-zinc-700">
  <CardTitle className="font-bold text-zinc-700 dark:text-white flex items-center justify-center">Informações</CardTitle>
  <div className="border-t border-zinc-300 my-4" />
  <div className="grid gap-8 md:grid-cols-[1fr_320px]">
    <div className="space-y-6">
      
      <div>
        <p className="font-bold text-zinc-500 dark:text-white">Efeito</p>
        <p className="mt-2 font-bold text-zinc-700 dark:text-white">
          {effectEntry?.effect ?? "Sem descrição disponível."}
        </p>
        <div className="border-t border-zinc-200 pt-4">
        <p className="font-bold text-zinc-500 dark:text-white">Target</p>
        <p className="mt-2 font-bold text-zinc-700 dark:text-white">{nameFmt(move.target?.name ?? "—")}</p>
      </div>
        <div className="border-t border-zinc-300 my-4" />
      </div>
    </div>
    <div className="rounded-lg border-2 border-zinc-500 bg-gradient-to-r from-yellow-50 to-blue-50 dark:bg-gradient-to-r dark:from-sky-950 dark:to-yellow-950 p-4">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <p className="font-medium text-zinc-500 dark:text-white">Tipo</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {move.type?.name ? (
              <span
                className={`rounded-sm px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                  (pokemonTypeTheme[move.type.name] ?? fallbackTheme).badge
                }`}
              >
                {nameFmt(move.type.name)}
              </span>
            ) : (
              <span className="text-zinc-500">—</span>
            )}
          </div>
        </div>
        <div>
          <p className="font-medium text-zinc-500 dark:text-white">Categoria</p>
          <div className="mt-1 flex items-center gap-2">
            {move.damage_class?.name ? (() => {
              const icon = getDamageClassIcon(move.damage_class.name)

              return icon ? (
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <span className="text-zinc-500 dark:text-white">—</span>
              )
            })() : (
              <span className="text-zinc-500 dark:text-white">—</span>
            )}
          </div>
        </div>

        <div>
          <p className="font-medium text-zinc-500 dark:text-white">Power</p>
          <p className="font-bold text-zinc-800 dark:text-white">{move.power ?? "—"}</p>
        </div>

        <div>
          <p className="font-medium text-zinc-500 dark:text-white">Accuracy</p>
          <p className="font-bold text-zinc-800 dark:text-white">{move.accuracy ?? "—"}</p>
        </div>

        <div>
          <p className="font-medium text-zinc-500 dark:text-white">PP</p>
          <p className="font-bold text-zinc-800 dark:text-white">{move.pp ?? "—"}</p>
        </div>

        <div>
          <p className="font-medium text-zinc-500 dark:text-white">Priority</p>
          <p className="font-bold text-zinc-800 dark:text-white">{move.priority ?? "—"}</p>
        </div>
      </div>
    </div>
  </div>
</CardContent>
      </Card>
      </div>
</div>
<nav className="mt-6 flex w-full items-center justify-center gap-4">
        <Link
          href="/moves"
          className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Voltar
        </Link>
      </nav>
</div>
)}