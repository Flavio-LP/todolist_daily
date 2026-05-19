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

      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-4 col-lg-3">
            <CalendarView selectedDate={selectedDate} onDateSelect={setSelectedDate} />
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            <TaskList selectedDate={selectedDate} />
          </div>
        </div>
      </div>

      {showRecurring && (
        <RecurringTasksModal onClose={() => setShowRecurring(false)} />
      )}
    </div>
  )
}
