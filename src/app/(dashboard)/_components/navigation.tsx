"use client"

import { usePathname, useRouter } from "next/navigation"
import { useMedia } from "react-use"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavButton } from "./nav-button"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { GuideNavigation } from "@/components/on-boarding/guide-navigation"

const routes = [
  {
    href: "/",
    label: "Home"
  },
  {
    href: "/transactions",
    label: "Transações"
  },
  {
    href: "/accounts",
    label: "Contas"
  },
  {
    href: "/categories",
    label: "Categorias"
  },
  {
    href: "/settings",
    label: "Configuração"
  },
]

export function Navigation() {
  const [isOpen, setIsOpen ] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const isMobile = useMedia("(max-width: 1024px)", false)

  function onClick(href: string) {
    router.push(href)
    setIsOpen(false)
  }

  if(isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen} >
        <SheetTrigger>
          <Button id="menu" variant="outline" size="sm" className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition">
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="px-2">
          <nav className="flex flex-col gap-y-2 mt-6">
            {routes.map((route) => (
              <Button key={route.href} variant={route.href === pathname ? "secondary" : "ghost"} onClick={() => onClick(route.href)}>
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {/**<GuideNavigation />*/}
      {routes.map((route, i) => (
        <NavButton key={route.href} href={route.href} label={route.label} isActive={pathname === route.href} />
      ))}
    </nav>
  )
}