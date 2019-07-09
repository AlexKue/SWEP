class QueryCheckerHelperTest < ActionView::TestCase

  setup do
    @checker = init_query_checker
  end

  test "case insensitivity" do
    query = "select * from studenten where semester > 5;"
    reference = "SELECT * \nFROM studenten\nWHERE semester > 5;"
    assert @checker.correct?(query, reference), @checker.result
  end

  test "whitespace insensitivity" do
    query = "SELECT    * FROM   studenten   WHERE semester>5;"
    reference = "SELECT * \nFROM studenten\nWHERE semester > 5;"
    assert @checker.correct?(query, reference), @checker.result
  end

  test "whitespace insensitivity does not affect strings in query" do
    query = "SELECT * FROM professoren WHERE name LIKE 'oliver giften';"
    reference = "SELECT * FROM professoren WHERE name LIKE 'oli vergiften';"
    assert_equal false, @checker.correct?(query, reference), @checker.result
  end

  test "(way too) simple syntax check" do
    query = "SLCT * FRM studenten WHR semester > 5;"
    reference = "SELECT * \nFROM studenten\nWHERE semester > 5;"
    assert_equal false, @checker.correct?(query, reference), @checker.result
  end

  test "2-element WHERE clause permutation with mixed conditions and AND" do
    query = "SELECT * FROM studenten WHERE name LIKE 'oliver' AND semester = 4;"
    reference = "SELECT * FROM studenten WHERE semester = 4 AND name LIKE 'oliver';"
    assert @checker.correct?(query, reference), @checker.result
  end

  test "2-element WHERE clause permutation with LIKE only and OR" do
    query = "SELECT * FROM assistenten WHERE fachgebiet LIKE '%l%' OR fachgebiet LIKE '%h%'"
    reference = "SELECT * FROM assistenten WHERE fachgebiet LIKE '%h%' OR fachgebiet LIKE '%l%'"
    assert @checker.correct?(query, reference), @checker.result
  end

  test "2-element WHERE clause permutation with LIKE only and AND" do
    query = "SELECT * FROM assistenten WHERE fachgebiet LIKE '%l%' AND fachgebiet LIKE '%h%'"
    reference = "SELECT * FROM assistenten WHERE fachgebiet LIKE '%h%' AND fachgebiet LIKE '%l%'"
    assert @checker.correct?(query, reference), @checker.result
  end

  test "invariant to table aliases" do
    query = "SELECT * FROM studenten S where S.name like '%a%'"
    reference = "SELECT * FROM studenten WHERE name like '%a%'" 
    assert @checker.correct?(query, reference), @checker.result
  end

  test "invariant to column order" do
    query = "SELECT name, semester FROM studenten"
    reference = "SELECT semester, name FROM studenten" 
    assert @checker.correct?(query, reference), @checker.result
  end

  test "forgot one predicate" do
    query = "SELECT * FROM studenten;"
    reference = "SELECT * FROM studenten WHERE name LIKE 'Xenokrates';"
    assert_equal false, @checker.correct?(query, reference), @checker.result
  end

  test "join with identical queries" do
    query = "SELECT name, vorlnr FROM studenten s INNER JOIN hören h ON s.matrnr=h.matrnr"
    reference = "SELECT name, vorlnr FROM studenten s INNER JOIN hören h ON s.matrnr=h.matrnr"
    assert @checker.correct?(query, reference), @checker.result
  end

  test "join with ON permutation" do
    query = "SELECT name, vorlnr FROM studenten s INNER JOIN hören h ON s.matrnr=h.matrnr"
    reference = "SELECT name, vorlnr FROM studenten s INNER JOIN hören h ON h.matrnr=s.matrnr"
    assert @checker.correct?(query, reference), @checker.result
  end

  test "triple join with identical queries" do 
    query = "SELECT name, titel FROM (SELECT * FROM studenten s INNER JOIN hören h ON s.matrnr=h.matrnr) as r INNER JOIN vorlesungen v ON v.vorlnr=r.vorlnr;"
    reference = "SELECT name, titel FROM (SELECT * FROM studenten s INNER JOIN hören h ON s.matrnr=h.matrnr) as r INNER JOIN vorlesungen v ON v.vorlnr=r.vorlnr;"
    assert @checker.correct?(query, reference), @checker.result
  end

  test "triple join with ON permutation" do 
    query = "SELECT name, titel FROM (SELECT * FROM studenten s INNER JOIN hören h ON s.matrnr=h.matrnr) as r INNER JOIN vorlesungen v ON v.vorlnr=r.vorlnr;"
    reference = "SELECT name, titel FROM (SELECT * FROM studenten s INNER JOIN hören h ON s.matrnr=h.matrnr) as r INNER JOIN vorlesungen v ON r.vorlnr=v.vorlnr;"
    assert @checker.correct?(query, reference), @checker.result
  end

end
