#!/bin/bash

if [[ $(whoami) != "postgres" ]]; then
    echo "Run this script as user \"postgres!\""
    exit -1
fi

#Create Temp folder
TEMP=$(mktemp -d)
trap "rm -rf $TEMP" EXIT

cd $TEMP
echo "Downloading SQL files ..."
curl https://db.in.tum.de/teaching/bookDBMSeinf/daten/skripteMSSQL/MSSQL.schema.sql -o MSSQL.schema.sql
curl https://db.in.tum.de/teaching/bookDBMSeinf/daten/skripteMSSQL/MSSQL.daten.sql -o MSSQL.daten.sql

echo "Converting to UTF-8 ..."
iconv -f ISO-8859-1 -t UTF-8 -o MSSQLschemaUTF8.sql MSSQL.schema.sql
iconv -f ISO-8859-1 -t UTF-8 -o MSSQLdatentemp.sql MSSQL.daten.sql


echo "Modifying sql file ..."
sed '3,9s/DELETE/DELETE FROM/ ' MSSQLdatentemp.sql > MSSQLdatenUTF8.sql

echo "Creating unidb ..."
createdb unidb

echo "Loading SQL files into unidb..."
psql -d unidb --file=MSSQLschemaUTF8.sql
psql -d unidb --file=MSSQLdatenUTF8.sql

echo "Creating role $SUDO_USER ..."
psql -d unidb -c "CREATE USER $SUDO_USER;"
psql -d unidb -c "GRANT CONNECT ON DATABASE unidb TO $SUDO_USER;"
psql -d unidb -c "GRANT USAGE ON SCHEMA public TO $SUDO_USER;"
psql -d unidb -c "GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO $SUDO_USER;"
psql -d unidb -c "GRANT SELECT ON ALL TABLES IN SCHEMA public TO $SUDO_USER;"
psql -d unidb -c "REVOKE CREATE ON SCHEMA public FROM PUBLIC;"
