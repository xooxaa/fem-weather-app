// this utility library was inspired by https://github.com/atombrenner/openmeteo/blob/main/main.ts

import { mapDailyResponseToArray } from "@/types/openMeteoDaily";
import { mapHourlyResponseToArray } from "@/types/openMeteoHourly";

import type {
  CurrentVariable,
  CurrentResponseData,
  CurrentData,
} from "@/types/openMeteoCurrent";
import type {
  HourlyVariable,
  HourlyResponseData,
  HourlyData,
} from "@/types/openMeteoHourly";
import type {
  DailyVariable,
  DailyResponseData,
  DailyData,
} from "@/types/openMeteoDaily";
import type { WeatherDataParams } from "@/types/openMeteoParams";

export interface WeatherResponseData<
  H extends HourlyVariable,
  D extends DailyVariable,
  C extends CurrentVariable
> {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;

  current: CurrentResponseData<C>;
  hourly: HourlyResponseData<H>;
  daily: DailyResponseData<D>;
}

export interface WeatherData<
  H extends HourlyVariable,
  D extends DailyVariable,
  C extends CurrentVariable
> {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;

  current: CurrentData<C>;
  hourly: HourlyData<H>;
  daily: DailyData<D>;
}

export const fetchWeatherData = async <T extends WeatherDataParams>(
  params: T,
  api = "https://api.open-meteo.com/v1/forecast"
) => {
  type H = T extends { hourly?: ReadonlyArray<infer H extends HourlyVariable> }
    ? H
    : never;
  type D = T extends { daily?: ReadonlyArray<infer D extends DailyVariable> }
    ? D
    : never;
  type C = T extends {
    current?: ReadonlyArray<infer C extends CurrentVariable>;
  }
    ? C
    : never;

  const data = await _fetch(params, api);

  if (data.hourly) data.hourly = mapHourlyResponseToArray(data.hourly);
  if (data.daily) data.daily = mapDailyResponseToArray(data.daily);

  return data as WeatherData<H, D, C>;
};

export const _fetch = async <T extends WeatherDataParams>(
  params: T,
  api: string
) => {
  const searchParams = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, `${v}`] as [string, string])
  );
  const url = `${api}?${searchParams}`;
  let response: Response;
  try {
    response = await fetch(url);
  } catch (err) {
    throw new Error("fetch error");
  }
  const { status } = response;
  if (status >= 400 && status < 500) {
    const json = await response.json();
    const reason =
      json && typeof json === "object" && "reason" in json
        ? json.reason
        : "unknown";
    throw Error(`${reason}`);
  }
  if (status !== 200) throw new Error(`received unexpected status ${status}`);

  return await response.json();
};
