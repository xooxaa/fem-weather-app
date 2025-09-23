<script setup lang="ts">
import { ref } from "vue";

const hourlyData = [
  { time: "12 AM", icon: "fog", temp: 16 },
  { time: "1 AM", icon: "partly-cloudy", temp: 15 },
  { time: "2 AM", icon: "overcast", temp: 15 },
  { time: "3 AM", icon: "rain", temp: 14 },
  { time: "4 AM", icon: "storm", temp: 14 },
  { time: "5 AM", icon: "fog", temp: 13 },
  { time: "6 AM", icon: "fog", temp: 13 },
  { time: "7 AM", icon: "sunny", temp: 14 },
  { time: "8 AM", icon: "sunny", temp: 15 },
  { time: "9 AM", icon: "sunny", temp: 17 },
  { time: "10 AM", icon: "partly-cloudy", temp: 18 },
  { time: "11 AM", icon: "partly-cloudy", temp: 19 },
  { time: "12 PM", icon: "sunny", temp: 21 },
  { time: "1 PM", icon: "sunny", temp: 22 },
  { time: "2 PM", icon: "sunny", temp: 23 },
  { time: "3 PM", icon: "partly-cloudy", temp: 23 },
  { time: "4 PM", icon: "overcast", temp: 22 },
  { time: "5 PM", icon: "rain", temp: 21 },
  { time: "6 PM", icon: "rain", temp: 20 },
  { time: "7 PM", icon: "storm", temp: 19 },
  { time: "8 PM", icon: "overcast", temp: 18 },
  { time: "9 PM", icon: "overcast", temp: 17 },
  { time: "10 PM", icon: "fog", temp: 17 },
  { time: "11 PM", icon: "fog", temp: 16 },
];

const days = ref([
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
]);
const selectedDay = ref("Tuesday");
</script>

<template>
  <UCard
    variant="soft"
    :ui="{
      root: 'w-full p-0 bg-neutral-800',
      body: 'max-h-134 overflow-auto',
      header: 'flex flex-wrap justify-between items-center',
    }"
  >
    <template #header>
      <h2 class="text-xl font-bold">Hourly Forcast</h2>
      <USelect
        v-model="selectedDay"
        :items="days"
        size="xl"
        :content="{ align: 'end' }"
        :ui="{
          base: 'bg-neutral-700',
          content: 'min-w-48 max-h-fit bg-neutral-800 px-1',
          item: 'px-3 py-2 my-1 rounded bg-neutral-800 hover:bg-neutral-700 focus:bg-neutral-700 cursor-pointer',
        }"
      />
    </template>

    <HourlyForcastItem
      v-for="(hour, idx) in hourlyData"
      :key="`${hour.time}-${idx}`"
      :icon="hour.icon"
      :time="hour.time"
      :temp="hour.temp"
    />
  </UCard>
</template>

<style scoped></style>
