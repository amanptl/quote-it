from flask import Flask, jsonify, request
import tensorflow as tf
from tensorflow.keras import backend as K
import keras
import numpy as np
from keras.models import load_model
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.applications.mobilenet_v2 import preprocess_input
from PIL import Image
import io
from psycopg2 import connect, Error

app = Flask(__name__)
model = None
tags = None

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

def recall(y_true, y_pred):
  true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
  possible_positives = K.sum(K.round(K.clip(y_true, 0, 1)))
  recall = true_positives / (possible_positives + K.epsilon())
  return recall

def precision(y_true, y_pred):
  true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
  predicted_positives = K.sum(K.round(K.clip(y_pred, 0, 1)))
  precision = true_positives / (predicted_positives + K.epsilon())
  return precision

def f1(y_true, y_pred):
  p = precision(y_true, y_pred)
  r = recall(y_true, y_pred)
  return 2*((p*r)/(p+r+K.epsilon()))                                                     

def prepare_image(image, target):
  image = Image.open(io.BytesIO(image))
  image = image.resize(target)
  image = img_to_array(image)
  image = np.expand_dims(image, axis=0)
  image = preprocess_input(image)
  return image

def get_predictions(image):
  prediction = model.predict(image)[0]
  top_n = 10
  hash_tags = []
  top_n_indices = np.argpartition(prediction, -top_n)[-top_n:]
  for top_n_index in top_n_indices:
      hash_tags.append(tags[top_n_index])
  return hash_tags

def get_captions(tags):
    #query = ("select tags, caption from captions where tags && %s order by tags offset 0;")
    query = ("select caption from captions where tags && %s order by tags offset 0;")
    cur.execute(query, (tags,))
    result = cur.fetchall()
    response = []
    #for tags, caption in result:
    for index, caption in enumerate(result):
        item = dict()
        item['id'] = index
        item['caption']  = caption[0]
        item['caption'] += '\n.\n.\n.\n'
        item['caption'] += " ".join(['#' + tag for tag in tags])
        response.append(item)
    return response


@app.route("/predict", methods=["GET", "POST"])
def predict():
    data = {"success": False}
    image = prepare_image(request.files['image'].read(), target=(224,224))
    tags = get_predictions(image)
    result = get_captions(tags)
    data["predictions"] = result
    data["success"] = True
    return jsonify(data)    

def initialize_service():
  global model
  model = load_model('model/model.h5', custom_objects={"f1": f1,
                                                       "recall": recall,
                                                       "precision": precision})
  global tags
  tags = np.load('model/tags.npy')  
 
if __name__ == "__main__":
  print("[INFO] Loading model.")
  initialize_service()
  connect_db()
  print("[INFO] Model loaded.")
  app.run(port=5000, debug=True)
