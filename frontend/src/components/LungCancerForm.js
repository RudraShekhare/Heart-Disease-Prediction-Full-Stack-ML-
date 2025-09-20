import React, { useState } from "react";

const LungDiseaseForm = () => {
  const [formData, setFormData] = useState({
    GENDER: "",
    AGE: "",
    SMOKING: "",
    YELLOW_FINGERS: "",
    ANXIETY: "",
    PEER_PRESSURE: "",
    "CHRONIC DISEASE": "",
    "FATIGUE ": "",
    "ALLERGY ": "",
    WHEEZING: "",
    "ALCOHOL CONSUMING": "",
    COUGHING: "",
    "SHORTNESS OF BREATH": "",
    "SWALLOWING DIFFICULTY": "",
    "CHEST PAIN": "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputData = {
      GENDER: formData.GENDER,
      AGE: Number(formData.AGE),
      SMOKING: Number(formData.SMOKING),
      YELLOW_FINGERS: Number(formData["YELLOW_FINGERS"]),
      ANXIETY: Number(formData.ANXIETY),
      PEER_PRESSURE: Number(formData["PEER_PRESSURE"]),
      "CHRONIC DISEASE": Number(formData["CHRONIC DISEASE"]),
      "FATIGUE ": Number(formData["FATIGUE "]),
      "ALLERGY ": Number(formData["ALLERGY "]),
      WHEEZING: Number(formData.WHEEZING),
      "ALCOHOL CONSUMING": Number(formData["ALCOHOL CONSUMING"]),
      COUGHING: Number(formData.COUGHING),
      "SHORTNESS OF BREATH": Number(formData["SHORTNESS OF BREATH"]),
      "SWALLOWING DIFFICULTY": Number(formData["SWALLOWING DIFFICULTY"]),
      "CHEST PAIN": Number(formData["CHEST PAIN"]),
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/predict_lung_disease",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputData),
        }
      );

      const data = await response.json();

      setResult({
        prediction:
          data.prediction === 1
            ? "🛑 Lung Disease Detected"
            : "✅ No Lung Disease",
        probability: data.confidence || "N/A",
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
          🫁 Lung Disease Prediction Form
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* GENDER */}
          <div className="col-span-2 md:col-span-1 text-center">
            <label className="block text-gray-700 font-medium mb-2 text-center">
              GENDER
            </label>
            <select
              name="GENDER"
              value={formData.GENDER}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-center"
            >
              <option value="">Select...</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          {/* AGE */}
          <div className="col-span-2 md:col-span-1 text-center">
            <label className="block text-gray-700 font-medium mb-2 text-center">
              AGE
            </label>
            <input
              type="number"
              name="AGE"
              value={formData.AGE}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-center"
              min="0"
            />
          </div>

          {/* Dynamic Form Fields */}
          {[
            { name: "SMOKING", label: "SMOKING" },
            { name: "YELLOW FINGERS", label: "YELLOW_FINGERS" },
            { name: "ANXIETY", label: "ANXIETY" },
            { name: "PEER PRESSURE", label: "PEER_PRESSURE" },
            { name: "CHRONIC DISEASE", label: "CHRONIC DISEASE" },
            { name: "FATIGUE ", label: "FATIGUE" },
            { name: "ALLERGY ", label: "ALLERGY" },
            { name: "WHEEZING", label: "WHEEZING" },
            { name: "ALCOHOL CONSUMING", label: "ALCOHOL CONSUMING" },
            { name: "COUGHING", label: "COUGHING" },
            { name: "SHORTNESS OF BREATH", label: "SHORTNESS OF BREATH" },
            { name: "SWALLOWING DIFFICULTY", label: "SWALLOWING DIFFICULTY" },
            { name: "CHEST PAIN", label: "CHEST PAIN" },
          ].map((field, index) => (
            <div key={index} className="col-span-2 md:col-span-1 text-center">
              <label className="block text-gray-700 font-medium mb-2 text-center">
                {field.label}
              </label>
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-center"
              >
                <option value="">Select...</option>
                <option value="2">YES</option>
                <option value="1">NO</option>
              </select>
            </div>
          ))}

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

export default LungDiseaseForm;
