class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.integer :big_oven_id, null: false

      t.timestamps null:false
    end
  end
end
