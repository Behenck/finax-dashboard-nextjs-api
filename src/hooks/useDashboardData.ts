import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  getSales,
  Metrics,
  SalesMetrics,
  IncomeMetrics,
} from '@/http/get-sales'

export interface DashboardParams {
  initialDate: string
  finalDate: string
}

export function useDashboardData({ initialDate, finalDate }: DashboardParams) {
  const { data, isLoading, error } = useQuery<
    Metrics,
    Error,
    { sales: SalesMetrics; income: IncomeMetrics }
  >({
    queryKey: ['dashboard', initialDate, finalDate],
    queryFn: () => getSales({ initialDate, finalDate }),
    select: ({ sales, income }) => ({
      sales: {
        completed: {
          amount: sales.completed.amount,
          count: sales.completed.count ?? 0,
        },
        pending: {
          amount: sales.pending.amount,
          count: sales.pending.count ?? 0,
        },
        cancelled: {
          amount: sales.cancelled.amount,
          count: sales.cancelled.count ?? 0,
        },
      },
      income: {
        completed: {
          amount: income.completed.amount,
          count: income.completed.count ?? 0,
        },
        pending: {
          amount: income.pending.amount,
          count: income.pending.count ?? 0,
        },
        refunded: {
          amount: income.refunded?.amount ?? 0,
          count: income.refunded?.count ?? 0,
        },
      },
    }),
  })

  const totals = useMemo(
    () => ({
      totalSales:
        (data?.sales.completed.amount ?? 0) + (data?.sales.pending.amount ?? 0),

      netSalesAmount:
        (data?.sales.completed.amount ?? 0) -
        (data?.sales.cancelled.amount ?? 0),

      totalSalesCount:
        (data?.sales.completed.count ?? 0) + (data?.sales.pending.count ?? 0),

      netSalesCount:
        (data?.sales.completed.count ?? 0) - (data?.sales.cancelled.count ?? 0),

      futureIncomeAmount:
        (data?.income.completed.amount ?? 0) +
        (data?.income.pending.amount ?? 0),

      futureIncomeCount:
        (data?.income.completed.count ?? 0) + (data?.income.pending.count ?? 0),
    }),
    [data],
  )

  return {
    sales: data?.sales,
    income: data?.income,
    totals,
    isLoading,
    error,
  }
}
