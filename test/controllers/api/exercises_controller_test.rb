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
    @exercise = exercises(:one)

    log_in_as users(:Alex)
    assert_no_difference "@exercise.queries.count" do
      patch api_exercise_path(@exercise),
      params: {
      exercise: {
        title: "New Title",
        queries_attributes: [
          {
            id: queries(:one).id,
            query:"SELECT new FROM table"
          },
          {
            id: queries(:two).id,
            destroy: true
          },
          {
            query: "SELECT table FROM newtable"
          }
        ]
        }
      }
      assert_response :no_content
      @exercise.reload
      assert_equal @exercise.title, "New Title"
      assert_equal @exercise.queries.find(queries(:one).id).query, "SELECT new FROM table"
    end
  end
end
