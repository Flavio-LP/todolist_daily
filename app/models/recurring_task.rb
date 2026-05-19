class RecurringTask < ApplicationRecord
  has_many :tasks, dependent: :nullify

  validates :title, presence: true

  scope :active, -> { where(active: true) }
end
