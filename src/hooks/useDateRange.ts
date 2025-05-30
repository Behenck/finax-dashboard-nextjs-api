'use client'

import { useState, useCallback, useMemo } from 'react'
import { format, startOfYear, endOfMonth } from 'date-fns'

export function useDateRange() {
  // 1) Estado interno para as datas
  const [range, setRange] = useState(() => {
    const now = new Date()
    const initial = format(startOfYear(now), 'yyyy-MM-dd')
    const final = format(endOfMonth(now), 'yyyy-MM-dd')
    return { initial, final }
  })

  // 2) Callback para ser chamado quando o DatePicker fechar
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

  // 3) Memoiza os valores formatados para não recriar o objeto a cada render
  const memoized = useMemo(
    () => ({
      initialDate: range.initial,
      finalDate: range.final,
      handleDateClose,
    }),
    [range, handleDateClose],
  )

  return memoized
}
