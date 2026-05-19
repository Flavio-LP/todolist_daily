import React from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  getDay,
  addMonths,
  subMonths,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Props {
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

export function CalendarView({ selectedDate, onDateSelect }: Props) {
  const [viewMonth, setViewMonth] = React.useState(new Date())

  const days = eachDayOfInterval({
    start: startOfMonth(viewMonth),
    end: endOfMonth(viewMonth),
  })

  const startPad = getDay(startOfMonth(viewMonth))

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => setViewMonth(subMonths(viewMonth, 1))}
        >
          ‹
        </button>
        <span className="fw-semibold text-capitalize">
          {format(viewMonth, 'MMMM yyyy', { locale: ptBR })}
        </span>
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
        >
          ›
        </button>
      </div>

      <div className="card-body p-2">
        <div className="row row-cols-7 g-0 text-center mb-1">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
            <div key={i} className="col">
              <small className="text-muted fw-semibold">{d}</small>
            </div>
          ))}
        </div>

        <div className="row row-cols-7 g-0 text-center">
          {Array.from({ length: startPad }).map((_, i) => (
            <div key={`pad-${i}`} className="col" />
          ))}
          {days.map(day => {
            const isSelected = isSameDay(day, selectedDate)
            const today = isToday(day)

            return (
              <div key={day.toISOString()} className="col p-1">
                <button
                  onClick={() => onDateSelect(day)}
                  className={[
                    'btn btn-sm w-100 p-1 rounded-circle',
                    isSelected ? 'btn-primary' : today ? 'btn-outline-primary' : 'btn-light',
                  ].join(' ')}
                  style={{ aspectRatio: '1', fontSize: '0.8rem' }}
                >
                  {format(day, 'd')}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
