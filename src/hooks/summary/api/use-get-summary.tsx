import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/hono"
import { useSearchParams } from "next/navigation"
import { convertAmountFromMiliunits } from "@/lib/utils"

export const useGetSummary = () => {

  const params = useSearchParams()
  const from = params.get("from") || ""
  const to = params.get("to") || ""
  const accountId = params.get("accountId") || ""

  const query = useQuery({
    queryKey: ['summary', { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId,
        }
      })

      if(!response.ok) {
        throw new Error("Failed to fetch summary")
      }

      const { data } = await response.json()
      //console.log(data)
      return {

        // convert amounts
        ...data,
        incomesAmount: convertAmountFromMiliunits(data.incomesAmount),
        expensesAmount: convertAmountFromMiliunits(data.expensesAmount),
        remainingAmount: convertAmountFromMiliunits(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmountFromMiliunits(category.value)
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertAmountFromMiliunits(day.incomes),
          expenses: convertAmountFromMiliunits(day.expenses),
        }))
      }
    },
  })
  //console.log(query)
  return query
}