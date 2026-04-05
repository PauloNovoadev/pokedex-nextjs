import Link from "next/link"
import { ReactNode } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { cn } from "@/lib/utils"

type ClickableCardProps = {
  href: string
  image: string
  imageAlt: string
  title: string
  description?: string
  className?: string
  imageClassName?: string
  imageSizeClassName?: string
  contentHeightClassName?: string
  headerClassName?: string
  titleClassName?: string
  children?: ReactNode
}

export function ClickableCard({
  href,
  image,
  imageAlt,
  title,
  description,
  className,
  imageClassName,
  imageSizeClassName,
  contentHeightClassName,
  headerClassName,
  titleClassName,
  children,
}: ClickableCardProps) {
  return (
    <Link href={href} className="group block w-full">
      <Card
        className={cn(
          "overflow-hidden rounded-2xl bg-white dark:bg-gray-700 dark:text-white pt-0 transition duration-200 hover:-translate-y-1 hover:shadow-lg",
          className
        )}
      >
        <div
          className={cn(
            "relative flex h-40 items-center justify-center overflow-hidden px-4 pt-4",
            contentHeightClassName,
            imageClassName
          )}
        >
          {children}

          <img
            src={image}
            alt={imageAlt}
            className={cn(
              "relative z-10 max-h-[120px] max-w-[120px] object-contain transition-transform duration-200 group-hover:scale-105",
              imageSizeClassName
            )}
          />
        </div>

        <CardHeader className={cn("gap-1 bg-white dark:bg-gray-700 px-4 py-3 text-center", headerClassName)}>
          <CardTitle className={cn("font-semibold text-zinc-800 dark:text-white", titleClassName)}>
            {title}
          </CardTitle>

          {description ? <CardDescription>{description}</CardDescription> : null}
        </CardHeader>
      </Card>
    </Link>
  )
}