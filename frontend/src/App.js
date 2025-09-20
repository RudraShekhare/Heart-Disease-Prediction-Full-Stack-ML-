import React from "react";
import PredictorSelector from "./PredictorSelector";
import Chatbot from "./Chatbot";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          AI Health Predictor 🏥
        </h1>
        <PredictorSelector />
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
