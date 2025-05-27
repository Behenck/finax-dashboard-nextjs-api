import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatAmount } from '@/lib/format-amount'

export interface CardTopItem {
  label: string
  icon: React.ReactNode
  amount: number
  quantity?: number
  quantityLabel?: string
}

interface CardTopProps {
  title: string
  description: string
  icon: React.ReactNode
  items: CardTopItem[]
  total?: number
  totalQuantity?: number
}

export function CardTop({
  title,
  description,
  icon,
  items,
  total = 0,
  totalQuantity = 0,
}: CardTopProps) {
  return (
    <Card className="flex flex-col gap-2 flex-1">
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>
        <div>{icon}</div>
      </CardHeader>
      <CardContent className=" flex flex-col gap-1">
        {items.map((item) => (
          <div
            className="flex items-center justify-between"
            key={`${item.label}-${item.amount}`}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <p className="text-muted-foreground">{item.label}</p>
              </div>
            </div>
            <div>
              <p className="">{formatAmount(item.amount)}</p>
              <p className="text-xs text-muted-foreground text-right h-4">
                {item.quantity &&
                  `${item.quantity} ${item.quantityLabel || 'vendas'}`}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
      {total > 0 && (
        <CardFooter className="flex flex-col gap-4">
          <Separator />
          <div className="flex items-center justify-between w-full">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="text-lg font-bold text-foreground">
                {formatAmount(total)}
              </p>
              {totalQuantity > 0 && (
                <p className="text-muted-foreground text-right text-xs">
                  {totalQuantity} {items[0].quantityLabel || 'vendas'}
                </p>
              )}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
