import type { DailyVariable } from "@/types/openMeteoDaily";
import type { CurrentVariable } from "@/types/openMeteoCurrent";
import type { HourlyVariable } from "@/types/openMeteoHourly";

export type ModelsVariable =
  | "best_match"
  | "icon_seamless"
  | "icon_global"
  | "icon_eu"
  | "icon_d2";

export interface WeatherDataParams<
  H extends HourlyVariable = HourlyVariable,
  D extends DailyVariable = DailyVariable,
  C extends CurrentVariable = CurrentVariable
> {
  // location
  latitude: number;
  longitude: number;
  elevation?: number;

  // timezone is optional but recommended (defaults to GMT)
  timezone?: string; // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

  // time range in days, relative to today
  forecast_days?: number; // 0-10, default 7
  past_days?: number; // 0 - 92, default 0

  // array of weather variables
  hourly?: readonly H[];
  daily?: readonly D[];
  current?: readonly C[];

  // requested units (defaults to first )
  temperature_unit?: "celsius" | "fahrenheit";
  wind_speed_unit?: "kmh" | "ms" | "mph" | "kn";
  precipitation_unit?: "mm" | "inch";

  // advanced (defaults to "land")
  cell_selection?: "land" | "sea" | "nearest";

  // manually select one or more weather models
  models?: ModelsVariable[];
}
