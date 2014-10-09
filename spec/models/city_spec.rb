require 'spec_helper'

describe City do
 it "has a name" do
 	c = City.new(population: 5, score: 6, stores: 10)
 	expect(c.save).to_have errors_on(:name)
 end
end
