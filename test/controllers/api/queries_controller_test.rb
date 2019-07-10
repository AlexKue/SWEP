require 'test_helper'

class Api::QueriesControllerTest < ActionDispatch::IntegrationTest
  test "should accept correct query" do
    log_in_as(users(:Alex))
    post api_exercise_queries_path (exercises(:one)), params: {
        query: {
        query: "SELECT * FROM studenten;"
      }
    }
    
    assert_response :success
  end

  test "should decline syntactically incorrect query" do
    log_in_as(users(:Alex))
    post api_exercise_queries_path (exercises(:one)), params: {
        query: {
        query: "SELECT * FRM studenten;"
      }
    }
    
    assert_response :unprocessable_entity
  end

  test "should decline query with unknown relation" do
    log_in_as(users(:Alex))
    post api_exercise_queries_path (exercises(:one)), params: {
        query: {
        query: "SELECT * FROM norelation;"
      }
    }
    
    assert_response :unprocessable_entity
  end
end
