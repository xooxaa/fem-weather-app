<script setup lang="ts"></script>

<template>
  <WeatherHeadline />

  <SearchBar />

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-16">
    <div class="flex flex-col gap-8 md:col-span-2">
      <CurrentWeather />
      <DailyForcast />
    </div>
    <div>
      <HourlyForcast />
    </div>
  </div>
</template>

<style scoped></style>
