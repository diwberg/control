import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { SignInSkeleton } from "../../_components/sign-in-skeleton";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 ">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl ">
            Bem vindo de volta!
          </h1>
          <p className="text-base text-muted-foreground">
            Entre ou Registre-se para voltar ao Dashboard
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <SignInSkeleton />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-primary hidden lg:flex items-center justify-center">
        <Image alt="Logo" src="/logo.png" width={100} height={100} />
      </div>
    </div>
  )
}