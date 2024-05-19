
import { z } from "zod";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNewAccount } from "@/hooks/accounts/stores/use-new-account";
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { useCreateAccount } from "@/hooks/accounts/api/use-create-account";


const formSchema = insertAccountSchema.pick({
  name: true
})

type FormValues = z.input<typeof formSchema>

export function NewAccountSheet() {

  const { isOpen, onClose } = useNewAccount()

  const mutation = useCreateAccount()

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
            Nova conta
          </SheetTitle>
          <SheetDescription>
            Criar uma nova conta
          </SheetDescription>
        </SheetHeader>

        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValue={{ name: ""}} />
      </SheetContent>

    </Sheet>
  )
}