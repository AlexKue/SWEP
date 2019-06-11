class QueryCheckerHelperTest < ActionView::TestCase

  setup do
    @checker = init_query_checker
  end

  test "whitespace insensitivity" do
    query = "SELECT    * FROM   test_db   WHERE a>5;"
    reference = "SELECT * \nFROM test_db\nWHERE a > 5;"
    assert @checker.check query, reference 
  end
end
