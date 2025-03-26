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

export const calculatePassingTimes = (pace, unit) => {
  // Convertir en minutes par kilomètre si nécessaire
  const minutesPerKm =
    unit === "pace" ? timeStringToMinutes(pace) : 60 / parseFloat(pace);

  // Définir les distances en km
  const distances = {
    "2,5km": 2.5,
    "5km": 5,
    "10km": 10,
    Semi: 21.1,
    Marathon: 42.2,
  };

  // Calculer les temps pour chaque distance
  return Object.entries(distances).reduce((acc, [key, distance]) => {
    const totalMinutes = minutesPerKm * distance;
    acc[key] = minutesToTimeString(totalMinutes);
    return acc;
  }, {});
};
