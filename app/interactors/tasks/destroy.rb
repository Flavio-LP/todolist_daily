module Tasks
  class Destroy
    include Interactor

    def call
      context.task.destroy
    end
  end
end
