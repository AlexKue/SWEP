require 'test_helper'

class Api::StaticPagesControllerTest < ActionDispatch::IntegrationTest

  def setup
    @admin = users(:Alex)
    @student = users(:Mark)
  end

  test "should not be able to use \\dt" do
    log_in_as @student
    post api_playground_path,
    params: {
      query: "\\dt"
    }
    assert response.body.eql?("[]"), response.body
  end

  test "should not be able to use \\du" do
    log_in_as @student
    post api_playground_path,
    params: {
      query: "\\du"
    }
    assert response.body.eql?("[]"), response.body
  end
end
