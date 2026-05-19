export interface Task {
  id: number
  title: string
  description: string | null
  completed: boolean
  date: string
  position: number
  recurring_task_id: number | null
}

export interface RecurringTask {
  id: number
  title: string
  description: string | null
  active: boolean
  created_at: string
}
