module Api
  module V1
    class TasksController < ApplicationController
      protect_from_forgery with: :null_session

      def index
        date = params[:date] || Date.today.to_s
        cache_key = "tasks/date/#{date}"

        tasks = Rails.cache.fetch(cache_key, expires_in: 5.minutes) do
          Tasks::CreateDailyTasks.call(date: date)
          Task.for_date(date).as_json(only: %i[id title description completed date position recurring_task_id])
        end

        render json: tasks
      end

      def create
        result = Tasks::Create.call(params: task_params)

        if result.success?
          invalidate_cache(result.task.date.to_s)
          render json: result.task, status: :created
        else
          render json: { errors: result.errors }, status: :unprocessable_entity
        end
      end

      def update
        task = Task.find(params[:id])
        result = Tasks::Update.call(task: task, params: task_params)

        if result.success?
          invalidate_cache(result.task.date.to_s)
          render json: result.task
        else
          render json: { errors: result.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        task = Task.find(params[:id])
        date = task.date.to_s
        Tasks::Destroy.call(task: task)
        invalidate_cache(date)
        head :no_content
      end

      private

      def task_params
        params.require(:task).permit(:title, :description, :completed, :date, :position, :recurring_task_id)
      end

      def invalidate_cache(date)
        Rails.cache.delete("tasks/date/#{date}")
      end
    end
  end
end
