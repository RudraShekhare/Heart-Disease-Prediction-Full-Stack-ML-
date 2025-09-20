import React, { useState } from "react";
import DiabetesForm from "./components/DiabetesForm";
import HeartDiseaseForm from "./components/HeartDiseaseForm";
import LungDiseaseForm from "./components/LungCancerForm";

const PredictorSelector = () => {
  const [selectedPredictor, setSelectedPredictor] = useState("");

  return (
    <div>
      <label className="block text-lg font-semibold mb-2 ">
        Choose a Predictor:
      </label>
      <select
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setSelectedPredictor(e.target.value)}
      >
        <option value="">Select...</option>
        <option value="diabetes">Diabetes Predictor</option>
        <option value="heartDisease">Heart Disease Predictor</option>
        <option value="lungCancer">Lung Cancer Predictor</option>
      </select>

      {selectedPredictor === "diabetes" && <DiabetesForm />}
      {selectedPredictor === "heartDisease" && <HeartDiseaseForm />}
      {selectedPredictor === "lungCancer" && <LungDiseaseForm />}
    </div>
  );
};

export default PredictorSelector;
