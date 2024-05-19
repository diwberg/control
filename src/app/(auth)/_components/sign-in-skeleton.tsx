import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react";

export function SignInSkeleton() {

  return (
    <Card className="shadow-lg">
      <div className="p-5">
      <CardHeader>
        <CardTitle className="space-y-2 flex flex-col items-center">
          <Skeleton className="w-[80px] h-[30px]" />
          <Skeleton className="w-[140px] h-[25px]" />
        </CardTitle>
          <div className="flex gap-x-2 my-5">
          <Skeleton className="w-[90px] h-[32px] rounded-md" />
          <Skeleton className="w-[90px] h-[32px] rounded-md" />
          <Skeleton className="w-[90px] h-[32px] rounded-md" />
          </div>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4 rounded-b-lg">
        <div className="flex flex-col gap-y-1">
         <Skeleton className="w-[100px] h-[25px]" />
         <Skeleton className="w-full h-8" />
        </div>
        <div>
          <Skeleton className="w-full h-9 rounded-lg flex items-center justify-center">
            <Loader2 className="animate-spin text-muted-foreground m-1" />
          </Skeleton>
        </div>
      </CardContent>
      </div>
      <CardFooter className="bg-muted h-14 rounded-b-lg">
      </CardFooter>
    </Card>
  )
}