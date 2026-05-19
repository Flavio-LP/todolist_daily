class CreateTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.boolean :completed, null: false, default: false
      t.date :date, null: false
      t.integer :position, default: 0
      t.references :recurring_task, null: true, foreign_key: true

      t.timestamps
    end

    add_index :tasks, :date
  end
end
