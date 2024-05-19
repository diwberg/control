"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Input } from "../ui/input"
import { FacetedFilterDataTable } from "./faceted-filter"
import { useGetAccounts } from "@/hooks/accounts/api/use-get-accounts"
import { useGetCategories } from "@/hooks/categories/api/use-get-categories"
import { Button } from "../ui/button"
import { DataTableViewOptions } from "./view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function ToolbarFilterDataTable<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  
  const accountQuery = useGetAccounts()
  const accounts = accountQuery.data || []
  const facetedFilter = accounts.map((account) => ({
    label: account.name,
    value: account.name,
  }))
  
  const categoriesQuery = useGetCategories()
  const categories = categoriesQuery.data || []
  const facetedCategoryFilter = categories.map((category) => ({
    label: category.name,
    value: category.name,
  }))

  return (
    <div className="flex flex-1 flex-col-reverse max-lg:gap-y-3 lg:flex-row items-center justify-center lg:justify-between">
      <div className="flex flex-1 flex-col lg:flex-row items-center lg:gap-x-2 max-lg:gap-y-2 ">
        <Input
          placeholder="Filtrar beneficiário"
          value={(table.getColumn("payee")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("payee")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full lg:w-[250px]"
        />
        {table.getColumn("category") && (
          <FacetedFilterDataTable
            column={table.getColumn("category")}
            title="Categoria"
            options={facetedCategoryFilter}
          />
        )}
        {table.getColumn("account") && (
          <FacetedFilterDataTable
            column={table.getColumn("account")}
            title="Conta"
            options={facetedFilter}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Limpar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}