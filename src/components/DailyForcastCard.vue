<script setup lang="ts">
defineProps({
  day: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  lowTemp: {
    type: Number,
    required: true,
  },
  highTemp: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <UCard
    variant="soft"
    :ui="{
      root: 'w-full p-0',
      body: 'flex flex-col items-center gap-1 p-2 sm:p-2',
    }"
  >
    <p class="text-lg text-bold">{{ day }}</p>
    <img
      :src="`src/assets/images/icon-${icon}.webp`"
      :alt="icon"
      class="w-20 h-20"
    />
    <div class="flex justify-between w-full">
      <p class="text-sm">{{ lowTemp }}°</p>
      <p class="text-sm">{{ highTemp }}°</p>
    </div>
  </UCard>
</template>

<style scoped></style>
