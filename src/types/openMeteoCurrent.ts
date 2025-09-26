// see https://open-meteo.com/en/docs/dwd-api for a documentation of weather variables
// scraped from website with: $$('input[name=current]').map(el => `'${el.value}'`).sort().join('|')
export type CurrentVariable =
  | "apparent_temperature"
  | "cloud_cover"
  | "is_day"
  | "precipitation"
  | "pressure_msl"
  | "rain"
  | "relative_humidity_2m"
  | "showers"
  | "snowfall"
  | "surface_pressure"
  | "temperature_2m"
  | "weather_code"
  | "wind_direction_10m"
  | "wind_gusts_10m"
  | "wind_speed_10m";

/**
 * Represents the structure of the "current" field in the Open-Meteo API response.
 * Each property is a single value.
 */
export type CurrentResponseData<T extends CurrentVariable = CurrentVariable> = {
  time: string;
} & {
  [K in T]: number;
};

/**
 * Represents the current data, with a time and all selected variables.
 * Example: { time: "2025-09-25T01:00", temperature_2m: 15.2, weather_code: 3 }
 */
export type CurrentData<T extends CurrentVariable = CurrentVariable> = {
  time: string;
} & {
  [K in T]: number;
};
