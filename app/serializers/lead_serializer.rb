class LeadSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :booked_loans
  belongs_to :agent
  belongs_to :industry
end
