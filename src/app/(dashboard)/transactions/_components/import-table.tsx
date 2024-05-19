import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TableHeadSelect } from "./table-head-select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


type Props = {
  headers: string[]
  content: string[][]
  selectedColumns: Record<string, string | null>
  onTableHeadSelectChange: (columnIndex: number, value: string | null) => void
}

export function ImportTable({ 
  headers, 
  content, 
  selectedColumns, 
  onTableHeadSelectChange, 
}: Props) {


  return (  
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((_item, i) => (
              <TableHead key={i}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <TableHeadSelect columnIndex={i} selectedColumns={selectedColumns} onChange={onTableHeadSelectChange} />
                    </TooltipTrigger>

                    <TooltipContent>
                      <strong>Campo original: </strong><span> {_item}</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {content.map((row: string[], i) => (
            <TableRow key={i}>
              {row.map((cell, i) => (
                <TableCell key={i}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}