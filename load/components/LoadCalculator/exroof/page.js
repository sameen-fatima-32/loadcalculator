"use client";

import React, { useState, useEffect } from "react";

// Roof material options
const roofMaterials = [
  { label: "Steel Sheet with 1-in. Insulation", uValue: 0.213 },
  { label: "1-in. Wood with 1-in. Insulation", uValue: 0.170 },
  { label: "4-in. Lightweight Concrete", uValue: 0.213 },
  { label: "2-in. Heavyweight Concrete with 1-in. Insulation", uValue: 0.206 },
  { label: "1-in. Wood with 2-in. Insulation", uValue: 0.109 },
  { label: "6-in. Lightweight Concrete", uValue: 0.158 },
  { label: "2.5-in. Wood with 1-in. Insulation", uValue: 0.130 },
  { label: "8-in. Lightweight Concrete", uValue: 0.126 },
  { label: "4-in. Heavyweight Concrete with 1-in. Insulation", uValue: 0.200 },
  { label: "2.5-in. Wood with 2-in. Insulation", uValue: 0.093 },
  { label: "Roof Terrace System", uValue: 0.106 },
  { label: "6-in. Heavyweight Concrete with 1-in. Insulation", uValue: 0.192 },
  { label: "4-in. Wood with 1-in. Insulation", uValue: 0.106 },
  { label: "Other", uValue: null }, // Custom input option
];

const HeatTransferThroughRoof3 = ({ onCalculate }) => {
  const [inputs, setInputs] = useState({
    length: 0,
    width: 0,
    tempDifference: 0,
    uValue: 0,
  });

  const [isCustomUValue, setIsCustomUValue] = useState(false);
  const [result, setResult] = useState(0);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  // Handle material selection
  const handleMaterialChange = (e) => {
    const selectedMaterial = roofMaterials.find((mat) => mat.label === e.target.value);
    if (selectedMaterial?.label === "Other") {
      setIsCustomUValue(true);
      setInputs((prev) => ({ ...prev, uValue: 0 }));
    } else {
      setIsCustomUValue(false);
      setInputs((prev) => ({ ...prev, uValue: selectedMaterial?.uValue || 0 }));
    }
  };

  // Auto-calculate heat transfer
  useEffect(() => {
    const { length, width, tempDifference, uValue } = inputs;
    if (length > 0 && width > 0 && tempDifference > 0 && uValue > 0) {
      const area = length * width;
      const heatTransfer = uValue * area * tempDifference;
      setResult(heatTransfer.toFixed(2));
      onCalculate(heatTransfer); // Pass result to parent
    } else {
      setResult(0);
      onCalculate(0);
    }
  }, [inputs, onCalculate]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Heat Transfer - Roof</h2>

      {/* Material Selection */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Roof Material:</label>
        <select onChange={handleMaterialChange} className="w-full p-2 border rounded">
          <option value="">-- Select Material --</option>
          {roofMaterials.map((material, index) => (
            <option key={index} value={material.label}>
              {material.label} {material.uValue !== null && `(U-Value: ${material.uValue})`}
            </option>
          ))}
        </select>
      </div>

      {/* Custom U-Value Input */}
      {isCustomUValue && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Enter Custom U-Value:</label>
          <input
            type="number"
            name="uValue"
            value={inputs.uValue}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter U-Value"
          />
        </div>
      )}

      {/* Roof Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Length of Roof (ft):</label>
          <input
            type="number"
            name="length"
            value={inputs.length}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Width of Roof (ft):</label>
          <input
            type="number"
            name="width"
            value={inputs.width}
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

      {/* Result Display */}
      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        <h3 className="text-lg font-semibold">Heat Transfer:</h3>
        <p className="text-xl font-bold text-blue-600">{result} BTU/hr</p>
      </div>
    </div>
  );
};

export default HeatTransferThroughRoof3;
