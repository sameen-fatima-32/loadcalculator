"use client";

import React, { useState, useEffect } from "react";

// Material options with U-values
const materials = [
  { label: "4-in. Concrete + Air Space", uValue: 0.350 },
  { label: "4-in. Concrete + 2-in. Insulation", uValue: 0.116 },
  { label: "12-in. Concrete + Insulation", uValue: 0.113 },
  { label: "Metal Curtain Wall with Insulation", uValue: 0.230 },
  { label: "Frame Wall with Insulation", uValue: 0.178 },
];

const HeatTransferCalculator = ({ onCalculate }) => {
  const [inputs, setInputs] = useState({
    length: "",
    height: "",
    tempDifference: "",
    uValue: 0,
  });

  const [heatTransfer, setHeatTransfer] = useState(0);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value === "" ? "" : Math.max(0, parseFloat(value) || 0) }));
  };

  // Handle material selection
  const handleMaterialChange = (e) => {
    const selectedMaterial = materials.find((mat) => mat.label === e.target.value);
    setInputs((prev) => ({ ...prev, uValue: selectedMaterial?.uValue || 0 }));
  };

  // Auto-calculate heat transfer when inputs change
  useEffect(() => {
    const { length, height, tempDifference, uValue } = inputs;

    if (length && height && tempDifference && uValue) {
      const area = length * height;
      const calculatedHeat = uValue * area * tempDifference;
      setHeatTransfer(calculatedHeat);

      if (typeof onCalculate === "function") {
        onCalculate(calculatedHeat);
      }
    } else {
      setHeatTransfer(0);
      if (typeof onCalculate === "function") {
        onCalculate(0);
      }
    }
  }, [inputs, onCalculate]);

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Heat Transfer Through Partition Wall
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Input Details</h2>

        {/* Material Selection */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Material:</label>
          <select
            onChange={handleMaterialChange}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select Material --</option>
            {materials.map((material, index) => (
              <option key={index} value={material.label}>
                {material.label} (U-Value: {material.uValue})
              </option>
            ))}
          </select>
        </div>

        {/* Wall Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Length of Wall (ft):</label>
            <input
              type="number"
              name="length"
              value={inputs.length}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Height of Wall (ft):</label>
            <input
              type="number"
              name="height"
              value={inputs.height}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>
        </div>

        {/* Temperature Difference */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Temperature Difference (°F):</label>
          <input
            type="number"
            name="tempDifference"
            value={inputs.tempDifference}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>
      </div>

      {/* Result */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Result</h2>
        {heatTransfer > 0 ? (
          <p className="text-xl">
            Heat Transfer Through Wall: <strong>{heatTransfer.toFixed(2)} BTU/hr</strong>
          </p>
        ) : (
          <p className="text-gray-600">Enter values to calculate heat transfer.</p>
        )}
      </div>
    </div>
  );
};

export default HeatTransferCalculator;
