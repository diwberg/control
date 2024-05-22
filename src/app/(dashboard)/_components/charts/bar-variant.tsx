import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts"

import { CustomTooltip } from "./custom-tooltip"

type Props = {
  data: {
    date: string
    income: number
    expenses: number
  }[]
}

export function BarVariant({ data }: Props) {

  return (
    <ResponsiveContainer width="100%" height={350} >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          axisLine={false} 
          tickLine={false} 
          dataKey="date" 
          tickFormatter={(value) => format(value, "dd MMM", { locale: ptBR})} 
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />

        <Bar 
          dataKey="income"
          fill="#10B981"
          className="drop-shadow-sm"
        />
        <Bar 
          dataKey="expenses"
          fill="#EF4444"
          className="drop-shadow-sm"
        />

      </BarChart>
    </ResponsiveContainer>
  )
}