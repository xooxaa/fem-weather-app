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

export function getWeatherIcon(iconName: string): string {
  return iconMap[iconName] || "";
}
