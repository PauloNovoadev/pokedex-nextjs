import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function MovesTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-300 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-zinc-200">
            <TableHead>Nome</TableHead>
            <TableHead className="text-center">Tipo</TableHead>
            <TableHead className="text-center">Cat.</TableHead>
            <TableHead className="text-center">Poder</TableHead>
            <TableHead className="text-center">Acc.</TableHead>
            <TableHead className="text-center">PP</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-40 bg-zinc-300" />
              </TableCell>

              <TableCell className="text-center">
                <Skeleton className="mx-auto h-6 w-20 rounded-sm bg-zinc-300" />
              </TableCell>

              <TableCell className="text-center">
                <Skeleton className="mx-auto h-6 w-6 rounded-full bg-zinc-300" />
              </TableCell>

              <TableCell className="text-center">
                <Skeleton className="mx-auto h-4 w-10 bg-zinc-300" />
              </TableCell>

              <TableCell className="text-center">
                <Skeleton className="mx-auto h-4 w-10 bg-zinc-300" />
              </TableCell>

              <TableCell className="text-center">
                <Skeleton className="mx-auto h-4 w-10 bg-zinc-300" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}