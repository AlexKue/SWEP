# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_06_25_104218) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "title"
    t.text "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "exercise_solvers", force: :cascade do |t|
    t.integer "user_id"
    t.integer "exercise_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "student_query_id"
    t.index ["exercise_id"], name: "index_exercise_solvers_on_exercise_id"
    t.index ["user_id", "exercise_id"], name: "index_exercise_solvers_on_user_id_and_exercise_id", unique: true
    t.index ["user_id"], name: "index_exercise_solvers_on_user_id"
  end

  create_table "exercises", force: :cascade do |t|
    t.float "points"
    t.text "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.bigint "category_id"
    t.index ["category_id"], name: "index_exercises_on_category_id"
  end

  create_table "queries", force: :cascade do |t|
    t.string "query"
    t.bigint "exercise_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exercise_id"], name: "index_queries_on_exercise_id"
  end

  create_table "student_queries", force: :cascade do |t|
    t.text "query"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.integer "role", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "exercises", "categories"
  add_foreign_key "queries", "exercises"
end
