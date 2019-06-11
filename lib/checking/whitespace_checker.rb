class WhitespaceChecker
  ##
  # Returns +true+ if +query+ and +reference+ are equal after removing all whitespace and +nil+ otherwise.
  def check (query, reference)
    (compactify(query).eql? compactify(reference)) || nil
  end

  def compactify string
    string.gsub(/\s+/, "")
  end
end
