import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2Icon } from "lucide-react";

export function SkeletonTable() {
  return (
    <>
    <div className="max-w-screen-2xl mx-auto w-ful pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-36" />
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full flex items-center justify-center">
            <Loader2Icon className="animate-spin size-12 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  )
}