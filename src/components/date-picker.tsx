"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { SelectSingleEventHandler } from "react-day-picker"
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  value?: Date
  onChange?: SelectSingleEventHandler
  disabled?: boolean
}

export function DatePicker({
  value,
  onChange,
  disabled
}: Props) {
  //const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={cn(
            "w-[280px] justify-center text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? format(value, "dd/MM/yyyy", { locale: ptBR}) : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  )
}
