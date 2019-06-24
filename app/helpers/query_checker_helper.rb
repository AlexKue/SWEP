require 'checking/query_checker'
require 'checking/whitespace_checker'
require 'checking/syntax_checker'
require 'checking/explain_based_checker'
require 'checking/execution_based_checker'

module QueryCheckerHelper

  def init_query_checker
    query_checker = QueryChecker.new
    query_checker.add_checker WhitespaceChecker.new
    query_checker.add_checker SyntaxChecker.new
    query_checker.add_checker ExplainBasedChecker.new
    query_checker.add_checker ExecutionBasedChecker.new
    query_checker
  end
end
