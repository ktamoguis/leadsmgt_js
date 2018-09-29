class LeadsSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :booked_loans
  belongs_to :agent
end
