require 'test_helper'

class Api::ExercisesControllerTest < ActionDispatch::IntegrationTest
  test "should add exercise to a category" do
    assert_difference "Exercise.count", 1 do
      post api_exercises_path, params: {  exercise: { title: "Test",
                                                    text: "Lorem ipsum",
                                                    points: 5.0,
                                                    category_id: categories(:sfw_queries).id }}
    end
  end
end
