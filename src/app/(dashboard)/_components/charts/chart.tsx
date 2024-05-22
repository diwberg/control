import { useState } from "react"
import { AreaChart, BarChart, FileSearchIcon, LineChart, LoaderIcon } from "lucide-react"

import { AreaVariant } from "./area-variant"
import { BarVariant } from "./bar-variant"
import { LineVariant } from "./line-variant"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  data?: {
    date: string
    income: number
    expenses: number
  }[]
}

export function Chart({ data = [] }: Props) {

  const [ chartType, setChartType ] = useState("area")

  const onTypeChange = (type: string) => {
    // TODO: Add paywall
    setChartType(type)
  }


  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">
          Transações
        </CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Tipo de Gráfico" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Área</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center">
                <LineChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Linha</p>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center">
                <BarChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Barra</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearchIcon className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Não há dados.</p>
          </div>
        ): (
          <>
          {chartType === "area" && <AreaVariant data={data} />}
          {chartType === "line" && <LineVariant data={data} />}
          {chartType === "bar" && <BarVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  )
}


export function ChartLoading() {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 lg:w-[120px] w-full" />
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full flex items-center justify-center">
          <LoaderIcon className="size-6 text-muted animate-spin" />
        </div>
      </CardContent>
    </Card>
  )
}