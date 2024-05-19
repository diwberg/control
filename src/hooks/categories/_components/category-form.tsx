
import { z } from "zod";
import { Loader2Icon, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertCategorySchema } from "@/db/schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const formSchema = insertCategorySchema.pick({
  name: true
})

type FormValues = z.input<typeof formSchema>

type Props = {
  id?: string
  defaultValue?: FormValues
  onSubmit: (values: FormValues) => void
  onDelete?: () => void
  disabled?: boolean
}

export function CategoryForm({
  id,
  defaultValue,
  onSubmit,
  onDelete,
  disabled,
} : Props) {


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue
  })

  function handleSubmit(values: FormValues) {
    onSubmit(values)
  }

  function handleDelete() {
    onDelete?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
        <FormField name="name" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>
              Categoria
            </FormLabel>
            <FormControl>
              <Input disabled={disabled} placeholder="e.g. Mercado, Viagem, Restaurante, etc" 
              {...field}
              />
            </FormControl>
          </FormItem>
        )} />
        <Button className="w-full" disabled={disabled}>
          {!!disabled ? <Loader2Icon className="animate-spin" /> : id ? "Salvar mudanças" : "Criar nova categoria"}
        </Button>
        {!!id && (
          <Button className="w-full text-red-700 border-red-700" type="button" disabled={disabled} variant="outline" onClick={handleDelete}>
            <TrashIcon className="size-4 mr-2" />
            Apagar a categoria
          </Button>
        )}

      </form>

    </Form>
  )
}