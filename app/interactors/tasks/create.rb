module Tasks
  class Create
    include Interactor

    def call
      task = Task.new(context.params)
      context.fail!(errors: task.errors.full_messages) unless task.save
      context.task = task
    end
  end
end
