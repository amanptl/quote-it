# import the psycopg2 database adapter for PostgreSQL
from psycopg2 import connect, Error

# import Python's built-in JSON library
import json

# import the JSON library from psycopg2.extras
from psycopg2.extras import Json
import pickle

# import psycopg2's 'json' using an alias
from psycopg2.extras import json as psycop_json

try:
    # declare a new PostgreSQL connection object
    conn = connect(
        dbname = "",
        user = "",
        host = "",
        password = "",
        # attempt to connect for 3 seconds then raise exception
        connect_timeout = 3
    )

    cur = conn.cursor()
    print ("\ncreated cursor object:", cur)

except (Exception, Error) as err:
    print ("\npsycopg2 connect error:", err)
    conn = None
    cur = None

filename = ''
try:
    with open(filename, 'rb') as f:
        rows = pickle.load(f)
except Error as err:
    print("Cannot load pickle file: ", err)

query = ("insert into TABLE (COL1,COL2) values (%s,%s) returning ID;")
for row in rows:
    cur.execute(query, row)
conn.commit()




