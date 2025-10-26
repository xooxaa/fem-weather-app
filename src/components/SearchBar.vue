<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import { storeToRefs } from "pinia";
import { watchDebounced } from "@vueuse/core";
import { useLocationStore } from "@/stores/location";
import type { InputMenuItem } from "@nuxt/ui";
import type { Geolocation } from "@/types/geolocation";

const locationStore = useLocationStore();
const { addCurrentLocationToFavorites, removeCurrentLocationFromFavorites } =
  locationStore;
const { searchResults, isSearching, favoriteLocations, isFavoriteLocation } =
  storeToRefs(locationStore);

const searchTerm = ref("");
const menuOpen = ref(false);
const searchInput = useTemplateRef<HTMLElement | null>("searchInput");

const items = computed<InputMenuItem[][]>(() => {
  const favorites: InputMenuItem[] = (favoriteLocations.value || []).map(
    (fav: Geolocation) => ({
      label: `${fav.name}, ${fav.country}`,
      value: fav,
      onSelect: () => {
        locationStore.setWeatherLocation(fav);
        searchTerm.value = "";
        menuOpen.value = false;
        searchInput.value?.blur();
      },
    })
  );

  const searches: InputMenuItem[] = (searchResults.value || []).map(
    (searchResult: Geolocation) => ({
      label: `${searchResult.name}, ${searchResult.country}`,
      value: searchResult,
      onSelect: () => {
        locationStore.setWeatherLocation(searchResult);
        searchTerm.value = "";
        menuOpen.value = false;
        searchInput.value?.blur();
      },
    })
  );

  return [favorites, searches];
});

watchDebounced(
  searchTerm,
  (value) => {
    if (!value) return;
    locationStore.searchGeolocations(value);
  },
  { debounce: 300, maxWait: 1000 }
);

const handleFavoriteClick = () => {
  if (isFavoriteLocation.value) {
    removeCurrentLocationFromFavorites();
  } else {
    addCurrentLocationToFavorites();
  }
};
</script>

<template>
  <UFieldGroup class="flex max-w-xl mx-auto mt-8" size="xl">
    <UInputMenu
      ref="searchInput"
      v-model="searchTerm"
      v-model:search-term="searchTerm"
      v-model:open="menuOpen"
      :items="items"
      value-key="label"
      :loading="isSearching"
      placeholder="Search for a place..."
      color="neutral"
      icon="i-lucide-search"
      class="w-full"
      :arrow="false"
      :open-on-click="true"
      :open-on-focus="true"
    />

    <UButton
      class="hover:cursor-pointer"
      :color="isFavoriteLocation ? 'error' : 'neutral'"
      :variant="isFavoriteLocation ? 'solid' : 'outline'"
      icon="i-lucide-heart"
      @click="handleFavoriteClick"
    ></UButton>

    <!-- <UButton class="hover:cursor-pointer">Search</UButton> -->
  </UFieldGroup>
</template>

<style scoped></style>
