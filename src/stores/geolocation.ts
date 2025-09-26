import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getGeolocations } from "@/utils/geolocationQuery";

export const useGeolocationStore = defineStore("geolocation", () => {
  const latitude = ref<number | null>(null);
  const longitude = ref<number | null>(null);

  const setGeolocation = (lat: number, lon: number) => {
    latitude.value = lat;
    longitude.value = lon;
  };

  const searchGeolocations = async (searchTerm: string) => {
    try {
      const results = await getGeolocations(searchTerm);
      console.log("Search results:", results);
    } catch (error) {
      console.error("Error searching geolocations:", error);
    }
  };

  return {
    latitude,
    longitude,
    searchGeolocations,
    setGeolocation,
  };
});
