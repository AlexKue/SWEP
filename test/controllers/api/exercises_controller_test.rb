require 'test_helper'

class Api::ExercisesControllerTest < ActionDispatch::IntegrationTest

  def setup
    @admin = users(:Alex)
    @mark = users(:Mark)
    @matthias = users(:Matthias)
  end

  test "should add exercise to a category" do
    log_in_as @admin
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

  test "should solve an exercise and update solution" do
    log_in_as @matthias
      post solve_api_exercise_path(exercises(:one)),
      params: {
        query: "SELECT * FROM table1"
      }
    assert_response :ok

    assert_no_difference "ExerciseSolver.count" do
      post solve_api_exercise_path(exercises(:one)),
      params: {
        query: "SELECT * FROM table"
      }
    assert_response :ok
    end
  end

  test "should not add exercise as non-admin" do
    log_in_as @mark
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

    log_in_as @admin
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

  test "should index uncertain queries" do
    log_in_as @admin
    get api_exercises_index_uncertain_solutions_path

    body = JSON.parse response.body
    assert body["exercises"].include?(exercises(:two).id)
    assert_not body["exercises"].include?(exercises(:one).id)
  end 

  test "should update uncertain query" do
    log_in_as @admin
    relation = exercise_solvers(:two)
    exercise = exercises(:two)

    assert relation.solved.nil?
    post update_uncertain_solution_api_exercise_path(exercise), params: {
      user_id: relation.user_id,
      solved: true
    }
    
    relation.reload
    assert relation.solved
  end

  test "test" do
    log_in_as @admin
    get api_exercises_index_uncertain_solutions_path
    puts response.body
  end
end
