class ExecutionBasedChecker

  ##
  # Compares the queries by actually executing them on a test database.
  # A problem is that the results could come in any order.
  # This method needs to be insensitive to that while respecting the order if ORDER BY statements are part of any query.
  # TODO cache reference results
  def check query, reference, dbname='unidb'
    score = - Float::INFINITY
    query_result = execute query, dbname
    reference_result = execute reference, dbname
    
    score = 0 if result_eql? query_result, reference_result

    {:score => score, :debug => {:query => query_result, :reference => reference_result, :aim => :equality}}
  end

  ##
  # This method compares for two PG::Result whether there are equal.
  # It is drawn out of the `check` method to provide a better testability.
  def result_eql? query_result, reference_result
    # result tables must have the same size
    false if query_result.ntuples != reference_result.ntuples
    false if query_result.nfields != reference_result.nfields
    
    # result tables must not have any different elements
    false if not (query_result.filter do |row| !reference_result.include? row end).empty?
    false if not (reference_result.filter do |row| !query_result.include? row end).empty?
  
    true
  end

  def execute query, dbname
    begin
      con = PG.connect :dbname => dbname
      rs = con.exec query # TODO SANITIZE
      #rs.each do |row|
      #  puts row # TODO compare with reference
      #end
    rescue PG::Error => e
      puts e.message
    ensure
      con.close if con
    end
    rs
  end

end
