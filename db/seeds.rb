require 'faker'

password = '123'
users = []
recipes = []

10.times do
  users << User.create(name: Faker::Name.first_name, password: password)
end

recipes << Recipe.create(big_oven_id: 161255, title: "Shrimp and Broccoli")
recipes << Recipe.create(big_oven_id: 163948, title: "Salmon Burgers")
recipes << Recipe.create(big_oven_id: 630008, title: "Lasagna")
recipes << Recipe.create(big_oven_id: 196149, title: "Lasagna")
recipes << Recipe.create(big_oven_id: 381400, title: "Pizza")
recipes << Recipe.create(big_oven_id: 337784, title: "Cowboy Cookies")
recipes << Recipe.create(big_oven_id: 230679, title: "Sugar Cookies")

users.each do |user|
  recipes.each do |recipe|
    user.favorites.create(recipe: recipe)
  end
end

