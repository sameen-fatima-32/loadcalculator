"use client";
import React, { useState, useEffect } from "react";

const HeatCalculator5 = ({ onCalculate }) => {
  // Heat data based on activity levels
  const heatData = {
    "Seated at theater (matinee)": { sensible: 225, latent: 105 },
    "Seated at theater (night)": { sensible: 245, latent: 105 },
    "Seated, very light work": { sensible: 245, latent: 155 },
    "Moderately active office work": { sensible: 250, latent: 200 },
    "Standing, light work; walking": { sensible: 250, latent: 200 },
    "Walking; standing sedentary work": { sensible: 275, latent: 275 },
    "Light bench work": { sensible: 275, latent: 475 },
    "Moderate dancing": { sensible: 305, latent: 545 },
    "Walking 3 mph; light machine work": { sensible: 375, latent: 625 },
    "Bowling": { sensible: 580, latent: 870 },
    "Heavy work": { sensible: 580, latent: 870 },
    "Heavy machine work; lifting": { sensible: 635, latent: 965 },
    "Athletics": { sensible: 710, latent: 1090 },
  };

  const [inputs, setInputs] = useState({
    activity: "",
    numPeople: "",
    manualHeat: 0, // For direct heat input
  });

  const [totalHeat, setTotalHeat] = useState(0);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "numPeople" || name === "manualHeat"
        ? value === "" ? "" : Math.max(0, parseFloat(value) || 0)
        : value,
    }));
  };

  // Calculate heat based on activity or manual input
  useEffect(() => {
    const { activity, numPeople, manualHeat } = inputs;

    let calculatedHeat = 0;
    
    if (manualHeat > 0) {
      calculatedHeat = manualHeat;
    } else if (activity && heatData[activity] && numPeople > 0) {
      const { sensible, latent } = heatData[activity];
      calculatedHeat = (sensible + latent) * numPeople;
    }

    setTotalHeat(calculatedHeat);
    if (typeof onCalculate === "function") {
      onCalculate(calculatedHeat);
    }
  }, [inputs, onCalculate]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">
        Heat Load from People
      </h2>

      {/* Activity Selection */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Activity Level:</label>
        <select
          name="activity"
          value={inputs.activity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Activity --</option>
          {Object.keys(heatData).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      {/* Number of People */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Number of People:</label>
        <input
          type="number"
          name="numPeople"
          value={inputs.numPeople}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="1"
        />
      </div>

      <div className="text-center text-gray-500 my-2">OR</div>

      {/* Manual Heat Input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Enter Heat Load (BTU/h) Manually:</label>
        <input
          type="number"
          name="manualHeat"
          value={inputs.manualHeat}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="0"
        />
      </div>

      {/* Result */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold">Result</h3>
        <p>
          Total Heat Load:{" "}
          <strong>{totalHeat.toFixed(2)} Btu/h</strong>
        </p>
      </div>
    </div>
  );
};

export default HeatCalculator5;
