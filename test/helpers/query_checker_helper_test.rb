class QueryCheckerHelperTest < ActionView::TestCase

  setup do
    @checker = init_query_checker
  end

  test "case insensitivity" do
    query = "select * from test_db where a > 5;"
    reference = "SELECT * \nFROM test_db\nWHERE a > 5;"
    assert @checker.check query, reference
  end

  test "whitespace insensitivity" do
    query = "SELECT    * FROM   test_db   WHERE a>5;"
    reference = "SELECT * \nFROM test_db\nWHERE a > 5;"
    assert @checker.check query, reference
  end

  test "(way too) simple syntax check" do
    query = "SLCT * FRM test_db WHR a > 5;"
    reference = "SELECT * \nFROM test_db\nWHERE a > 5;"
    assert_equal @checker.check(query, reference), false
  end

end
