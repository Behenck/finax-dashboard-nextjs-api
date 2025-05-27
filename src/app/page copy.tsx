'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { useState } from 'react'
import { getSales } from '@/http/get-sales'

export default function Home() {
  const [range, setRange] = useState<{
    initialDate: string | null
    finalDate: string | null
  }>({ initialDate: null, finalDate: null })

  async function fetchSales() {
    if (!range.initialDate || !range.finalDate) return
    try {
      const data = await getSales({
        initialDate: range.initialDate,
        finalDate: range.finalDate,
      })
      console.log('Vendas:', data)
      // aqui você atualizaria estado pra renderizar seus cards, etc.
    } catch (err) {
      console.error('Erro ao buscar vendas:', err)
    }
  }

  return (
    <main className="flex flex-col min-h-screen max-2xl p-4 gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl">Dashboard</h1>

        <DatePickerWithRange
          onClose={({ initialDate, finalDate }) => {
            setRange({ initialDate, finalDate })
            console.log('initialDate:', initialDate)
            console.log('finalDate:  ', finalDate)
          }}
        />

        <button
          onClick={fetchSales}
          disabled={!range.initialDate || !range.finalDate}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          Buscar vendas
        </button>
      </header>
      <div>
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger
              value="general"
              className="
                  data-[state=active]:!bg-black
                  transition-colors
                "
            >
              Geral
            </TabsTrigger>
            <TabsTrigger
              value="vendor"
              className="
                  data-[state=active]:!bg-black
                  transition-colors
                "
            >
              Vendedores
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="flex gap-4">
              <CardTop
                key={1}
                title="Vendas"
                description="Resumo de vendas"
                icon={<DollarSign />}
                items={[
                  {
                    label: 'Finalizadas',
                    icon: <CheckCircle className="w-4 h-4 text-green-500" />,
                    amount: 1000000,
                    quantity: 10,
                    quantityLabel: 'vendas',
                  },
                  {
                    label: 'Em processamento',
                    icon: (
                      <LoaderCircle className="w-4 h-4 animate-spin text-yellow-500" />
                    ),
                    amount: 600000,
                    quantity: 6,
                    quantityLabel: 'vendas',
                  },
                ]}
              />
              <CardTop
                key={1}
                title="Cancelamentos"
                description="Resumo de cancelamentos"
                icon={<XCircle />}
                isTotal={false}
                items={[
                  {
                    label: 'Créditos cancelados',
                    icon: <XCircle className="w-4 h-4 text-red-500" />,
                    amount: 1000000,
                    quantity: 10,
                    quantityLabel: 'vendas',
                  },
                  {
                    label: 'Estornos',
                    icon: <RotateCcw className="w-4 h-4 text-purple-500" />,
                    amount: 600000,
                  },
                ]}
              />
              <CardTop
                key={1}
                title="Venda líquida"
                description="Resumo de vendas líquidas"
                icon={<DollarSign />}
                items={[
                  {
                    label: 'Finalizadas',
                    icon: <CheckCircle className="w-4 h-4 text-green-500" />,
                    amount: 1000000,
                    quantity: 10,
                    quantityLabel: 'vendas',
                  },
                  {
                    label: 'Canceladas',
                    icon: <XCircle className="w-4 h-4 text-red-500" />,
                    amount: 600000,
                    quantity: 6,
                    quantityLabel: 'vendas',
                  },
                ]}
              />
              <CardTop
                key={1}
                title="Receitas futuras"
                description="Resumo de receitas futuras"
                icon={<CalendarClock />}
                items={[
                  {
                    label: 'Finalizadas',
                    icon: <CheckCircle className="w-4 h-4 text-green-500" />,
                    amount: 1000000,
                    quantity: 10,
                    quantityLabel: 'vendas',
                  },
                  {
                    label: 'Em processamento',
                    icon: (
                      <LoaderCircle className="w-4 h-4 animate-spin text-yellow-500" />
                    ),
                    amount: 600000,
                    quantity: 6,
                    quantityLabel: 'vendas',
                  },
                ]}
              />
            </div>
          </TabsContent>
          <TabsContent value="vendor">Dashboard de vendedores.</TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
