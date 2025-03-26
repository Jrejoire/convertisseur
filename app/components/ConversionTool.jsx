import { useState } from "react";
import ConversionFunction, {
  speedToPace,
  paceToSpeed,
  timeStringToMinutes,
  minutesToTimeString,
} from "./ConversionFunction";

export default function ConversionTool({ unit, onConversion }) {
  const [inputValue, setInputValue] = useState("");

  const handleConversion = (value) => {
    let convertedValue;
    let speed;

    if (unit === "pace") {
      convertedValue = paceToSpeed(value);
      speed = parseFloat(convertedValue);
    } else {
      convertedValue = speedToPace(value);
      speed = parseFloat(value);
    }

    const passingTimes = ConversionFunction.calculatePassingTimes(speed);
    onConversion(passingTimes, convertedValue);
  };

  const handleIncrement = () => {
    if (unit === "speed") {
      const currentSpeed = parseFloat(inputValue) || 0;
      const newValue = (currentSpeed + 0.1).toFixed(1);
      setInputValue(newValue);
      handleConversion(newValue);
    } else {
      if (!inputValue) {
        const newValue = "00:00";
        setInputValue(newValue);
        handleConversion(newValue);
        return;
      }
      const currentMinutes = timeStringToMinutes(inputValue);
      const newMinutes = Math.max(0, currentMinutes - 1 / 60);
      const newValue = minutesToTimeString(newMinutes);
      setInputValue(newValue);
      handleConversion(newValue);
    }
  };

  const handleDecrement = () => {
    if (unit === "speed") {
      const currentSpeed = parseFloat(inputValue) || 0;
      const newValue = Math.max(0, currentSpeed - 0.1).toFixed(1);
      setInputValue(newValue);
      handleConversion(newValue);
    } else {
      if (!inputValue) {
        const newValue = "00:00";
        setInputValue(newValue);
        handleConversion(newValue);
        return;
      }
      const currentMinutes = timeStringToMinutes(inputValue);
      const newMinutes = currentMinutes + 1 / 60;
      const newValue = minutesToTimeString(newMinutes);
      setInputValue(newValue);
      handleConversion(newValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleConversion(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center">
        <label className="block text-gray-400 mb-2">
          {unit === "pace"
            ? "Entrez votre allure (min:sec/km)"
            : "Entrez votre vitesse (km/h)"}
        </label>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleDecrement}
            className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            -
          </button>
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
            type="button"
            onClick={handleIncrement}
            className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            +
          </button>
        </div>
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
