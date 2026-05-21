module Api
  module V1
    class RecurringTasksController < ApplicationController
      protect_from_forgery with: :null_session

      def index
        recurring_tasks = RecurringTask.order(:created_at)
        render json: recurring_tasks, only: %i[id title description active created_at]
      end

      def create
        result = RecurringTasks::Create.call(params: recurring_task_params)

        if result.success?
          render json: result.recurring_task, status: :created
        else
          render json: { errors: result.errors }, status: :unprocessable_entity
        end
      end

      def update
        recurring_task = RecurringTask.find(params[:id])
        result = RecurringTasks::Update.call(recurring_task: recurring_task, params: recurring_task_params)

        if result.success?
          render json: result.recurring_task
        else
          render json: { errors: result.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        recurring_task = RecurringTask.find(params[:id])
        RecurringTasks::Destroy.call(recurring_task: recurring_task)
        head :no_content
      end

      private

      def recurring_task_params
        params.require(:recurring_task).permit(:title, :description, :active)
      end
    end
  end
end
