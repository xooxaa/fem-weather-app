<script setup lang="ts"></script>

<template>
  <UCard
    variant="soft"
    :ui="{
      root: 'w-full p-0',
      body: 'max-h-148 overflow-auto',
      header: 'flex justify-between items-center',
    }"
  >
    <template #header>
      <h2 class="text-xl font-bold">Hourly Forcast</h2>
      <p>Dropdown</p>
    </template>

    <div class="">
      <HourlyForcastItem />
      <HourlyForcastItem />
      <HourlyForcastItem />
      <HourlyForcastItem />
      <HourlyForcastItem />
      <HourlyForcastItem />
      <HourlyForcastItem />
      <HourlyForcastItem />
      <HourlyForcastItem />
      <HourlyForcastItem />
      <HourlyForcastItem />
      <HourlyForcastItem />
      <HourlyForcastItem />
      <HourlyForcastItem />
      <HourlyForcastItem />
      <HourlyForcastItem />
    </div>
  </UCard>
</template>

<style scoped></style>
