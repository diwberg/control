"use client"

import { z } from "zod";
import { Loader2Icon, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button";
import { insertTransactionSchema } from "@/db/schema";
import { Select } from "@/components/select";
import { DatePicker } from "@/components/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AmountInput } from "@/components/amount-input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { convertAmountToMiliunits } from "@/lib/utils";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional()
})

const apiSchema = insertTransactionSchema.omit({
  id: true
})

type FormValues = z.input<typeof formSchema>
type ApiFormValues = z.input<typeof apiSchema>

type Props = {
  id?: string
  defaultValue?: FormValues
  onSubmit: (values: ApiFormValues) => void
  onDelete?: () => void
  disabled?: boolean
  accountOptions: { label: string, value: string}[]
  categoryOptions: { label: string, value: string}[]
  onCreateAccount: (name: string) => void
  onCreateCategory: (name: string) => void
}

export function TransactionForm({
  id,
  defaultValue,
  onSubmit,
  onDelete,
  disabled,
  categoryOptions,
  accountOptions,
  onCreateAccount,
  onCreateCategory
} : Props) {


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue
  })

  function handleSubmit(values: FormValues) {

    const amountInMiliunits = convertAmountToMiliunits(parseFloat(values.amount))
    //console.log(amountInMiliunits)
    //console.log(values)
    onSubmit({
      ...values,
      amount: amountInMiliunits
    })
  }

  function handleDelete() {
    onDelete?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
        <FormField name="date" control={form.control} render={({field}) => (
          <FormItem>
            <FormControl>
              <DatePicker value={field.value} onChange={field.onChange} disabled={disabled} />
            </FormControl>
          </FormItem>
        )} />

        <FormField name="accountId" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>
              Conta
            </FormLabel>
            <FormControl>
              <Select 
              placeholder="Selecione uma conta" 
              options={accountOptions}
              onCreate={onCreateAccount}
              value={field.value}
              onChange={field.onChange}
              disabled={disabled}
              />
            </FormControl>
          </FormItem>
        )} />

        <FormField name="categoryId" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>
              Categoria
            </FormLabel>
            <FormControl>
              <Select 
              placeholder="Selecione uma categoria" 
              options={categoryOptions}
              onCreate={onCreateCategory}
              value={field.value}
              onChange={field.onChange}
              disabled={disabled}
              />
            </FormControl>
          </FormItem>
        )} />

        
        <FormField name="payee" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>
              Beneficiário
            </FormLabel>
            <FormControl>
              <Input {...field} disabled={disabled} value={field.value ?? ""} placeholder="Adicione o beneficiário"  />
            </FormControl>
          </FormItem>
        )} />
  
        <FormField name="amount" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>
              Valor
            </FormLabel>
            <FormControl>
              <AmountInput disabled={disabled} placeholder="0.00" {...field} />
            </FormControl>
          </FormItem>
        )} />



        
        <FormField name="notes" control={form.control} render={({field}) => (
          <FormItem>
            <FormLabel>
              Notas
            </FormLabel>
            <FormControl>
              <Textarea {...field} disabled={disabled} value={field.value ?? ""} placeholder="Notas opcionais"  />
            </FormControl>
          </FormItem>
        )} />


        <Button className="w-full" disabled={disabled}>
          {!!disabled ? <Loader2Icon className="animate-spin" /> : id ? "Salvar mudanças" : "Criar nova transação"}
        </Button>
        {!!id && (
          <Button className="w-full text-red-700 border-red-700" type="button" disabled={disabled} variant="outline" onClick={handleDelete}>
            <TrashIcon className="size-4 mr-2" />
            Apagar a transação
          </Button>
        )}

      </form>

    </Form>
  )
}