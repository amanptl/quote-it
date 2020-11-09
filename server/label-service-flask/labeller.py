import flask
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

app = flask.Flask(__name__)
model = None
tags = None

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

def initialize_service():
  global model
  model = load_model('model/model.h5', custom_objects={"f1": f1,
                                                       "recall": recall,
                                                       "precision": precision})
  global tags
  tags = np.load('model/tags.npy')                                                       

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
      hash_tags.append('#' + tags[top_n_index])
  return hash_tags

@app.route("/predict", methods=["GET", "POST"])
def predict():
    data = {"success": False}
    image = prepare_image(flask.request.files['image'].read(), target=(224,224))
    result = get_predictions(image)
    data["predictions"] = result
    data["success"] = True
    return flask.jsonify(data)    
 
if __name__ == "__main__":
  print("[INFO] Loading model.")
  initialize_service()
  print("[INFO] Model loaded.")
  app.run(port=5000, debug=True)
