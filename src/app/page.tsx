'use client'

import { useState, useCallback } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { DatePickerWithRange } from './components/date-range-picker'
import { CardTop } from './_general/cards/card-top'
import {
  CalendarClock,
  CheckCircle,
  DollarSign,
  LoaderCircle,
  RotateCcw,
  XCircle,
} from 'lucide-react'
import { useDashboardData } from '@/hooks/useDashboardData'
import { endOfMonth, format, startOfYear } from 'date-fns'

export default function Home() {
  const [range, setRange] = useState<{ initial: string; final: string }>(() => {
    const now = new Date()
    const initial = format(startOfYear(now), 'yyyy-MM-dd')
    const final = format(endOfMonth(now), 'yyyy-MM-dd')

    return { initial, final }
  })

  const { income, sales, totals, isLoading, error } = useDashboardData({
    initialDate: range.initial,
    finalDate: range.final,
  })

  const handleDateClose = useCallback(
    (payload: { initialDate: string | null; finalDate: string | null }) => {
      const { initialDate, finalDate } = payload
      if (initialDate && finalDate) {
        setRange({ initial: initialDate, final: finalDate })
      } else {
        console.warn('Datas inválidas, pulando atualização de intervalo')
      }
    },
    [],
  )

  const cardsConfig = [
    {
      title: 'Vendas',
      description: 'Resumo de vendas',
      icon: <DollarSign />,
      total: totals.totalSales,
      totalQuantity: totals.totalSalesCount,
      items: [
        {
          label: 'Finalizadas',
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          amount: sales?.completed.amount ?? 0,
          quantity: sales?.completed.count ?? 0,
          quantityLabel: 'vendas',
        },
        {
          label: 'Em processamento',
          icon: <LoaderCircle className="w-4 h-4 text-yellow-500" />,
          amount: sales?.pending.amount ?? 0,
          quantity: sales?.pending.count ?? 0,
          quantityLabel: 'vendas',
        },
      ],
    },
    {
      title: 'Cancelamentos',
      description: 'Resumo de cancelamentos',
      icon: <XCircle />,
      items: [
        {
          label: 'Créditos cancelados',
          icon: <XCircle className="w-4 h-4 text-red-500" />,
          amount: sales?.cancelled.amount ?? 0,
          quantity: sales?.cancelled.count ?? 0,
          quantityLabel: 'vendas',
        },
        {
          label: 'Estornos',
          icon: <RotateCcw className="w-4 h-4 text-purple-500" />,
          amount: income?.refunded.amount ?? 0,
          quantityLabel: 'vendas',
        },
      ],
    },
    {
      title: 'Venda líquida',
      description: 'Resumo de vendas líquidas',
      icon: <DollarSign />,
      total: totals.netSalesAmount,
      totalQuantity: totals.netSalesCount,
      items: [
        {
          label: 'Finalizadas',
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          amount: sales?.completed.amount ?? 0,
          quantity: sales?.completed.count ?? 0,
          quantityLabel: 'vendas',
        },
        {
          label: 'Canceladas',
          icon: <XCircle className="w-4 h-4 text-red-500" />,
          amount: sales?.cancelled.amount ?? 0,
          quantity: sales?.cancelled.count ?? 0,
          quantityLabel: 'vendas',
        },
      ],
    },
    {
      title: 'Receitas futuras',
      description: 'Resumo de receitas futuras',
      icon: <CalendarClock />,
      total: totals.futureIncomeAmount,
      items: [
        {
          label: 'Finalizadas',
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          amount: income?.completed.amount ?? 0,
          quantityLabel: 'vendas',
        },
      ],
    },
  ]

  return (
    <main className="flex flex-col min-h-screen p-4 gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl">Dashboard</h1>
        <DatePickerWithRange onClose={handleDateClose} />
      </header>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger
            value="general"
            className="data-[state=active]:!bg-black"
          >
            Geral
          </TabsTrigger>
          <TabsTrigger value="vendor" className="data-[state=active]:!bg-black">
            Vendedores
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          {error && (
            <p className="text-red-500">
              Erro ao carregar dados: {error.message}
            </p>
          )}
          <div
            className={`flex flex-wrap gap-4 ${isLoading ? 'blur-xs pointer-events-none' : ''}`}
          >
            {cardsConfig.map((cfg) => (
              <CardTop key={cfg.title} {...cfg} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vendor">
          <p>Em breve: dashboard por vendedor.</p>
        </TabsContent>
      </Tabs>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center">
          <LoaderCircle className="w-12 h-12 animate-spin text-gray-400" />
        </div>
      )}
    </main>
  )
}
