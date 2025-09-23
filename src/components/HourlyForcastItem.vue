<script setup lang="ts">
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
    variant="soft"
    :ui="{
      root: 'mb-4 p-0',
      body: 'flex justify-between items-center p-2 sm:p-2',
    }"
  >
    <div class="flex items-center gap-2">
      <img
        :src="`src/assets/images/icon-${icon}.webp`"
        :alt="icon"
        class="w-12 h-12"
      />
      <p class="text-lg font-bold">{{ time }}</p>
    </div>

    <p class="text-lg me-3">{{ temp }}°</p>
  </UCard>
</template>

<style scoped></style>
