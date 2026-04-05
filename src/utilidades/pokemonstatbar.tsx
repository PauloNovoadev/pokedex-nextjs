"use client"

import { Progress } from "@/components/ui/progress"

type StatBarProps = {
  label: string
  value: number
  max?: number
}

function getColor(value: number) {
  if (value < 40) return "bg-red-500"
  if (value < 60) return "bg-orange-500"
  if (value < 80) return "bg-yellow-500"
  if (value < 100) return "bg-green-500"
  return "bg-teal-500"
}

export function StatBar({ label, value, max = 150 }: StatBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm font-bold text-zinc-800 dark:text-white">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <Progress
        value={percentage}
        className="h-2"
        indicatorClassName={getColor(value)}
      />
    </div>
  )
}