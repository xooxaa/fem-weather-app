<script setup lang="ts">
const props = defineProps({
  temperature: {
    type: Number,
    default: 20,
  },
  feelsLike: {
    type: Number,
    default: 18,
  },
  humidity: {
    type: Number,
    default: 46,
  },
  windspeed: {
    type: Number,
    default: 14,
  },
  precipitation: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <CurrentWeatherMainCard />

  <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
    <CurrentWeatherCard title="Feels Like" :value="props.feelsLike" unit="°C" />
    <CurrentWeatherCard title="Humidity" :value="props.humidity" unit="%" />
    <CurrentWeatherCard
      title="Windspeed"
      :value="props.windspeed"
      unit="km/h"
    />
    <CurrentWeatherCard
      title="Precipitation"
      :value="props.precipitation"
      unit="mm"
    />
  </div>
</template>

<style scoped></style>
