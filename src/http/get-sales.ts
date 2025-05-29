import { api } from '@/lib/api-client'

interface getSalesRequest {
  initialDate: string
  finalDate: string
}

interface statusMetrics {
  amount: number
  count?: number
}

export interface SalesMetrics {
  completed: statusMetrics
  pending: statusMetrics
  cancelled: statusMetrics
}

export interface IncomeMetrics {
  completed: statusMetrics
  pending: statusMetrics
  refunded: statusMetrics
}

export interface Metrics {
  sales: SalesMetrics
  income: IncomeMetrics
}

export async function getSales({
  initialDate,
  finalDate,
}: getSalesRequest): Promise<Metrics> {
  const query = new URLSearchParams({
    data_inicio: initialDate,
    data_fim: finalDate,
  }).toString()

  const { data } = await api.get(`/api_dashboard_busca_vendas/?${query}`)

  const sales: SalesMetrics = {
    completed: {
      amount: data.vendas.finalizado.valor,
      count: data.vendas.finalizado.quantidade,
    },
    pending: {
      amount: data.vendas.processando.valor,
      count: data.vendas.processando.quantidade,
    },
    cancelled: {
      amount: data.vendas.cancelados.valor,
      count: data.vendas.cancelados.quantidade,
    },
  }

  const income: IncomeMetrics = {
    completed: {
      amount: data.comissoes.finalizado.valor,
    },
    pending: {
      amount: data.comissoes.processando.valor,
    },
    refunded: {
      amount: data.comissoes.estorno.valor,
    },
  }

  return { sales, income }
}
