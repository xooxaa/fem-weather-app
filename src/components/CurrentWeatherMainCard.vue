<script setup lang="ts"></script>

<template>
  <UCard variant="soft" :ui="{ root: 'h-72' }" class="bg-today bg-today-small">
    <div>Current Weather Main Card</div>
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
