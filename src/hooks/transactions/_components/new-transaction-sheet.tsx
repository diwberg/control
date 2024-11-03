
import { z } from "zod";
import { LoaderIcon } from "lucide-react";

import { insertTransactionSchema } from "@/db/schema";
import { useNewTransaction } from "@/hooks/transactions/stores/use-new-transaction";
import { useCreateTransaction } from "@/hooks/transactions/api/use-create-transaction";
import { useCreateCategory } from "@/hooks/categories/api/use-create-category";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useGetCategories } from "@/hooks/categories/api/use-get-categories";
import { useGetAccounts } from "@/hooks/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/hooks/accounts/api/use-create-account";
import { TransactionForm } from "@/hooks/transactions/_components/transaction-form";


const formSchema = insertTransactionSchema.omit({
  id: true
})

type FormValues = z.input<typeof formSchema>

export function NewTransactionSheet() {

  const { isOpen, onClose } = useNewTransaction()

  const mutation = useCreateTransaction()

  const categoryQuery = useGetCategories()
  const categoryMutation = useCreateCategory()
  const onCreateCategory = (name: string) => categoryMutation.mutate({
    name
  })
  
  const categoryOptions = (categoryQuery.data ?? []).map(( category ) => ({
    label: category.name,
    value: category.id
  }))

  const accountQuery = useGetAccounts()
  const accountMutation = useCreateAccount()
  const onCreateAccount = (name: string) => accountMutation.mutate({
    name
  })

  const accountOptions = (accountQuery.data ?? []).map(( account ) => ({
    label: account.name,
    value: account.id
  }))

  const isPending = mutation.isPending || categoryMutation.isPending || accountMutation.isPending

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading

  function onSubmit(values: FormValues) {
    console.log(values)
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
            Nova transação
          </SheetTitle>
          <SheetDescription>
            Criar uma transação
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 items-center justify-center">
            <LoaderIcon className="size-4 text-muted-foreground animate-ping" />
          </div>
        ) : (
          <TransactionForm 
          onSubmit={onSubmit} 
          disabled={isPending}   
          categoryOptions={categoryOptions}
          onCreateCategory={onCreateCategory}
          accountOptions={accountOptions}
          onCreateAccount={onCreateAccount}
  
          />
        )}
      </SheetContent>

    </Sheet>
  )
}