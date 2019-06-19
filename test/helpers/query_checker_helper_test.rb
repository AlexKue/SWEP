class QueryCheckerHelperTest < ActionView::TestCase

  setup do
    @checker = init_query_checker
  end

  test "case insensitivity" do
    query = "select * from test_db where a > 5;"
    reference = "SELECT * \nFROM test_db\nWHERE a > 5;"
    assert @checker.correct? query, reference
  end

  test "whitespace insensitivity" do
    query = "SELECT    * FROM   test_db   WHERE a>5;"
    reference = "SELECT * \nFROM test_db\nWHERE a > 5;"
    assert @checker.correct? query, reference
  end

  test "whitespace insensitivity does not affect strings in query" do
    query = "SELECT * FROM professoren WHERE name LIKE 'oliver giften';"
    reference = "SELECT * FROM professoren WHERE name LIKE 'oli vergiften';"
    assert_nil @checker.correct? query, reference
  end

  test "(way too) simple syntax check" do
    query = "SLCT * FRM test_db WHR a > 5;"
    reference = "SELECT * \nFROM test_db\nWHERE a > 5;"
    assert_equal false, @checker.correct?(query, reference)
  end

  test "2-element WHERE clause permutation" do
    query = "SELECT * FROM studenten WHERE name LIKE 'oliver' AND semester = 4;"
    reference = "SELECT * FROM studenten WHERE semester = 4 AND name LIKE 'matthias';"
    assert @checker.correct? query, reference
  end

  test "forgot one predicate" do
    query = "SELECT * FROM studenten;"
    reference = "SELECT * FROM studenten WHERE name LIKE 'Xenokrates';"
    assert_equal false, @checker.correct?(query, reference)
  end

end
