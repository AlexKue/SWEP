require 'test_helper'

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:Alex)
  end

  test "should delete user" do
    assert_difference "User.count", -1 do
      delete api_user_path @user
    end
    assert_response :no_content
  end
end
