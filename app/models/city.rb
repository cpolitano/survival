class City < ActiveRecord::Base

	def initialize(name, population, x, y)
		@name = name
		@population = population
		@x_pos = x
		@y_pos = y
	end

	def set_delay(city_b)
		distance = Math.sqrt( (@x_pos - city_b.x_pos)**2 + (@y_pos - city_b.y_pos)**2 )
		@delay = distance / 10
	end

	def find_infection_rate
		if @population > 1000000
			@infection_rate
	end

end