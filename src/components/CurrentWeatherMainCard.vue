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
      root: 'min-h-64 ',
      body: 'h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:mx-8 gap-8',
    }"
    class="bg-[url('@/assets/images/bg-today-small.svg')] lg:bg-[url('@/assets/images/bg-today-large.svg')] bg-cover bg-center bg-no-repeat"
  >
    <div class="text-center">
      <h3 class="text-3xl font-bold my-1">Berlin, Germany</h3>
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

<style scoped></style>
