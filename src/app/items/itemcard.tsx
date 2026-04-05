import { ClickableCard } from "@/components/cards/clickcard";
import { nameFmt } from "@/utilidades/namefmt";

type ItemCardProps = {
    name : string
    image : string
}

export function ItemCard({
    name,
    image,
}: ItemCardProps){
    return (
      <ClickableCard
      href={`/items/${name}`}
      image={image}
      imageAlt={name}
      title={nameFmt(name)}
      className="border-4 border-blue-300 hover:border-blue-400"
      imageClassName="bg-gradient-to-r from-blue-50 to-yellow-50 dark:bg-gradient-to-r dark:from-sky-950 dark:to-yellow-950"
      imageSizeClassName="h-20 w-20"
      contentHeightClassName="h-32"
      headerClassName="bg-white px-4 py-4"
      titleClassName="text-base font-semibold text-slate-800"
    />
  )
}