from flask import Flask, request, jsonify
from psycopg2 import connect, Error

app = Flask(__name__)
conn = None
cur = None

def connect_db():
    try:
        conn = connect(
            dbname = "caption_tag",
            user = "postgres",
            host = "127.0.0.1",
            password = "aman",
            connect_timeout = 3
        )
        global cur
        cur = conn.cursor()
        print ("\ncreated cursor object:", cur)

    except (Exception, Error) as err:
        print ("\npsycopg2 connect error:", err)

@app.route("/quotes", methods=["GET"])
def get_captions():
    query = ("select tags, caption from captions where tags && %s order by tags offset 0;")
    tags = request.args.getlist('tags')[0].split(',')
    cur.execute(query, (tags,))
    result = cur.fetchall()
    response = []
    for tags, caption in result:
        item = dict()
        item['caption'] = caption
        item['tags'] = " ".join(['#' + tag for tag in tags])
        response.append(item)
    return jsonify(response)

if __name__ == "__main__":
    connect_db()
    app.run(port=3000, debug=True)
