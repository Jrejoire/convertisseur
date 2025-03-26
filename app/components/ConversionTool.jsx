import { useState, useEffect } from "react";
import { paceToSpeed, speedToPace } from "./ConversionFunction";
import { TimeInput } from "@heroui/date-input";

export default function ConversionTool() {
  const [time, setTime] = useState("");
  const [unit, setUnit] = useState("pace");
  const [result, setResult] = useState(null);
  const [passingTimes, setPassingTimes] = useState(null);

  const handleCalculate = () => {
    if (!time || time === "00:00") {
      alert("Veuillez entrer une valeur valide");
      return;
    }

    const convertedValue =
      unit === "pace"
        ? paceToSpeed(time) // Convertit min/km en km/h
        : speedToPace(time); // Convertit km/h en min/km

    setResult({
      value: convertedValue,
      unit: unit === "pace" ? "km/h" : "min/km",
    });

    // Calculer les temps de passage
    const times = calculatePassingTimes(time, unit);
    setPassingTimes(times);
  };

  // Propager les temps de passage au composant parent
  useEffect(() => {
    if (passingTimes) {
      onPassingTimesCalculated?.(passingTimes);
    }
  }, [passingTimes]);

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 scale-150 transform">
          <TimeInput value={time} onChange={(newTime) => setTime(newTime)} />
        </div>

        <div className="flex flex-col space-y-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="unit"
              value="pace"
              checked={unit === "pace"}
              onChange={(e) => setUnit(e.target.value)}
              className="text-blue-500 w-4 h-4"
            />
            <span className="ml-2 text-gray-300">min/km</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="unit"
              value="speed"
              checked={unit === "speed"}
              onChange={(e) => setUnit(e.target.value)}
              className="text-blue-500 w-4 h-4"
            />
            <span className="ml-2 text-gray-300">km/h</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg 
                 shadow-lg transform w-30"
      >
        Calculer
      </button>

      {result && (
        <div className="text-center p-4 bg-gray-700 rounded-lg w-full">
          <span className="text-3xl font-bold text-blue-400">
            {result.value}
          </span>
          <span className="ml-2 text-gray-400">{result.unit}</span>
        </div>
      )}
    </div>
  );
}
