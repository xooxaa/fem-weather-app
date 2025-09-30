<script setup lang="ts">
import { useLocationStore } from "@/stores/location";
import { useWeatherStore } from "@/stores/weather";
import { storeToRefs } from "pinia";

const geolocationStore = useLocationStore();

const weatherStore = useWeatherStore();
const { weatherData } = storeToRefs(weatherStore);
// weatherStore.getWeatherData();
</script>

<template>
  <WeatherHeadline />

  <SearchBar />

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-16">
    <div class="flex flex-col justify-between gap-8 md:col-span-2">
      <CurrentWeather />
      <DailyForcast />
    </div>

    <HourlyForcast />
  </div>
</template>

<style scoped></style>
