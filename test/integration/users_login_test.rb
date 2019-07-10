require 'test_helper'

class UsersLoginTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:Alex)
  end

  test "log in user with valid information and log out" do
    post api_auth_path params: {
      session: {
        email: @user.email,
        password: "password"
      }
    }
    assert is_logged_in?
    assert_response :ok
    delete api_logout_path
    assert_response :ok
    assert_not is_logged_in?
  end

  test "should response with unauthorized with invalid credentials" do
    post api_auth_path params: {
      session: {
        email: @user.email,
        password: "wrong_password"
      }
    }
    assert_not is_logged_in?
    assert_response :unauthorized
  end
end


