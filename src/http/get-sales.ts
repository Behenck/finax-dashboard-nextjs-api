import { api } from '@/lib/api-client'

interface getSalesRequest {
  initialDate: string
  finalDate: string
}

interface statusSummary {
  amount: number
  count?: number
  details?: []
  outcome?: number
}

export interface SalesSummary {
  completed: statusSummary
  pending: statusSummary
  cancelled: statusSummary
}

export interface CommissionSummary {
  completed: statusSummary
  pending: statusSummary
  refunded: statusSummary
}

export interface Summary {
  sales: SalesSummary
  commission: CommissionSummary
}

export async function getSales({
  initialDate,
  finalDate,
}: getSalesRequest): Promise<Summary> {
  const query = new URLSearchParams({
    data_inicio: initialDate,
    data_fim: finalDate,
  }).toString()

  const { data } = await api.get(`/api_dashboard_busca_vendas/?${query}`)

  const sales: SalesSummary = {
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

  const commission: CommissionSummary = {
    completed: {
      amount: data.comissoes.finalizado.valor,
      details: data.comissoes.finalizado.detalhes,
      outcome: data.comissoes.finalizado.saida,
    },
    pending: {
      amount: data.comissoes.processando.valor,
    },
    refunded: {
      amount: data.comissoes.estorno.valor,
    },
  }

  return { sales, commission }
}
