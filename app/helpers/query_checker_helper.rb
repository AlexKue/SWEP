require 'checking/query_checker'
require 'checking/whitespace_checker'
require 'checking/syntax_checker'
require 'checking/explain_based_checker'
require 'checking/execution_based_checker'
require 'pg'

module QueryCheckerHelper

  def init_query_checker(threshold=0)
    query_checker = QueryChecker.new(threshold)
    query_checker.add_checker WhitespaceChecker.new
    query_checker.add_checker SyntaxChecker.new
    query_checker.add_checker ExplainBasedChecker.new
    query_checker.add_checker ExecutionBasedChecker.new
    query_checker
  end

  ##
  # Returns the SQL table containing the result of the given query as a (2D) list.
  # In case the query was incorrect or there is no data for this query, the return value is an empty list.
  def get_result_table query, dbname = "unidb"
    execution_checker = ExecutionBasedChecker.new
    begin
      return execution_checker.entries (execution_checker.execute query, dbname)
    rescue PG::Error => e
      return []
    end
  end

  def check_admin_query query
    execution_checker = ExecutionBasedChecker.new
    checking_result = execution_checker.check query, query
  end
end
