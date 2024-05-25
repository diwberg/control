import { formatDistanceToNow } from "date-fns";

import { InfiniteMovingCards } from "@/components/ui/aceternity/infinite-moving-cards";
import { ptBR } from "date-fns/locale";

const testimoniais = [
  {
    quote: "Utilizar este sistema de controle financeiro foi a melhor decisão que tomei. Minha vida financeira mudou completamente para melhor!",
    name: "Ana Silva",
    title: formatDistanceToNow(new Date(2023, 0, 15), { locale: ptBR }) // 15 de janeiro de 2023
  },
  {
    quote: "Antes, eu tinha muitas dívidas e não sabia como gerenciar meu dinheiro. Agora, estou no controle e até consegui economizar para uma viagem!",
    name: "Carlos Pereira",
    title: formatDistanceToNow(new Date(2023, 2, 5), { locale: ptBR }) // 5 de março de 2023
  },
  {
    quote: "Esse sistema me ajudou a organizar minhas finanças e a criar um plano de economia eficaz. Recomendo a todos!",
    name: "Maria Oliveira",
    title: formatDistanceToNow(new Date(2023, 4, 20), { locale: ptBR }) // 20 de maio de 2023
  },
  {
    quote: "Nunca pensei que poderia poupar tanto. Com o sistema, aprendi a controlar meus gastos e agora tenho uma reserva de emergência.",
    name: "João Santos",
    title: formatDistanceToNow(new Date(2023, 6, 10), { locale: ptBR }) // 10 de julho de 2023
  },
  {
    quote: "Minha vida financeira era um caos, mas com este sistema, consegui me organizar e planejar melhor meu futuro.",
    name: "Paula Costa",
    title: formatDistanceToNow(new Date(2023, 8, 25), { locale: ptBR }) // 25 de setembro de 2023
  },
  {
    quote: "O sistema de controle financeiro fez toda a diferença na minha vida. Agora, consigo investir e pensar no longo prazo.",
    name: "Lucas Almeida",
    title: formatDistanceToNow(new Date(2023, 10, 30), { locale: ptBR }) // 30 de novembro de 2023
  },
  {
    quote: "Com a ajuda deste sistema, consegui sair do vermelho e finalmente tenho paz de espírito em relação ao meu dinheiro.",
    name: "Fernanda Rodrigues",
    title: formatDistanceToNow(new Date(2024, 0, 12), { locale: ptBR }) // 12 de janeiro de 2024
  },
  {
    quote: "Este sistema foi essencial para que eu pudesse organizar meus gastos e economizar para o meu casamento. Sou muito grato!",
    name: "Marcos Lima",
    title: formatDistanceToNow(new Date(2024, 2, 28), { locale: ptBR }) // 28 de março de 2024
  },
  {
    quote: "A gestão financeira ficou muito mais fácil com este sistema. Agora sei exatamente para onde vai meu dinheiro.",
    name: "Juliana Souza",
    title: formatDistanceToNow(new Date(2024, 4, 15), { locale: ptBR }) // 15 de maio de 2024
  },
  {
    quote: "Minha relação com o dinheiro mudou completamente. Estou muito mais consciente e responsável graças ao sistema.",
    name: "Rafael Fernandes",
    title: formatDistanceToNow(new Date(2024, 6, 22), { locale: ptBR }) // 22 de julho de 2024
  }
]

export function Testimonial() {

  return (
    <div className="px-10 py-5">
      <InfiniteMovingCards items={testimoniais} speed="slow" direction="right"  />
    </div>
  )
}