require 'checking/query_checker'
require 'checking/whitespace_checker'
require 'checking/syntax_checker'

module QueryCheckerHelper

  def init_query_checker
    query_checker = QueryChecker.new
    query_checker.add_checker WhitespaceChecker.new
    query_checker.add_checker SyntaxChecker.new
    query_checker
  end
end
