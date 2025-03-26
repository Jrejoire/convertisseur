export const timeStringToMinutes = (timeString) => {
  if (!timeString) return 0;
  const [minutes, seconds] = timeString.split(":").map(Number);
  return minutes + seconds / 60;
};

export const minutesToTimeString = (totalMinutes) => {
  const minutes = Math.floor(totalMinutes);
  const seconds = Math.round((totalMinutes - minutes) * 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const paceToSpeed = (pace) => {
  const minutesPerKm = timeStringToMinutes(pace);
  if (minutesPerKm === 0) return "0.0";
  return (60 / minutesPerKm).toFixed(1);
};

export const speedToPace = (speed) => {
  const kmPerHour = parseFloat(speed);
  if (kmPerHour === 0) return "00:00";
  const minutesPerKm = 60 / kmPerHour;
  return minutesToTimeString(minutesPerKm);
};

export default class ConversionFunction {
  static calculatePassingTimes(speed) {
    const distances = {
      "1km": 1,
      "2,5km": 2.5,
      "5km": 5,
      "10km": 10,
      Semi: 21.1,
      Marathon: 42.195,
    };

    const formatTime = (hours) => {
      const totalSeconds = Math.floor(hours * 3600);
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      // Si le temps est supérieur ou égal à 1 heure
      if (h >= 1) {
        return `${h.toString().padStart(2, "0")}:${m
          .toString()
          .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
      }

      // Pour les temps inférieurs à 1 heure
      return `${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`;
    };

    const times = {};
    for (const [distance, km] of Object.entries(distances)) {
      const timeInHours = km / speed;
      times[distance] = formatTime(timeInHours);
    }

    return times;
  }
}
