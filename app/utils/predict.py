# AI_EcoTrack/app/utils/predict.py

import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

# Load your model once
model = tf.keras.models.load_model('models/eco_mobilenet_model.h5')

# List of class names based on your dataset folders
class_names = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']

def predict_waste(img_path):
    img = image.load_img(img_path, target_size=(150, 150))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    predicted_class = class_names[np.argmax(prediction)]

    return predicted_class, prediction[0]
