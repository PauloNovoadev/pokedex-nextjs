import Link from "next/link"
import { Suspense } from "react"
import { getItems } from "./_server/api"
import { ItemCard } from "./itemcard"
import GridSkeleton from "../loading"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

export const revalidate = 86400

const PAGE_SIZE = 30

type SP = Record<string, string | string[] | undefined>

async function ItemList({ page }: { page: number }) {
  const offset = (page - 1) * PAGE_SIZE

  const { items, next, previous } = await getItems(PAGE_SIZE, offset).catch(
    (err) => {
      console.error("[ItemList] Falha ao buscar items:", err)
      throw new Error("Falha ao buscar items.")
    }
  )

  return (
    <div>
      <nav className="mb-6 flex w-full items-center justify-between gap-4">
        {previous ? (
          <Link
            href={`/items?page=${page - 1}`}
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
            href={`/items?page=${page + 1}`}
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
        {items.map((item: any) => (
          <ItemCard
            key={item.name}
            name={item.name}
            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}

export default async function ItemsPage({
  searchParams,
}: {
  searchParams?: SP | Promise<SP>
}) {
  const sp = await Promise.resolve(searchParams ?? {})
  const pageParam = sp.page
  const pageStr = Array.isArray(pageParam) ? pageParam[0] : pageParam
  const page = Math.max(1, Number(pageStr ?? "1") || 1)

  return (
    <Suspense key={page} fallback={<GridSkeleton count={PAGE_SIZE} />}>
      <ItemList page={page} />
    </Suspense>
  )
}