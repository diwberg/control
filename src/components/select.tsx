"use client"
import { cn } from "@/lib/utils"
import { useMemo } from "react"
import { SingleValue } from "react-select"
import CreateableSelect from "react-select/creatable"

type Props = {
  onChange: (value?: string) => void
  onCreate?: (value: string) => void
  options?: { label: string, value: string}[]
  value?: string | null | undefined
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function Select({
  value,
  onChange,
  disabled,
  onCreate,
  options = [],
  placeholder,
  className
}: Props) {

  const onSelect = (option: SingleValue<{ label: string, value: string }>) => {
    onChange(option?.value)
  }

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value)
  }, [ options, value ])
 
  return (
    <>
      <CreateableSelect
      placeholder={placeholder}
      className={cn("text-sm h-10 dark:text-black", className)}
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#e2e8f0",
          ":hover": {
            borderColor: "#e2e8f0"
          }
        })
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
      />
    </>
  )
}