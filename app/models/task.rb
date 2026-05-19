class Task < ApplicationRecord
  belongs_to :recurring_task, optional: true

  validates :title, presence: true
  validates :date, presence: true

  scope :for_date, ->(date) { where(date: date).order(:position, :created_at) }
end
