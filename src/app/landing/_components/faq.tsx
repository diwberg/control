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
    content: "Nada, a utilização básica do Control é de graça. Apenas para integrações automáticas, precisa de um plano de assinatura!"
  },
  {
    value: "item-2",
    title: "Posso conectar na minha conta bancária?",
    content: "Sim, com um plano de assinatura, é possível solicitar a integração com a conta bancária para o preenchimento automático das transações."
  },
  {
    value: "item-3",
    title: "Posso conectar no sistema da minha empresa?",
    content: "Sim, com um plano de assinatura, é possível solicitar a integração com sistemas externos via API."
  },
  {
    value: "item-4",
    title: "Os dados são preenchidos automaticamente?",
    content: "Não, todas as transações são feitas manualmente, porém, existe a possibilidade de importar em massa com um arquivo CSV (Planilha). (Obs: Com uma assinatura é possível conectar diretamente as contas bancárias)."
  },
  {
    value: "item-5",
    title: "Existe suporte ao cliente?",
    content: "Sim, oferecemos suporte ao através do nosso e-mail para ajudar com qualquer dúvida ou problema que possa surgir. suporte@icyou.com.br"
  },
  {
    value: "item-6",
    title: "O Control oferece relatórios financeiros?",
    content: "Ainda não, está como prioridade na nossa esteira de melhorias. Em breve a resposta será SIM"
  }
];


export function Faq() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
      <h1 className="font-bold text-2xl lg:text-3xl"><strong className="text-lime-400">Dúvidas</strong> frequentes</h1>
      <div className="py-2 lg:px-36 px-5 w-full">
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