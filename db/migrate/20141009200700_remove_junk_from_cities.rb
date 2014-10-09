class RemoveJunkFromCities < ActiveRecord::Migration
  def change
  	change_table :cities do |t|
  		remove_column :cities, :x_pos
  		remove_column :cities, :y_pos
  		remove_column :cities, :delay
  		remove_column :cities, :infect_rate
  	end
  end
end
