# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :city do
  	population {4000}
  	x_pos {43}
    y_pos {54}
    delay {43}
    infect_rate {34}
    name {"Brooklyn"}
  end
end
