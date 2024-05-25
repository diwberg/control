"use client"

import { Hints } from "intro.js-react";

const hints = [
  {
    element: '.selector1',
    hint: 'test 1',
    hintPosition: 'middle-middle',
  },
  {
    element: '#transactions',
    hint: 'test 2',
  },
];

export function Hint1() {
  
  return (
    <Hints
      enabled={true}
      hints={hints}
    />
  )
}