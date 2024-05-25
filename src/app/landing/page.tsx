import { FlipWords } from "@/components/ui/aceternity/flip-words";
import { MacbookScroll } from "@/components/ui/aceternity/macbook-scroll";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeroHighlightDemo } from "./_components/hero";
import { TabsControl } from "./_components/animated-tabs";
import { Steps } from "./_components/steps";
import { Faq } from "./_components/faq";
import { Testimonial } from "./_components/testimonial";

export default function LandingPage() {

  const headline = [
    "transformar",
    "revolucionar",
    "melhorar",
    "otimizar",
    "organizar",
    "reestruturar",
    "impulsionar",
    "renovar",
    "reforçar",
    "revitalizar",
    "ajustar",
    "equilibrar",
    "planejar",
    "alavancar",
    "controlar",
    "potencializar",
    "aperfeiçoar",
    "estabilizar"
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-10 flex flex-col items-center justify-center px-2">
        <h1 className="text-2xl md:text-4xl font-extrabold text-center">Chegou a hora de{" "}<FlipWords className="text-lime-400 dark:text-lime-400" words={headline} />{" "}sua vida financeira.</h1>
        <span className="text-base lg:text-lg font-semibold text-center">Control é uma plataforma completa para você controlar suas finanças, e não ser surpreendido</span>
      </div>
      <div className="flex w-full items-center justify-center p-2">
        <Button className="w-1/2 shadow-2xl font-extrabold bg-lime-400 dark-bg-lime-400 hover:bg-lime-700">
          <Link href="/sign-up">
          Entrar
          </Link>
        </Button>
      </div>
      <div className="">
        <MacbookScroll 
        src="/dashboard.png" 
        showGradient 
        title="Simplifique suas Finanças!" />
      </div>

      <Button className="w-1/2 shadow-2xl my-3 font-extrabold bg-lime-400 dark-bg-lime-400 hover:bg-lime-700">
          <Link href="/sign-up">
          Começar agora!
          </Link>
      </Button>
      <div className="p-3">
        <HeroHighlightDemo />
      </div>
      <div className="w-full h-full">
        <TabsControl />
      </div>
      <div className="w-full h-full">
        <Steps />
      </div>
      <Button className="w-1/2 shadow-2xl my-3 font-extrabold bg-lime-400 dark-bg-lime-400 hover:bg-lime-700">
          <Link href="/sign-up">
          Estou pronto!
          </Link>
      </Button>
      <div className="w-full h-full">
        <Faq />
      </div>
      <div className="py-20">
        <Testimonial />
      </div>
    </div>
  )
  
}