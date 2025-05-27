'use client'

import { useState } from 'react'
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
import {
  CommissionsResponse,
  getSalesData,
  SalesResponse,
} from './components/action'

export default function Home() {
  const [vendas, setVendas] = useState<SalesResponse | null>(null)
  const [comissoes, setComissoes] = useState<CommissionsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const totalVendas =
    (vendas?.finalizado?.valor ?? 0) + (vendas?.processando?.valor ?? 0)
  const totalLiquido =
    (vendas?.finalizado?.valor ?? 0) - (vendas?.cancelados?.valor ?? 0)
  const totalQuantidadeVendas =
    (vendas?.finalizado?.quantidade ?? 0) +
    (vendas?.processando?.quantidade ?? 0)
  const totalQuantidadeLiquido =
    (vendas?.finalizado?.quantidade ?? 0) -
    (vendas?.cancelados?.quantidade ?? 0)
  const totalReceitasFuturas =
    (comissoes?.finalizado?.valor ?? 0) - (comissoes?.processando?.valor ?? 0)
  const handleDateClose = async ({
    initialDate,
    finalDate,
  }: {
    initialDate: string | null
    finalDate: string | null
  }) => {
    if (!initialDate || !finalDate) {
      console.warn('Datas inválidas, pulando requisição')
      return
    }

    setIsLoading(true)
    try {
      const data = await getSalesData({ initialDate, finalDate })
      setVendas(data.vendas)
      setComissoes(data.comissoes)
    } catch (err) {
      console.error('Erro ao buscar vendas:', err)
      setVendas(null)
      setComissoes(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex flex-col min-h-screen max-2xl p-4 gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl">Dashboard</h1>

        <DatePickerWithRange onClose={handleDateClose} />
      </header>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger
            value="general"
            className="data-[state=active]:!bg-black transition-colors"
          >
            Geral
          </TabsTrigger>
          <TabsTrigger
            value="vendor"
            className="data-[state=active]:!bg-black transition-colors"
          >
            Vendedores
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          {/* container que recebe blur quando isLoading=true */}
          <div
            className={`flex gap-4 transition-all ${
              isLoading ? 'filter blur-sm pointer-events-none' : ''
            }`}
          >
            {vendas && comissoes ? (
              <>
                <CardTop
                  title="Vendas"
                  description="Resumo de vendas"
                  icon={<DollarSign />}
                  total={totalVendas}
                  totalQuantity={totalQuantidadeVendas}
                  items={[
                    {
                      label: 'Finalizadas',
                      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
                      amount: vendas.finalizado.valor,
                      quantity: vendas.finalizado.quantidade,
                      quantityLabel: 'vendas',
                    },
                    {
                      label: 'Em processamento',
                      icon: (
                        <LoaderCircle className="w-4 h-4 animate-spin text-yellow-500" />
                      ),
                      amount: vendas.processando.valor,
                      quantity: vendas.processando.quantidade,
                      quantityLabel: 'vendas',
                    },
                  ]}
                />

                <CardTop
                  title="Cancelamentos"
                  description="Resumo de cancelamentos"
                  icon={<XCircle />}
                  items={[
                    {
                      label: 'Créditos cancelados',
                      icon: <XCircle className="w-4 h-4 text-red-500" />,
                      amount: vendas.cancelados.valor,
                      quantity: vendas.cancelados.quantidade,
                      quantityLabel: 'vendas',
                    },
                    {
                      label: 'Estornos',
                      icon: <RotateCcw className="w-4 h-4 text-purple-500" />,
                      amount: comissoes.estorno.valor,
                      quantityLabel: 'vendas',
                    },
                  ]}
                />

                <CardTop
                  title="Venda líquida"
                  description="Resumo de vendas líquidas"
                  icon={<DollarSign />}
                  total={totalLiquido}
                  totalQuantity={totalQuantidadeLiquido}
                  items={[
                    {
                      label: 'Finalizadas',
                      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
                      amount: vendas.finalizado.valor,
                      quantity: vendas.finalizado.quantidade,
                      quantityLabel: 'vendas',
                    },
                    {
                      label: 'Canceladas',
                      icon: <XCircle className="w-4 h-4 text-red-500" />,
                      amount: vendas.cancelados.valor,
                      quantity: vendas.cancelados.quantidade,
                      quantityLabel: 'vendas',
                    },
                  ]}
                />

                <CardTop
                  title="Receitas futuras"
                  description="Resumo de receitas futuras"
                  icon={<CalendarClock />}
                  total={totalReceitasFuturas}
                  items={[
                    {
                      label: 'Finalizadas',
                      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
                      amount: comissoes.finalizado.valor,
                      quantityLabel: 'vendas',
                    },
                    {
                      label: 'Em processamento',
                      icon: (
                        <LoaderCircle className="w-4 h-4 animate-spin text-yellow-500" />
                      ),
                      amount: comissoes.processando.valor,
                      quantityLabel: 'vendas',
                    },
                  ]}
                />
              </>
            ) : (
              <p>Nada disponível. Selecione um intervalo de datas.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="vendor">Dashboard de vendedores.</TabsContent>
      </Tabs>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          {/* Opcional: um spinner centralizado por cima */}
          <LoaderCircle className="w-12 h-12 animate-spin text-gray-400" />
        </div>
      )}
    </main>
  )
}
