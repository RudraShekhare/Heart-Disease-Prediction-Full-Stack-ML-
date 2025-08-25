# ❤️ Heart Disease Prediction (Full-Stack ML Project)

## 📌 Overview
This project predicts the risk of heart disease based on patient health parameters using Machine Learning.  
It is a **full-stack ML application** built with:
- **Python (Flask)** for backend API
- **React.js** for frontend UI
- **Scikit-learn, XGBoost** for ML model
- **SHAP** for model explainability

---

## 🚀 Features
- ML model trained on UCI Heart Disease dataset
- REST API for predictions
- Frontend form for user input
- Real-time results (Low/High risk)
- Deployed on cloud (Render + Netlify)

---

## 📊 Dataset
- Source: [UCI Heart Disease Dataset](https://archive.ics.uci.edu/ml/datasets/heart+disease)
- Features: age, cholesterol, blood pressure, max heart rate, etc.
- Target: 0 (no disease), 1 (disease)

---

## 🛠 Tech Stack

- Python, Flask
- Scikit-learn, XGBoost, SHAP
- React.js
- Render (backend deployment)
- Netlify (frontend deployment)

---

## 📂 Project Structure
heart-disease-prediction/
│── backend/ # Flask API
│── frontend/ # React UI
│── notebooks/ # Data science notebooks
│── README.md # Documentation


---

## ⚙️ Setup Instructions

### 1. Backend (Flask API)

cd backend
pip install -r requirements.txt
python app.py

### 2. Frontend (React)
cd frontend
npm install
npm start

Now open:

Frontend → http://localhost:3000
Backend → http://localhost:5000/predict

Results

Accuracy: ~85% with RandomForest & XGBoost
Explainability: SHAP shows key features (cholesterol, chest pain type, etc.)

Deployment

Frontend: [Netlify link]
Backend: [Render/AWS link]

Author

Rudra Shekhare
B.Tech Student | Aspiring Data Scientist | www.linkedin.com/in/rudra-shekhare


---
