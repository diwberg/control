import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"

export function CustomTooltip({ active, payload }: any) {
  if (!active) return null

  const date = payload[0].payload.date
  const income = payload[0].value
  const expenses = payload[1].value

  return (
    <div className="rounded-sm bg-white dark:bg-black shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground text-center">
        {format(date, "MMM dd, yyyy", { locale: ptBR})}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex flex-col items-center justify-between gap-x-4">
          
          <div className="flex items-center gap-x-2">
            <div className="size-2 bg-emerald-500 rounded-full">
              <p className="text-sm text-muted-foreground" />
            </div>
            <p className="text-sm text-right font-medium">
            {formatCurrency(income)}
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="size-2 bg-rose-500 rounded-full">
              <p className="text-sm text-muted-foreground" />
            </div>
            <p className="text-sm text-right font-medium">
            {formatCurrency(expenses > 0 ? expenses * -1 : 0)}
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}