class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name, null: false
      t.integer :rating, null: false, default: 0

      t.timestamps
    end
  end
end
