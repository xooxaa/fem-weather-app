<script setup lang="ts">
const now = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});
</script>

<template>
  <UCard
    variant="soft"
    :ui="{
      root: 'h-72',
      body: 'h-full flex flex-col items-center justify-center gap-8',
    }"
    class="bg-today bg-today-small"
  >
    <div class="text-center">
      <h3 class="text-3xl font-bold mb-1">Berlin, Germany</h3>
      <p>{{ now }}</p>
    </div>

    <div class="flex items-center gap-6">
      <img
        src="@/assets/images/icon-sunny.webp"
        alt="sunny"
        class="w-32 h-32"
      />

      <h1 class="text-8xl italic">21°</h1>
    </div>
  </UCard>
</template>

<style scoped>
.bg-today-large {
  background-image: url("@/assets/images/bg-today-large.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.bg-today-small {
  background-image: url("@/assets/images/bg-today-small.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
