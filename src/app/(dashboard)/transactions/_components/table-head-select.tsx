import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Props = {
  columnIndex: number
  selectedColumns: Record<string, string | null>
  onChange: (columnIndex: number, value: string | null) => void
}

const options = [
  "amount",
  "payee",
  "notes",
  "date"
]

function traduzirOption(option: string): string {
  switch (option) {
    case "amount":
      return "valor";
    case "payee":
      return "beneficiário";
    case "notes":
      return "notas";
    case "date":
      return "data";
    default:
      return "opção desconhecida";
  }
}

export function TableHeadSelect({ columnIndex, selectedColumns, onChange}: Props) {

  const currentSelect = selectedColumns[`column_${columnIndex}`]


  return (
    <Select value={currentSelect || ""} onValueChange={(value) => onChange(columnIndex, value)}>
      <SelectTrigger className={cn(
        "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
        currentSelect && "text-primary"
        )}>
        <SelectValue placeholder="Ignorar?" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">Ignorar</SelectItem>
        {options.map((option, index) => {

          const disabled = Object.values(selectedColumns).includes(option) &&
          selectedColumns[`column_${columnIndex}`] !== option

          return (
          <SelectItem key={index} value={option} disabled={disabled} className="capitalize">
            {traduzirOption(option)}
          </SelectItem>
        )})}
      </SelectContent>
    </Select>
  )
}