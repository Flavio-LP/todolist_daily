module RecurringTasks
  class Create
    include Interactor

    def call
      recurring_task = RecurringTask.new(context.params)
      context.fail!(errors: recurring_task.errors.full_messages) unless recurring_task.save
      context.recurring_task = recurring_task
    end
  end
end
