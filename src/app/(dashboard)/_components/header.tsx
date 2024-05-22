import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { ThemeToggle } from "@/components/toggle/theme-toggle";
import { HeaderLogo } from "./logo";
import { Navigation } from "./navigation";
import {  LoaderIcon } from "lucide-react";
import { WelcomeMsg } from "./welcome-msg";
import { Filters } from "./filters";
import { HoverBorderGradient } from "@/components/ui/aceternity/hover-border-gradient";

export function Header() {

  return (
    <header className="bg-gradient-to-b from-primary to-secondary px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <div className="flex items-center gap-x-4 justify-center">
            <ClerkLoaded>
              <SignedOut>
                <SignUpButton mode="redirect">
                  <HoverBorderGradient>
                    Entrar
                  </HoverBorderGradient>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </ClerkLoaded>
            <ClerkLoading>
              <LoaderIcon className="animate-spin size-8 text-muted-foreground" />
            </ClerkLoading>
            <ThemeToggle />
          </div>
        </div>
        <WelcomeMsg />
        <Filters />
      </div>
    </header>
  )
}