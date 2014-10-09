require 'spec_helper'

describe CitiesController do

	describe "POST #create" do 

		context "with valid attributes" do

			it "saves the new contact in the database" do
				post :create, city: {:population => 4321, :x_pos => 43.43, :y_pos => 32.12, :delay => 23, :infect_rate => 32, :name => "brooklyn", :stores => 32, :score => 34.23}
				expect(City.count).to eq(1)
			end 

			it "redirects to the home page" do
			end

	  end
	end
end 

