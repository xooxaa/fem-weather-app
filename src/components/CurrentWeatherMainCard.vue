<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useLocationStore } from "@/stores/location";
import { useWeatherStore } from "@/stores/weather";
import { getWeatherIcon, getIconFromWeatherCode } from "@/utils/weatherIcons";

const geolocationStore = useLocationStore();
const { weatherLocation } = storeToRefs(geolocationStore);

const weatherStore = useWeatherStore();
const { weatherData } = storeToRefs(weatherStore);

const currentWeatherIcon = computed(() => {
  return getIconFromWeatherCode(weatherData.value?.current.weather_code || 0);
});

const currentTemperatureRounded = computed(() =>
  weatherData.value?.current.temperature_2m != null
    ? Math.round(weatherData.value.current.temperature_2m)
    : null
);

const now = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});
</script>

<template>
  <UCard
    variant="soft"
    :ui="{
      root: 'min-h-60',
      body: 'h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:mx-8 gap-8',
    }"
    class="bg-[url('@/assets/images/bg-today-small.svg')] lg:bg-[url('@/assets/images/bg-today-large.svg')] bg-cover bg-center bg-no-repeat"
  >
    <div class="text-center">
      <h3 class="text-3xl font-bold my-1">
        {{ weatherLocation.name }}, {{ weatherLocation.country }}
      </h3>
      <p>{{ now }}</p>
    </div>

    <div class="flex items-center gap-6">
      <img
        :src="getWeatherIcon(currentWeatherIcon)"
        :alt="currentWeatherIcon"
        class="w-32 h-32"
      />

      <h1 class="text-8xl italic">{{ currentTemperatureRounded }}°</h1>
    </div>
  </UCard>
</template>

<style scoped></style>
