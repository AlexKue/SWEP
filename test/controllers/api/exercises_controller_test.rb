require 'test_helper'

class Api::ExercisesControllerTest < ActionDispatch::IntegrationTest
  test "should add exercise to a category" do
    assert_difference "Exercise.count", 1 do
      post api_category_exercises_path(categories(:sfw_queries)), params: { exercise: {  title: "Test",
                                                                text: "Lorem ipsum",
                                                                points: 5.0}
                                                }
    end
  end
end
