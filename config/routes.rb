Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  root "pages#index"

  namespace :api do
    namespace :v1 do
      resources :tasks, only: [:index, :create, :update, :destroy]
      resources :recurring_tasks, only: [:index, :create, :update, :destroy]
    end
  end
end
