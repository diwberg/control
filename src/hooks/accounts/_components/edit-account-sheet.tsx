
import { z } from "zod";
import { LoaderIcon } from "lucide-react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { useEditAccount } from "@/hooks/accounts/api/use-edit-account";
import { useOpenAccount } from "@/hooks/accounts/stores/use-open-account";
import { useGetAccount } from "@/hooks/accounts/api/use-get-account";
import { useDeleteAccount } from "@/hooks/accounts/api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";


const formSchema = insertAccountSchema.pick({
  name: true
})

type FormValues = z.input<typeof formSchema>

export function EditAccountSheet() {

  const { isOpen, onClose, id } = useOpenAccount()

  const [ ConfirmDialog, confirm ] = useConfirm("Tem certeza?", "Está prestes a apagar essa conta")

  const accountQuery = useGetAccount(id)

  const editMutation = useEditAccount(id)
  const deleteMutation = useDeleteAccount(id)

  const isPending = editMutation.isPending || deleteMutation.isPending

  const isLoading = accountQuery.isLoading || editMutation.isPending || deleteMutation.isPending

  function onSubmit(values: FormValues) {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const defaultValues = accountQuery.data ? {
    name: accountQuery.data.name
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
            Alteração de conta
          </SheetTitle>
          <SheetDescription>
            Modifique sua conta
          </SheetDescription>
        </SheetHeader>
        {isLoading ? 
        (<div className="absolute inset-0 flex items-center justify-center">
          <LoaderIcon className="size-4 text-muted-foreground animate-spin" />
        </div>) 
        :(
          <AccountForm id={id} onSubmit={onSubmit} disabled={isPending} defaultValue={defaultValues} onDelete={onDelete} />
        )}
      </SheetContent>

    </Sheet>
    </>
  )
}