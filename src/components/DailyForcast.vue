<script setup lang="ts">
const forecastData = [
  { day: "Mon", icon: "partly-cloudy", lowTemp: 12, highTemp: 18 },
  { day: "Tue", icon: "sunny", lowTemp: 10, highTemp: 20 },
  { day: "Wed", icon: "rain", lowTemp: 9, highTemp: 15 },
  { day: "Thu", icon: "storm", lowTemp: 8, highTemp: 14 },
  { day: "Fri", icon: "fog", lowTemp: 11, highTemp: 22 },
  { day: "Sat", icon: "snow", lowTemp: 13, highTemp: 19 },
  { day: "Sun", icon: "drizzle", lowTemp: 10, highTemp: 17 },
];
</script>

<template>
  <div>
    <h2 class="text-xl text-center font-bold mb-2">Daily Forecast</h2>

    <div
      class="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7"
    >
      <DailyForcastCard
        v-for="(day, idx) in forecastData"
        :key="`${day.day}-${idx}`"
        :day="day.day"
        :icon="day.icon"
        :lowTemp="day.lowTemp"
        :highTemp="day.highTemp"
      />
    </div>
  </div>
</template>

<style scoped></style>
