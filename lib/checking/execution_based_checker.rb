class ExplainBasedChecker

  def check (query, reference)
    begin
      con = PG.connect :dbname => 'unidb', :user => 'sqrrl', :password => 'sqrrl' # TODO really change this
      rs = con.exec query # TODO SANITIZE
      rs.each do |row|
        puts row # TODO compare with reference
      end
    rescue PG::Error => e
      puts e.message
    ensure
      rs.clear if rs
      con.close if con
    end
  end

end
