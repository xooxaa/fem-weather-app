<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useLocationStore } from "@/stores/location";
import { useWeatherStore } from "@/stores/weather";
import { getWeatherIcon, getIconFromWeatherCode } from "@/utils/weatherIcons";
import { useUnitsStore } from "@/stores/units";

const geolocationStore = useLocationStore();
const { weatherLocation } = storeToRefs(geolocationStore);

const weatherStore = useWeatherStore();
const { weatherData } = storeToRefs(weatherStore);

const currentWeatherIcon = computed(() => {
  return getIconFromWeatherCode(weatherData.value?.current.weather_code || 0);
});

const unitsStore = useUnitsStore();
const { getTemperatureInCurrentUnit } = unitsStore;

const date = computed(() => {
  return new Date(weatherData.value?.current.time || "").toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
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
      <p>{{ date }}</p>
    </div>

    <div class="flex items-center gap-6">
      <img
        :src="getWeatherIcon(currentWeatherIcon)"
        :alt="currentWeatherIcon"
        class="w-32 h-32"
      />

      <h1 class="text-8xl italic">
        {{
          getTemperatureInCurrentUnit(
            weatherData?.current.temperature_2m || 20
          )
        }}°
      </h1>
    </div>
  </UCard>
</template>

<style scoped></style>
