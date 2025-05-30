import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function SummarySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="flex flex-1 gap-8">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="w-28 h-6" />
              <Skeleton className="rounded-full w-6 h-6" />
            </div>
            <Skeleton className="w-52 h-3" />
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="w-24 h-6" />
              </div>
              <div>
                <Skeleton className="w-48 h-6" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="w-24 h-6" />
              </div>
              <div>
                <Skeleton className="w-48 h-6" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Skeleton className="w-full h-1" />
            <div className="flex items-center justify-between w-full">
              <Skeleton className="w-28 h-6" />
              <Skeleton className="w-28 h-6" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
