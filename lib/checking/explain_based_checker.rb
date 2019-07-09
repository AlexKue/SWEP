require 'json'

class ExplainBasedChecker

  ##
  # Loads pg into the +$LOAD_PATH+.
  # TODO definitively needs another solution
  def initialize
    pathToPgLib = File.absolute_path "vendor/bundle/ruby/2.6.0/gems/pg-1.1.4/lib/"
    $LOAD_PATH.append(pathToPgLib) unless $LOAD_PATH.include? pathToPgLib
    require "pg"
  end

  ##
  # Checks +query+ against +reference+ by comapring the +Node Type+ and the +Filter+ attributes.
  def check (query, reference, dbname='unidb')
    score = 0
    all_equal = true
    begin
      query_explanation = explain query, dbname
      reference_explanation = explain reference, dbname

      node_type_equal = query_explanation["Node Type"].eql?(reference_explanation["Node Type"])
      score += node_type_equal ? 1: -3
      all_equal &= node_type_equal
      
      filter_equal = query_explanation["Filter"].eql?(reference_explanation["Filter"])
      score += filter_equal ? 1 : -3
      all_equal &= filter_equal

      score *= 2 if all_equal

      debug = {:query => query_explanation, :reference => reference_explanation, :aim => :equality, :dbname => dbname}
    rescue PG::Error => e
      score -= Float::INFINITY
      debug = {:error => e.message}
    end
    {:score => score, :debug => debug}
  end

  ##
  # See this tutorial: http://zetcode.com/db/postgresqlruby/
  def explain query, dbname='unidb'
    begin
      con = PG.connect :dbname => dbname # TODO really change this
      rs = con.exec "EXPLAIN (FORMAT JSON) " + query # TODO sanitize
      (JSON.parse rs[0]["QUERY PLAN"])[0]["Plan"]
    ensure
      con.close if con
    end
  end

end
