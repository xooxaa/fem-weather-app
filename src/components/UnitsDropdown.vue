<script setup lang="ts">
import { useUnitsStore } from "@/stores/units";
import { storeToRefs } from "pinia";

const unitsStore = useUnitsStore();
const { units, isAllUnitsMetric, isAllUnitsImperial } = storeToRefs(unitsStore);
const { setUnits, setAllUnitsToMetric, setAllUnitsToImperial } = unitsStore;
</script>

<template>
  <UPopover
    mode="click"
    :open-delay="0"
    :close-delay="50"
    :content="{
      align: 'end',
      side: 'bottom',
    }"
  >
    <UButton
      icon="i-lucide-settings"
      trailing-icon="i-lucide-chevron-down"
      label="Units"
      color="neutral"
      variant="subtle"
      class="hover:cursor-pointer"
    />

    <template #content>
      <div class="flex flex-col gap-1 min-w-48 p-1 bg-elevated rounded-lg">
        <UnitsDropdownButton
          :active="isAllUnitsMetric"
          @click="setAllUnitsToMetric"
        >
          Switch to Metric
        </UnitsDropdownButton>
        <UnitsDropdownButton
          :active="isAllUnitsImperial"
          @click="setAllUnitsToImperial"
        >
          Switch to Imperial
        </UnitsDropdownButton>

        <USeparator :ui="{ border: 'border-neutral-500' }" decorative />
        <h3 class="text-xs text-neutral-300 px-2 py-2">Temperature</h3>

        <UnitsDropdownButton
          :active="units.temperature === 'C'"
          @click="setUnits({ temperature: 'C' })"
        >
          Celsius (°C)
        </UnitsDropdownButton>
        <UnitsDropdownButton
          :active="units.temperature === 'F'"
          @click="setUnits({ temperature: 'F' })"
        >
          Fahrenheit (°F)
        </UnitsDropdownButton>

        <USeparator :ui="{ border: 'border-neutral-500' }" decorative />
        <h3 class="text-xs text-neutral-300 px-2 py-2">Wind Speed</h3>

        <UnitsDropdownButton
          :active="units.windSpeed === 'km/h'"
          @click="setUnits({ windSpeed: 'km/h' })"
        >
          Kilometers (km/h)
        </UnitsDropdownButton>
        <UnitsDropdownButton
          :active="units.windSpeed === 'mph'"
          @click="setUnits({ windSpeed: 'mph' })"
        >
          Miles (mph)
        </UnitsDropdownButton>

        <USeparator :ui="{ border: 'border-neutral-500' }" decorative />
        <h3 class="text-xs text-neutral-300 px-2 py-2">Precipitation</h3>

        <UnitsDropdownButton
          :active="units.precipitation === 'mm'"
          @click="setUnits({ precipitation: 'mm' })"
        >
          Millimeters (mm)
        </UnitsDropdownButton>
        <UnitsDropdownButton
          :active="units.precipitation === 'in'"
          @click="setUnits({ precipitation: 'in' })"
        >
          Inches (in)
        </UnitsDropdownButton>
      </div>
    </template>
  </UPopover>
</template>

<style scoped></style>
