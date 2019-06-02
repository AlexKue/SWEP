class TestClass
  def test_method()
    method_from_another_module()
  end
end

test_class = TestClass.new
test_class.test_method()
