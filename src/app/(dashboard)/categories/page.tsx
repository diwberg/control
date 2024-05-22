"use client"
import { PlusIcon } from "lucide-react";

import { columns } from "./columns";
import { SkeletonTable } from "./_components/skeleton-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { useNewCategory } from "@/hooks/categories/stores/use-new-category";
import { useBulkDeleteCategories } from "@/hooks/categories/api/use-bulk-delete-categories";
import { useGetCategories } from "@/hooks/categories/api/use-get-categories";

export default function CategoriesPage() {

  const { onOpen } = useNewCategory()
  const deleteCategories = useBulkDeleteCategories()
  const categoriesQuery = useGetCategories()
  const categories = categoriesQuery.data || []

  const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending


  if(categoriesQuery.isLoading) return <SkeletonTable />

  return (
    <div className="max-w-screen-2xl mx-auto w-ful pb-10 -mt-24">
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">
         Categorias
        </CardTitle>
        <Button variant="secondary" className="text-xs flex items-center justify-center" onClick={onOpen}>
          <PlusIcon className="mr-2 size-4" />
          Criar Categoria
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={categories} 
        onDelete={(categories) => {
          const ids = categories.map((row) => row.original.id)
          deleteCategories.mutate({ ids })
        }} 
        disabled={isDisabled} 
        isLoading={categoriesQuery.isLoading} />
      </CardContent>
    </Card>
    </div>
  )
}