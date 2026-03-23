import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto mb-6 flex max-w-5xl justify-center">
        <Skeleton className="h-10 w-28 rounded-md bg-zinc-300" />
      </div>
      <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-300 bg-white/95 p-6 shadow-xl">
        <div className="mb-8 flex justify-center">
          <Skeleton className="h-10 w-64 bg-zinc-300" />
        </div>

        <div className="grid gap-6 md:grid-cols-[320px_1fr]">
          <div className="flex items-start justify-center">
            <Skeleton className="h-56 w-56 rounded-xl bg-zinc-300" />
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <Skeleton className="mb-6 h-7 w-40 bg-zinc-300" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Skeleton className="mb-2 h-4 w-16 bg-zinc-200" />
                <Skeleton className="h-5 w-20 bg-zinc-300" />
              </div>

              <div>
                <Skeleton className="mb-2 h-4 w-16 bg-zinc-200" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-sm bg-zinc-300" />
                  <Skeleton className="h-6 w-20 rounded-sm bg-zinc-300" />
                </div>
              </div>

              <div>
                <Skeleton className="mb-2 h-4 w-16 bg-zinc-200" />
                <Skeleton className="h-5 w-16 bg-zinc-300" />
              </div>

              <div>
                <Skeleton className="mb-2 h-4 w-16 bg-zinc-200" />
                <Skeleton className="h-5 w-16 bg-zinc-300" />
              </div>
            </div>

            <div className="mt-6">
              <Skeleton className="mb-2 h-4 w-20 bg-zinc-200" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24 rounded-md bg-zinc-300" />
                <Skeleton className="h-8 w-24 rounded-md bg-zinc-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-4 flex justify-center">
            <Skeleton className="h-8 w-56 bg-zinc-300" />
          </div>

          <div className="flex items-center justify-center gap-6">
            <Skeleton className="h-28 w-28 rounded-xl bg-zinc-300" />
            <Skeleton className="h-6 w-6 rounded bg-zinc-200" />
            <Skeleton className="h-28 w-28 rounded-xl bg-zinc-300" />
            <Skeleton className="h-6 w-6 rounded bg-zinc-200" />
            <Skeleton className="h-28 w-28 rounded-xl bg-zinc-300" />
          </div>
        </div>

        {/* stats */}
        <div className="mt-10">
          <Skeleton className="mb-4 h-8 w-40 bg-zinc-300" />

          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <div className="mb-2 flex justify-between">
                  <Skeleton className="h-4 w-24 bg-zinc-200" />
                  <Skeleton className="h-4 w-10 bg-zinc-200" />
                </div>
                <Skeleton className="h-3 w-full rounded-full bg-zinc-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}