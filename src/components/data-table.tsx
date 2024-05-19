"use client"

import { LoaderIcon, TrashIcon } from "lucide-react"
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
  getFacetedRowModel,
  getFacetedUniqueValues,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { useConfirm } from "@/hooks/use-confirm"
import { ScrollArea } from "./ui/scroll-area"
import { PaginationTable } from "./table/pagination"
import { ToolbarFilterDataTable } from "./table/toolbar-filter"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterKey: string
  filterLabel: string
  onDelete: (rows: Row<TData>[]) => void
  disabled?: boolean
  isLoading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey,
  filterLabel,
  onDelete,
  disabled,
  isLoading
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([])

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const [rowSelection, setRowSelection] = React.useState({})

  const [ ConfirmDialog, confirm ] = useConfirm("Tem certeza?", "Você está prestes a deletar")

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility
    }
  })

  return (
    <div>
        <ConfirmDialog />
        
        <div className="flex items-center gap-x-2 py-4">
          {/*<FilterTable table={table} filterKey={filterKey} filterLabel={filterLabel}  />*/}
          <ToolbarFilterDataTable table={table} />

          {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Button variant="destructive" size="sm" className=" ml-auto font-normal text-xs" disabled={disabled} onClick={async () => {
            
            const ok = await confirm()

            if(ok) {
              onDelete(table.getFilteredSelectedRowModel().rows)
              table.resetRowSelection()
            }
          }}>
            {!!isLoading ? (<LoaderIcon className="animate-spin size-4" />) : (
              <>
                <TrashIcon className="size-4 mr-2" />
                Apagar ({table.getFilteredSelectedRowModel().rows.length})
              </>
            )}
          </Button>
          )}
        </div>
      
      {/** TABLE */}
      <div className="rounded-md border">
        <Table className="">
          <ScrollArea>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Sem resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </ScrollArea>

        </Table>
      </div>

      {/** PAGINATION */}
      <PaginationTable table={table} />
    </div>
  )
}
