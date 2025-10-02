<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUnitsStore } from "@/stores/units";
import { useWeatherStore } from "@/stores/weather";
import { getIconFromWeatherCode } from "@/utils/weatherIcons";

const unitsStore = useUnitsStore();
const { getTemperatureInCurrentUnit } = unitsStore;

const weatherStore = useWeatherStore();
const { weatherData } = storeToRefs(weatherStore);

function getWeekday(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}
</script>

<template>
  <div>
    <h2 class="text-xl font-bold my-4">Daily Forecast</h2>

    <div
      class="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7"
      v-if="weatherData?.daily"
    >
      <DailyForcastCard
        v-for="(day, idx) in weatherData?.daily"
        :key="`${day}-${idx}`"
        :day="getWeekday(day.time)"
        :icon="getIconFromWeatherCode(day.weather_code)"
        :lowTemp="getTemperatureInCurrentUnit(day.temperature_2m_min)"
        :highTemp="getTemperatureInCurrentUnit(day.temperature_2m_max)"
      />
    </div>
  </div>
</template>

<style scoped></style>
