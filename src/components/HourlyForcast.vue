<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useWeatherStore } from "@/stores/weather";
import { useUnitsStore } from "@/stores/units";
import { getIconFromWeatherCode } from "@/utils/weatherIcons";

const weatherStore = useWeatherStore();
const { weatherData } = storeToRefs(weatherStore);

const unitsStore = useUnitsStore();
const { getTemperatureInCurrentUnit } = unitsStore;

const days = computed(() => {
  const current = weatherData.value?.current?.time;
  const forcastDate = current ? new Date(current) : new Date();
  const dateFormat = new Intl.DateTimeFormat("en-US", { weekday: "long" });

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(forcastDate);
    date.setDate(forcastDate.getDate() + i);
    return dateFormat.format(date);
  });
});

const selectedDay = ref("");

watchEffect(() => {
  if (!selectedDay.value && days.value.length) {
    selectedDay.value = days.value[0];
  }
});

console.log(weatherData.value?.hourly);

const hourlyData = computed(() => {
  if (!weatherData.value?.hourly || !selectedDay.value) return [];

  return weatherData.value.hourly.filter((hour) => {
    const hourDate = new Date(hour.time);
    const dayName = hourDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    return dayName === selectedDay.value;
  });
});

function getTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
  });
}
</script>

<template>
  <UCard
    variant="soft"
    :ui="{
      root: 'w-full p-0 bg-neutral-800',
      body: 'max-h-134 overflow-auto py-0 sm:py-0',
      header: 'flex flex-wrap justify-between items-center',
    }"
  >
    <template #header>
      <h2 class="text-xl font-bold">Hourly Forcast</h2>
      <USelect
        v-model="selectedDay"
        :items="days"
        size="xl"
        variant="subtle"
        :content="{ align: 'end' }"
        :ui="{
          base: 'bg-neutral-700',
          content:
            'min-w-48 max-h-fit bg-neutral-800 px-1 border-2 border-neutral-700',
          item: 'px-3 py-2 my-1 rounded bg-neutral-800 hover:bg-neutral-700 focus:bg-neutral-700 cursor-pointer',
        }"
      />
    </template>

    <HourlyForcastItem
      v-for="(hour, idx) in hourlyData"
      :key="`${hour.time}-${idx}`"
      :icon="getIconFromWeatherCode(hour.weather_code)"
      :time="getTime(hour.time)"
      :temp="getTemperatureInCurrentUnit(hour.temperature_2m)"
    />
  </UCard>
</template>

<style scoped></style>
