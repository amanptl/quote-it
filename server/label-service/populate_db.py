# import the psycopg2 database adapter for PostgreSQL
from psycopg2 import connect, Error
import pandas as pd
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
        dbname = "caption_tag",
        user = "postgres",
        host = "127.0.0.1",
        password = "aman",
        # attempt to connect for 3 seconds then raise exception
        connect_timeout = 3
    )
    cur = conn.cursor()
    print ("\ncreated cursor object:", cur)
except (Exception, Error) as err:
    print ("\npsycopg2 connect error:", err)
    conn = None
    cur = None

query = ("insert into captions (caption,tags) values (%s,%s);")
filename = 'C:/Users/Aman/Downloads/quotesdrivedb.csv'
columns = ['caption', 'author', 'tags']
df = pd.read_csv(filename, usecols=[0,2])
df = df.dropna()
for index, row in df.iterrows():
    data = (row[0], row[1].split(','))
    cur.execute(query, data)
conn.commit()




