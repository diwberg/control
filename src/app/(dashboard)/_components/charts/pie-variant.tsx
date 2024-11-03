import { CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { formatPercent } from "@/lib/utils"
import { CategoryTooltip } from "./category-tooltip"

type Props = {
  data: {
    name: string
    value: number
  }[]
}

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"]

export function PieVariant({ data }: Props) {

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart data={data}>
        <Legend 
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: any) => {

            return (
              <ul className="flex flex-col space-y-2">
                { payload((entry: any, index: number) => (
                  <li key={`item-${index}`} className="flex items-center space-x-2">
                    <span className="size-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <div className="space-x-1">
                      <span className="text-sm text-muted-foreground">{entry.value}</span>
                      <span className="text-sm">{formatPercent(entry.payload.percent * 100, { addPrefix: false})}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )
          }}

        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CategoryTooltip />} />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
        >
          {data.map((_entry, index) => (
            <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}