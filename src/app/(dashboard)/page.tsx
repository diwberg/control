"use client"
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/hooks/accounts/stores/use-new-account";

export default function HomePage() {
  const { onOpen } = useNewAccount()

  return (
    <div>

    </div>
  )
}