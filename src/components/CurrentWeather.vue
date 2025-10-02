<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useWeatherStore } from "@/stores/weather";
import { useUnitsStore } from "@/stores/units";

const weatherStore = useWeatherStore();
const { weatherData } = storeToRefs(weatherStore);

const unitsStore = useUnitsStore();
const {
  getTemperatureInCurrentUnit,
  getHumidityInCurrentUnit,
  getWindSpeedInCurrentUnit,
  getPrecipitationInCurrentUnit,
} = unitsStore;
const { units } = storeToRefs(unitsStore);
</script>

<template>
  <CurrentWeatherMainCard />

  <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
    <CurrentWeatherCard
      title="Feels Like"
      :value="
        getTemperatureInCurrentUnit(
          weatherData?.current.apparent_temperature || 0
        )
      "
      :unit="`°${units.temperature}`"
    />
    <CurrentWeatherCard
      title="Humidity"
      :value="
        getHumidityInCurrentUnit(weatherData?.current.relative_humidity_2m || 0)
      "
      :unit="units.humidity"
    />
    <CurrentWeatherCard
      title="Windspeed"
      :value="
        getWindSpeedInCurrentUnit(weatherData?.current.wind_speed_10m || 0)
      "
      :unit="units.windSpeed"
    />
    <CurrentWeatherCard
      title="Precipitation"
      :value="
        getPrecipitationInCurrentUnit(weatherData?.current.precipitation || 0)
      "
      :unit="`${units.precipitation}`"
    />
  </div>
</template>

<style scoped></style>
