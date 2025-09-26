<script setup lang="ts">
import { getWeatherIcon } from "@/utils/weatherIcons";

defineProps({
  icon: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  temp: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <UCard
    variant="subtle"
    :ui="{
      root: 'mb-3 p-0 bg-neutral-700',
      body: 'flex justify-between items-center p-1 sm:p-1',
    }"
  >
    <div class="flex items-center gap-2">
      <img :src="getWeatherIcon(icon)" :alt="icon" class="w-12 h-12" />
      <p class="text-lg font-bold">{{ time }}</p>
    </div>

    <p class="text-lg me-3">{{ temp }}°</p>
  </UCard>
</template>

<style scoped></style>
