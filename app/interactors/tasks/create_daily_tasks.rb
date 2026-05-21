module Tasks
  class CreateDailyTasks
    include Interactor

    def call
      date = context.date
      return if Task.where(date: date).exists?

      RecurringTask.active.each do |recurring_task|
        Task.find_or_create_by!(recurring_task_id: recurring_task.id, date: date) do |task|
          task.title = recurring_task.title
          task.description = recurring_task.description
        end
      end
    end
  end
end
