class QueryChecker

  def initialize ()
    @hierarchy = []
  end

  def check (query, reference)
    @hierarchy.each do |checker|
      puts checker
    end
  end

  def the_truth
    true
  end

end
