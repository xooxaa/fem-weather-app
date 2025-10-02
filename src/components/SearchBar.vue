<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { watchDebounced } from "@vueuse/core";
import { useLocationStore } from "@/stores/location";
import type { InputMenuItem } from "@nuxt/ui";
import type { Geolocation } from "@/types/geolocation";

const locationStore = useLocationStore();
const { searchResults, isSearching } = storeToRefs(locationStore);

const searchTerm = ref("");

const items = computed<InputMenuItem[]>(() =>
  (searchResults.value || []).map((searchResult: Geolocation) => ({
    label: `${searchResult.name}, ${searchResult.country}`,
    value: searchResult,
    onSelect: () => {
      locationStore.setWeatherLocation(searchResult);
      searchTerm.value = "";
    },
  }))
);

watchDebounced(
  searchTerm,
  (value) => {
    if (!value) return;
    locationStore.searchGeolocations(value);
  },
  { debounce: 300, maxWait: 1000 }
);

const handleRandomLocation = () => {
  locationStore.setRandomPredefinedLocation();
};
</script>

<template>
  <UFieldGroup class="flex max-w-xl mx-auto mt-8" size="xl">
    <UInputMenu
      v-model:search-term="searchTerm"
      :items="items"
      :loading="isSearching"
      placeholder="Search for a place..."
      color="neutral"
      icon="i-lucide-search"
      class="w-full"
    />

    <UButton class="hover:cursor-pointer">Search</UButton>

    <UButton
      class="hover:cursor-pointer"
      color="neutral"
      variant="subtle"
      icon="i-lucide-shuffle"
      @click="handleRandomLocation"
    ></UButton>
  </UFieldGroup>
</template>

<style scoped></style>
