class SyntaxChecker
  ##
  # Returns +true+ if +query+ is a syntactically correct sql query.
  # For now, this method checks whether there is a +SELECT+ and a +FROM+ keyword in +query+.
  def check (query, reference)
    contains(query, "select") && contains(query, "from")
  end

  def contains query, substring
    !(query =~ (/#{substring}/i)).nil?
  end
end
