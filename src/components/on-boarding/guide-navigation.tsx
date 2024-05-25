
import useStore from "@/hooks/on-boarding/use-store";
import { Guide } from "./guide";
import { GuideStep } from "./step";
import { useGuideNavigation } from "@/hooks/on-boarding/use-on-boarding";

export function GuideNavigation() {


  const steps = [
    {
      element: '.selector1',
      intro: <Guide title="Bem-vindo(a)" description="Vamos aprender o basico para navegar dentro da nossa aplicação" />,
      position: 'right',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '#home',
      intro: <Guide title="Página principal" description="Sempre que quiser voltar a página principal, basta clicar no botão Home" />,
    },
    {
      element: '#transactions',
      intro: <Guide title="Transações" description="Nesse botão, você poderá navegar até as suas transações, de entrada ou saída financeira." />,
    },
    {
      element: '#accounts',
      intro: <Guide title="Contas" description="Nesse botão, você poderá navegar até as suas contas, para administrar multiplas contas" />,
    },
    {
      element: '#categories',
      intro: <Guide title="Categorias" description="Nesse botão, você poderá navegar até as categorias de gastos ou ganhos" />,
    },
    {
      element: '#settings',
      intro: <Guide title="Configuração" description="Nesse botão, você poderá navegar até suas configurações" />,
    },
  ];
  
  const navigation = useStore(useGuideNavigation, (state) => state)

  //console.log(navigation)
  function handleOnExit(step: number) {

    if(step === steps.length) {
      navigation?.onDone()
      
    }
  }
  return (
    <>
      <GuideStep steps={steps} handleOnExit={handleOnExit} enabled={true} />
    </>
  )
}