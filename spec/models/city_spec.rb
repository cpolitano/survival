require 'spec_helper'

describe City do
	 it { should validate_presence_of(:city_name) }
end
