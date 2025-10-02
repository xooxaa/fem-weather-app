const iconModules = import.meta.glob<string>("../assets/images/icon-*.webp", {
  eager: true,
  import: "default",
});

const iconMap: Record<string, string> = {};
for (const path in iconModules) {
  const fileName = path.split("/").pop() || "";
  const key = fileName.replace(/^icon-/, "").replace(/\.(webp)$/i, "");
  if (key) iconMap[key] = iconModules[path];
}

const weatherCodeMap: Record<number, string> = {
  0: "sunny",
  1: "partly-cloudy",
  2: "partly-cloudy",
  3: "overcast",
  45: "fog",
  48: "fog",
  51: "drizzle",
  53: "drizzle",
  55: "drizzle",
  56: "drizzle",
  57: "drizzle",
  61: "rain",
  63: "rain",
  65: "rain",
  66: "rain",
  67: "rain",
  71: "snow",
  73: "snow",
  75: "snow",
  77: "snow",
  80: "rain",
  81: "rain",
  82: "rain",
  85: "snow",
  86: "snow",
  95: "storm",
  96: "storm",
  99: "storm",
};

export function getWeatherIcon(iconName: string): string {
  return iconMap[iconName] || "";
}

export function getIconFromWeatherCode(code: number): string {
  return weatherCodeMap[code] || "unknown";
}
