class ExecutionBasedChecker

  ##
  # Compares the queries by actually executing them on a test database.
  # A problem is that the results could come in any order.
  # This method needs to be insensitive to that while respecting the order if ORDER BY statements are part of any query.
  # TODO cache reference results
  def check query, reference, dbname='unidb'
    score = - Float::INFINITY

    begin
      query_result = execute query, dbname
      reference_result = execute reference, dbname
      score = 0 if result_eql? query_result, reference_result
      debug = {:query => entries(query_result), :reference => entries(reference_result), :aim => :equality}
    rescue PG::Error => e
      debug = {:error => e}
    end

    {:score => score, :debug => debug}
  end

  ##
  # This method compares for two PG::Result whether there are equal.
  # It is drawn out of the `check` method to provide a better testability.
  def result_eql? query_result, reference_result
    # result tables must have the same size
    return false if query_result.ntuples != reference_result.ntuples
    return false if query_result.nfields != reference_result.nfields
    
    # result tables must not have any different elements
    query_diff_reference = query_result.filter do |row| !reference_result.include? row end
    return false if not query_diff_reference.empty?
    reference_diff_query = reference_result.filter do |row| !query_result.include? row end
    return false if not reference_diff_query.empty?
  
    true
  end

  def execute query, dbname
    begin
      con = PG.connect :dbname => dbname
      rs = con.exec query # TODO SANITIZE
      #rs.each do |row|
      #  puts row # TODO compare with reference
      #end
    ensure
      con.close if con
    end
    rs
  end

  def entries result
      if !result.entries.empty?
        arr = []
        arr.append result.fields
        result.each_row do |row|
          arr.append row
        end
        return arr
      end
      result.entries
  end

end
