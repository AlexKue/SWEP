class WhitespaceChecker
  def check (query, reference)
    compactify(query).eql? compactify(reference)
  end

  def compactify string
    string.gsub(/\s+/, "")
  end
end
