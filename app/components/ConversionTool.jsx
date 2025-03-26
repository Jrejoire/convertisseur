import { useState } from "react";
import ConversionFunction, {
  speedToPace,
  paceToSpeed,
} from "./ConversionFunction";

export default function ConversionTool({ unit, onConversion }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let convertedValue;
    let speed;

    if (unit === "pace") {
      // Si on entre une allure, on calcule la vitesse
      convertedValue = paceToSpeed(inputValue);
      speed = parseFloat(convertedValue);
    } else {
      // Si on entre une vitesse, on calcule l'allure
      convertedValue = speedToPace(inputValue);
      speed = parseFloat(inputValue);
    }

    // Calculer les temps de passage basés sur la vitesse
    const passingTimes = ConversionFunction.calculatePassingTimes(speed);
    onConversion(passingTimes, convertedValue);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center">
        <label className="block text-gray-400 mb-2">
          {unit === "pace"
            ? "Entrez votre allure (min:sec/km)"
            : "Entrez votre vitesse (km/h)"}
        </label>
        <input
          type={unit === "speed" ? "number" : "text"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={unit === "pace" ? "04:30" : "12.0"}
          pattern={unit === "pace" ? "[0-9]{2}:[0-9]{2}" : null}
          step={unit === "speed" ? "0.1" : null}
          className="w-48 bg-gray-700 text-white rounded p-2 text-center"
          required
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Convertir
        </button>
      </div>
    </form>
  );
}
