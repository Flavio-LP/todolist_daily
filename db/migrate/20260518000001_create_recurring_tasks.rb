class CreateRecurringTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :recurring_tasks do |t|
      t.string :title, null: false
      t.text :description
      t.boolean :active, null: false, default: true

      t.timestamps
    end
  end
end
