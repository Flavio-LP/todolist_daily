import React from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
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
  const selectedRef = React.useRef<HTMLButtonElement>(null)

  const days = eachDayOfInterval({
    start: startOfMonth(viewMonth),
    end: endOfMonth(viewMonth),
  })

  React.useEffect(() => {
    selectedRef.current?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' })
  }, [selectedDate, viewMonth])

  return (
    <div className="bg-primary text-white px-3 py-2 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => setViewMonth(subMonths(viewMonth, 1))}
        >
          ‹
        </button>
        <span className="fw-semibold text-capitalize" style={{ fontSize: '0.9rem' }}>
          {format(viewMonth, 'MMMM yyyy', { locale: ptBR })}
        </span>
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
        >
          ›
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: 4,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {days.map(day => {
          const isSelected = isSameDay(day, selectedDate)
          const today = isToday(day)

          return (
            <button
              key={day.toISOString()}
              ref={isSelected ? selectedRef : null}
              onClick={() => onDateSelect(day)}
              style={{
                minWidth: 52,
                flexShrink: 0,
                background: isSelected ? 'white' : 'transparent',
                color: isSelected ? 'var(--bs-primary)' : 'white',
                border: today && !isSelected ? '1px solid rgba(255,255,255,0.7)' : 'none',
                borderRadius: 8,
                cursor: 'pointer',
                padding: '4px 6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <small style={{ fontSize: '0.65rem', opacity: isSelected ? 1 : 0.85, textTransform: 'capitalize' }}>
                {format(day, 'EEE', { locale: ptBR })}
              </small>
              <span style={{ fontSize: '1rem', fontWeight: isSelected || today ? 700 : 400 }}>
                {format(day, 'd')}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
