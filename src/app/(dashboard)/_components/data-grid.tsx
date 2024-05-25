"use client"
import { useSearchParams } from "next/navigation";
import { MoveDownLeftIcon, MoveUpRight, PiggyBank } from "lucide-react";

import { useGetSummary } from "@/hooks/summary/api/use-get-summary";
import { cn, formatDateRange } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BentoGrid, BentoGridItem } from "@/components/ui/aceternity/bento-grid";

export function DataGrid(){

  const params = useSearchParams()
  const to = params.get("to") || undefined
  const from = params.get("from") || undefined

  const dateRangeLabel = formatDateRange({ to, from })

  const { data, isLoading } = useGetSummary()

  function isPositive(value: number | undefined): boolean {
    if((value || 0) > 0) {
      return true
    }
    return false
  }

  return (
    <div className="space-y-1">
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
          <DataCardLoading />
          <DataCardLoading />
          <DataCardLoading />
        </div>
      ) : (
      <BentoGrid >
      <BentoGridItem
      className={cn(isPositive(data?.remainingAmount) ? "text-emerald-500" : "text-red-500")}
      title="Saldo" 
      dateRange={dateRangeLabel}
      percent={data?.remainingChange} 
      value={data?.remainingAmount} 
      icon={<PiggyBank className={cn("size-7 lg:size-10",isPositive(data?.remainingAmount) ? "fill-emerald-500" : "fill-red-500")} />} 
      />
      <BentoGridItem 
      title="Despesas" 
      dateRange={dateRangeLabel}
      percent={data?.expensesChange} 
      value={data?.expensesAmount} 
      icon={<MoveDownLeftIcon className="size-10" />} 
      className={cn("text-red-500")}
      />
        <BentoGridItem 
        title="Ganhos" 
        dateRange={dateRangeLabel}
        percent={data?.incomesChange} 
        value={data?.incomesAmount} 
        icon={<MoveUpRight className="size-7 lg:size-10" />} 
        className={cn("text-emerald-500")}
        />
      </BentoGrid>
      )}
    </div>
  )
}

export function DataCardLoading() {
  return (
    <Card className="border-none drop-shadow-sm h-[192px]">
      <CardHeader className="flex flex-row items-center gap-x-4">
      <Skeleton className="size-12" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <Skeleton className="shrink-0 h-10 w-40 mb-2" />
        <Skeleton className="shrink-0 h-4 w-36" />
      </CardContent>
    </Card>
  )
}