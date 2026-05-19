module Api
  module V1
    class RecurringTasksController < ApplicationController
      protect_from_forgery with: :null_session

      def index
        recurring_tasks = RecurringTask.order(:created_at)
        render json: recurring_tasks, only: %i[id title description active created_at]
      end

      def create
        recurring_task = RecurringTask.new(recurring_task_params)

        if recurring_task.save
          render json: recurring_task, status: :created
        else
          render json: { errors: recurring_task.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        recurring_task = RecurringTask.find(params[:id])

        if recurring_task.update(recurring_task_params)
          render json: recurring_task
        else
          render json: { errors: recurring_task.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        recurring_task = RecurringTask.find(params[:id])
        recurring_task.destroy
        head :no_content
      end

      private

      def recurring_task_params
        params.require(:recurring_task).permit(:title, :description, :active)
      end
    end
  end
end
