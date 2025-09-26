const iconModules = import.meta.glob<string>("../assets/images/icon-*.webp", {
  eager: true,
  import: "default",
});

const iconMap: Record<string, string> = {};
for (const path in iconModules) {
  const url = iconModules[path];
  const fileName = path.split("/").pop() || "";
  const key = fileName.replace(/^icon-/, "").replace(/\.(webp)$/i, "");
  if (key) iconMap[key] = url;
}

export function getWeatherIcon(iconName: string): string {
  if (!iconName) return "";
  return iconMap[iconName] || "";
}
