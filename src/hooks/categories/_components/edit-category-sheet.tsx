
import { z } from "zod";
import { LoaderIcon } from "lucide-react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { insertCategorySchema } from "@/db/schema";
import { useConfirm } from "@/hooks/use-confirm";
import { useOpenCategory } from "@/hooks/categories/stores/use-open-category";
import { useGetCategory } from "@/hooks/categories/api/use-get-category";
import { useEditCategory } from "@/hooks/categories/api/use-edit-category";
import { useDeleteCategory } from "@/hooks/categories/api/use-delete-category";


const formSchema = insertCategorySchema.pick({
  name: true
})

type FormValues = z.input<typeof formSchema>

export function EditCategorySheet() {

  const { isOpen, onClose, id } = useOpenCategory()

  const [ ConfirmDialog, confirm ] = useConfirm("Tem certeza?", "Está prestes a apagar essa categoria")

  const categoryQuery = useGetCategory(id)

  const editMutation = useEditCategory(id)
  const deleteMutation = useDeleteCategory(id)

  const isPending = editMutation.isPending || deleteMutation.isPending

  const isLoading = categoryQuery.isLoading || editMutation.isPending || deleteMutation.isPending

  function onSubmit(values: FormValues) {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const defaultValues = categoryQuery.data ? {
    name: categoryQuery.data.name
  } : {
    name: ""
  }

  const onDelete = async () => {
    const ok = await confirm()

    if(ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose()
        }
      })
    }
  }
  

  return (
    <>
    <ConfirmDialog />
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>
            Alteração de categoria
          </SheetTitle>
          <SheetDescription>
            Modifique sua categoria
          </SheetDescription>
        </SheetHeader>
        {isLoading ? 
        (<div className="absolute inset-0 flex items-center justify-center">
          <LoaderIcon className="size-4 text-muted-foreground animate-spin" />
        </div>) 
        :(
          <CategoryForm id={id} onSubmit={onSubmit} disabled={isPending} defaultValue={defaultValues} onDelete={onDelete} />
        )}
      </SheetContent>

    </Sheet>
    </>
  )
}