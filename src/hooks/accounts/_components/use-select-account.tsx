import { useCreateAccount } from "@/hooks/accounts/api/use-create-account";
import { useGetAccounts } from "@/hooks/accounts/api/use-get-accounts";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select } from "@/components/select";

export function useSelectAccount(): [() => JSX.Element, () => Promise<unknown>] {

  const accountQuery = useGetAccounts()
  const accountMutation = useCreateAccount()
  const onCreateAccount = (name: string) => accountMutation.mutate({
    name
  })
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }))
  
  const [ promise, setPromise ] = useState<{ resolve: (value: string | undefined) => void} | null>(null)

  const selectValue = useRef<string>()

  const confirm = () => new Promise(( resolve, reject ) => {
    setPromise( { resolve })
  })

  const handleClose = () => {
    setPromise(null)
  }

  const handleConfirm = () => {
    promise?.resolve(selectValue.current)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(undefined)
    handleClose()
  }

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecione uma conta</DialogTitle>
          <DialogDescription>Selecione uma conta para associar as transições</DialogDescription>
        </DialogHeader>
        <Select 
          placeholder="Selecione uma conta"
          options={accountOptions}
          onCreate={onCreateAccount}
          onChange={(value) => selectValue.current = value}
          disabled={accountQuery.isLoading || accountMutation.isPending}
        />
        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={handleCancel}>
            cancelar
          </Button>
          <Button onClick={handleConfirm}>
            confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return [ConfirmationDialog, confirm]
}