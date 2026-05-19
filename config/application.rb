require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module TodolistDaily
  class Application < Rails::Application
    config.load_defaults 8.0

    config.autoload_lib(ignore: %w[assets tasks])

    config.api_only = false

    config.cache_store = :redis_cache_store, { url: ENV.fetch("REDIS_URL", "redis://localhost:6379/0") }

    config.active_job.queue_adapter = :sidekiq
  end
end
