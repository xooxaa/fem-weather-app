<script setup lang="ts"></script>

<template>
  <WeatherHeadline />

  <SearchBar />

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-16">
    <div class="flex flex-col justify-between gap-8 md:col-span-2">
      <CurrentWeather />
      <DailyForcast />
    </div>

    <HourlyForcast />
  </div>
</template>

<style scoped></style>
