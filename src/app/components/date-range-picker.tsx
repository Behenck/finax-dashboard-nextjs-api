'use client'

import * as React from 'react'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: (payload: {
    initialDate: string | null
    finalDate: string | null
  }) => void
}

export function DatePickerWithRange({
  className,
  onClose,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 1),
    to: addDays(new Date(2025, 3, 41), 20),
  })

  function handleClose() {
    const initialDate = date?.from ? format(date.from, 'yyyy-MM-dd') : null
    const finalDate = date?.to ? format(date.to, 'yyyy-MM-dd') : null

    if (onClose) onClose({ initialDate, finalDate })
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover
        onOpenChange={(open) => {
          if (!open) handleClose()
        }}
      >
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} –{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
