class QueryChecker

  def initialize ()
    @hierarchy = []
  end

  ##
  # Runs checking objects on the query and returns whether the query was correct.
  # There are three possible return values: +true+, +false+ and +nil+.
  # +true+ indicates that this method is convinced the query is correct.
  # +false+ means that the query is incorrect.
  # +nil+ means that no checking object gave a boolean answer.
  # This method returns quickly, i.e. it returns on the first checking object's decision that is not nil.
  def check (query, reference="")
    @hierarchy.each do |checker|
      checker_result = checker.check query, reference
      return checker_result if checker_result != nil
    end
    nil
  end

  def add_checker checker
    @hierarchy.append checker
  end

end
