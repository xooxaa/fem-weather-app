// see https://open-meteo.com/en/docs/dwd-api for a documentation of weather variables
// scraped from website with: $$('input[name=hourly]').filter(el => !el.value.endsWith('hPa')).map(el => `'${el.value}'`).sort().join('|')
export type HourlyVariable =
  | "apparent_temperature"
  | "cape"
  | "cloud_cover"
  | "cloud_cover_high"
  | "cloud_cover_low"
  | "cloud_cover_mid"
  | "dew_point_2m"
  | "diffuse_radiation"
  | "diffuse_radiation_instant"
  | "direct_normal_irradiance"
  | "direct_normal_irradiance_instant"
  | "direct_radiation"
  | "direct_radiation_instant"
  | "et0_fao_evapotranspiration"
  | "evapotranspiration"
  | "freezing_level_height"
  | "global_tilted_irradiance"
  | "global_tilted_irradiance_instant"
  | "is_day"
  | "lightning_potential"
  | "precipitation"
  | "pressure_msl"
  | "rain"
  | "relative_humidity_2m"
  | "shortwave_radiation"
  | "shortwave_radiation_instant"
  | "showers"
  | "snow_depth"
  | "snowfall"
  | "snowfall_height"
  | "soil_moisture_0_to_1cm"
  | "soil_moisture_1_to_3cm"
  | "soil_moisture_27_to_81cm"
  | "soil_moisture_3_to_9cm"
  | "soil_moisture_9_to_27cm"
  | "soil_temperature_0cm"
  | "soil_temperature_18cm"
  | "soil_temperature_54cm"
  | "soil_temperature_6cm"
  | "sunshine_duration"
  | "surface_pressure"
  | "temperature_120m"
  | "temperature_180m"
  | "temperature_2m"
  | "temperature_80m"
  | "terrestrial_radiation"
  | "terrestrial_radiation_instant"
  | "updraft"
  | "vapour_pressure_deficit"
  | "weather_code"
  | "wind_direction_10m"
  | "wind_direction_120m"
  | "wind_direction_180m"
  | "wind_direction_80m"
  | "wind_gusts_10m"
  | "wind_speed_10m"
  | "wind_speed_120m"
  | "wind_speed_180m"
  | "wind_speed_80m";

/**
 * Represents the structure of the "hourly" field in the Open-Meteo API response.
 * Each property is an array of values, one per day.
 */
export type HourlyResponseData<T extends HourlyVariable = HourlyVariable> = {
  time: string[];
} & {
  [K in T]: number[];
};

/**
 * Represents a single entry of hourly data, with a time and all selected variables.
 * Example: { time: "2025-09-25T01:00", temperature_2m: 15.2, weather_code: 3 }
 */
export type HourlyData<T extends HourlyVariable = HourlyVariable> = {
  time: string;
} & {
  [K in T]: number;
};

/**
 * Converts a hourly time series object into an array of objects, one per hour.
 * @param data The hourly time series object from the API response.
 * @returns Array of objects, each representing an hour's data.
 */
export function mapHourlyResponseToArray<T extends HourlyVariable>(
  data: HourlyResponseData<T>
): Array<HourlyData<T>> {
  const { time, ...rest } = data as Omit<HourlyResponseData<T>, "time"> & {
    time: string[];
  };
  const keys = Object.keys(rest) as T[];

  return time.map((t, i) => {
    const entry = { time: t } as HourlyData<T>;
    for (const key of keys) {
      // Indexing with generics is hard to express to TS; use a narrow cast here.
      (entry as any)[key] = (rest as any)[key][i] as number;
    }
    return entry;
  });
}
