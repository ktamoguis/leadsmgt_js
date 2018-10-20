class AddLeadIdToOwners < ActiveRecord::Migration[5.2]
  def change
    add_column :owners, :lead_id, :integer
  end
end
