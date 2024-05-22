"use client"
import qs from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useGetAccounts } from "@/hooks/accounts/api/use-get-accounts"
import { useGetSummary } from "@/hooks/summary/api/use-get-summary"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-picker-with-range"
import { subDays } from "date-fns"

export function DateFilter() {
  
  const params = useSearchParams()

  const to = params.get("to") || new Date()
  const from = params.get("from") || subDays(new Date() || to, 30)

  const { isLoading: isLoadingSummary } = useGetSummary()

  return (
    <div>
      <DatePickerWithRange from={from} to={to} disabled={isLoadingSummary} />
    </div>
  )
}