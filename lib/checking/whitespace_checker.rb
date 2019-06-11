class WhitespaceChecker
  ##
  # Returns +true+ if +query+ and +reference+ are equal ignoring case after removing all whitespace and +nil+ otherwise.
  # The case insensitivity is not restricted to SQL keywords.
  def check (query, reference)
    (compactify(query).casecmp(compactify(reference))==0) || nil
  end

  def compactify string
    string.gsub(/\s+/, "")
  end
end
