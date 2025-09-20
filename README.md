# Multi-Disease Prediction App (Diabetes, Heart Disease, Lung Cancer + Gemini Chatbot)
 Overview

This is a full-stack AI-powered health prediction system that predicts the likelihood of Diabetes, Heart Disease, and Lung Cancer based on user-provided health data.

The backend is powered by Flask and pre-trained XGBoost models, while the frontend is built with React and Tailwind CSS. It also integrates a Gemini AI chatbot to provide lifestyle advice, remedies, and general health guidance.

The goal of this project is to demonstrate how Machine Learning + Modern Web Development can create an accessible tool that supports awareness and decision-making.

---

## Project overview 

✅ Diabetes Prediction (clinical & lifestyle data)
✅ Heart Disease Prediction (health indicators)
✅ Lung Cancer Prediction (risk factors)
✅ Gemini Chatbot for personalized health guidance
✅ Flask REST API with CORS support
✅ Responsive React + Tailwind UI with real-time results

---

## Features

- Predicts Heart Disease, Diabetes, and Lung Cancer with over 97% accuracy
- Form-based input collection for health parameters
- Real-time prediction using trained machine learning models
- Chatbot provides follow-up suggestions, remedies, and treatment opinions
- Simple and clean user interface
  
---

## Tech Stack

| Component      | Technology                           |
| -------------- | ------------------------------------ |
| Frontend       | HTML, CSS, JavaScript                |
| Backend        | Python Flask                         |
| ML Algorithm   | XGBoost                              |
| Tools Used     | Visual Studio Code, Jupyter Notebook |
| Libraries Used | pandas, numpy, xgboost               |

Website images:
<img width="1512" height="824" alt="Screenshot 2025-08-18 at 7 05 51 PM" src="https://github.com/user-attachments/assets/77c0a320-5b59-46d2-becd-f6129e18e765" />
<img width="1512" height="824" alt="Screenshot 2025-08-18 at 7 06 28 PM" src="https://github.com/user-attachments/assets/fe2f52a8-1e8d-4077-be91-4923f9d2194a" />
<img width="1512" height="824" alt="Screenshot 2025-08-18 at 7 06 20 PM" src="https://github.com/user-attachments/assets/ad8d2909-02e4-4bad-a260-84092b7c9821" />

---

## ⚙️ Setup Instructions
 **Clone the Repo
 ```bash
 git clone https://github.com/<your-username>/multi-disease-predictor.git
 cd multi-disease-predictor

 ```
 **Backend Setup
 ```bash
  cd backend
  python3 -m venv venv
  source venv/bin/activate   # (Windows: venv\Scripts\activate)
  pip install -r requirements.txt
  python main.py
```
Backend will run at: http://127.0.0.1:5000

**Frontend Setup
``` bash
cd frontend
npm install
npm start     # or npm run dev (if Vite)
```
Frontend will run at:
- CRA → http://localhost:3000
- Vite → http://localhost:5173
  
---

🛠️ Future Improvements

- Add more diseases (Kidney, Stroke, etc.)
- Deploy with Docker for production
- Improve chatbot with medical knowledge graphs
- Add user authentication & history tracking

---

👨‍💻 Author

Rudra Shekhare
Computer Engineering | Data Science & Machine Learning Enthusiast
