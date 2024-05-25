import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AirplayIcon, CreditCardIcon, DollarSignIcon, FileSpreadsheetIcon, UtensilsCrossedIcon } from "lucide-react"

const steps = [
  {
    icon: <AirplayIcon className="size-10" />,
    title: "Faça login",
    description: "Em poucos cliques, faça seu cadastro usando uma rede social"
  },
  {
    icon: <CreditCardIcon className="size-10" />,
    title: "Crie uma conta",
    description: "Crie ao menos uma conta para registrar os ganhos e gastos"
  },
  {
    icon: <UtensilsCrossedIcon className="size-10" />,
    title: "Crie uma categoria",
    description: "Separe seus ganhos e gastos por categoria, para uma melhor analise"
  },
  {
    icon: <DollarSignIcon className="size-10" />,
    title: "Cadastre suas transições",
    description: "Faça os lançamentos de forma simples, e tenha ao alcance de alguns clicks, o seu saldo, gastos e ganhos."
  },
]

export function Steps() {
  return (
    <div className="pt-24 flex gap-5 flex-col items-center justify-center px-4 md:px-16 lg:px-32">
      <h1 className="text-xl font-bold pb-2">Em poucos passos, já começe a <strong className="text-lime-400">Controlar</strong></h1>
      {steps.map((step, index) => (
        <>
          <Card key={step.title} className="w-full overflow-hidden">
            <div className="flex h-32 items-center justify-center border-2 border-lime-400 rounded-xl p-5">
              <div className="flex items-center justify-center w-28 h-full">
                <span className="mr-2 text-3xl font-extrabold text-lime-400">{index + 1} -</span>
                {step.icon}
              </div>
              <div className=" h-full flex-1 px-2 flex flex-col justify-center">
                <h1 className="text-xl font-bold">{step.title}</h1>
                <span className="text-sm">{step.description}</span>
              </div>
            </div>
          </Card>
          {index && index + 1 === steps.length ? <>
          <br />
          </> : 
          <>
          <Separator orientation="vertical" className="h-10 border-lime-400 border-2" />
          </>
          }
        </>
      ))}
    </div>
  )
}