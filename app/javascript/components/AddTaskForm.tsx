import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { tasksApi } from '../api/client'

interface Props {
  date: string
}

export function AddTaskForm({ date }: Props) {
  const [title, setTitle] = useState('')
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => tasksApi.create({ title, date }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', date] })
      setTitle('')
      setOpen(false)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) mutation.mutate()
  }

  if (!open) {
    return (
      <button
        className="btn btn-outline-primary btn-sm w-100 mt-2"
        onClick={() => setOpen(true)}
      >
        + Adicionar tarefa
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="input-group">
        <input
          autoFocus
          type="text"
          className="form-control form-control-sm"
          placeholder="Nome da tarefa..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={mutation.isPending}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={mutation.isPending || !title.trim()}
        >
          {mutation.isPending ? '...' : 'Adicionar'}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => { setOpen(false); setTitle('') }}
        >
          ✕
        </button>
      </div>
      {mutation.isError && (
        <small className="text-danger">Erro ao criar tarefa.</small>
      )}
    </form>
  )
}
