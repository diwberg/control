import { CartesianGrid, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts"

import { CategoryTooltip } from "./category-tooltip"

type Props = {
  data: {
    name: string
    value: number
  }[]
}

export function RadarVariant({ data }: Props) {

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart
      cx="50%"
      cy="50%"
      outerRadius="60%"
      data={data}>
        <PolarGrid />
        <PolarAngleAxis style={{ fontSize: "12px"}} dataKey="name" />
        <PolarRadiusAxis style={{ fontSize: "12px"}} />
        <Radar dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CategoryTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  )
}