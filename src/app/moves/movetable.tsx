import Link from "next/link"
import { nameFmt } from "@/utilidades/namefmt"
import { pokemonTypeTheme } from "@/utilidades/pokemontypecolor"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Move = {
  name: string
  type: string
  damageClass: string
  power: number | null
  accuracy: number | null
  pp: number | null
}

type MovesTableProps = {
  moves: Move[]
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

const fallbackTheme = {
  badge: "bg-zinc-400 text-white border border-zinc-500",
}

const baseTypeBadgeClass =
  "inline-flex h-7 min-w-[72px] items-center justify-center rounded-sm px-2 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm"

export function MovesTable({ moves }: MovesTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border border-zinc-300 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-zinc-300 bg-[#d9d7cf] hover:bg-[#d9d7cf] dark:bg-gray-700">
            <TableHead className="h-10 px-4 text-left text-sm font-bold text-zinc-800 dark:text-white">
              Nome
            </TableHead>
            <TableHead className="h-10 px-4 text-center text-sm font-bold text-zinc-800 dark:text-white">
              Tipo
            </TableHead>
            <TableHead className="h-10 px-4 text-center text-sm font-bold text-zinc-800 dark:text-white">
              Cat.
            </TableHead>
            <TableHead className="h-10 px-4 text-center text-sm font-bold text-zinc-800 dark:text-white">
              Poder
            </TableHead>
            <TableHead className="h-10 px-4 text-center text-sm font-bold text-zinc-800 dark:text-white">
              Acc.
            </TableHead>
            <TableHead className="h-10 px-4 text-center text-sm font-bold text-zinc-800 dark:text-white">
              PP
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {moves.map((move) => {
            const safeType = move.type?.trim().toLowerCase() ?? ""
            const theme = pokemonTypeTheme[safeType] ?? fallbackTheme
            const damageIcon = getDamageClassIcon(move.damageClass)

            return (
              <TableRow
                key={move.name}
                className="border-b border-zinc-100 bg-white hover:bg-yellow-100 dark:bg-sky-900 dark:hover:bg-gray-600"
              >
                <TableCell className="px-4 py-2 text-sm font-semibold text-blue-900 dark:text-white">
                  <Link
                    href={`/moves/${move.name}`}
                    className="hover:text-red-700 hover:underline"
                  >
                    {nameFmt(move.name)}
                  </Link>
                </TableCell>

                <TableCell className="px-4 py-2 text-center">
                  <span className={`${baseTypeBadgeClass} ${theme.badge}`}>
                    {nameFmt(safeType).toUpperCase()}
                  </span>
                </TableCell>

                <TableCell className="px-4 py-2 text-center">
                  {damageIcon ? (
                    <img
                      src={damageIcon.src}
                      alt={damageIcon.alt}
                      className="mx-auto h-7 w-7 object-contain"
                    />
                  ) : (
                    <span className="text-zinc-500">—</span>
                  )}
                </TableCell>

                <TableCell className="px-4 py-2 text-center text-sm text-zinc-700 font-extrabold dark:text-white">
                  {move.power ?? "—"}
                </TableCell>

                <TableCell className="px-4 py-2 text-center text-sm text-zinc-700 font-extrabold dark:text-white">
                  {move.accuracy ?? "—"}
                </TableCell>

                <TableCell className="px-4 py-2 text-center text-sm text-zinc-700 font-extrabold dark:text-white">
                  {move.pp ?? "—"}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}