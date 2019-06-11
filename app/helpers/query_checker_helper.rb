require 'checking/query_checker'
require 'checking/whitespace_checker'

module QueryCheckerHelper

  def init_query_checker
    query_checker = QueryChecker.new
    query_checker.add_checker WhitespaceChecker.new
    query_checker
  end

  def check (query, reference)
    QueryChecker.new.check query, reference
  end
end
