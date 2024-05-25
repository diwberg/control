import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Props = {
  href: string
  label: string
  isActive?: boolean
}

export function NavButton({ label, href, isActive}: Props) {

  return (
    <Button 
    id={href.substring(1) || "home"}
    asChild 
    size="sm" 
    variant="outline" 
    className={
      cn("w-full lg:w-auto justify-between font-normal border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none hover:bg-white/30 focus:bg-white/30 transition ", 
      isActive ? "bg-white/20 font-bold" : "bg-transparent")}>
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
}