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
    query_explanation = explain query, dbname
    reference_explanation = explain reference, dbname
    score = 1 if query_explanation["Node Type"].eql?(reference_explanation["Node Type"]) && query_explanation["Filter"].eql?(reference_explanation["Filter"])
    {:score => score, :debug => {:query => query_explanation, :reference => reference_explanation, :aim => :equality, :dbname => dbname}}
  end

  ##
  # See this tutorial: http://zetcode.com/db/postgresqlruby/
  def explain query, dbname='unidb'
    begin
      con = PG.connect :dbname => dbname # TODO really change this
      rs = con.exec "EXPLAIN (FORMAT JSON) " + query # TODO sanitize
      (JSON.parse rs[0]["QUERY PLAN"])[0]["Plan"]
    rescue PG::Error => e
      puts e.message
    ensure
      con.close if con
    end
  end

end
