import CurrencyInput from "react-currency-input-field"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, MinusCircleIcon, PlusCircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  value: string
  onChange: (value: string | undefined) => void
  placeholder?: string
  disabled?: boolean
}

export function AmountInput({
  value,
  onChange,
  placeholder,
  disabled
}: Props) {

  const parsedValue = parseFloat(value)
  const isIncome = parsedValue > 0
  const isExpense = parsedValue < 0

  function onReverseValue(){
    if(!value) return

    const newValue = parseFloat(value) * -1
    onChange(newValue.toString())
  }

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button type="button" onClick={onReverseValue} 
            className={cn("bg-slate-600 opacity-80 hover:opacity-100 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition",
              isIncome && "bg-emerald-600",
              isExpense && "bg-red-600",
            )}>
              {!parsedValue && <InfoIcon className="size-3 text-white" />}
              {isIncome && <PlusCircleIcon className="size-3 text-white" />}
              {isExpense && <MinusCircleIcon className="size-3 text-white" />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            Use [+] para ganhos e [-] para despesas
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput 
      prefix="€" 
      decimalsLimit={2} 
      decimalScale={2} 
      onValueChange={onChange} 
      placeholder={placeholder} 
      value={value} 
      disabled={disabled} 
      className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
      />

      <p className="text-xs text-muted-foreground mt-2">
        {isIncome && "Essa transação será de ganho"}
        {isExpense && "Essa transação será de despesa"}
      </p>
    </div>
  )
}