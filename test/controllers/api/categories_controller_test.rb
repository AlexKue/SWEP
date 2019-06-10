require 'test_helper'

class Api::CategoriesControllerTest < ActionDispatch::IntegrationTest

  def setup
    @category = categories(:sfw_queries)
  end

  test "should create category" do
    assert_difference 'Category.count', 1 do
      post api_categories_path, params: { category: { title: @category.title,
                                                      text: @category.text
      }}
      assert_response :ok
    end
  end

  test "should not allow blank titles" do
    assert_no_difference 'Category.count' do
      post api_categories_path, params: { category: { title: "   ",
                                                      text: @category.text
      }}
      assert_response :unprocessable_entity
    end
  end

  test "should not allow blank text" do
    assert_no_difference 'Category.count' do
      post api_categories_path, params: { category: { title: @category.title,
                                                      text: "   "
      }}
      assert_response :unprocessable_entity
    end
  end

end
