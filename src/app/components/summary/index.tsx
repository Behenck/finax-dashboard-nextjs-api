import { Card, CardContent } from '@/components/ui/card'
import {
  CalendarClock,
  CheckCircle,
  CircleArrowDown,
  CircleArrowUp,
  DollarSign,
  LoaderCircle,
  RotateCcw,
  XCircle,
} from 'lucide-react'
import { SummaryHeader } from './summary-header'
import { SummaryFooter } from './summary-footer'
import { SummaryRowContent } from './summary-row-content'
import { useSummary } from '@/hooks/useSummary'

export function Summary() {
  const {
    sales,
    commission,
    totalSales,
    netSalesAmount,
    totalSalesCount,
    netSalesCount,
    futureCommissionAmount,
  } = useSummary()

  return (
    <div className="flex gap-4 flex-wrap">
      <Card className="flex flex-1 gap-2">
        <SummaryHeader
          title="Vendas"
          description="Resumo de vendas"
          icon={<DollarSign />}
        />
        <CardContent className="flex flex-col gap-4">
          <SummaryRowContent
            title="Finalizadas"
            icon={<CheckCircle className="w-4 h-4 text-green-500" />}
            total={sales.completed.amount}
            totalDescription={`${sales.completed.count} vendas`}
          />
          <SummaryRowContent
            title="Em processamento"
            icon={<LoaderCircle className="w-4 h-4 text-yellow-500" />}
            total={sales.pending.amount}
            totalDescription={`${sales.pending.count} vendas`}
          />
        </CardContent>
        {!!totalSales && (
          <SummaryFooter
            total={totalSales}
            totalDescription={`${totalSalesCount} vendas`}
          />
        )}
      </Card>

      <Card className="flex flex-1 gap-2">
        <SummaryHeader
          title="Cancelamentos"
          description="Resumo de cancelamentos e estornos"
          icon={<XCircle />}
        />
        <CardContent className="flex flex-col gap-4">
          <SummaryRowContent
            title="Créditos cancelados"
            icon={<XCircle className="w-4 h-4 text-red-500" />}
            total={sales.cancelled.amount}
            totalDescription={`${sales.cancelled.count} vendas`}
          />
          <SummaryRowContent
            title="Estornos"
            icon={<RotateCcw className="w-4 h-4 text-purple-500" />}
            total={commission.refunded.amount}
          />
        </CardContent>
      </Card>

      <Card className="flex flex-1 gap-2">
        <SummaryHeader
          title="Venda Líquida"
          description="Resumo de vendas líquidas"
          icon={<DollarSign />}
        />
        <CardContent className="flex flex-col gap-4">
          <SummaryRowContent
            title="Finalizadas"
            icon={<CheckCircle className="w-4 h-4 text-green-500" />}
            total={sales.completed.amount}
            totalDescription={`${sales.completed.count} vendas`}
          />
          <SummaryRowContent
            title="Canceladas"
            icon={<XCircle className="w-4 h-4 text-red-500" />}
            total={sales.cancelled.amount}
            totalDescription={`${sales.cancelled.count} vendas`}
          />
        </CardContent>
        {!!netSalesAmount && (
          <SummaryFooter
            total={netSalesAmount}
            totalDescription={`${netSalesCount} vendas`}
          />
        )}
      </Card>

      <Card className="flex flex-1 gap-2">
        <SummaryHeader
          title="Receitas Futuras"
          description="Resumo de receitas"
          icon={<CalendarClock />}
        />
        <CardContent className="flex flex-col">
          <SummaryRowContent
            title="Comissões"
            icon={<CircleArrowUp className="w-4 h-4 text-green-500" />}
            total={commission.completed.amount}
          />
          <SummaryRowContent
            title="Comissões"
            icon={<CircleArrowDown className="w-4 h-4 text-red-500" />}
            total={commission.completed.outcome ?? 0}
          />
          <SummaryRowContent
            title="Estornos"
            icon={<RotateCcw className="w-4 h-4 text-purple-500" />}
            total={commission.refunded.amount}
          />
        </CardContent>
        {!!futureCommissionAmount && (
          <SummaryFooter total={futureCommissionAmount} />
        )}
      </Card>
    </div>
  )
}
