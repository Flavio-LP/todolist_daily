class CreateDailyTasksJob < ApplicationJob
  queue_as :default

  def perform(date = Date.today.to_s)
    target_date = Date.parse(date)

    RecurringTask.active.each do |recurring_task|
      Task.find_or_create_by!(recurring_task_id: recurring_task.id, date: target_date) do |task|
        task.title = recurring_task.title
        task.description = recurring_task.description
      end
    end
  end
end
