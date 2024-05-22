"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format, subDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { DateRange } from "react-day-picker"
import qs from "query-string"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>
  from: string | Date,
  to: string | Date,
  disabled?: boolean,
}

export function DatePickerWithRange({
  className,
  to,
  from,
  disabled,
}: Props) {

  const [date, setDate] = React.useState<DateRange | undefined>({
    to: new Date(to),
    from: new Date(from),
  })
  
  const pathname = usePathname()
  const router = useRouter()

  const pushToUrl = (dateRange: DateRange | undefined) => {
    
    const query = {
      from: format(dateRange?.from!, "yyyy-MM-dd"),
      to: format(dateRange?.to!, "yyyy-MM-dd"),
    }

    const url = qs.stringifyUrl({
      url: pathname || "/",
      query
    }, { skipEmptyString: true, skipNull: true })

    router.push(url)
  }

  function onReset() {
    setDate({
      to: new Date(),
      from: subDays(to || new Date(), 30)
    })
    pushToUrl(undefined)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-bold bg-white/20 hover:bg-white/30 border-none focus:ring-offset-0 focus:ring-transparent outline-none focus:bg-white/30 transition",
              !date && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd LLL, y", { locale: ptBR})} -{" "}
                  {format(date.to, "dd LLL, y", { locale: ptBR})}
                </>
              ) : (
                format(date.from, "dd LLL, y", { locale: ptBR})
              )
            ) : (
              <span>Escolha uma data</span>
            )}
            <ChevronDown className="ml-2 size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="lg:w-auto p-0" align="start">
          <Calendar
            disabled={disabled}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={ptBR}
          />
          <div className="p-4 w-full flex items-center gap-x-2">
            <PopoverClose asChild>
              <Button onClick={onReset} disabled={!date?.from || !date.to} className="w-full" variant="outline">
                Limpar
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button onClick={() => pushToUrl(date)} disabled={!date?.from || !date.to} className="w-full">
                Filtrar
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
