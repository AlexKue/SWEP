class ExplainBasedChecker

  def check (query, reference)

  end

  ##
  # See this tutorial: http://zetcode.com/db/postgresqlruby/
  def explain query
    begin
      con = PG.connect :dbname => 'unidb', :user => 'sqrrl', :password => 'sqrrl' # TODO really change this
      rs = con.exec "EXPAIN (FORMAT JSON) " + query
    rescue PG::Error => e
      puts e.message
    ensure
      con.close if con
    end
  end

end
