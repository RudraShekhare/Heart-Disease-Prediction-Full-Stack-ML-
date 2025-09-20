import React, { useState } from "react";

const DiabetesForm = () => {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    smoking_history: "",
    bmi: "",
    HbA1c_level: "",
    blood_glucose_level: "",
  });

  const [result, setResult] = useState(null); // Store prediction result

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputData = {
      gender: formData.gender,
      age: Number(formData.age),
      hypertension: Number(formData.hypertension),
      heart_disease: Number(formData.heart_disease),
      smoking_history: formData.smoking_history,
      bmi: parseFloat(formData.bmi),
      HbA1c_level: parseFloat(formData.HbA1c_level),
      blood_glucose_level: Number(formData.blood_glucose_level),
    };

    console.log("Submitting:", inputData);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict_diabetes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();
      console.log("Prediction Result:", data);

      setResult({
        prediction:
          data.prediction === 1 ? "🛑 Diabetes Detected" : "✅ No Diabetes",
        probability: data.probability
          ? data.probability.toFixed(2) + "%"
          : "N/A",
      });
    } catch (error) {
      console.error("Error:", error);
      setResult({
        prediction: "❌ Error occurred",
        probability: "Please try again!",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          🩺 Diabetes Prediction Form
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Gender */}
          <div className="col-span-2 md:col-span-1 text-center">
            <label className="block text-gray-700 font-medium mb-2 text-center">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-center focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Age */}
          <div className="col-span-2 md:col-span-1 text-center">
            <label className="block text-gray-700 font-medium mb-2 text-center">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-center focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              min="0"
            />
          </div>

          {/* Hypertension */}
          <div className="col-span-2 md:col-span-1 text-center">
            <label className="block text-gray-700 font-medium mb-2 text-center">
              Hypertension
            </label>
            <select
              name="hypertension"
              value={formData.hypertension}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-center focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            >
              <option value="">Select...</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          {/* Heart Disease */}
          <div className="col-span-2 md:col-span-1 text-center">
            <label className="block text-gray-700 font-medium mb-2 text-center">
              Heart Disease
            </label>
            <select
              name="heart_disease"
              value={formData.heart_disease}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-center focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            >
              <option value="">Select...</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          {/* Smoking History */}
          <div className="col-span-2 text-center">
            <label className="block text-gray-700 font-medium mb-2 text-center">
              Smoking History
            </label>
            <select
              name="smoking_history"
              value={formData.smoking_history}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-center focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            >
              <option value="">Select...</option>
              <option value="never">Never</option>
              <option value="former">Former Smoker</option>
              <option value="current">Current Smoker</option>
            </select>
          </div>

          {/* BMI */}
          <div className="col-span-2 md:col-span-1 text-center">
            <label className="block text-gray-700 font-medium mb-2 text-center">
              BMI
            </label>
            <input
              type="number"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-center focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              step="0.01"
              min="0"
            />
          </div>

          {/* HbA1c Level */}
          <div className="col-span-2 md:col-span-1 text-center">
            <label className="block text-gray-700 font-medium mb-2 text-center">
              HbA1c Level
            </label>
            <input
              type="number"
              name="HbA1c_level"
              value={formData.HbA1c_level}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-center focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              step="0.1"
              min="0"
            />
          </div>

          {/* Blood Glucose Level */}
          <div className="col-span-2 text-center">
            <label className="block text-gray-700 font-medium mb-2 text-center">
              Blood Glucose Level
            </label>
            <input
              type="number"
              name="blood_glucose_level"
              value={formData.blood_glucose_level}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-center focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              min="0"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-200 shadow-lg">
              🔮 Predict Now
            </button>
          </div>
        </form>

        {/* Display Prediction Result */}
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
            <h3 className="text-xl font-semibold">{result.prediction}</h3>
            <p className="text-gray-700">Probability: {result.probability}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiabetesForm;
