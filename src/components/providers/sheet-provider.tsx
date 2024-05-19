"use client"
import { useMountedState } from "react-use"

import { EditAccountSheet } from "@/hooks/accounts/_components/edit-account-sheet"
import { NewAccountSheet } from "@/hooks/accounts/_components/new-account-sheet"
import { EditCategorySheet } from "@/hooks/categories/_components/edit-category-sheet"
import { NewCategorySheet } from "@/hooks/categories/_components/new-category-sheet"
import { NewTransactionSheet } from "@/hooks/transactions/_components/new-transaction-sheet"
import { EditTransactionSheet } from "@/hooks/transactions/_components/edit-transaction-sheet"

export function SheetProvider() {
  
  const isMounted = useMountedState()

  if (!isMounted) return null
  
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      
      <NewCategorySheet />
      <EditCategorySheet />

      <NewTransactionSheet />
      <EditTransactionSheet />
    </>
  )
}