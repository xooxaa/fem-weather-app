<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <UCard variant="soft">
    <p>{{ title }}</p>
    <p class="text-3xl mt-4">{{ value }} {{ unit }}</p>
  </UCard>
</template>

<style scoped></style>
