source "https://rubygems.org"

gem "rails", "~> 8.0.4"
gem "propshaft"
gem "pg", "~> 1.5"
gem "puma", ">= 5.0"
gem "jbuilder"
gem "vite_rails"
gem "rack-cors"

gem "interactor", "~> 3.1"

gem "redis", "~> 5.0"
gem "sidekiq", "~> 8.1"
gem "sidekiq-cron", "~> 1.12"

gem "tzinfo-data", platforms: %i[ windows jruby ]
gem "bootsnap", require: false
gem "kamal", require: false
gem "thruster", require: false

group :development, :test do
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "brakeman", require: false
  gem "rubocop-rails-omakase", require: false
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end
