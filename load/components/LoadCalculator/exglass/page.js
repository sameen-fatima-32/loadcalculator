"use client";

import React, { useState } from "react";

const HeatTransferCalculator2 = ({ onCalculate }) => {
  const [inputs, setInputs] = useState({
    length: 0,
    height: 0,
    temperatureDifference: 0,
    shgf: "20° N",
    sc: "Clear Glass Without Shading",
    clf: "N",
  });

  const [result, setResult] = useState(0);

  const shgfValues = {
    "20° N": 250,
    "24° N": 240,
    "28° N": 280,
    "32° N": 246,
    "36° N": 252,
    "40° N": 205,
    "44° N": 189,
    "48° N": 216,
  };

  const shadingCoefficients = {
    "Clear Glass Without Shading": 0.94,
    "Heat Absorbing Without Shading": 0.69,
    "Clear Glass with Medium Venetian Blinds": 0.74,
    "Heat Absorbing with Medium Venetian Blinds": 0.57,
  };

  const clfValues = {
    N: 0.91,
    NE: 0.76,
    E: 0.72,
    SE: 0.81,
    S: 0.85,
    SW: 0.83,
    W: 0.72,
    NW: 0.71,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculateHeatTransfer = () => {
    const { length, height, shgf, sc, clf } = inputs;

    const area = parseFloat(length) * parseFloat(height);
    const selectedSHGF = shgfValues[shgf];
    const selectedSC = shadingCoefficients[sc];
    const selectedCLF = clfValues[clf];

    const heatTransfer = selectedSHGF * area * selectedSC * selectedCLF;
    setResult(heatTransfer.toFixed(2));

    // 🔥 Send calculated value to parent component
    if (onCalculate) {
      console.log("Sending Heat Transfer Value:", heatTransfer); // Debugging log
      onCalculate(heatTransfer);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Heat Transfer Through Exterior Glass
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label className="block mb-1 font-medium">Length of Glass (ft):</label>
          <input type="number" name="length" value={inputs.length} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Height of Glass (ft):</label>
          <input type="number" name="height" value={inputs.height} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">SHGF Latitude:</label>
          <select name="shgf" value={inputs.shgf} onChange={handleChange} className="w-full p-2 border rounded">
            {Object.keys(shgfValues).map((lat, index) => (
              <option key={index} value={lat}>{lat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Shading Coefficient (SC):</label>
          <select name="sc" value={inputs.sc} onChange={handleChange} className="w-full p-2 border rounded">
            {Object.keys(shadingCoefficients).map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Cooling Load Factor (CLF):</label>
          <select name="clf" value={inputs.clf} onChange={handleChange} className="w-full p-2 border rounded">
            {Object.keys(clfValues).map((facing, index) => (
              <option key={index} value={facing}>{facing}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={calculateHeatTransfer} className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300">
          Calculate Heat Transfer
        </button>
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Results</h2>
        {result > 0 ? (
          <p className="text-xl">
            Heat Transfer (Q): <strong>{result} BTU/hr</strong>
          </p>
        ) : (
          <p className="text-red-500">Please enter valid inputs to calculate.</p>
        )}
      </div>
    </div>
  );
};

export default HeatTransferCalculator2;

