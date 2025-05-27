import { api } from '@/lib/api-client'

interface getSalesRequest {
  initialDate: string
  finalDate: string
}

export async function getSales({ initialDate, finalDate }: getSalesRequest) {
  const query = new URLSearchParams({
    data_inicio: initialDate,
    data_fim: finalDate,
  }).toString()

  const res = await api.get(`/api_dashboard_busca_vendas/?${query}`)
  return res.data
}
