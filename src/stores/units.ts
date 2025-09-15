import { ref, computed } from "vue";
import { defineStore } from "pinia";

type WeatherUnit = {
  short: string;
  long: string;
};

const temperatureOptions: WeatherUnit[] = [
  { short: "C", long: "Celsius" },
  { short: "F", long: "Fahrenheit" },
];

const windSpeedOptions: WeatherUnit[] = [
  { short: "km/h", long: "Kilometers per hour" },
  { short: "mph", long: "Miles per Hour" },
];

const precipitationOptions: WeatherUnit[] = [
  { short: "mm", long: "Millimeters" },
  { short: "in", long: "Inches" },
];

type WeatherUnits = {
  temperature: "C" | "F";
  windSpeed: "km/h" | "mph";
  precipitation: "mm" | "in";
};

export const useUnitsStore = defineStore("units", () => {
  const units = ref<WeatherUnits>({
    temperature: "C",
    windSpeed: "km/h",
    precipitation: "mm",
  });

  function setUnits(newUnits: Partial<WeatherUnits>) {
    units.value = { ...units.value, ...newUnits };
  }

  function setAllUnitsToMetric() {
    units.value = {
      temperature: "C",
      windSpeed: "km/h",
      precipitation: "mm",
    };
  }

  function setAllUnitsToImperial() {
    units.value = {
      temperature: "F",
      windSpeed: "mph",
      precipitation: "in",
    };
  }

  const temperatureLabel = computed(() => {
    const opt = temperatureOptions.find(
      (o) => o.short === units.value.temperature
    );
    return opt ? `${opt.long} (${opt.short})` : units.value.temperature;
  });

  const windSpeedLabel = computed(() => {
    const opt = windSpeedOptions.find((o) => o.short === units.value.windSpeed);
    return opt ? `${opt.long} (${opt.short})` : units.value.windSpeed;
  });

  const precipitationLabel = computed(() => {
    const opt = precipitationOptions.find(
      (o) => o.short === units.value.precipitation
    );
    return opt ? `${opt.long} (${opt.short})` : units.value.precipitation;
  });

  return {
    units,
    temperatureLabel,
    windSpeedLabel,
    precipitationLabel,
    setUnits,
    setAllUnitsToMetric,
    setAllUnitsToImperial,
  };
});
