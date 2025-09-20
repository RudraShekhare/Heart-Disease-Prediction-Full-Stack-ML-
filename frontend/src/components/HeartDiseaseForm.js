import React, { useState } from "react";

const HeartDiseaseForm = () => {
  const [formData, setFormData] = useState({
    Sex: "",
    PhysicalHealthDays: "",
    MentalHealthDays: "",
    PhysicalActivities: "",
    SleepHours: "",
    HadAngina: "",
    HadStroke: "",
    HadCOPD: "",
    HadDiabetes: "",
    HadKidneyDisease: "",
    HadArthritis: "",
    HeightInMeters: "",
    WeightInKilograms: "",
    BMI: "",
    AlcoholDrinkers: "",
    HadAsthma: "",
    HadDepressiveDisorder: "",
    CovidPos: "",
    GeneralHealth: "",
    LastCheckupTime: "",
    RemovedTeeth: "",
    SmokerStatus: "",
    ECigaretteUsage: "",
    AgeCategory: "",
  });
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [tooltipVisible, setTooltipVisible] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if height, weight, and BMI are provided
    if (
      !formData.HeightInMeters ||
      !formData.WeightInKilograms ||
      !formData.BMI
    ) {
      setPredictionResult({ error: "Please provide height, weight, and BMI." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/predict_heart_disease",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.prediction !== undefined && result.confidence !== undefined) {
        setPredictionResult({
          prediction:
            result.prediction === 1
              ? "Heart Disease Detected"
              : "No Heart Disease",
          confidence: result.confidence,
        });
      } else {
        setPredictionResult({ error: result.error || "An error occurred." });
      }
    } catch (error) {
      setPredictionResult({ error: "Failed to fetch prediction." });
    }

    setLoading(false);
  };

  const renderInput = (label, name, tooltip = "", index, isInteger = false) => (
    <div className="col-span-2 md:col-span-1 text-center relative">
      <label className="block text-gray-700 font-medium mb-2">
        {label}
        {tooltip && (
          <span
            className="relative group ml-2 text-blue-500 cursor-pointer"
            onClick={() =>
              setTooltipVisible(tooltipVisible === index ? null : index)
            }
          >
            ℹ️
            {tooltipVisible === index && (
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-60 p-2 text-xs bg-gray-800 text-white rounded-md opacity-100 transition-opacity duration-200">
                {tooltip}
              </span>
            )}
          </span>
        )}
      </label>
      <input
        type="number"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        min="0"
        step={isInteger ? "1" : "any"}
        onWheel={(e) => e.preventDefault()}
        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-center"
      />
    </div>
  );

  const renderDropdown = (label, name, options, tooltip = "", index) => (
    <div className="col-span-2 md:col-span-1 text-center relative">
      <label className="block text-gray-700 font-medium mb-2">
        {label}
        {tooltip && (
          <span
            className="relative group ml-2 text-blue-500 cursor-pointer"
            onClick={() =>
              setTooltipVisible(tooltipVisible === index ? null : index)
            }
          >
            ℹ️
            {tooltipVisible === index && (
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-60 p-2 text-xs bg-gray-800 text-white rounded-md opacity-100 transition-opacity duration-200">
                {tooltip}
              </span>
            )}
          </span>
        )}
      </label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-center"
      >
        <option value="">Select...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center mt-5 px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          🫀 Heart Disease Prediction Form
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {renderDropdown("Sex", "Sex", ["Male", "Female"], "", 1)}
          {renderDropdown(
            "Age Category",
            "AgeCategory",
            [
              "Age 18 to 24",
              "Age 25 to 29",
              "Age 30 to 34",
              "Age 35 to 39",
              "Age 40 to 44",
              "Age 45 to 49",
              "Age 50 to 54",
              "Age 55 to 59",
              "Age 60 to 64",
              "Age 65 to 69",
              "Age 70 to 74",
              "Age 75 to 79",
              "Age 80 or older",
            ],
            "",
            2
          )}

          {renderDropdown(
            "General Health",
            "GeneralHealth",
            ["Excellent", "Very good", "Good", "Fair", "Poor"],
            "",
            3
          )}
          {renderDropdown(
            "Last Checkup Time",
            "LastCheckupTime",
            [
              "Within past year (anytime less than 12 months ago)",
              "Within past 2 years (1 year but less than 2 years ago)",
              "Within past 5 years (2 years but less than 5 years ago)",
              "5 or more years ago",
            ],
            "How long has it been since your last routine checkup?",
            4
          )}

          {renderInput(
            "Physical Health Days",
            "PhysicalHealthDays",
            "Number of days in the past 30 days when your physical health was not good.",
            5
          )}
          {renderInput(
            "Mental Health Days",
            "MentalHealthDays",
            "Number of days in the past 30 days when your mental health was not good.",
            6
          )}
          {renderInput(
            "Sleep Hours",
            "SleepHours",
            "Average number of hours you sleep per night.",
            7
          )}

          {renderDropdown(
            "Physical Activities",
            "PhysicalActivities",
            ["Yes", "No"],
            "Have you engaged in physical exercise in the past 30 days?",
            8
          )}
          {renderDropdown(
            "Drinks Alcohol",
            "AlcoholDrinkers",
            ["Yes", "No"],
            "",
            9
          )}

          {renderDropdown(
            "Smoker Status",
            "SmokerStatus",
            [
              "Never smoked",
              "Former smoker",
              "Current smoker - now smokes some days",
              "Current smoker - now smokes every day",
            ],
            "Your smoking history and current smoking habits.",
            10
          )}
          {renderDropdown(
            "E-Cigarette Usage",
            "ECigaretteUsage",
            [
              "Never used e-cigarettes in my entire life",
              "Not at all (right now)",
              "Use them some days",
              "Use them every day",
            ],
            "How frequently do you use e-cigarettes?",
            11
          )}

          {renderDropdown(
            "Removed Teeth",
            "RemovedTeeth",
            ["None of them", "1 to 5", "6 or more, but not all", "All"],
            "How many teeth have you had removed due to decay or gum disease?",
            12
          )}

          {renderDropdown("Had Angina", "HadAngina", ["Yes", "No"], "", 13)}
          {renderDropdown("Had Stroke", "HadStroke", ["Yes", "No"], "", 14)}
          {renderDropdown("Had COPD", "HadCOPD", ["Yes", "No"], "", 15)}
          {renderDropdown("Had Diabetes", "HadDiabetes", ["Yes", "No"], "", 16)}
          {renderDropdown(
            "Had Kidney Disease",
            "HadKidneyDisease",
            ["Yes", "No"],
            "",
            17
          )}
          {renderDropdown(
            "Had Arthritis",
            "HadArthritis",
            ["Yes", "No"],
            "",
            18
          )}
          {renderDropdown("Had Asthma", "HadAsthma", ["Yes", "No"], "", 19)}
          {renderDropdown(
            "Had Depressive Disorder",
            "HadDepressiveDisorder",
            ["Yes", "No"],
            "",
            20
          )}
          {renderDropdown("Covid Positive", "CovidPos", ["Yes", "No"], "", 21)}

          {renderInput(
            "Height (m)",
            "HeightInMeters",
            "Your height in meters. Please provide a decimal value (e.g., 1.75).",
            22
          )}
          {renderInput(
            "Weight (kg)",
            "WeightInKilograms",
            "Your weight in kilograms.",
            23
          )}
          {renderInput("BMI", "BMI", "Your Body Mass Index (BMI).", 24)}

          <div className="col-span-2 flex justify-center">
            <button
              type="submit" // Ensure the form submission triggers handleSubmit
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-200"
            >
              🔮 Predict Now
            </button>
          </div>
        </form>

        {/* Prediction Result */}
        {predictionResult && (
          <div className="mt-8 p-4 bg-green-100 rounded-lg">
            {predictionResult.error ? (
              <p className="text-red-500">{predictionResult.error}</p>
            ) : (
              <>
                <p className="text-lg font-semibold text-gray-700">
                  Prediction:{" "}
                  <span
                    className={`${
                      predictionResult.prediction === "Heart Disease Detected"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {predictionResult.prediction}
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  Confidence: {predictionResult.confidence}{" "}
                </p>
              </>
            )}
          </div>
        )}

        {loading && <div className="mt-4 text-center">Loading...</div>}
      </div>
    </div>
  );
};

export default HeartDiseaseForm;
