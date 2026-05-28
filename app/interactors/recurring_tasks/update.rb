module RecurringTasks
  class Update
    include Interactor

    def call
      recurring_task = context.recurring_task
      context.fail!(errors: recurring_task.errors.full_messages) unless recurring_task.update(context.params)
      context.recurring_task = recurring_task
    end
  end
end
