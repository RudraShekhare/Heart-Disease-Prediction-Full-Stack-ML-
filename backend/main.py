import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai  


app = Flask(__name__)
CORS(app)
genai.configure(api_key="")
# Load the diabetes model, scaler, and encoders
diabetes_model = joblib.load("models/diabetes_xgboost.pkl")
diabetes_scaler = joblib.load("models/diabetes_scaler.pkl")
diabetes_label_encoders = joblib.load("models/diabetes_label_encoders.pkl")

# Load the heart disease model, scaler, and encoders
heart_model = joblib.load("models/heart_xgboost.pkl")
heart_scaler = joblib.load("models/heart_scaler.joblib")


### Diabetes_Prediction
diabetes_categorical_cols = ["gender", "smoking_history"]
diabetes_numerical_cols = ["age", "bmi", "HbA1c_level", "blood_glucose_level"]

heart_categorical_cols = [
    "Sex", "GeneralHealth", "LastCheckupTime", "SmokerStatus", "ECigaretteUsage", "AgeCategory", "PhysicalActivities"
]
heart_numerical_cols = [
    "PhysicalHealthDays", "MentalHealthDays", "SleepHours", "RemovedTeeth", "HadHeartAttack", "HadAngina",
    "HadStroke", "HadCOPD", "HadDiabetes", "HadKidneyDisease", "HadAsthma", "HadDepressiveDisorder", "CovidPos",
    "BMI", "AlcoholDrinkers"
]


@app.route("/predict_diabetes", methods=["POST"])
def predict_diabetes():
    try:
        data = request.json

        # Convert input into a DataFrame
        input_df = pd.DataFrame([[
            data["gender"], data["age"], data["hypertension"],
            data["heart_disease"], data["smoking_history"],
            data["bmi"], data["HbA1c_level"], data["blood_glucose_level"]
        ]], columns=["gender", "age", "hypertension", "heart_disease",
                     "smoking_history", "bmi", "HbA1c_level", "blood_glucose_level"])

        # Encode categorical data
        for col in diabetes_categorical_cols:
            if data[col] not in diabetes_label_encoders[col].classes_:
                return jsonify({"error": f"Invalid value '{data[col]}' for {col}"})
            input_df[col] = diabetes_label_encoders[col].transform(input_df[col])

        # Scale numerical data
        input_df[diabetes_numerical_cols] = diabetes_scaler.transform(input_df[diabetes_numerical_cols])

        # Convert to NumPy array
        input_data = input_df.to_numpy()

        # Make prediction
        prediction = diabetes_model.predict(input_data)[0]
        probability = diabetes_model.predict_proba(input_data)[0][int(prediction)] * 100

        return jsonify({"prediction": int(prediction), "probability": float(probability)})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)})


### Heart_Disease_Prediction
binary_cols = [
    "PhysicalActivities", "HadAngina", "HadStroke", "HadCOPD",
    "HadDiabetes", "HadKidneyDisease", "HadArthritis", "AlcoholDrinkers",
    "HadAsthma", "HadDepressiveDisorder", "CovidPos"
]
label_col = ["GeneralHealth", "LastCheckupTime", "RemovedTeeth", "SmokerStatus", "ECigaretteUsage", "AgeCategory"]
num_cols = ["PhysicalHealthDays", "MentalHealthDays", "SleepHours", 
            "HeightInMeters", "WeightInKilograms", "BMI"]
correct_order = [
    "Sex", "GeneralHealth", "PhysicalHealthDays", "MentalHealthDays",
    "LastCheckupTime", "PhysicalActivities", "SleepHours", "RemovedTeeth",
    "HadAngina", "HadStroke", "HadCOPD", "HadDiabetes",
    "HadKidneyDisease", "HadArthritis", "SmokerStatus", "ECigaretteUsage",
    "AgeCategory", "HeightInMeters", "WeightInKilograms", "BMI",
    "AlcoholDrinkers", "HadAsthma", "HadDepressiveDisorder", "CovidPos"
]

@app.route("/predict_heart_disease", methods=["POST"])
def predict_heart_disease():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])
        df["Sex"] = df["Sex"].map({"Female": 0, "Male": 1})
        # Convert "Yes" to 1 and "No" to 0
        for col in binary_cols:
            df[col] = df[col].map({"Yes": 1, "No": 0})
        df["HadDiabetes"] = df["HadDiabetes"].astype(float)
        df["CovidPos"] = df["CovidPos"].astype(float)
        
        import joblib
        from sklearn.preprocessing import LabelEncoder , StandardScaler 
        label_encoder = joblib.load("heart_label_encoder.pkl")
        for col in label_col:
            df[col] = label_encoder.fit_transform(df[col])
        scaler = joblib.load("heart_scaler.joblib")
        df[num_cols] = scaler.fit_transform(df[num_cols])

        df = df[correct_order]

        ## Prediction 
        model = joblib.load("heart_xgboost.pkl")
        prediction = model.predict(df)[0]

        # Get probability of class 1 
        probability = model.predict_proba(df)[0][1]  
        confidence = probability if prediction == 1 else (1 - probability)
        return {
            "prediction": int(prediction),
            "confidence": f"{confidence * 100:.2f}%"
        }

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)})


## Lung Cancer 
@app.route("/predict_lung_disease", methods=["POST"])
def predict_lung_disease():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])
        import joblib 
        import xgboost as xgb 
        lung_model = joblib.load("lung_cancer_model.pkl")

        df["GENDER"] = df["GENDER"].map({"M": 0, "F": 1})
        prediction = lung_model.predict(df)[0]
        expected_columns = [
            "GENDER", "AGE", "SMOKING", "YELLOW_FINGERS", "ANXIETY",
            "PEER_PRESSURE", "CHRONIC DISEASE", "FATIGUE ", "ALLERGY ", "WHEEZING",
            "ALCOHOL CONSUMING", "COUGHING", "SHORTNESS OF BREATH",
            "SWALLOWING DIFFICULTY", "CHEST PAIN"
        ]
        df = df[expected_columns]
        probability = lung_model.predict_proba(df)[0][1]  
        confidence = probability if prediction == 1 else (1 - probability)
        return {
            "prediction": int(prediction),
            "confidence": f"{confidence * 100:.2f}%"
        }       

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)})
        
@app.route("/gemini_chat", methods=["POST"])
def gemini_chat():
    try:
        data = request.json
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"response": "Please enter a message."})

        # Use Gemini AI for response generation
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(user_message)

        return jsonify({"response": response.text})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "Failed to fetch AI response."})



if __name__ == "__main__":
    app.run(debug=True)
