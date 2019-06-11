class QueryChecker

  def initialize ()
    @hierarchy = []
  end

  def check (query, reference)
    correct = true
    @hierarchy.each do |checker|
      correct &&= checker.check query, reference
    end
    correct
  end

  def add_checker checker
    @hierarchy.append checker
  end

end
