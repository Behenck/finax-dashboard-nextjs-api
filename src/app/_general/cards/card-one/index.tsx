import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Car, DollarSign, House, Wrench } from 'lucide-react'

export function CardOne() {
  return (
    <Card className="flex flex-col gap-2 flex-1">
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col">
          <CardTitle className="text-lg">Vendas</CardTitle>
          <CardDescription className="text-xs">
            Venda por produto
          </CardDescription>
        </div>
        <div>
          <DollarSign />
        </div>
      </CardHeader>
      <CardContent className=" flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full p-1 bg-foreground text-background">
              <House className="w-[22px] h-[22px]" />
            </div>
            <div>
              <p>Imóvel</p>
            </div>
          </div>
          <div>
            <p className="">R$ 1.000.000,00</p>
            <p className="text-xs text-muted-foreground text-right">
              10 vendas
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full p-1 bg-foreground text-background">
              <Car className="w-[22px] h-[22px]" />
            </div>
            <div>
              <p>Veículo</p>
            </div>
          </div>
          <div>
            <p className="">R$ 600.000,00</p>
            <p className="text-xs text-muted-foreground text-right">6 vendas</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full p-1 bg-foreground text-background">
              <Wrench className="w-[22px] h-[22px]" />
            </div>
            <div>
              <p>Serviço</p>
            </div>
          </div>
          <div>
            <p className="">R$ 100.000,00</p>
            <p className="text-xs text-muted-foreground text-right">1 vendas</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Separator />
        <div className="flex items-center justify-between w-full">
          <p className="text-lg font-bold">Total</p>
          <p className="text-lg font-bold text-foreground">R$ 1.700.000,00</p>
        </div>
      </CardFooter>
    </Card>
  )
}
