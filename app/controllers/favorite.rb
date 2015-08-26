post '/favorites' do
  content_type :json
  recipe = Recipe.find_or_create_by(title: params[:title],
                                    big_oven_id: params[:bigOvenId].to_i
                                    )
  user = User.find(params[:userId])

  favorite = Favorite.new( user_id:   user.id,
                           recipe_id: recipe.id
                         )

  if favorite.save
    return { status: "Favorited!" }.to_json
  else
    return { status: "Sorry, something went wrong." }.to_json
  end

end
