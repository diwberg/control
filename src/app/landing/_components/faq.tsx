import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    value: "item-1",
    title: "Quanto custa para utilizar o Control?",
    content: "Nada, a utilização basica do control é de graça, apenas para integrações automaticas, precisa de um plano de assinatura!"
  },
  {
    value: "item-2",
    title: "Posso conectar na minha conta bancaria?",
    content: "Sim, com um plano de assinatura, é possivel solicitar a integração com a conta bancaria, para o preenchimento automatico das transações"
  },
  {
    value: "item-3",
    title: "Posso conectar no sistema da minha empresa?",
    content: "Sim, com um plano de assinatura, é possivel solicitar a integração com sistemas externos via API"
  },
  {
    value: "item-4",
    title: "Os dados são preenchidos automaticamente?",
    content: "Não, todas as transações são feitas manualmente, porém, existe a possibilidade de importar em massa com um arquivo CSV (Planilha). (Obs: Com uma assinatura é possivel conectar diretamente as contas bancárias)"
  },
]

export function Faq() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
      <h1 className="font-bold text-2xl lg:text-3xl"><strong className="text-lime-400">Dúvidas</strong> frequentes</h1>
      <div className="py-2 px-36 w-full">
      <Accordion type="single" collapsible className="">
        {faqs.map((faq) => (
          <AccordionItem key={faq.value} value={faq.value} className="border-lime-400">
            <AccordionTrigger>{faq.title}</AccordionTrigger>
            <AccordionContent className="dark:bg-slate-600 p-2">
              {faq.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </div>
    </div>
  )
}