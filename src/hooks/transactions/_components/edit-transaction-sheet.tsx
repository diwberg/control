
import { z } from "zod";
import { LoaderIcon } from "lucide-react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useConfirm } from "@/hooks/use-confirm";
import { insertTransactionSchema } from "@/db/schema";

import { useOpenTransaction } from "../stores/use-open-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { TransactionForm } from "./transaction-form";
import { useGetCategories } from "@/hooks/categories/api/use-get-categories";
import { useCreateCategory } from "@/hooks/categories/api/use-create-category";
import { useGetAccounts } from "@/hooks/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/hooks/accounts/api/use-create-account";


const formSchema = insertTransactionSchema.omit({
  id: true
})

type FormValues = z.input<typeof formSchema>

export function EditTransactionSheet() {

  const { isOpen, onClose, id } = useOpenTransaction()

  const [ ConfirmDialog, confirm ] = useConfirm("Tem certeza?", "Está prestes a apagar essa transação")

  const transactionQuery = useGetTransaction(id)
  const editMutationTransaction = useEditTransaction(id)
  const deleteMutationTransaction = useDeleteTransaction(id)

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


  const isPending = editMutationTransaction.isPending || deleteMutationTransaction.isPending || transactionQuery.isLoading || categoryMutation.isPending || accountMutation.isPending

  const isLoading = transactionQuery.isLoading || categoryQuery.isLoading || accountQuery.isLoading

  function onSubmit(values: FormValues) {
    editMutationTransaction.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const defaultValues = transactionQuery.data ? {
    accountId: transactionQuery.data.accountId,
    categoryId: transactionQuery.data.categoryId,
    amount: transactionQuery.data.amount.toString(),
    date: transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
    payee: transactionQuery.data.payee,
    notes: transactionQuery.data.notes
    
  } : {
    accountId: "",
    categoryId: "",
    amount: "",
    date: new Date(),
    payee: "",
    notes: ""
  }

  const onDelete = async () => {
    const ok = await confirm()

    if(ok) {
      deleteMutationTransaction.mutate(undefined, {
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
            Alteração de Transação
          </SheetTitle>
          <SheetDescription>
            Modifique sua transação
          </SheetDescription>
        </SheetHeader>
        {isLoading ? 
        (<div className="absolute inset-0 flex items-center justify-center">
          <LoaderIcon className="size-4 text-muted-foreground animate-spin" />
        </div>) 
        :(
          <TransactionForm
          id={id}
          defaultValue={defaultValues}
          onSubmit={onSubmit}
          onDelete={onDelete}
          disabled={isPending}   
          categoryOptions={categoryOptions}
          onCreateCategory={onCreateCategory}
          accountOptions={accountOptions}
          onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>

    </Sheet>
    </>
  )
}