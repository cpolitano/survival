# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :city do
  	population {4000}
    name {"Brooklyn"}
    stores {432}
    score {41}
    city_name {"Baltimore"}
    state_name {"Maryland"}
  end
end
