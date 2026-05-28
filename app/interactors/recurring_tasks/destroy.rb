module RecurringTasks
  class Destroy
    include Interactor

    def call
      context.recurring_task.destroy
    end
  end
end
