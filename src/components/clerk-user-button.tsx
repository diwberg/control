import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { HoverBorderGradient } from "./ui/aceternity/hover-border-gradient";
import { LoaderIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Props = {
  titleButton?: string
  className?: string
}
export function ClerkUserButton({ titleButton, className }: Props) {

  return (
    <>
      <ClerkLoaded>
        <SignedOut>
          <SignUpButton mode="redirect">
            <Button className={cn("", className)}>
              {titleButton || "Entrar"}
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </ClerkLoaded>
      <ClerkLoading>
        <LoaderIcon className="animate-spin size-8 text-muted-foreground" />
      </ClerkLoading>
    </>
  )
}