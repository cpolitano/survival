require 'spec_helper'

describe CitiesController do

	describe "POST #create" do 

		context "with valid attributes" do

			it "saves the new contact in the database" do
				expect{post :create, city: {:population => 4321, :name => "brooklyn", :stores => 32, :score => 34.32, :city_name => "baltimore", :state_name => "maryland"}
				}.to change(City, :count).by(1)
			end 

			it "redirects to the home page" do
				expect(response.status).to eq(200)
			end

	  end
	end

	describe "#show" do
	end
end 

