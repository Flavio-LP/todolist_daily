import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { recurringTasksApi } from '../api/client'
import type { RecurringTask } from '../types'

interface Props {
  onClose: () => void
}

export function RecurringTasksModal({ onClose }: Props) {
  const [newTitle, setNewTitle] = useState('')
  const queryClient = useQueryClient()

  const { data: recurringTasks, isLoading } = useQuery({
    queryKey: ['recurring_tasks'],
    queryFn: recurringTasksApi.list,
  })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['recurring_tasks'] })

  const createMutation = useMutation({
    mutationFn: () => recurringTasksApi.create({ title: newTitle }),
    onSuccess: () => { invalidate(); setNewTitle('') },
  })

  const toggleMutation = useMutation({
    mutationFn: (rt: RecurringTask) =>
      recurringTasksApi.update(rt.id, { active: !rt.active }),
    onSuccess: invalidate,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => recurringTasksApi.destroy(id),
    onSuccess: invalidate,
  })

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTitle.trim()) createMutation.mutate()
  }

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Tarefas Recorrentes</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <p className="text-muted small mb-3">
              Estas tarefas são criadas automaticamente em todos os dias.
            </p>

            {isLoading && (
              <div className="text-center py-3">
                <div className="spinner-border spinner-border-sm text-primary" />
              </div>
            )}

            <ul className="list-group list-group-flush mb-3">
              {recurringTasks?.map(rt => (
                <li key={rt.id} className="list-group-item d-flex align-items-center gap-2 px-0">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={rt.active}
                    onChange={() => toggleMutation.mutate(rt)}
                    title={rt.active ? 'Desativar' : 'Ativar'}
                  />
                  <span className={`flex-grow-1 ${!rt.active ? 'text-muted text-decoration-line-through' : ''}`}>
                    {rt.title}
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm py-0 px-1"
                    onClick={() => deleteMutation.mutate(rt.id)}
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>

            <form onSubmit={handleCreate}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Nova tarefa recorrente..."
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  disabled={createMutation.isPending}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={createMutation.isPending || !newTitle.trim()}
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
