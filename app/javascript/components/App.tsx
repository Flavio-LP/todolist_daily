import { useState } from 'react'
import { CalendarView } from './CalendarView'
import { TaskList } from './TaskList'
import { RecurringTasksModal } from './RecurringTasksModal'

export function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showRecurring, setShowRecurring] = useState(false)

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">📅 Daily Tasks</span>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => setShowRecurring(true)}
          >
            ⟳ Recorrentes
          </button>
        </div>
      </nav>

      <CalendarView selectedDate={selectedDate} onDateSelect={setSelectedDate} />

      <div className="container py-4">
        <TaskList selectedDate={selectedDate} />
      </div>

      {showRecurring && (
        <RecurringTasksModal onClose={() => setShowRecurring(false)} />
      )}
    </div>
  )
}
