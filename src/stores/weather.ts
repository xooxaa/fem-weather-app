import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { fetchWeatherData } from "@/utils/openMeteoQuerries";
import type { WeatherDataParams } from "@/types/openMeteoParams";
import type { HourlyVariable } from "@/types/openMeteoHourly";
import type { DailyVariable } from "@/types/openMeteoDaily";
import type { CurrentVariable } from "@/types/openMeteoCurrent";
import type { WeatherData } from "@/utils/openMeteoQuerries";

const params: WeatherDataParams = {
  latitude: 52.52,
  longitude: 13.41,
  current: ["temperature_2m", "weather_code"],
  daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
  hourly: [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "precipitation",
    "wind_speed_10m",
    "wind_direction_10m",
    "weather_code",
  ],
};

export const useWeatherStore = defineStore("weather", () => {
  const weatherData = ref<WeatherData<
    HourlyVariable,
    DailyVariable,
    CurrentVariable
  > | null>(null);

  async function getWeatherData() {
    weatherData.value = await fetchWeatherData(params);
  }

  return { getWeatherData, weatherData };
});
