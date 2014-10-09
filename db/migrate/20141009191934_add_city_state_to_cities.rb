class AddCityStateToCities < ActiveRecord::Migration
  def change
  	change_table :cities do |t|
  		t.string :city_name
  		t.string :state_name
  	end
  end
end
