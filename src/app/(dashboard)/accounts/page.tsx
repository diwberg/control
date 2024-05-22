"use client"
import { PlusIcon } from "lucide-react";

import { columns } from "./columns";
import { SkeletonTable } from "./_components/skeleton-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { useNewAccount } from "@/hooks/accounts/stores/use-new-account";
import { useGetAccounts } from "@/hooks/accounts/api/use-get-accounts";
import { useBulkDeleteAccounts } from "@/hooks/accounts/api/use-bulk-delete";

export default function AccountsPage() {

  const { onOpen } = useNewAccount()
  const deleteAccounts = useBulkDeleteAccounts()
  const accountsQuery = useGetAccounts()
  const accounts = accountsQuery.data || []

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending


  if(accountsQuery.isLoading) return <SkeletonTable />

  return (
    <div className="max-w-screen-2xl mx-auto w-ful pb-10 -mt-24">
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">
         Contas
        </CardTitle>
        <Button variant="secondary" className="text-xs flex items-center justify-center" onClick={onOpen}>
          <PlusIcon className="mr-2 size-4" />
          Criar Conta
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={accounts} 
        onDelete={(accounts) => {
          const ids = accounts.map((row) => row.original.id)
          deleteAccounts.mutate({ ids })
        }} 
        disabled={isDisabled} 
        isLoading={accountsQuery.isLoading} />
      </CardContent>
    </Card>
    </div>
  )
}