class WhitespaceChecker
  ##
  # Returns +true+ if +query+ and +reference+ are equal ignoring case after removing all whitespace and +nil+ otherwise.
  # The case insensitivity is not restricted to SQL keywords.
  def check (query, reference)
    compact_query = compactify(query)
    compact_reference = compactify(reference)
    score = 0
    score += Float::INFINITY if compact_query.casecmp(compact_reference) == 0
    {:score => score, :debug => {:query => compact_query, :reference => compact_reference, :aim => :equality}}
  end

  ##
  # Removes all whitespace from +query+
  # Does not work with escaped ' in strings.
  def compactify query
    new_query = ""
    in_string = false

    query.split("").each do |char|
      in_string ^= char=="'" # toggle in_string if encountering a '
      new_query += char if !char.match(/^\s$/) || in_string # keep non-whitespace and whitespace inside strings
    end
    new_query
  end
end
