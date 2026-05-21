module Tasks
  class Update
    include Interactor

    def call
      task = context.task
      context.fail!(errors: task.errors.full_messages) unless task.update(context.params)
      context.task = task
    end
  end
end
