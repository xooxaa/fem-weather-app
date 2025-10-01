<script setup lang="ts">
import { useLocationStore } from "@/stores/location";
const locationStore = useLocationStore();

const handleRandomLocation = () => {
  locationStore.setRandomPredefinedLocation();
};
</script>

<template>
  <UFieldGroup class="flex max-w-xl mx-auto mt-8" size="xl">
    <UInput
      class="w-full"
      color="neutral"
      icon="i-lucide-search"
      placeholder="Search for a place..."
    />

    <UButton class="hover:cursor-pointer">Search</UButton>

    <UButton
      class="hover:cursor-pointer"
      icon="i-lucide-shuffle"
      @click="handleRandomLocation"
    ></UButton>
  </UFieldGroup>
</template>

<style scoped></style>
