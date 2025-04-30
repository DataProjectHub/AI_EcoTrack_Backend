# AI_EcoTrack/app/streamlit_app.py

import streamlit as st
import os
from utils.predict import predict_waste

st.title("♻️ EcoTrack - AI Waste Sorter")
st.write("Upload an image of waste to classify it into the correct category.")

# Upload an image
uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "png", "jpeg"])

if uploaded_file is not None:
    img_path = os.path.join("temp", uploaded_file.name)
    
    os.makedirs("temp", exist_ok=True)
    with open(img_path, "wb") as f:
        f.write(uploaded_file.getbuffer())
    
    st.image(img_path, caption="Uploaded Image", use_column_width=True)

    # Predict
    with st.spinner("Classifying..."):
        label, probs = predict_waste(img_path)
        st.success(f"Predicted Category: **{label.upper()}**")
        st.write("Confidence Scores:")
        for i, p in enumerate(probs):
            st.write(f"- {i+1}. {p:.2%}")