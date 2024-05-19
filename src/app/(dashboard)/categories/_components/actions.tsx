"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDeleteCategory } from "@/hooks/categories/api/use-delete-category"
import { useOpenCategory } from "@/hooks/categories/stores/use-open-category"

import { useConfirm } from "@/hooks/use-confirm"
import { EditIcon, MoreHorizontal, TrashIcon } from "lucide-react"


type Props = {
  id: string
}
export function Actions({ id }: Props) {

  const [ConfirmDialog, confirm] = useConfirm("Tem certeza?", "Está prestes a deletar essa categoria")

  const deleteMutation = useDeleteCategory(id)

  const { onOpen } = useOpenCategory()

  const handleDelete = async () => {
    const ok = await confirm()

    if(ok) {
      deleteMutation.mutate()
    }
  }
  return (
    <>
    <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={() => onOpen(id)} >
            <EditIcon className="mr-2 size-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-700" disabled={deleteMutation.isPending} onClick={handleDelete} >
            <TrashIcon className="mr-2 size-4" />
            Apagar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}