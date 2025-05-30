'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { DatePickerWithRange } from './components/date-range-picker'
import { Summary } from './components/summary/'
import { useDateRange } from '@/hooks/useDateRange'
import { useSummary } from '@/hooks/useSummary'
import { SummarySkeleton } from './components/summary/summary-skeleton'

export default function Home() {
  const { handleDateClose } = useDateRange()

  const { isLoading, isFetching, lastUpdateSummary, error } = useSummary()

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
          {isLoading && <SummarySkeleton />}
          {error && <SummarySkeleton />}
          {!isLoading && !error && (
            <>
              <p className="text-right text-muted-foreground mr-4">
                {' '}
                {isFetching
                  ? 'Atualizando dados...'
                  : `Última atualização ás ${lastUpdateSummary}`}
              </p>
              <Summary />
            </>
          )}
        </TabsContent>

        <TabsContent value="vendor">
          <p>Em breve: dashboard por vendedor.</p>
        </TabsContent>
      </Tabs>
    </main>
  )
}
