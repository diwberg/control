"use client"

import { useUser } from "@clerk/nextjs"

export function WelcomeMsg() {

  const { user, isLoaded } = useUser()


  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl font-medium">Bem vindo de volta{user && isLoaded ? ", " : " "}{user?.firstName} 🥳</h2>
      <p className="text-sm lg:text-base text-muted-foreground">Não perca mais o Control sobre tuas finanças</p>
    </div>
  )
}