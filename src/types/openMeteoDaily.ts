// see https://open-meteo.com/en/docs/dwd-api for a documentation of weather variables
// scraped from website with: $$('input[name=daily]').map(el => `'${el.value}'`).sort().join('|')
export type DailyVariable =
  | "apparent_temperature_max"
  | "apparent_temperature_min"
  | "daylight_duration"
  | "et0_fao_evapotranspiration"
  | "precipitation_hours"
  | "precipitation_probability_max"
  | "precipitation_sum"
  | "rain_sum"
  | "shortwave_radiation_sum"
  | "showers_sum"
  | "snowfall_sum"
  | "sunrise" //string
  | "sunset" //string
  | "sunshine_duration"
  | "temperature_2m_max"
  | "temperature_2m_min"
  | "weather_code"
  | "wind_direction_10m_dominant"
  | "wind_gusts_10m_max"
  | "wind_speed_10m_max";

type DailyValueType<K extends DailyVariable> = K extends "sunrise" | "sunset"
  ? string
  : number;

export type DailyResponseData<T extends DailyVariable = DailyVariable> = {
  time: string[];
} & {
  [K in T]: Array<DailyValueType<K>>;
};

export type DailyData<T extends DailyVariable = DailyVariable> = {
  time: string;
} & {
  [K in T]: DailyValueType<K>;
};

export function mapDailyResponseToArray<T extends DailyVariable>(
  data: DailyResponseData<T>
): Array<DailyData<T>> {
  const { time, ...rest } = data as Omit<DailyResponseData<T>, "time"> & {
    time: string[];
  };
  const keys = Object.keys(rest) as T[];

  return time.map((t, i) => {
    const entry = { time: t } as DailyData<T>;
    for (const key of keys) {
      (entry as any)[key] = (rest as any)[key][i] as DailyValueType<T>;
    }
    return entry;
  });
}
