require 'spec_helper'

describe ZombiesController do

	describe "GET #index" do 

		context "with all cities" do
			it "assigns @teams" do
      city = City.create
      get :index
      expect(assigns(:city)).to eq([city])
    	end
		end

	end
end