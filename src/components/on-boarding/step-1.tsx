"use client"

import { Steps } from "intro.js-react";

export function Step1() {
  //console.log("teste")
  
  const steps = [
    {
      element: '.selector1',
      intro: 'test 1',
      position: 'right',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '#transactions',
      intro: <h1>{"TEste"}</h1>,
    },
    {
      element: '#accounts',
      intro: 'test 3',
    },
  ];

  function handleOnExit(step: number) {
    //console.log(step)
  }

  return (
    <div>
      
      <Steps steps={steps} options={{ nextLabel: "Entendi" }} enabled={true} initialStep={0} onExit={handleOnExit} />
    </div>
  )
}