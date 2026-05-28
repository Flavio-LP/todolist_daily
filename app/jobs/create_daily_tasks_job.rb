class CreateDailyTasksJob < ApplicationJob
  queue_as :default

  def perform(date = Date.today.to_s)
    Tasks::CreateDailyTasks.call(date: date)
  end
end
