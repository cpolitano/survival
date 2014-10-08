class AddScoreToCities < ActiveRecord::Migration
  def change
  	change_table :cities do |t|
  		t.float :score
  	end
  end
end
