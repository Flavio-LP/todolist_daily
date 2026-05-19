module Api
  module V1
    class TasksController < ApplicationController
      protect_from_forgery with: :null_session

      def index
        date = params[:date] || Date.today.to_s
        cache_key = "tasks/date/#{date}"

        tasks = Rails.cache.fetch(cache_key, expires_in: 5.minutes) do
          ensure_daily_tasks_created(date)
          Task.for_date(date).as_json(only: %i[id title description completed date position recurring_task_id])
        end

        render json: tasks
      end

      def create
        task = Task.new(task_params)

        if task.save
          invalidate_cache(task.date.to_s)
          render json: task, status: :created
        else
          render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        task = Task.find(params[:id])

        if task.update(task_params)
          invalidate_cache(task.date.to_s)
          render json: task
        else
          render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        task = Task.find(params[:id])
        date = task.date.to_s
        task.destroy
        invalidate_cache(date)
        head :no_content
      end

      private

      def task_params
        params.require(:task).permit(:title, :description, :completed, :date, :position, :recurring_task_id)
      end

      def ensure_daily_tasks_created(date)
        return if Task.where(date: date).exists?

        RecurringTask.active.each do |recurring_task|
          Task.find_or_create_by!(recurring_task_id: recurring_task.id, date: date) do |task|
            task.title = recurring_task.title
            task.description = recurring_task.description
          end
        end
      end

      def invalidate_cache(date)
        Rails.cache.delete("tasks/date/#{date}")
      end
    end
  end
end
