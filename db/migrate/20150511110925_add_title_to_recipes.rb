class AddTitleToRecipes < ActiveRecord::Migration
  def change
    add_column :recipes, :title, :string, null: false, default: ""
  end
end
