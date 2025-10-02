import { computed } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

type WeatherUnit = {
  short: string;
  long: string;
};

const temperatureOptions: WeatherUnit[] = [
  { short: "C", long: "Celsius" },
  { short: "F", long: "Fahrenheit" },
];

const humidityOptions: WeatherUnit[] = [{ short: "%", long: "Percentage" }];

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
  humidity: "%";
  windSpeed: "km/h" | "mph" | "m/s" | "knots";
  precipitation: "mm" | "in";
};

function isValidWeatherUnits(object: any): object is WeatherUnits {
  return (
    object &&
    typeof object === "object" &&
    (object.temperature === "C" || object.temperature === "F") &&
    (object.windSpeed === "km/h" ||
      object.windSpeed === "mph" ||
      object.windSpeed === "m/s" ||
      object.windSpeed === "knots") &&
    (object.precipitation === "mm" || object.precipitation === "in")
  );
}

export const useUnitsStore = defineStore("units", () => {
  const DEFAULT_UNITS: WeatherUnits = {
    temperature: "C",
    humidity: "%",
    windSpeed: "km/h",
    precipitation: "mm",
  };

  const storedUnits = useLocalStorage<WeatherUnits>(
    "weather-units",
    DEFAULT_UNITS,
    {
      mergeDefaults: true,
    }
  );

  if (!isValidWeatherUnits(storedUnits.value)) {
    storedUnits.value = DEFAULT_UNITS;
  }

  const units = computed<WeatherUnits>({
    get: () => storedUnits.value,
    set: (val) => {
      storedUnits.value = val;
    },
  });

  const isAllUnitsMetric = computed(
    () =>
      units.value.temperature === "C" &&
      units.value.windSpeed === "km/h" &&
      units.value.precipitation === "mm"
  );

  const isAllUnitsImperial = computed(
    () =>
      units.value.temperature === "F" &&
      units.value.windSpeed === "mph" &&
      units.value.precipitation === "in"
  );

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

  function setUnits(newUnits: Partial<WeatherUnits>) {
    units.value = { ...units.value, ...newUnits };
  }

  function setAllUnitsToMetric() {
    units.value = {
      temperature: "C",
      humidity: "%",
      windSpeed: "km/h",
      precipitation: "mm",
    };
  }

  function setAllUnitsToImperial() {
    units.value = {
      temperature: "F",
      humidity: "%",
      windSpeed: "mph",
      precipitation: "in",
    };
  }

  function getTemperatureInCurrentUnit(
    tempC: number,
    decimals: number = 1
  ): number {
    let result =
      units.value.temperature === "C"
        ? tempC
        : units.value.temperature === "F"
        ? tempC * (9 / 5) + 32
        : tempC;
    if (typeof decimals === "number") {
      result = parseFloat(result.toFixed(decimals));
    }
    return result;
  }

  function getHumidityInCurrentUnit(
    humidity: number,
    decimals: number = 1
  ): number {
    let result = humidity;
    if (typeof decimals === "number") {
      result = parseFloat(result.toFixed(decimals));
    }
    return result;
  }

  function getWindSpeedInCurrentUnit(
    speedKmh: number,
    decimals: number = 1
  ): number {
    let result: number;
    switch (units.value.windSpeed) {
      case "km/h":
        result = speedKmh;
        break;
      case "mph":
        result = speedKmh / 1.609;
        break;
      case "m/s":
        result = speedKmh / 3.6;
        break;
      case "knots":
        result = speedKmh / 1.852;
        break;
      default:
        result = speedKmh;
    }
    if (typeof decimals === "number") {
      result = parseFloat(result.toFixed(decimals));
    }
    return result;
  }

  function getPrecipitationInCurrentUnit(
    precipMm: number,
    decimals: number = 1
  ): number {
    let result =
      units.value.precipitation === "mm"
        ? precipMm
        : units.value.precipitation === "in"
        ? precipMm / 25.4
        : precipMm;
    if (typeof decimals === "number") {
      result = parseFloat(result.toFixed(decimals));
    }
    return result;
  }

  return {
    units,
    isAllUnitsMetric,
    isAllUnitsImperial,
    temperatureLabel,
    windSpeedLabel,
    precipitationLabel,
    setUnits,
    setAllUnitsToMetric,
    setAllUnitsToImperial,
    getTemperatureInCurrentUnit,
    getHumidityInCurrentUnit,
    getWindSpeedInCurrentUnit,
    getPrecipitationInCurrentUnit,
  };
});
