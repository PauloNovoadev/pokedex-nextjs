import Link from "next/link"
import { Suspense } from "react"
import { getMoves } from "./_server/api"
import { MovesTable } from "./movetable"
import MovesTableSkeleton from "./loading"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

export const revalidate = 86400

const PAGE_SIZE = 30

type SP = Record<string, string | string[] | undefined>

async function MoveList({ page }: { page: number }) {
  const offset = (page - 1) * PAGE_SIZE

  const { moves, next, previous } = await getMoves(PAGE_SIZE, offset).catch(
    (err) => {
      console.error("[MoveList] Falha ao buscar moves:", err)
      throw new Error("Falha ao buscar moves.")
    }
  )

  return (
    <div className="space-y-4">
      <nav className="mb-2 flex w-full items-center justify-between gap-4">
        {previous ? (
          <Link
            href={`/moves?page=${page - 1}`}
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
            href={`/moves?page=${page + 1}`}
            className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Próxima
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </nav>

      <MovesTable moves={moves} />
    </div>
  )
}

export default async function MovesPage({
  searchParams,
}: {
  searchParams?: SP | Promise<SP>
}) {
  const sp = await Promise.resolve(searchParams ?? {})
  const pageParam = sp.page
  const pageStr = Array.isArray(pageParam) ? pageParam[0] : pageParam
  const page = Math.max(1, Number(pageStr ?? "1") || 1)

  return (
    <Suspense key={page} fallback={<MovesTableSkeleton />}>
      <MoveList page={page} />
    </Suspense>
  )
}