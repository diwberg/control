import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowBigRightDashIcon, X } from "lucide-react"
import { useState } from "react"
import { ImportTable } from "./import-table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { convertAmountToMiliunits, parseDate } from "@/lib/utils"

type Props = {
  data: string[][]
  onCancel: () => void
  onSubmit: (data: any) => void
}

const requiredOptions = [
  "amount",
  "date",
  "payee"
]

interface SelectedColumnsState {
  [key: string]: string | null
}

export function ImportCard({ data, onCancel, onSubmit}: Props) {

  const headers = data[0]
  const content = data.slice(1)

  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>({})

  const onTableHeadSelectChange = (columnIndex: number, value: string | null) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = {...prev}

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null
        }
      }

      if(value === "skip") {
        value = null
      }

      newSelectedColumns[`column_${columnIndex}`] = value

      return newSelectedColumns
    })
  }

  const progress = Object.values(selectedColumns).filter(Boolean)

  const totalFields = requiredOptions.filter(option => progress.includes(option))

  function calcularPorcentagem(progress: number): string | number {
    if (progress === 0) {
      return 1;
    }

    const percentage = (progress / requiredOptions.length) * 100;
    return `${percentage.toFixed(2)}`
  }

  function handleContinue() {

    const getColumnIndex = (column: string) => column.split("_")[1]

    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`)
        return selectedColumns[`column_${columnIndex}`] || null
      }),
      body: content.map((row) => {
        const transformedRow = row.map((cell, index) => {
          const columnIndex = getColumnIndex(`column_${index}`)
          return selectedColumns[`column_${columnIndex}`] ? cell : null
        })

        return transformedRow.every((item) => item === null) ? [] : transformedRow
      }).filter((row) => row.length > 0)
    }

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((accumulator: any, cell, index) => {
        const header = mappedData.headers[index]

        if(header !== null){
          accumulator[header] = cell
        }

        return accumulator
      },{})
    })

    //console.log(arrayOfData)

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      date: parseDate(item.date),
      amount: convertAmountToMiliunits(parseFloat(item.amount))
    }))

    //console.log(formattedData)

    onSubmit(formattedData)

  }

  return (
    <div className="max-w-screen-2xl mx-auto w-ful pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
          Importação de Transações
          </CardTitle>
          <div className="flex-1 mx-5 justify-center">
            <p className="text-center text-xs text-muted-foreground">Campos obrigatórios</p>
            <p className="text-center text-xs text-muted-foreground">{`${progress.length} / ${requiredOptions.length}`}</p>
            <Progress value={Number(calcularPorcentagem(progress.length))}/>
          </div>
          <div className="flex justify-between items-center gap-x-2">
            <Button variant="secondary" className="text-xs flex items-center justify-center" onClick={onCancel}>
              <X className="mr-2 size-4" />
              Cancelar
            </Button>
            {totalFields.length >= requiredOptions.length && (
            <Button disabled={totalFields.length < requiredOptions.length} className="text-xs flex items-center justify-center" onClick={handleContinue}>
              Continue
              <ArrowBigRightDashIcon className="ml-2 size-4" />
            </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <ScrollArea>
            <ScrollBar orientation="horizontal" />
            <ImportTable headers={headers} content={content} onTableHeadSelectChange={onTableHeadSelectChange} selectedColumns={selectedColumns} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}