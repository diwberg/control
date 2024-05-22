"use client"
import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { columns } from "./columns";
import { SkeletonTable } from "./_components/skeleton-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { useNewTransaction } from "@/hooks/transactions/stores/use-new-transaction";
import { useGetTransactions } from "@/hooks/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/hooks/transactions/api/use-bulk-delete";
import { ImportButton } from "./_components/import-button";
import { ImportCard } from "./_components/import-card";
import { transactions as transactionsSchema } from "@/db/schema";
import { useSelectAccount } from "@/hooks/accounts/_components/use-select-account";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "@/hooks/transactions/api/use-bulk-create-transactions";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT"
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {}
}



export default function TransactionsPage() {

  const [ variant, setVariants ] = useState<VARIANTS>(VARIANTS.LIST)
  const [ importResults, setImportResults ] = useState(INITIAL_IMPORT_RESULTS)
  const [AccountDialog, confirm] = useSelectAccount()
  const { onOpen } = useNewTransaction()
  const transactionsQuery = useGetTransactions()
  const deleteTransactions = useBulkDeleteTransactions()
  const createTransactions = useBulkCreateTransactions()
  const transactions = transactionsQuery.data || []
  const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending
  
  function onUpload(results: typeof INITIAL_IMPORT_RESULTS) {
    //console.log(results)
    setImportResults(results)
    setVariants(VARIANTS.IMPORT)
  }
  
  function onCancelImport() {
    setImportResults(INITIAL_IMPORT_RESULTS)
    setVariants(VARIANTS.LIST)
  }
  
  if(transactionsQuery.isLoading) return <SkeletonTable />
  
  //console.log(transactions)
  
  async function onSubmitImport(values: typeof transactionsSchema.$inferInsert[]) {
    const accountId = await confirm()

    if(!accountId) {
      return toast.error("Selecione uma conta para continuar")
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string
    }))

    const dataLimit = data.filter((value) => value.amount < 1000000)

    //console.log(dataLimit)


    createTransactions.mutate(dataLimit, {
      onSuccess: () => {
        onCancelImport()
      }
    })


  }

  if(variant === VARIANTS.IMPORT) {

    return (
      <>
        <AccountDialog />
        <ImportCard onCancel={onCancelImport} data={importResults.data} onSubmit={onSubmitImport} />
      </>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-ful pb-10 -mt-24">
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">
         Historico de Transações
        </CardTitle>
        <div className="flex items-center gap-x-2">
          <Button variant="secondary" className="text-xs flex items-center justify-center" onClick={onOpen}>
            <PlusIcon className="mr-2 size-4" />
            Criar Transação
          </Button>
          <ImportButton onUpload={onUpload} />
        </div>
      </CardHeader>

      <CardContent>
        <DataTable columns={columns} data={transactions} 
        onDelete={(transactions) => {
          const ids = transactions.map((row) => row.original.id)
          deleteTransactions.mutate({ ids })
        }} 
        disabled={isDisabled} 
        isLoading={transactionsQuery.isLoading} />
      </CardContent>

    </Card>
    </div>
  )
}