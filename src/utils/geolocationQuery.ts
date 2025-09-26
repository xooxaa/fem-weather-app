const apiUrl = "https://geocoding-api.open-meteo.com/v1/search";

export type Geolocation = {
  admin1: string;
  admin1_id: number;
  admin3: string;
  admin3_id: number;
  admin4: string;
  admin4_id: number;
  country: string;
  country_code: string;
  country_id: number;
  elevation: number;
  feature_code: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  postcodes: string[];
  timezone: string;
};

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
