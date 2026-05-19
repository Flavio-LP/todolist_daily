import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { tasksApi } from '../api/client'
import { TaskItem } from './TaskItem'
import { AddTaskForm } from './AddTaskForm'

interface Props {
  selectedDate: Date
}

export function TaskList({ selectedDate }: Props) {
  const dateStr = format(selectedDate, 'yyyy-MM-dd')
  const dateLabel = format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })

  const { data: tasks, isLoading, isError } = useQuery({
    queryKey: ['tasks', dateStr],
    queryFn: () => tasksApi.list(dateStr),
  })

  const completed = tasks?.filter(t => t.completed).length ?? 0
  const total = tasks?.length ?? 0

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0 text-capitalize">{dateLabel}</h5>
          {total > 0 && (
            <small className="text-muted">{completed}/{total} concluídas</small>
          )}
        </div>
        {total > 0 && (
          <div className="progress" style={{ width: 80, height: 6 }}>
            <div
              className="progress-bar bg-success"
              style={{ width: `${(completed / total) * 100}%` }}
            />
          </div>
        )}
      </div>

      <div className="card-body p-0">
        {isLoading && (
          <div className="text-center py-4">
            <div className="spinner-border spinner-border-sm text-primary" />
          </div>
        )}

        {isError && (
          <div className="alert alert-danger m-3 mb-0">Erro ao carregar tarefas.</div>
        )}

        {tasks && tasks.length === 0 && (
          <p className="text-muted text-center py-4 mb-0">Nenhuma tarefa para este dia.</p>
        )}

        {tasks && tasks.length > 0 && (
          <ul className="list-group list-group-flush">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} date={dateStr} />
            ))}
          </ul>
        )}
      </div>

      <div className="card-footer bg-white">
        <AddTaskForm date={dateStr} />
      </div>
    </div>
  )
}
