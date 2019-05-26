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
    delete api_logout_path
    assert_not is_logged_in?
  end
end
