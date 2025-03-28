"use client";

import React, { useState } from "react";

const HeatDissipationCalculator6 = ({ onCalculate }) => {
  const [heatDissipation, setHeatDissipation] = useState(0);
  const [numEquipment, setNumEquipment] = useState(0);
  const [totalHeat, setTotalHeat] = useState(null);

  const calculateHeatDissipation = () => {
    if (heatDissipation <= 0 || isNaN(heatDissipation)) {
      alert("Please enter a valid heat dissipation value.");
      return;
    }

    if (numEquipment <= 0 || isNaN(numEquipment)) {
      alert("Please enter a valid number of equipment.");
      return;
    }

    const totalHeatGenerated = heatDissipation * numEquipment;
    setTotalHeat(totalHeatGenerated);

    // 🔥 Send the calculated value to parent component
    if (onCalculate) {
      console.log("Sending heat dissipation value:", totalHeatGenerated); // Debug log
      onCalculate(totalHeatGenerated);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Heat Dissipation by Electric Equipment
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Input Details</h2>

        {/* Heat Dissipation per Equipment */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Heat Dissipation per Equipment (Btu/h):</label>
          <input
            type="number"
            value={heatDissipation}
            onChange={(e) => setHeatDissipation(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>

        {/* Number of Equipment */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Number of Equipment:</label>
          <input
            type="number"
            value={numEquipment}
            onChange={(e) => setNumEquipment(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border rounded"
            min="1"
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateHeatDissipation}
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300"
        >
          Calculate Heat Dissipation
        </button>
      </div>

      {/* Result */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Result</h2>
        {totalHeat !== null ? (
          <p className="text-xl">
            Total Heat Dissipation: <strong>{totalHeat.toFixed(2)} Btu/h</strong>
          </p>
        ) : (
          <p className="text-gray-600">Enter values to calculate heat dissipation.</p>
        )}
      </div>
    </div>
  );
};

export default HeatDissipationCalculator6;
