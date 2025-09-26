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

export type CurrentResponseData<T extends CurrentVariable = CurrentVariable> = {
  time: string;
} & {
  [K in T]: number;
};

export type CurrentData<T extends CurrentVariable = CurrentVariable> = {
  time: string;
} & {
  [K in T]: number;
};
