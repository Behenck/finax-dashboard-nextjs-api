import { CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatAmount } from '@/lib/format-amount'

interface SummaryFooterProps {
  total?: number
  totalDescription?: string
}

export function SummaryFooter({
  total = 0,
  totalDescription,
}: SummaryFooterProps) {
  return (
    <CardFooter className="flex flex-col gap-4">
      <Separator />
      <div className="flex items-center justify-between w-full">
        <p className="font-bold text-lg">Total</p>
        <div>
          <p className="font-bold text-lg">{formatAmount(total)}</p>
          <p className="text-right text-muted-foreground text-xs">
            {!!totalDescription && totalDescription}
          </p>
        </div>
      </div>
    </CardFooter>
  )
}
