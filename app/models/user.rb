class User < ActiveRecord::Base
  has_secure_password

  has_many :favorites
  has_many :recipes, through: :favorites

  def self.signup_validation(params)
    return "Cannot leave field blank" if (params[:name] == "" || params[:password] == "" || params[:password_confirmation] == "")
    return "User already exists with this name" if User.find_by_name(params[:name])
    return "Passwords did not match" if params[:password] != params[:password_confirmation]
    return nil
  end

  def favorite_recipes
    self.favorites.map do |favorite|
      {:title => favorite.recipe.title,
       :bigOvenId => favorite.recipe.big_oven_id
       }
    end
  end
end
