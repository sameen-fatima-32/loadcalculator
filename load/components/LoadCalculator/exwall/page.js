"use client";

import React, { useState, useEffect } from "react";

// Material options
const materials = [
  { label: "4-in. Face Brick + Air Space + 4-in. Common Brick", uValue: 0.358 },
  { label: "4-in. Face Brick + 2-in. Insulation + 4-in. Common Brick", uValue: 0.111 },
  { label: "4-in. Concrete + Air Space", uValue: 0.350 },
  { label: "4-in. Concrete + 2-in. Insulation", uValue: 0.116 },
  { label: "8-in. Block + Insulation", uValue: 0.107 },
  { label: "12-in. Concrete + Insulation", uValue: 0.113 },
  { label: "Metal Curtain Wall with Insulation", uValue: 0.230 },
  { label: "Frame Wall with Insulation", uValue: 0.178 },
];

const HeatTransferCalculator1 = ({ onCalculate }) => {
  const [inputs, setInputs] = useState({
    length: 0,
    height: 0,
    tempDifference: 0,
    uValue: 0,
  });

  const [result, setResult] = useState(0);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  // U-Value change handler
  const handleMaterialChange = (e) => {
    const selectedMaterial = materials.find((mat) => mat.label === e.target.value);
    setInputs((prev) => ({ ...prev, uValue: selectedMaterial?.uValue || 0 }));
  };

  // Calculate heat transfer dynamically
  useEffect(() => {
    const { length, height, tempDifference, uValue } = inputs;
    const area = length * height;
    const heatTransfer = uValue * area * tempDifference;
    setResult(heatTransfer);
    onCalculate(heatTransfer); // Send result to parent
  }, [inputs, onCalculate]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Heat Transfer - Exterior Wall</h2>

      {/* Material Selection */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Material:</label>
        <select onChange={handleMaterialChange} className="w-full p-2 border rounded">
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
        />
      </div>

      {/* Result */}
      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        <h3 className="text-lg font-semibold">Heat Transfer:</h3>
        <p className="text-xl font-bold text-blue-600">{result.toFixed(2)} BTU/hr</p>
      </div>
    </div>
  );
};

export default HeatTransferCalculator1;
