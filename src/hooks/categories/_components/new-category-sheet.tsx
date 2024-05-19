
import { z } from "zod";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { insertCategorySchema } from "@/db/schema";
import { useNewCategory } from "@/hooks/categories/stores/use-new-category";
import { useCreateCategory } from "@/hooks/categories/api/use-create-category";


const formSchema = insertCategorySchema.pick({
  name: true
})

type FormValues = z.input<typeof formSchema>

export function NewCategorySheet() {

  const { isOpen, onClose } = useNewCategory()

  const mutation = useCreateCategory()

  function onSubmit(values: FormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }
  

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>
            Nova categoria
          </SheetTitle>
          <SheetDescription>
            Criar uma nova categoria
          </SheetDescription>
        </SheetHeader>

        <CategoryForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValue={{ name: ""}} />
      </SheetContent>

    </Sheet>
  )
}