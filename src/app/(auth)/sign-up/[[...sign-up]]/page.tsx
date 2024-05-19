import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { SignUpSkeleton } from "../../_components/sign-up-skeleton";

export default function SignUpPage() {

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 ">
    <div className="h-full lg:flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-4 pt-16">
        <h1 className="font-bold text-3xl ">
          Bem vindo!
        </h1>
        <p className="text-base text-muted-foreground">
          Crie sua conta para entrar
        </p>
      </div>
      <div className="flex items-center justify-center mt-8">
        <ClerkLoaded>
          <SignUp path="/sign-up" />
        </ClerkLoaded>
        <ClerkLoading>
          <SignUpSkeleton />
        </ClerkLoading>
      </div>
    </div>
    <div className="h-full bg-primary hidden lg:flex items-center justify-center">
      <Image alt="Logo" src="/logo.png" width={100} height={100} />
    </div>
  </div>
  )
}