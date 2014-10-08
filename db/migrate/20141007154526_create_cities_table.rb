class CreateCitiesTable < ActiveRecord::Migration
  def change
    create_table :cities do |t|
    	t.integer :population
    	t.float :x_pos
    	t.float :y_pos
    	t.integer :delay
    	t.integer :infect_rate
    	t.string :name
    end
  end
end
