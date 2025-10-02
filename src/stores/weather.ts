import { ref, watch } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { fetchWeatherData } from "@/utils/openMeteoQuerries";
import type { WeatherDataParams } from "@/types/openMeteoParams";
import type { HourlyVariable } from "@/types/openMeteoHourly";
import type { DailyVariable } from "@/types/openMeteoDaily";
import type { CurrentVariable } from "@/types/openMeteoCurrent";
import type { WeatherData } from "@/utils/openMeteoQuerries";
import { useLocationStore } from "./location";

const hourly: HourlyVariable[] = [
  "weather_code",
  "temperature_2m",
  "precipitation",
];
const daily: DailyVariable[] = [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "precipitation_sum",
  "sunrise",
  "sunset",
];
const current: CurrentVariable[] = [
  "weather_code",
  "temperature_2m",
  "apparent_temperature",
  "relative_humidity_2m",
  "precipitation",
  "wind_speed_10m",
  "wind_direction_10m",
];

export const useWeatherStore = defineStore("weather", () => {
  const locationStore = useLocationStore();
  const { weatherLocation } = storeToRefs(locationStore);

  const weatherData = ref<WeatherData<
    HourlyVariable,
    DailyVariable,
    CurrentVariable
  > | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function getWeatherData() {
    if (!locationStore.weatherLocation) return;
    const { latitude, longitude } = locationStore.weatherLocation;
    const params: WeatherDataParams = {
      latitude,
      longitude,
      current,
      daily,
      hourly,
    };
    isLoading.value = true;
    error.value = null;
    try {
      weatherData.value = await fetchWeatherData(params);
    } catch (e) {
      error.value = (e as Error).message;
      weatherData.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  watch(
    () => weatherLocation.value.id,
    () => getWeatherData(),
    { immediate: true }
  );

  return { weatherData, getWeatherData };
});
