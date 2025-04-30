# AI EcoTrack – Waste Classification using MobileNetV2 (Transfer Learning)

## Overview
This is the enhanced version of EcoTrack where I adopted **transfer learning using MobileNetV2** to boost the performance and efficiency of the model. It classifies waste images into six categories and is designed to support smart city initiatives and sustainability goals.

This project builds upon the lessons from my custom CNN model and aims to improve generalization, accuracy, and training speed by leveraging a pretrained model that already understands complex image features.

## Why Transfer Learning?
Training a CNN from scratch is effective for learning, but it:
- Requires large datasets
- Needs time to converge
- Struggles with imbalanced data

MobileNetV2, pre-trained on ImageNet, provides strong visual feature extraction and is well-optimized for mobile and web applications. I chose it because:
- It's lightweight and fast
- Suitable for real-time deployment
- Performs well even with limited data

## Dataset
- **Source**: [TrashNet Dataset](https://github.com/garythung/trashnet)
- 6 classes, resized to 150x150
- Augmented and split into 80% training, 20% validation

## Model Architecture
- Base: MobileNetV2 (frozen)
- Head: GlobalAveragePooling → Dropout → Dense (ReLU) → Dense (Softmax)
- Optimizer: Adam (lr=0.0001)
- Loss: Categorical Crossentropy

## Accuracy & Benefits
- Improved accuracy compared to custom CNN
- Trained faster and generalized better
- Ideal for deployment in mobile or cloud environments

## Run Locally
pip install -r requirements.txt
streamlit run app/streamlit_app.py

## Future Vision
-Deploy this model on Streamlit Cloud or Hugging Face Spaces
-Expand the dataset and unfreeze MobileNetV2 top layers for fine-tuning
-Use this as a base for building an AI-powered sustainability assistant

🔗 Live Demo prepared by Pooja Anilkumar 
https://ecotrack-mobilenet.streamlit.app/
