class AddStoresToCities < ActiveRecord::Migration
  def change
  	change_table :cities do |t|
  		t.integer :stores
  	end
  end
end
