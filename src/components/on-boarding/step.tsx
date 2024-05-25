"use client"
import { Steps } from "intro.js-react";
import { useMountedState } from "react-use";

type Props = {
  steps: any[]
  enabled?: boolean
  handleOnExit: (step: number) => void
}
export function GuideStep({ steps, handleOnExit, enabled}: Props) {

  const isMounted = useMountedState()

  if (!isMounted) return null

  const optionsProps = {
    nextLabel: "entendi", 
    prevLabel: "voltar", 
    doneLabel: "finalizar",
    keyboardNavigation: true,
    showProgress: true,
    overlayOpacity: 0.3,
    showBullets: false,
    exitOnOverlayClick: false,
    exitOnEsc: false
  }

  return (
    <Steps steps={steps} options={optionsProps} enabled={enabled} initialStep={0} onExit={handleOnExit} />
  )
}