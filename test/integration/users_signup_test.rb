require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest

  test "should not save with invalid information" do
    assert_no_difference 'User.count' do
      post api_users_path, 
      params: { 
        user: { 
          name: "Alexander Kühnle",
          email: "test@test.com",
          password: "password",
          password_confirmation: "wrong"
        }
      }      
    end 
  end
  
  test "should save valid information" do
    assert_difference 'User.count', 1 do
      post api_users_path, 
      params: { 
        user: { 
          name: "Alexander Kühnle",
          email: "test@test.de",
          password: "password",
          password_confirmation: "password"
        }
      }
    end
  end

end
