import { type ClassValue, clsx } from "clsx"
import { isValid, parse, format as Format, eachDayOfInterval, isSameDay, subDays, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountFromMiliunits(amount: number) {
  return Math.round(amount / 1000)
}

export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000)
}

export function formatCurrency(value: number) {

  const brasil = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value)

  const europa = Intl.NumberFormat("pt", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value)

  return europa
}

export function formatPercent(value: number, options: { addPrefix?: boolean } = { addPrefix: true }) {
  const result = new Intl.NumberFormat("pt-BR", {
    style: "percent",
  }).format(value / 100)

  if(options.addPrefix && value > 0) {
    return `+${result}`
  }

  return result
}

export function parseDate(input: any): string | null {
  // Define os formatos de data possíveis
  const formats = [
    'MM-dd-yyyy',
    'MM/dd/yyyy',
    'dd-MM-yyyy',
    'dd/MM/yyyy',
    'yyyy/MM/dd',
    'yyyy-MM-dd',
    'dd MMM yyyy',
    'MMM dd, yyyy',
    'yyyy MMM dd',
    'yyyy-MM-dd HH:mm:ss',
    'yyyy/MM/dd HH:mm:ss',
    'yyyy-MM-ddTHH:mm:ss',
    'yyyy/MM/ddTHH:mm:ss',
    'dd/MM/yyyy HH:mm:ss',
    'dd-MM-yyyy HH:mm:ss',
    'MM/dd/yyyy HH:mm:ss',
  ];

  const outputFormat = "yyyy-MM-dd"

  /*  
    function isValidReplace(testInput: any) {
      for (const format of formats) {
        const date = parse(testInput, format, new Date());
        if (isValid(date)) {
          return date;
        }
      }
    }

    // Substitui '/' por '-' para padronizar os delimitadores
    const replace_1 = input.replace(/[/]/g, '-');
    // Verifica se a data é válida
    isValidReplace(replace_1)
  
    // Caso contrário, tenta outros formatos específicos
    const parts = input.split('-');
    if (parts.length === 3) {
      const year = parts[0].length === 4 ? parts[0] : parts[2];
      const month = parts[1] - 1; // Meses são indexados a partir de 0
      const day = parts[0].length === 4 ? parts[2] : parts[0];
      isValidReplace(new Date(year, month, day))

    } else {
      const match = input.match(/^(\d{4})[-/]?(\d{2})[-/]?(\d{2})(?:T(\d{2}):(\d{2}):(\d{2}))?$/);
  
      if (match) {
        const [, year, month, day, hour = '00', minute = '00', second = '00'] = match;
        const parsedMonth = parseInt(month, 10) - 1; // Meses são indexados a partir de 0
        isValidReplace(new Date(parseInt(year), parsedMonth, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second)))

      }
    }
    */

  // Tenta parsear a data em cada formato
  for (const format of formats) {
    const date = parse(input, format, new Date());
    if (isValid(date)) {
      return Format(date, outputFormat);
    }
  }

  //throw new Error('Formato de data inválido');
  return Format(new Date(), outputFormat);
}


export function traduzirColumns(option: string): string {
  switch (option) {
    case "amount":
      return "valor";
    case "payee":
      return "beneficiário";
    case "notes":
      return "notas";
    case "date":
      return "data";
    case "category":
      return "Categoria";
    case "account":
      return "Conta";
    default:
      return option;
  }
}

export function calculatePercentageChange(current: number, previous: number) {

  if(previous === 0) return previous === current ? 0 : 100


  return (((current) - (previous)) / previous) * 100
}

export function fillMissingDays(activeDays: { date: Date, incomes: number, expenses: number}[], startDate: Date, endDate: Date) {

  if(activeDays.length === 0) return []

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  })

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day))

    if(found) {
      return found
    } else {
      return {
        date: day,
        incomes: 0,
        expenses: 0
      }
    }
  })

  return transactionsByDay
}

type Period = {
  from: string | Date | undefined,
  to: string | Date | undefined,
}

export function formatDateRange(period?: Period) {
  const defaultTo = new Date()
  const defaultFrom = subDays(defaultTo, 30)

  if(!period?.from){
    return `${format(defaultFrom, "dd/LLL", { locale: ptBR })} - ${format(defaultTo, "dd/LLL, y", { locale: ptBR })}`
  }

  if(period.to){
    return `${format(period.from, "dd/LLL", { locale: ptBR })} - ${format(period.to, "dd/LLL, y", { locale: ptBR})}`
  }

  return format(period.from, "dd/LLL, y")
}
