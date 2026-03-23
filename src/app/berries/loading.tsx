import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function GridSkeleton({ count = 30 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
        >
          <div className="relative flex h-36 items-center justify-center bg-zinc-100">
            <Skeleton className="h-20 w-20 rounded-md bg-zinc-300" />
          </div>

          <div className="flex flex-col items-center gap-2 px-4 py-4">
            <Skeleton className="h-4 w-2/3 bg-zinc-300" />

            <div className="flex gap-2">
              <Skeleton className="h-5 w-14 rounded-full bg-zinc-300" />
              <Skeleton className="h-5 w-14 rounded-full bg-zinc-300" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}