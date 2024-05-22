"use client"
import qs from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useGetAccounts } from "@/hooks/accounts/api/use-get-accounts"
import { useGetSummary } from "@/hooks/summary/api/use-get-summary"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function AccountFilterAntonio() {

  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()

  const accountId = params.get("accountId") || "all"
  const from = params.get("from") || ""
  const to = params.get("to") || ""

  function onChange(newValue: string){

   const query = {
    accountId: newValue,
    from,
    to
   } 

   if(newValue === "all") {
    query.accountId = ""
   }

   const url = qs.stringifyUrl({ url: pathname, query }, { skipNull: true, skipEmptyString: true })

   router.push(url)
  }

  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts()
  const { isLoading: isLoadingSummary } = useGetSummary()

  return (
    <Select value={accountId} onValueChange={onChange} disabled={isLoadingAccounts || isLoadingSummary}>
      <SelectTrigger 
      className="lg:w-auto w-full h-9 rounded-md px-3 font-bold bg-white/20 
      hover:bg-white/30 border-none 
      focus:ring-offset-0 focus:ring-transparent outline-none focus:bg-white/30 transition">
        <SelectValue placeholder="Selecione uma conta" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">
          Todas as contas
        </SelectItem>
        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}