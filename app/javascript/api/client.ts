import axios from 'axios'
import type { Task, RecurringTask } from '../types'

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

export const tasksApi = {
  list: (date: string) =>
    api.get<Task[]>('/tasks', { params: { date } }).then(r => r.data),

  create: (data: { title: string; description?: string; date: string }) =>
    api.post<Task>('/tasks', { task: data }).then(r => r.data),

  update: (id: number, data: Partial<Pick<Task, 'title' | 'description' | 'completed' | 'position'>>) =>
    api.patch<Task>(`/tasks/${id}`, { task: data }).then(r => r.data),

  destroy: (id: number) =>
    api.delete(`/tasks/${id}`),
}

export const recurringTasksApi = {
  list: () =>
    api.get<RecurringTask[]>('/recurring_tasks').then(r => r.data),

  create: (data: { title: string; description?: string }) =>
    api.post<RecurringTask>('/recurring_tasks', { recurring_task: data }).then(r => r.data),

  update: (id: number, data: Partial<Pick<RecurringTask, 'title' | 'description' | 'active'>>) =>
    api.patch<RecurringTask>(`/recurring_tasks/${id}`, { recurring_task: data }).then(r => r.data),

  destroy: (id: number) =>
    api.delete(`/recurring_tasks/${id}`),
}
