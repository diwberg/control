import { auth } from "@clerk/nextjs/server";
import { Header } from "./_components/header";
import { redirect } from "next/navigation";

export default function DashboardLayout( { children }: { children: React.ReactNode }) {
  const { userId } = auth()
 
  if(!userId) {
    redirect("/landing")
  }

  return (
    <>
    <Header />
    <main className="px-3 lg:px-14">
      {children}
    </main>
    </>
  )
}