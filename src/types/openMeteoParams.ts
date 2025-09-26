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
  latitude: number;
  longitude: number;
  elevation?: number;
  timezone?: string;
  forecast_days?: number;
  past_days?: number;
  temperature_unit?: "celsius" | "fahrenheit";
  wind_speed_unit?: "kmh" | "ms" | "mph" | "kn";
  precipitation_unit?: "mm" | "inch";
  cell_selection?: "land" | "sea" | "nearest";

  hourly?: readonly H[];
  daily?: readonly D[];
  current?: readonly C[];
  models?: ModelsVariable[];
}
