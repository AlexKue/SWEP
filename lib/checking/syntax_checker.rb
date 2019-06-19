class SyntaxChecker
  ##
  # Returns score 0 if +query+ is a syntactically correct sql query.
  # For now, this method checks whether there is a +SELECT+ and a +FROM+ keyword in +query+.
  # If that's not the case then this method sets score to +-Float::INFINITY+.
  # TODO: use EXPLAIN to check the syntax or remove this file completely
  def check (query, reference)
    score = Float::INFINITY
    score = 0 if contains(query, "select") && contains(query, "from")
    {:score => score}
  end

  def contains query, substring
    !(query =~ (/#{substring}/i)).nil?
  end
end
