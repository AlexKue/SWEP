require 'test_helper'

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:Alex)
  end

  test "should delete user" do
    assert_difference "User.count", -1 do
      log_in_as @user
      delete api_user_path @user
    end
    assert_response :no_content
  end

  test "should return unauthorized if not logged in" do
    get api_users_path
    assert_response :unauthorized
  end

  test "should show index if logged in" do
    post api_auth_path params: {
      session: {
        email: @user.email,
        password: "password"
      }
    }
    get api_users_path
    assert_response :ok
  end

  test "should accept successful edit" do
    log_in_as @user
    email = "test@newmail.de"

    patch api_user_path(@user), 
    params: {
      user: {
        email: email,
        password: "",
        password_confirmation: ""
      }
    }
    assert_response :no_content
    @user.reload
    assert_equal email, @user.email
  end
    
end
