import { formatAmount } from '@/lib/format-amount'

interface SummaryRowContentProps {
  title: string
  icon: React.ReactNode
  total: number
  totalDescription?: string
}

export function SummaryRowContent({
  title,
  icon,
  total,
  totalDescription,
}: SummaryRowContentProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        {icon}
        <p className="text-muted-foreground">{title}</p>
      </div>
      <div>
        <p>{formatAmount(total)}</p>
        <p className="text-right text-xs text-muted-foreground h-4">
          {!!totalDescription && totalDescription}
        </p>
      </div>
    </div>
  )
}
