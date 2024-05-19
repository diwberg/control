
import { useOpenCategory } from "@/hooks/categories/stores/use-open-category"
import { useOpenTransaction } from "@/hooks/transactions/stores/use-open-transaction"
import { cn } from "@/lib/utils"
import { TriangleAlert } from "lucide-react"

type Props = {
  id: string
  category: string | null
  categoryId: string | null
}

export function CategoryColumn({ category, categoryId, id }: Props) {

  const { onOpen } = useOpenCategory()
  const { onOpen: onOpenTransaction } = useOpenTransaction()

  const onClick = () => {
    if (categoryId) {
      onOpen(categoryId)
    }else {
      onOpenTransaction(id)
    }
  } 

  return (
    <div className={cn("flex items-center cursor-pointer hover:underline", !category && "text-yellow-500")} onClick={onClick}>
      {!category && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {category || "Sem categoria"}
    </div>
  )
}