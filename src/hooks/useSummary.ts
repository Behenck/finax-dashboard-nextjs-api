import { useMemo } from 'react'

import {
  getSales,
  Summary,
  SalesSummary,
  CommissionSummary,
} from '@/http/get-sales'
import { useQuery } from '@tanstack/react-query'
import { useDateRange } from './useDateRange'
import { format } from 'date-fns'

export function useSummary() {
  const { initialDate, finalDate } = useDateRange()

  const { data, isLoading, error, isFetching } = useQuery<
    Summary,
    Error,
    {
      sales: SalesSummary
      commission: CommissionSummary
    }
  >({
    queryKey: ['dashboard', initialDate, finalDate],
    queryFn: () => getSales({ initialDate, finalDate }),
    select: ({ sales, commission }) => ({
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
      commission: {
        completed: {
          amount: commission.completed.amount,
          details: commission.completed.details,
          outcome: commission.completed.outcome,
        },
        pending: {
          amount: commission.pending.amount,
        },
        refunded: {
          amount: commission.refunded?.amount ?? 0,
        },
      },
    }),
  })

  const summary = useMemo(() => {
    const sales = data?.sales ?? {
      completed: { amount: 0, count: 0 },
      pending: { amount: 0, count: 0 },
      cancelled: { amount: 0, count: 0 },
    }
    const commission = data?.commission ?? {
      completed: { amount: 0, details: [], outcome: 0 },
      pending: { amount: 0 },
      refunded: { amount: 0 },
    }

    const lastUpdateSummary = format(new Date(), 'HH:mm')

    const totalSales = sales.completed.amount + sales.pending.amount
    const netSalesAmount = sales.completed.amount - sales.cancelled.amount
    const totalSalesCount =
      (sales.completed.count ?? 0) + (sales.pending.count ?? 0)
    const netSalesCount =
      (sales.completed.count ?? 0) - (sales.cancelled.count ?? 0)
    const futureCommissionAmount =
      commission.completed.amount -
      (commission.completed.outcome ?? 0) -
      commission.refunded.amount

    return {
      sales,
      commission,

      totalSales,
      netSalesAmount,
      totalSalesCount,
      netSalesCount,
      futureCommissionAmount,

      lastUpdateSummary,

      isLoading,
      isFetching,
      error,
    }
  }, [data, isLoading, isFetching, error])

  return summary
}
