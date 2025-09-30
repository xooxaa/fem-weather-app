import type { Geolocation } from "@/types/geolocation";
const apiUrl = "https://geocoding-api.open-meteo.com/v1/search";

export type GeolocationApiResponse = {
  results: Geolocation[];
};

export async function getGeolocations(
  searchTerm: string
): Promise<Geolocation[]> {
  const params = new URLSearchParams();
  params.append("name", encodeURIComponent(searchTerm));
  params.append("count", "5");
  params.append("language", "en");
  params.append("format", "json");

  const response = await fetch(`${apiUrl}?${params}`);
  if (!response.ok) throw new Error(`Error! status: ${response.status}`);
  const data = (await response.json()) as GeolocationApiResponse;
  return data.results ?? [];
}
