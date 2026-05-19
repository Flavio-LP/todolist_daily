redis_url = ENV.fetch("REDIS_URL", "redis://localhost:6379/0")

Sidekiq.configure_server do |config|
  config.redis = { url: redis_url }

  SidekiqCron::Scheduler.dynamic = true

  schedule = {
    "create_daily_tasks" => {
      "cron"  => "0 0 * * *",
      "class" => "CreateDailyTasksJob",
      "args"  => []
    }
  }
  SidekiqCron::Job.load_from_hash(schedule)
end

Sidekiq.configure_client do |config|
  config.redis = { url: redis_url }
end
