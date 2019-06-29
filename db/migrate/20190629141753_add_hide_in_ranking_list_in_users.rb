class AddHideInRankingListInUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :hide_in_ranking, :boolean, default: false
  end
end
