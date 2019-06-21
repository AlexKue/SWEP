require 'test_helper'

class Api::ExercisesControllerTest < ActionDispatch::IntegrationTest
  test "should add exercise to a category with sample query" do
    log_in_as(users(:Alex))
    assert_difference "Exercise.count", 1 do
      assert_difference "Query.count", 2 do
        post api_category_exercises_path(categories(:sfw_queries)), 
        params: { 
          exercise: {  
            title: "Test",
            text: "Lorem ipsum",
            points: 5.0,
            queries_attributes: [
              { query: "SELECT * FROM table"},
              { query: "SELECT * FROM table2 WHERE name=test"}
            ]
          }
        }
      assert_response :created
      puts Query.all
      end
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
    @exercise = exercises(:two)

    log_in_as users(:Alex)
    patch api_exercise_path(@exercise),
    params: {
      exercise: {
        title: "New Title"
      }
    }
    assert_response :no_content
    @exercise.reload
    assert_equal @exercise.title, "New Title"
  end
end
