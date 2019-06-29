require 'test_helper'

class Api::QueriesControllerTest < ActionDispatch::IntegrationTest
  test "should accept correct query" do
       
    post api_exercise_queries_path params: {
        query: {
        query: "SELECT * FROM studenten;"
      }
    }
    
     # HTTP query: {"query":{"query":"INSERT INTO Here VALUES('QUERY')"}
     # expected answer: {"id":2,"query":"INSERT INTO Here VALUES('QUERY')","exercise_id":1,"created_at":"2019-06-27T19:49:22.638Z","updated_at":"2019-06-27T19:49:22.638Z"}
     assert_response :created
    end
end
