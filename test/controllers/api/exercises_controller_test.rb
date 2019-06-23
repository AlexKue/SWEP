require 'test_helper'

class Api::ExercisesControllerTest < ActionDispatch::IntegrationTest
  test "should add exercise to a category" do
    log_in_as(users(:Alex))
    assert_difference "Exercise.count", 1 do
      post api_category_exercises_path(categories(:sfw_queries)), 
      params: { 
        exercise: {  
          title: "Test",
          text: "Lorem ipsum",
          points: 5.0,
        }
      }
      assert_response :created
    end
  end
  test "should not add exercise as non-admin" do
    log_in_as(users(:Mark))
    post api_category_exercises_path(categories(:sfw_queries)), 
    params: { 
      exercise: {  
        title: "Test",
        text: "Lorem ipsum",
        points: 5.0
      } 
    }
    assert_response :forbidden
  end

  test "should edit exercise as admin" do
    @exercise = exercises(:one)

    log_in_as users(:Alex)
    patch api_exercise_path(@exercise),
     params: {
     exercise: {
      title: "New Title",
      }
    }
      assert_response :no_content
      @exercise.reload
      assert_equal @exercise.title, "New Title"
  end
end
