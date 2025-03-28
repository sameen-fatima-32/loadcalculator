"use client";

import React, { useState } from "react";
import HeatDissipationCalculator6 from "@/components/LoadCalculator/ele/page";
import HeatTransferCalculator1 from "@/components/LoadCalculator/exwall/page";
import HeatTransferCalculator2 from "@/components/LoadCalculator/exglass/page";
import HeatTransferThroughRoof3 from "@/components/LoadCalculator/exroof/page";
import HeatTransferCalculator7 from "@/components/LoadCalculator/intwall/page";
import HeatGeneratedByLighting4 from "@/components/LoadCalculator/light/page";
import HeatCalculator5 from "@/components/LoadCalculator/people/HeatCalculator5";

const calculators = [
  { id: "HeatTransferCalculator1", component: HeatTransferCalculator1, label: "Exterior Wall" },
  { id: "HeatTransferThroughRoof3", component: HeatTransferThroughRoof3, label: "Roof" },
  { id: "HeatTransferCalculator2", component: HeatTransferCalculator2, label: "Glass" },
  { id: "HeatTransferCalculator7", component: HeatTransferCalculator7, label: "Interior Wall" },
  { id: "HeatGeneratedByLighting4", component: HeatGeneratedByLighting4, label: "Lighting" },
  { id: "HeatCalculator5", component: HeatCalculator5, label: "People" },
  { id: "HeatDissipationCalculator6", component: HeatDissipationCalculator6, label: "Electrical Equipment" },
];

const CombinedHeatCalculators = () => {
  const [heatValues, setHeatValues] = useState(
    Object.fromEntries(calculators.map(({ id }) => [id, 0]))
  );

  const [updateKey, setUpdateKey] = useState(0); // Dummy state to force re-render

  // Function to update heat values
  const updateHeatValue = (key, value) => {
    setHeatValues((prev) => ({ ...prev, [key]: Math.max(0, Number(value)) }));
  };

  // Compute total heat dynamically
  const totalCombinedHeat = Object.values(heatValues).reduce((acc, val) => acc + val, 0);
  const convertToTons = (btu) => (btu / 12000).toFixed(2);
  const totalAmount = totalCombinedHeat.toFixed(2);

  // Get result message
  const getResultMessage = () => {
    if (totalCombinedHeat < 24000) return "Low heat load. No additional cooling required.";
    if (totalCombinedHeat >= 24000 && totalCombinedHeat <= 60000) return "Moderate heat load. Consider efficient HVAC.";
    return "High heat load! Upgraded HVAC system recommended.";
  };

  // **Fix for Reset Values**
  const resetValues = () => {
    setHeatValues(Object.fromEntries(calculators.map(({ id }) => [id, 0])));
    setUpdateKey((prev) => prev + 1); // Force re-render
  };

  // **Fix for Recalculate Values**
  const recalculateValues = () => {
    setUpdateKey((prev) => prev + 1); // Force re-render
  };

  // Download Report Function
  const downloadReport = () => {
    const reportContent = `
      HVAC Load Calculation Report

      Total Heat Load: ${totalAmount} BTU/h
      Equivalent Tons of Refrigeration: ${convertToTons(totalCombinedHeat)} Tons

      Detailed Breakdown:
      ${calculators
        .map(({ id, label }) => `${label}: ${heatValues[id].toFixed(2)} BTU/h`)
        .join("\n")}

      Recommendation:
      ${getResultMessage()}
    `;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "HVAC_Load_Report.txt";
    link.click();
  };

  return (
    <div className="container mx-auto px-6 py-10 min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700">HVAC Load Calculator</h1>
        <p className="text-lg text-gray-600 mt-2">Calculate total heat loads efficiently.</p>
      </div>

      {/* Total Heat Load */}
      <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg text-center mb-8">
        <h2 className="text-3xl font-bold">Total Heat Load</h2>
        <p className="text-2xl mt-2 font-semibold">{totalAmount} BTU/h</p>
        <p className="text-xl mt-1">
          Equivalent to <span className="font-bold">{convertToTons(totalCombinedHeat)} Tons of Refrigeration</span>
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {calculators.map(({ id, component: Component, label }) => (
          <div key={id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">{label}</h3>
            <Component key={updateKey} onCalculate={(heat) => updateHeatValue(id, heat)} />
          </div>
        ))}
      </div>

      {/* Breakdown & Result */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detailed Breakdown</h2>

        <ul className="mt-2 text-gray-700 list-disc pl-5 space-y-2">
          {calculators.map(({ id, label }) => (
            <li key={id} className="transition-all hover:text-blue-500">
              <span className="font-medium">{label}:</span> {heatValues[id].toFixed(2)} BTU/h
            </li>
          ))}
        </ul>

        {/* Result */}
        <div className="mt-4 bg-green-100 p-4 rounded-lg shadow-sm border-l-4 border-green-500">
          <h3 className="text-xl font-semibold text-green-700">Result</h3>
          <p className="text-lg font-medium text-gray-700">{getResultMessage()}</p>
        </div>

        {/* Total Amount at Bottom */}
        <div className="mt-6 text-center text-2xl font-bold text-blue-700">
          Total Heat Load: {totalAmount} BTU/h
        </div>
      </div>
    </div>
  );
};

export default CombinedHeatCalculators;
