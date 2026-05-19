import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { tasksApi } from '../api/client'
import type { Task } from '../types'

interface Props {
  task: Task
  date: string
}

export function TaskItem({ task, date }: Props) {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const queryClient = useQueryClient()

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['tasks', date] })

  const toggleMutation = useMutation({
    mutationFn: () => tasksApi.update(task.id, { completed: !task.completed }),
    onSuccess: invalidate,
  })

  const editMutation = useMutation({
    mutationFn: () => tasksApi.update(task.id, { title: editTitle }),
    onSuccess: () => { invalidate(); setEditing(false) },
  })

  const deleteMutation = useMutation({
    mutationFn: () => tasksApi.destroy(task.id),
    onSuccess: invalidate,
  })

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editTitle.trim()) editMutation.mutate()
  }

  return (
    <li className={`list-group-item d-flex align-items-center gap-2 px-3 py-2 ${task.completed ? 'bg-light' : ''}`}>
      <input
        type="checkbox"
        className="form-check-input flex-shrink-0"
        checked={task.completed}
        onChange={() => toggleMutation.mutate()}
        disabled={toggleMutation.isPending}
      />

      {editing ? (
        <form onSubmit={handleEditSubmit} className="flex-grow-1 d-flex gap-1">
          <input
            autoFocus
            type="text"
            className="form-control form-control-sm"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
          />
          <button type="submit" className="btn btn-success btn-sm" disabled={editMutation.isPending}>
            ✓
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => { setEditing(false); setEditTitle(task.title) }}
          >
            ✕
          </button>
        </form>
      ) : (
        <>
          <span className={`flex-grow-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
            {task.title}
            {task.recurring_task_id && (
              <span className="badge bg-secondary ms-2" style={{ fontSize: '0.65rem' }}>recorrente</span>
            )}
          </span>
          <button
            className="btn btn-outline-secondary btn-sm py-0 px-1"
            onClick={() => setEditing(true)}
            title="Editar"
          >
            ✏️
          </button>
          <button
            className="btn btn-outline-danger btn-sm py-0 px-1"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            title="Excluir"
          >
            🗑️
          </button>
        </>
      )}
    </li>
  )
}
