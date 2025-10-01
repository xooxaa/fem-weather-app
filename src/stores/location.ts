import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage, useGeolocation } from "@vueuse/core";
import { getGeolocations } from "@/utils/geolocationQuery";
import type { Geolocation } from "@/types/geolocation";
import {
  predefinedLocations,
  getRandomPredefinedLocation,
} from "@/utils/predefinedLocations";

export const useLocationStore = defineStore("geolocation", () => {
  const weatherLocation = useLocalStorage<Geolocation>(
    "weather-location",
    getRandomPredefinedLocation()
  );

  const favoriteLocations = useLocalStorage<Geolocation[]>(
    "weather-favorite-locations",
    []
  );

  const searchResults = ref<Geolocation[]>([]);
  const isSearching = ref(false);
  const searchError = ref<string | null>(null);

  const isFavoriteLocation = computed(() => {
    const currentLocationId = weatherLocation.value.id;
    return favoriteLocations.value.some(
      (favoriteLocation) => favoriteLocation.id === currentLocationId
    );
  });

  const isPredefinedLocation = computed(() => {
    const currentLocationId = weatherLocation.value.id;
    return predefinedLocations.some(
      (predefinedLocation) => predefinedLocation.id === currentLocationId
    );
  });

  const setWeatherLocation = (location: Geolocation) => {
    weatherLocation.value = location;
  };

  const setRandomPredefinedLocation = () => {
    weatherLocation.value = getRandomPredefinedLocation();
  };

  const addFavoriteLocation = (newLocation: Geolocation) => {
    if (
      !favoriteLocations.value.some(
        (favoriteLocation) => favoriteLocation.id === newLocation.id
      )
    ) {
      favoriteLocations.value.push(newLocation);
    }
  };

  const removeFavoriteLocation = (locationId: number) => {
    favoriteLocations.value = favoriteLocations.value.filter(
      (favoriteLocation) => favoriteLocation.id !== locationId
    );
  };

  const searchGeolocations = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      searchResults.value = [];
      return;
    }
    isSearching.value = true;
    searchError.value = null;
    try {
      const results = await getGeolocations(searchTerm);
      searchResults.value = results;
    } catch (error) {
      searchError.value = (error as Error).message;
      searchResults.value = [];
    } finally {
      isSearching.value = false;
    }
  };

  return {
    weatherLocation,
    searchResults,
    isSearching,
    searchError,
    searchGeolocations,
    setWeatherLocation,
    setRandomPredefinedLocation,
  };
});
