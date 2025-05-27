'use server'

import { api } from '@/lib/api-client'

interface getSalesRequest {
  initialDate: string
  finalDate: string
}

export interface SalesResponse {
  finalizado: { valor: number; quantidade: number }
  processando: { valor: number; quantidade: number }
  cancelados: { valor: number; quantidade: number }
}
export interface CommissionsResponse {
  finalizado: { valor: number; quantidade: number }
  processando: { valor: number; quantidade: number }
  estorno: { valor: number }
}

interface ResponseData {
  vendas: SalesResponse
  comissoes: CommissionsResponse
}

export async function getSalesData({
  initialDate,
  finalDate,
}: getSalesRequest): Promise<ResponseData> {
  const query = new URLSearchParams({
    data_inicio: initialDate,
    data_fim: finalDate,
  }).toString()

  const res = await api.get(`/api_dashboard_busca_vendas/?${query}`)
  console.log(res.data)
  return res.data
}
